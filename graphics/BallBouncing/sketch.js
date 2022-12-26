// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let balls = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  moveball();
  displayball();
}

function moveball(){
  for(let i=balls.length-1; i>=0; --i){
    balls[i].x += balls[i].dx;
    balls[i].y += balls[i].dy;

    if(balls[i].x + balls[i].radius > width || balls[i].x-balls[i].radius < 0){
      balls[i].dx *= -1;
      if(++balls[i].limit > 3) {balls.splice(i,1);continue;}
    } 

    if(balls[i].y + balls[i].radius > height || balls[i].y-balls[i].radius < 0){
      balls[i].dy *= -1;
      if(++balls[i].limit > 3) {balls.splice(i,1);continue;}
    }
  }
}

function displayball(){
  noStroke();
  for(let i=balls.length-1; i>=0; --i){
    fill(balls[i].color);
    circle(balls[i].x,balls[i].y,balls[i].radius*2);
  }
}

function spawnball(){
  let ball = {
    x: mouseX,
    y: mouseY,
    dx:random(-5, 5),
    dy:random(-5, 5),
    radius:random(10,50),
    color:color(random(255),random(255),random(255),random(255)),
    limit:0
  };
  balls.push(ball);
}

function mousePressed(){
  spawnball();
}