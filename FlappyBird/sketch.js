// Flappy Bird
// Richard Shuai
// 2021 Aug


let screenX, screenY, gameStatus, bird, pipes, score, nextPipeUpdate;

class Bird{
  x = screenX/8;
  y = screenY/2;
  r = 20;
  dy = 0;
  gravity = 0.5;
  lift = 12.5;

  display(){    
    circle(this.x,this.y,this.r*2);
  }

  update(){
    this.dy += this.gravity;
    this.dy *= 0.9; // limit maximum speed
    this.y += this.dy;

    if(this.y > screenY-this.r){
      this.y = screenY-this.r;
      this.dy = 0;
    }
    if(this.y < this.r){
      this.y = this.r;
      this.dy = 0;
    }
  }
 
  up(){
    this.dy -= this.lift;  
  }
}
   
class Pipe{
  dx = -2;
  upperHeight = random(20,screenY/2+10);
  gap = random(120,320);    
  width = 40;
  x = screenX;
  scoreCounted = false; // haven't counted for score yet
   
  display(){
    if(this.x <= screenX){
      rect(this.x,0,this.width,this.upperHeight);
      rect(this.x,this.upperHeight+this.gap,this.width,screenY-this.gap-this.upperHeight);
    }
    
  }

  update(){
    this.x += this.dx;
  }
}



function playControl(){
  if(gameStatus === "ready"){
    textSize(30);
    text("Press space to start", 140, screenY/2); 
  }
  else if(gameStatus === "playing"){
    playGame();
  } else{
    textSize(30);
    text("Your score is "+score+", press space to restart", 30, screenY/2);
  }
}

function playGame(){
  bird.display();
  bird.update();   
  pipesUpdate();
  displayScore();
  checkCollision();
}

function pipesUpdate(){
  for(let i=pipes.length-1;i>=0;--i){
    pipes[i].display();
    pipes[i].update();
    if(pipes[i].x < -pipes[i].width){ 
      pipes.splice(i,1);
    } 
  } 

  if(millis() > nextPipeUpdate){
    pipes.push(new Pipe());
    nextPipeUpdate = millis() + random(1500,3000);
  }
}

function displayScore(){
  textSize(30);
  text(score,screenX-60,60);
}
  
function checkCollision(){
  for(let i=0;i<pipes.length;++i){
    if(bird.x+bird.r > pipes[i].x && bird.x-bird.r < pipes[i].x+pipes[i].width){
      if(bird.y-bird.r < pipes[i].upperHeight || bird.y+bird.r > pipes[i].upperHeight+pipes[i].gap){
        gameStatus = "over";
      }
      else{
        if(!pipes[i].scoreCounted){
          score++;
          pipes[i].scoreCounted = true;
        }
      }
    }
  }
}



function keyPressed(){
  if(gameStatus === "ready"){
    if(key === ' '){
      gameStatus = "playing";
    }
  }
  else if(gameStatus === "playing"){
    if(key === ' '){ 
      bird.up();
    }
  } else if(gameStatus === "over"){
    if(key === ' '){
      setup();
    }
  }
}

function setup() {
  screenX = 600;
  screenY = 800;
  gameStatus = "ready";   
  score = 0;
  bird = new Bird();
  pipes = []; 
  nextPipeUpdate = 0;
  createCanvas(screenX,screenY);
}

function draw() {
  background(0);
  fill(255);
  playControl();
}


