// 4096!
// Richard Shuai
// Oct/02/2020
//
// Extra for Experts:
// 1. Utilize map to store keys and values
// 2. Move and combine is the most difficult part in this project, and user can check the activity log in the console
// 3. Sounds and Images are used
// 4. Every functionality is encapsulated into a single organized function 
// 5. Autoplay Implemented


// Variables Dictionary
// grid: contains all tiles
// gridSize: the width and length of grid
// containerSize: Inner square's size
// score: user's total score
// gameStatus: The status of the game: menu, play, gg
// playMethod: How to play? manual, auto
// valueToColor: a map that contains every tile and its corresponding color
// autoplayDuration: duration of autoplay in ms
// autoplayLastMoveTime: last move time autoplay in ms
// totalMoves: total moves used
// moveSound: sound plays every single move
// menubackground, playbackground, ggbackground: background images
// checkingGameOver: are we currently checking game over?

let grid = [], gridSize, containerSize, score, gameStatus, playMethod, valueToColor,autoplayLastMoveTime,autoplayDuration, totalMoves, moveSound, menubackground, playbackground, ggbackground, checkingGameOver;

function preload(){
  soundFormats("mp3");
  moveSound = loadSound("assets/pop");
  menubackground = loadImage("assets/background-1.jpg");
  playbackground = loadImage("assets/background-2.jpg");
  ggbackground = loadImage("assets/background-3.jpg");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  score = 0;
  totalMoves = 0;
  gameStatus = "menu";
  valueToColor = new Map([
    [0,"white"],
    [2,"#fafcc2"],
    [4,"#ffd57e"],
    [8,"#fca652"],
    [16,"#d9adad"],
    [32,"#eb6383"],
    [64,"#d63447"],
    [128,"#b2ebf2"],
    [256,"#00bcd4"],
    [512,"#008dd4"],
    [1024,"#88e868"]
  ]);
  for(let i=0;i<15;++i){
    valueToColor.set(2048*Math.pow(2,i),"#2e5a1c");
  }

}


function draw() {
  if(gameStatus === "menu"){
    background(menubackground);
    displayMenu();
  }
  else if(gameStatus === "play"){
    background(playbackground);
    drawGrid();
    if(playMethod === "auto"){
      autoplay();
    }
    displayScore();
    if(!checkingGameOver){
      checkGameOver();
    }
  }
  if(gameStatus === "gg"){
    background(ggbackground);
    gameOverScreen();
  }
  
}


// initGrid function sets up the grid, and randomize the first 2
function initGrid(){

  grid = [];

  // generate the first 2's x and y coordinate
  let twoX = floor(random() * gridSize);
  let twoY = floor(random() * gridSize);

  for(let i=0;i<gridSize;++i){
    grid.push([]);
    for(let j=0;j<gridSize;++j){
      let cell = {
        value: i === twoX && j === twoY ? 2 : 0,
      };
      grid[i].push(cell);
    }
  }
}


// draw the grid according to the values
function drawGrid(){
  // main container
  containerSize = min(width/5*3,height/10*9);
  fill(0,0,0);
  rect(width/20, height/20, containerSize, containerSize,20);

  // calculate parameters
  let startX = width/20+containerSize/100*3, startY = height/20+containerSize/100*3;
  let endX = width/20+containerSize/100*97, endY = height/20+containerSize/100*97;
  let cellWidth = (endX-startX)/gridSize, cellHeight = (endY-startY)/gridSize;

  // draw inner rectangles
  textAlign(CENTER, CENTER);
  textSize(cellWidth * 0.3);
  for(let y=0;y<gridSize;++y){
    for(let x=0;x<gridSize;++x){
      fill(valueToColor.get(grid[y][x].value));
      rect(startX+cellWidth*x, startY+cellHeight*y, cellWidth, cellHeight, 10);
      fill(0);
      if(grid[y][x].value > 0){
        text(grid[y][x].value, startX+cellWidth*(x+0.5), startY+cellHeight*(y+0.5));
      }
    }
  }
}


function keyPressed(){
  if(gameStatus === "play" && playMethod === "manual"){ 
    // move up
    if(key === "w" || key === "W" || keyCode === UP_ARROW){ 
      oneRound("w");
    }
    // move down
    if(key === "s" || key === "S" || keyCode === DOWN_ARROW){
      oneRound("s");
    }
    // move left
    if(key === "a" || key === "A" || keyCode === LEFT_ARROW){
      oneRound("a");
    }
    // move right
    if(key === "d" || key === "D" || keyCode === RIGHT_ARROW){ 
      oneRound("d");
    }
  }
}


