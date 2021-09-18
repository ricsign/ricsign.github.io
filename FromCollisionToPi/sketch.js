// From Collision To Pi
// Richard Shuai
// Oct 2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// time step must be correctly configured for estimating more digits of pi
let screenWidth = 1200, screenHeight = 800, groundLevel = 650, counter, blockArr, timeSteps = 1000;

class Block{
  constructor(x, vx, mass){
    this.x = x; // x coordinate of left side of the square 
    this.vx = vx; // left negative right positive
    this.mass = mass;
    this.width = 60*Math.log10(mass+3)+5;
  }

  show(){
    rect(this.x,groundLevel-this.width,this.width,this.width);
  }

  update(){
    this.x += this.vx/timeSteps; 
  }

  bounceWall(){
    if(this.x < 0){
      this.vx = 0-this.vx;
      counter++;
    }
  }

  isCollided(anotherBlock){
    return !(this.x + this.width < anotherBlock.x || this.x > anotherBlock.x+anotherBlock.width);
  }

  // give another block's information
  // this function will update the new velocity
  getNewVx(anotherBlock){
    const massSum = this.mass+anotherBlock.mass;
    const massDiff = this.mass-anotherBlock.mass;
    return massDiff / massSum * this.vx + 2 * anotherBlock.mass / massSum * anotherBlock.vx;
  }
}


function simulate(){
  for(let i=0;i<blockArr.length;++i){
    blockArr[i].update();
    blockArr[i].bounceWall();
    for(let j=i+1;j<blockArr.length;++j){
      if(blockArr[i].isCollided(blockArr[j])){
        counter++;
        const iNewVx = blockArr[i].getNewVx(blockArr[j]);
        const jNewVx = blockArr[j].getNewVx(blockArr[i]);
        blockArr[i].vx = iNewVx;
        blockArr[j].vx = jNewVx;
      }
    }
    blockArr[i].show();
  }

  
}

function setup() {
  // frameRate(10);
  createCanvas(screenHeight,screenWidth);
  counter = 0;
  blockArr = [new Block(100,0,0.1), new Block(300,-3,10000000)];
}

function draw() {
  background(255);
  noStroke();
  fill(0);
  text(""+counter, 0, 0,10);
  rect(0,groundLevel,screenWidth,screenHeight-groundLevel);
  for(let i=0;i<timeSteps;++i) simulate();
}
