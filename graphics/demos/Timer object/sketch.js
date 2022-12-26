// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let time;
function setup() {
  createCanvas(windowWidth, windowHeight);
  time = new Timer(1500);
}
function draw() {
  if(time.isDone()){
    background(0);
    time.setDuration(5000);

  }
  else
    background(255);
}

class Timer{
  constructor(duration){
    this.beginTime = millis();
    this.duration = duration;
    this.endTime = this.beginTime + this.duration;
  }
  isDone(){
    return millis() > this.endTime;
  }
  reset(){
    this.beginTime = millis();
    this.endTime = this.beginTime + this.duration;
  }
  setDuration(duration){
    this.duration = duration();
    this.endTime = this.beginTime + this.duration;
  }
}
