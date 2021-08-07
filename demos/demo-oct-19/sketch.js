// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let nums = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  showclicks();
  if(getItem("nums") < nums)
    storeItem("nums",nums);
  highest();
}

function showclicks(){
  fill("black");
  textSize(800);
  textAlign(CENTER, CENTER);
  text(nums, width/2,height/2);
}


function mousePressed(){
  nums++;
}


function highest(){
  fill('red');
  textSize(60);
  textAlign(CENTER, CENTER);
  text(getItem("nums"),width/2, 100);

}