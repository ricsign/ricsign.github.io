// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid = [], gridWidth, gridHeight;
function setup() {
  createCanvas(windowWidth, windowHeight);
  gridWidth = gridHeight = 5;
  initGrid();
}

function draw() {
  drawGrid();
}

// initGrid function sets up the grid, and randomize the first 2S
function initGrid(){
  // twox and twoy represents the first 2's x and y position respectively
  let twox = Math.floor(random() * gridWidth), twoy = Math.floor(random() * gridHeight);
  for(let i=0;i<gridWidth;++i){
    grid.push([]);
    for(let j=0;j<gridHeight;++j){
      let cell = {
        value: twox === i && twoy === j? 2:0,
      };
      grid[i].push(cell);
    }
  }
}

function drawGrid(){
  // start at top and left 10%, end at top 90% and left 60%, stepx is x's step length, stepy is y's step length
  let startx = width/10, starty = height/10, endx = width/5*3, endy = height/10*9;
  let stepx = (endx-startx)/gridWidth, stepy = (endy-starty)/gridHeight;
  textSize(16);
  textAlign(CENTER,CENTER);
  for(let i=0;i<gridWidth;++i){
    for(let j=0;j<gridHeight;++j){
      rect(startx+i*stepx,starty+j*stepy,stepx,stepy);
      // show value if and only if the grid's value > 0
      if(grid[i][j].value > 0){
        text(grid[i][j].value, startx+(i+0.5)*stepx, starty+(j+0.5)*stepy);
      }
    }
  }
}
