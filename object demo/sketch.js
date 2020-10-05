// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let walkers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i=0;i<width;++i)
    walkers.push(new Walker(i,i,"red"));
}

function draw() {
  for(let i=0;i<walkers.length;++i){
    walkers[i].move();
    walkers[i].display();
  }
}

class Walker{
  constructor(x,y,color){
    this.x = x;
    this.y = y;
    this.color = color;
  }

  move(){
    let choice = random(100);
    if(choice <= 25)
      this.x--;
    else if(choice <= 50)
      this.x++;
    else if(choice <= 75)
      this.y--;
    else
      this.y++;
  }

  display(){
    noStroke();
    fill(this.color);
    circle(this.x,this.y,5);
  }
}