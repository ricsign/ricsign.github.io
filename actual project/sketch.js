// 4096!
// Richard Shuai
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = [], gridSize, containerSize;
function setup() {
  createCanvas(windowWidth, windowHeight);
  initGrid();
}

function draw() {
  drawGrid();
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
      rect(startX+cellWidth*x, startY+cellHeight*y, cellWidth, cellHeight);
      if(grid[y][x].value > 0)
        text(grid[y][x].value, startX+cellWidth*(x+0.5), startY+cellHeight*(y+0.5));
    }
  }
}

function keyPressed(){
  // move up
  if(key === "w" || key === "W"){ //ok
    moveCells(1,0);
  }
  if(key === "s" || key === "S"){
    moveCells(-1,0);
  }
  if(key === "a" || key === "A"){
    moveCells(0,1);
  }
  if(key === "d" || key === "D"){ //ok
    moveCells(0,-1);
  }
}

// slide cell if the adjcent cell is a 0
function moveCells(up,left){
  for(let y=0;y<gridSize;++y){
    for(let x=0;x<gridSize;++x){
      if(grid[y][x].value === 0) 
        continue;
      let currentX = x-left;
      let currentY = y-up;
      while(currentY >= 0 && currentX >= 0 && currentY < gridSize && currentX < gridSize && grid[currentY][currentX].value === 0){
        [grid[currentY][currentX], grid[currentY+up][currentX+left]] = [grid[currentY+up][currentX+left], grid[currentY][currentX]];
        currentY -= up;
        currentX -= left;
      }
    }
  }
}