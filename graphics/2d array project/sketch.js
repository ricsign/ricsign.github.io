// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let gridWidth, gridHeight, grid;
function setup() {
  gridHeight = gridWidth = 5;
  grid = [];
  createCanvas(windowWidth, windowHeight);
  gridInit();
}

function draw() {
  background(220);
  drawGrid();
}

function gridInit(){
  for(let i=0;i<gridHeight;++i){
    grid.push([]);
    for(let j=0;j<gridWidth;++j){
      grid[i].push(0);
    }
  }
}

function drawGrid(){
  for(let i=0;i<gridHeight;++i){
    for(let j=0;j<gridWidth;++j){
      rect(i*width/gridWidth, j*height/gridHeight, width/gridWidth, height/gridHeight);
    }
  }

}