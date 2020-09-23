// Traffic Light
// Richard 
// Sept 23rd

// state variables
let is_red = true, is_yellow = false, is_green = false;
let red_duration = 5000, yellow_duration = 1000, green_duration = 5000;
let total_duration = red_duration+yellow_duration+green_duration;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  draw_light();
}

function draw_light(){
  // box
  rectMode(CENTER);
  fill("black");
  rect(width/2, height/2, 75, 200, 10);


  // lights
  is_yellow? fill("yellow"):fill("white");
  circle(width/2,height/2,50); // middle

  is_red? fill("red"):fill("white");
  circle(width/2,height/2-65,50); // top

  is_green? fill("green"): fill("white");
  circle(width/2,height/2+65,50); // down

  // switch light function
  switch_light();
}

function switch_light(){
  if(millis() % total_duration < red_duration){
    is_green = true;
    is_yellow = is_red = false;
  }
  else if(millis() % total_duration < red_duration + yellow_duration){
    is_yellow = true;
    is_red = is_green = false;
  }
  else{
    is_red = true;
    is_yellow = is_green = false;
  }
}