// 4096!
// Richard Shuai
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// gameStatus: menu, play, gg
// playMethod: manual, auto
let grid = [], gridSize, containerSize, score, gameStatus, playMethod, valueToColor,autoplayLastMoveTime,autoplayDuration;


function setup() {
  createCanvas(windowWidth, windowHeight);
  initGrid();
  score = 0;
  gameStatus = "menu";
  autoplayDuration = 500;
  autoplayLastMoveTime = 0;
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
    background("#ffefa0");
    displayMenu();
  }
  else if(gameStatus === "play"){
    background(200,200,235);
    drawGrid();
    if(playMethod === "auto"){
      autoplay();
    }
    displayScore();
  }
  else if(gameStatus === "gg"){
    background(255,255,255);
  }
  
}


// initGrid function sets up the grid, and randomize the first 2
function initGrid(){

  gridSize = 5;

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
    if(key === "w" || key === "W"){ 
      oneRound("w");
    }
    // move down
    if(key === "s" || key === "S"){
      oneRound("s");
    }
    // move left
    if(key === "a" || key === "A"){
      oneRound("a");
    }
    // move right
    if(key === "d" || key === "D"){ 
      oneRound("d");
    }
  }
}


// mouse press
function mousePressed(){
  if(gameStatus === "menu"){
    if(mouseX >= 50 && mouseX <= width-50 && mouseY >= 200 && mouseY <= 300){
      gameStatus = "play";
      playMethod = "manual";
    }
    if(mouseX >= 50 && mouseX <= width-50 && mouseY >= 400 && mouseY <= 500){
      gameStatus = "play";
      playMethod = "auto";
    }
  }
}

// one function takes care of one round of moving
function oneRound(direction){
  let isOneOrMoreCellMoved = false;
  isOneOrMoreCellMoved |= moveAllCells(direction);
  isOneOrMoreCellMoved |= mergeAllCells(direction);
  isOneOrMoreCellMoved |= moveAllCells(direction);
  checkGameOver();

  if(gameStatus === "play" && isOneOrMoreCellMoved){
    generateRandomCell();
  }
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
    accumulateScore(grid[y][x].value);
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
}


// adds up score
function accumulateScore(value){
  score += value;
}


// display user's score, ill change the style later
function displayScore(){
  fill(0);
  text(score,width-200,60);
}


// the game is over is the grid is full and no adjcent values are the same
function checkGameOver(){
  let dir = [-1,0,1,0,-1];
  for(let y=0;y<gridSize;++y){
    for(let x=0;x<gridSize;++x){
      if(grid[y][x].value === 0){
        return false; 
      }
      else{
        // check all four directions
        for(let i=0;i<4;++i){
          if(y+dir[i] >= 0 && y+dir[i] < gridSize && x+dir[i+1] >= 0 && x+dir[i+1] < gridSize && grid[y+dir[i]][x+dir[i+1]].value === grid[y][x].value){
            return false; // found one same adjcent cell!
          }
        }
      }
    }
  }
  gameStatus = "gg";
  return true;
}


// display start menu
function displayMenu(){
  textSize(width/20);
  textAlign(LEFT);
  text("4096!",width/2-width/15,100);
  rect(50,200,width-100,100);
  textAlign(CENTER,CENTER);
  text("Play",width/2,250);
  rect(50,400,width-100,100);
  text("Auto Play",width/2,450);
}


// autoplay
function autoplay(){
  if(gameStatus === "play"){
    if(autoplayLastMoveTime + autoplayDuration < millis()){
      let dir = random(["a","w","s","d"]);
      oneRound(dir);
      autoplayLastMoveTime = millis();
    }
  }
}