// mouse press
function mousePressed(){
  if(gameStatus === "menu"){
    if(mouseX >= 50 && mouseX <= width-50 && mouseY >= 200 && mouseY <= 300){
      let reGrid = /^(1[0-2]|[2-9])$/; // 2-12
      gridSize = 0;
      while(!reGrid.test(gridSize)){
        gridSize = window.prompt("Please enter the grid size from 2-12:");
      }
      initGrid();
      gameStatus = "play";
      playMethod = "manual";
    }
    if(mouseX >= 50 && mouseX <= width-50 && mouseY >= 400 && mouseY <= 500){
      let reGrid = /^(1[0-2]|[2-9])$/; // 2-12
      let reAutoPlay = /^([1-9][0-9]|[1-9][0-9][0-9]|[1-9][0-9][0-9][0-9])$/; //10-9999
      gridSize = 0;
      autoplayDuration = 0;
      while(!reGrid.test(gridSize)){
        gridSize = Number(window.prompt("Please enter the grid size from 2-12:"));
      }
      while(!reAutoPlay.test(autoplayDuration)){
        autoplayDuration = Number(window.prompt("Please enter the auto play duration in ms from 10-9999:"));
      }
      initGrid();
      gameStatus = "play";
      playMethod = "auto";
      autoplayLastMoveTime = millis();
    }
  }

  if(gameStatus === "gg"){
    if(mouseX >= 100 && mouseX <= width-100 && mouseY >= 500 && mouseY <= 600){
      setup();
    }
  }
}

// one function takes care of one round of moving
function oneRound(direction){
  let isOneOrMoreCellMoved = false;
  isOneOrMoreCellMoved |= moveAllCells(direction);
  isOneOrMoreCellMoved |= mergeAllCells(direction);
  isOneOrMoreCellMoved |= moveAllCells(direction);
  

  if(gameStatus === "play" && isOneOrMoreCellMoved){
    totalMoves++;
    moveSound.play();
    generateRandomCell();
  }

  return isOneOrMoreCellMoved;
}

// move all cells based on the direction given
function moveAllCells(direction){
  let isOneOrMoreCellMoved = false;
  // move up
  if(direction === "w"){
    for(let y=0;y<gridSize;++y){
      for(let x=0;x<gridSize;++x){
        isOneOrMoreCellMoved |= moveCurrentCell(x,y,1,0);
      }
    }
  }

  // move down
  if(direction === "s"){
    for(let y=gridSize-1;y>=0;--y){
      for(let x=0;x<gridSize;++x){
        isOneOrMoreCellMoved |= moveCurrentCell(x,y,-1,0);
      }
    }
  }

  // move left
  if(direction === "a"){
    for(let y=0;y<gridSize;++y){
      for(let x=0;x<gridSize;++x){
        isOneOrMoreCellMoved |= moveCurrentCell(x,y,0,1);
      }
    }
  }

  // move right
  if(direction === "d"){ 
    for(let y=0;y<gridSize;++y){
      for(let x=gridSize-1;x>=0;--x){
        isOneOrMoreCellMoved |= moveCurrentCell(x,y,0,-1);
      }
    }
  }

  return isOneOrMoreCellMoved;
}


// move all cells based on the direction given
function mergeAllCells(direction){
  let isOneOrMoreCellMoved = false;
  // user presses up
  if(direction === "w"){
    for(let y=0;y<gridSize-1;++y){
      for(let x=0;x<gridSize;++x){
        isOneOrMoreCellMoved |= mergeCurrentCell(x,y,-1,0);
      }
    }
  }

  // user presses down
  if(direction === "s"){
    for(let y=gridSize-1;y>=1;--y){
      for(let x=0;x<gridSize;++x){
        isOneOrMoreCellMoved |= mergeCurrentCell(x,y,1,0);
      }
    }
  }

  // user presses left
  if(direction === "a"){
    for(let y=0;y<gridSize;++y){
      for(let x=0;x<gridSize-1;++x){
        isOneOrMoreCellMoved |= mergeCurrentCell(x,y,0,-1);
      }
    }
  }

  // user presses right
  if(direction === "d"){ 
    for(let y=0;y<gridSize;++y){
      for(let x=gridSize-1;x>=1;--x){
        isOneOrMoreCellMoved |= mergeCurrentCell(x,y,0,1);
      }
    }
  }

  return isOneOrMoreCellMoved;
}


// slide the current cell if the adjcent cell is a 0
function moveCurrentCell(x,y,up,left){
  if(grid[y][x].value === 0){
    return false;
  }

  let currentX = x-left;
  let currentY = y-up;

  while(currentY >= 0 && currentX >= 0 && currentY < gridSize && currentX < gridSize && grid[currentY][currentX].value === 0){
    [grid[currentY][currentX], grid[currentY+up][currentX+left]] = [grid[currentY+up][currentX+left], grid[currentY][currentX]];
    currentY -= up;
    currentX -= left;
  }

  if(currentX !== x-left || currentY !== y-up){
    console.log("moved a cell at (" + x + "," + y + ")");
  }
  return currentX !== x-left || currentY !== y-up;
}



