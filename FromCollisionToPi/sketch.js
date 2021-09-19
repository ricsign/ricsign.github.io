// From Collision To Pi
// Richard Shuai
// Oct 2021
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// time step must be correctly configured for estimating more digits of pi
// energy saving lvl 1: complete visual simulation
// energy saving lvl 2: partial visual simulation
// energy saving lvl 3: no visual simulation
let screenWidth = 1200, screenHeight = 800, groundLevel = 650, timeSteps = 1000, energySavingLevel = 1, counter, blockArr, bg, blockImgs;

class Block{
  constructor(x, vx, mass){
    this.initialX = x;
    this.x = x; // x coordinate of left side of the square 
    this.vx = vx; // left negative right positive
    this.mass = mass;
    this.width = 60*Math.log10(mass+3)+5;
    this.blockImg = blockImgs[Math.floor(random(10))];
  }

  show(){
    if(energySavingLevel === 1){
      rect(this.x,groundLevel-this.width,this.width,this.width);
      image(this.blockImg, this.x,groundLevel-this.width,this.width,this.width);
    } else if(energySavingLevel === 2){
      rect(max(this.x,this.initialX*0.3),groundLevel-this.width,this.width,this.width);
      // image(blockImgs[Math.floor(random(10))], max(this.x,this.initialX*0.3),groundLevel-this.width,this.width,this.width);
    }
  }

  update(){
    if(this.x < 0){
      this.vx = 0-this.vx;
      counter++;
    }
    this.x += this.vx/timeSteps; 
  }

  isCollided(anotherBlock){
    return !(this.x + this.width < anotherBlock.x || this.x > anotherBlock.x+anotherBlock.width);
  }

  isVanished(){
    return this.x > screenWidth;
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
  for(let i=blockArr.length-1;i>=0;i--){
    for(let j=i-1;j>=0;--j){
      if(blockArr[i].isCollided(blockArr[j])){
        counter++;
        const iNewVx = blockArr[i].getNewVx(blockArr[j]);
        const jNewVx = blockArr[j].getNewVx(blockArr[i]);
        blockArr[i].vx = iNewVx;
        blockArr[j].vx = jNewVx;
      }
    }
    blockArr[i].update();
    blockArr[i].show();
    // if(blockArr[i].isVanished()){
    //   blockArr.splice(i,1);
    // }
  }
}

function preload(){
  bg = loadImage('../assets/bg.jpg');
  blockImgs = [];
  for(let i=1;i<=10;++i){
    blockImgs.push(loadImage('../assets/blockimg'+i+'.png'));
  }
}

function setup() {
  // frameRate(10);
  createCanvas(screenHeight,screenWidth);
  counter = 0;
  blockArr = [new Block(100,0,1), new Block(300,-2,100)];
}

function draw() {
  image(bg, 0, 0, screenWidth, groundLevel);
  noStroke();
  fill(0);
  text(""+counter, 0, 0,10);
  rect(0,groundLevel,screenWidth,screenHeight-groundLevel);
  fill(255);
  for(let i=0;i<timeSteps;++i) simulate();
}
