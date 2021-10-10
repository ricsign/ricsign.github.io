// From Collision To Pi
// Richard Shuai
// Oct 2021

// time step must be correctly configured for estimating more digits of pi
// energy saving lvl 1: complete visual simulation
// energy saving lvl 2: partial visual simulation
// energy saving lvl 3: no visual simulation
let screenWidth = 1200, screenHeight = 800, groundLevel = 650, timeSteps = 1000, energySavingLevel, counter, blockArr, bg, blockImgs, numBlocks;

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

  // update the velocity and update the counter
  update(){
    if(this.x < 0){
      this.vx = 0-this.vx;
      counter++;
    }
    this.x += this.vx/timeSteps; 
  }

  // check if the block is collide with another block
  isCollided(anotherBlock){
    return !(this.x + this.width < anotherBlock.x || this.x > anotherBlock.x+anotherBlock.width);
  }

  // check if the block is out of the screen width
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


function setupBlocks(){
  // energySavingLevel = parseInt(prompt("Enter the energy saving level (1,2,3), 1 being complete visual simulation, 2 being partial visual simulation, 3 being no visual simulation. It's recommended enter at least 2 for mass >= 10^4.5, 3 for mass >= 10^6"));
  numBlocks = parseInt(prompt("Enter the number of blocks, either 2, 3, or 4"));
  blockArr = [];

  // user input incorrrect number of blocks
  if(numBlocks < 2 || numBlocks > 4){
    blockArr = [new Block(100,0,1), new Block(500,-3,100)];
    return;
  }

  // adding blocks
  let accumulatedPos = 400/(numBlocks*numBlocks), maxMass = 0, minMass = Math.pow(10,20);

  for(let i=0;i<numBlocks;++i){
    let curBlockMass = parseFloat(prompt("Enter the mass of block "+(i+1)+", 1 <= mass <= 10^9, this value >= the previous value"));
    maxMass = Math.max(maxMass,curBlockMass);
    minMass = Math.min(minMass,curBlockMass);
    if(i === numBlocks-1){
      blockArr.push(new Block(accumulatedPos,-2,curBlockMass));
    } else{
      blockArr.push(new Block(accumulatedPos,0,curBlockMass));
    }
    accumulatedPos += 400/(numBlocks*numBlocks)+(60*Math.log10(curBlockMass+3)+5);
  }

  // setting energy saving level automatically
  if(maxMass/minMass > Math.pow(10,7)){
    energySavingLevel = 3;
  }  else if(maxMass/minMass > 80000 || numBlocks === 4){
    energySavingLevel = 2;
  } else energySavingLevel = 1;

  timeSteps = max(1000,maxMass/minMass) / 100;

}


function simulate(){
  // simulation process
  for(let i=blockArr.length-1;i>=0;i--){
    // j is the adjacent block to check if two blocks collide
    let j = Math.max(0,i-1);
    if(i !== j && blockArr[i].isCollided(blockArr[j])){
      counter++;
      const iNewVx = blockArr[i].getNewVx(blockArr[j]);
      const jNewVx = blockArr[j].getNewVx(blockArr[i]);
      blockArr[i].vx = iNewVx;
      blockArr[j].vx = jNewVx;
      isPoping = true;
    }
    blockArr[i].update();
    blockArr[i].show();
    // before mathematical proof, this is not definitive
    // if(blockArr[i].isVanished()){
    //   blockArr.splice(i,1);
    // }
  }
}


function preload(){
  // popSound = loadSound('../assets/pop.wav');
  bg = loadImage('assets/bg.jpg');
  blockImgs = [];
  for(let i=1;i<=10;++i){
    blockImgs.push(loadImage('assets/blockimg'+i+'.png'));
  }
}


function setup() {
  // frameRate(10);
  setupBlocks();
  createCanvas(screenHeight,screenWidth);
  counter = 0;
}


function draw() {
  image(bg, 0, 0, screenWidth, groundLevel);
  noStroke();
  fill(0);
  text(""+counter, 0, 0,10);
  rect(0,groundLevel,screenWidth,screenHeight-groundLevel);
  fill(255);
  // isPoping = false;
  for(let i=0;i<timeSteps;++i) simulate();
  // if(isPoping) popSound.play();
}