// merge the cell, x,y is the current position, up is the vertical direction to check, left is the horizontal direction to check
function mergeCurrentCell(x,y,up,left){
  if(grid[y][x].value === 0){
    return false;
  }

  // if the values are the same, hooray!
  if(grid[y-up][x-left].value === grid[y][x].value){
    grid[y][x].value *= 2;
    grid[y-up][x-left].value = 0;
    score += grid[y][x].value;
    console.log("merged two cells at ("+ x + ","+ y + "), created a cell with value of " + grid[y][x].value);
    return true;
  }

  return false;
}


// generate random cells, if and only if at least a cell moved
function generateRandomCell(){
  let allEmptyCells = [], selectedX, selectedY, selectedValue;

  // select all cells with value of 0
  for(let y=0;y<gridSize;++y){
    for(let x=0;x<gridSize;++x){
      if(grid[y][x].value === 0){
        allEmptyCells.push([x,y]);
      }
    }
  }

  // random select one
  [selectedX,selectedY] = random(allEmptyCells);

  // random select value: 2 (90%) or 4 (10%)
  if(random(100) < 90){
    selectedValue = 2;
  }
  else{
    selectedValue = 4;
  }

  grid[selectedY][selectedX].value = selectedValue;
  console.log("generated a new cell with value of "+selectedValue+" at ("+selectedX + "," + selectedY + ")");
}


// display user's score, ill change the style later
function displayScore(){
  fill(255);
  textSize(width/35);
  text("Score: "+score,width-200,60);
  text("Moves: "+totalMoves,width-200,300);
  textSize(width/100);
  text("When you start the game, there will be a two tile on the grid,", width-300,500);
  text("You hit the arrow keys on your keyboard to move the tiles around", width-300,520);
  text(" — and also to generate new tiles, which will also be valued at 2 or 4.", width-300,540);
  text(" When two equal tiles collide, they combine to give you one ", width-300,560);
  text("greater tile that displays their sum. The more you do this,", width-350,580);
  text("the higher the tiles get and the more crowded the board becomes.",width-400,600); 
  text("Your objective is to reach 4096 before the board fills up. ", width-300,620);
  text("You can check console to check your activities log.", width-300,640);
}


// the game is over is the grid is full and no adjcent values are the same
function checkGameOver(){
  checkingGameOver = true;
  let dir = [-1,0,1,0,-1];
  for(let y=0;y<gridSize;++y){
    for(let x=0;x<gridSize;++x){
      if(grid[y][x].value === 0){
        checkingGameOver = false;
        return false; 
      }
      else{
        // check all four directions
        for(let i=0;i<4;++i){
          if(y+dir[i] >= 0 && y+dir[i] < gridSize && x+dir[i+1] >= 0 && x+dir[i+1] < gridSize && grid[y+dir[i]][x+dir[i+1]].value === grid[y][x].value){
            checkingGameOver = false;
            return false; // found one same adjcent cell!
          }
        }
      }
    }
  }

  // redirect delay
  window.setTimeout(function(){
    checkingGameOver = false;
    gameStatus = "gg";
    return true;
  }, 1000);
  checkingGameOver = false;
}


// display start menu
function displayMenu(){
  fill("white");
  textSize(width/15);
  textAlign(LEFT);
  text("4096!",width/2-width/15,100);
  fill("white");
  rect(50,200,width-100,100);
  textSize(width/30);
  textAlign(CENTER,CENTER);
  fill("black");
  text("Play",width/2,250);
  fill("white");
  rect(50,400,width-100,100);
  fill("black");
  text("Auto Play",width/2,450);
}


// autoplay
function autoplay(){
  if(gameStatus === "play"){
    if(autoplayLastMoveTime + autoplayDuration < millis()){
      let dir = random(["a","w","s","d"]);
      if(oneRound(dir)){
        autoplayLastMoveTime = millis();
      }
    }
  }
}


// game over screen
function gameOverScreen(){
  let highestTile = 0;
  for(let y=0;y<gridSize;++y){
    for(let x=0;x<gridSize;++x){
      highestTile = highestTile > grid[y][x].value ? highestTile : grid[y][x].value;
    }
  }

  textSize(width/15);
  textAlign(CENTER,CENTER);
  text("Game Over!",width/2,100);
  textSize(width/30);
  text("Your score is "+ score, width/2,200);
  text("The highest tile you got is "+ highestTile, width/2,300);
  text("Your total moves is "+ totalMoves, width/2,400);
  fill("white");
  rect(100,500,width-200,100);
  fill("black");
  text("Restart",width/2,550);
}