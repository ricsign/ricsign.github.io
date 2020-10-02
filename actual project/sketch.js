// 4096!
// Richard Shuai
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = [], gridSize, containerSize, score, isGameStarted, isGameOver;


function setup() {
  createCanvas(windowWidth, windowHeight);
  initGrid();
  score = 0;
  isGameOver = false;
  isGameStarted = true;
}


function draw() {
  if(isGameStarted && !isGameOver){
    background(200,200,235);
    drawGrid();
    displayScore();
  }
  if(isGameOver){
    background(255,255,255);
  }
  
}


// initGrid function sets up the grid, and randomize the first 2
function initGrid(){

  gridSize = 4;

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
  rect(width/20, height/20, containerSize, containerSize,20);

  // calculate parameters
  let startX = width/20+containerSize/100*3, startY = height/20+containerSize/100*3;
  let endX = width/20+containerSize/100*97, endY = height/20+containerSize/100*97;
  let cellWidth = (endX-startX)/gridSize, cellHeight = (endY-startY)/gridSize;

  // draw inner rectangles
  textAlign(CENTER, CENTER);
  textSize(cellWidth * 0.55);
  for(let y=0;y<gridSize;++y){
    for(let x=0;x<gridSize;++x){
      rect(startX+cellWidth*x, startY+cellHeight*y, cellWidth, cellHeight, 10);
      if(grid[y][x].value > 0){
        text(grid[y][x].value, startX+cellWidth*(x+0.5), startY+cellHeight*(y+0.5));
      }
    }
  }
}


function keyPressed(){
  let isOneOrMoreCellMoved = false;
  // move up
  if(key === "w" || key === "W"){ 
    isOneOrMoreCellMoved |= moveAllCells("w");
    isOneOrMoreCellMoved |= mergeAllCells("w");
    isOneOrMoreCellMoved |= moveAllCells("w");
    checkGameOver();

    if(!isGameOver && isOneOrMoreCellMoved){
      generateRandomCell();
    }
  }
  // move down
  if(key === "s" || key === "S"){
    isOneOrMoreCellMoved |= moveAllCells("s");
    isOneOrMoreCellMoved |= mergeAllCells("s");
    isOneOrMoreCellMoved |= moveAllCells("s");
    checkGameOver();

    if(!isGameOver && isOneOrMoreCellMoved){
      generateRandomCell();
    }
  }
  // move left
  if(key === "a" || key === "A"){
    isOneOrMoreCellMoved |= moveAllCells("a");
    isOneOrMoreCellMoved |= mergeAllCells("a");
    isOneOrMoreCellMoved |= moveAllCells("a");
    checkGameOver();

    if(!isGameOver && isOneOrMoreCellMoved){
      generateRandomCell();
    }
  }
  // move right
  if(key === "d" || key === "D"){ 
    isOneOrMoreCellMoved |= moveAllCells("d");
    isOneOrMoreCellMoved |= mergeAllCells("d");
    isOneOrMoreCellMoved |= moveAllCells("d");
    checkGameOver();

    if(!isGameOver && isOneOrMoreCellMoved){
      generateRandomCell();
    }
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
  alert("no!!!!!!!!!");
  isGameOver = true;
  isGameStarted = false;
  return true;
}