// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let sudoku = [[5,3,0,0,7,0,0,0,0],
              [5,3,0,0,7,0,0,0,0],
              [5,3,0,0,7,0,0,0,0],
              [5,3,0,0,7,0,0,4,0],
              [5,3,0,0,7,0,0,0,0],
              [5,3,9,0,7,0,1,0,0],
              [5,3,0,0,7,0,0,0,0],
              [5,3,0,0,8,0,0,6,0],
              [5,3,0,0,7,0,0,0,0],
            ];

            
let sudokuInit = [[5,3,0,0,7,0,0,0,0],
[5,3,0,0,7,0,0,0,0],
[5,3,0,0,7,0,0,0,0],
[5,3,0,0,7,0,0,4,0],
[5,3,0,0,7,0,0,0,0],
[5,3,9,0,7,0,1,0,0],
[5,3,0,0,7,0,0,0,0],
[5,3,0,0,8,0,0,6,0],
[5,3,0,0,7,0,0,0,0],
];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  textAlign(CENTER, CENTER);
  textSize(16);
  for(let i=0;i<sudoku.length;++i){
    for(let j=0;j<sudoku[0].length;++j){
      strokeWeight(1);
      rect(j*width/9, i*height/9, width/9, height/9);
      if(sudoku[i][j] !== 0)
        text(sudoku[i][j],(j+0.5)*width/9,(i+0.5)*height/9);
    }
  }
  strokeWeight(5);
  line(width/3,0,width/3,height);
  line(width/3*2,0,width/3*2,height);
  line(0,height/3,width,height/3);
  line(0,height/3*2,width,height/3*2);
}


function mousePressed(){
  let x = floor(mouseX / width * 9), y = floor(mouseY / height * 9);
  if(sudokuInit[y][x] === 0)
    sudoku[y][x] = (1+sudoku[y][x]) % 10;
}
