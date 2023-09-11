// Sorting Simulator (Visualization)
// Richard
// Nov 9th 2020

let numBars = 100;
let intervalMs = 1;
let lastMoveTimeMs = 0;
let bars = [];

class bar{
  constructor(val, color="white"){
    this.val = val;
    this.color = color;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  for(let i = 0; i < numBars; ++i){
    bars.push(new bar(1+Math.floor(i/2)));
  }
  bars = shuffling(bars);
}

function draw() {
  background(0);
  displayBar();
  bubbleSort();
  changeColor();
}

// display all the bars
function displayBar(){
  let maxBarVal = numBars / 2;
  let singleBarWidth = width / numBars;
  let singleUnitHeight = height / maxBarVal;
  for(let i=0;i<numBars;++i){
    fill(bars[i].color);
    rect(singleBarWidth * i, singleUnitHeight * (maxBarVal - bars[i].val), singleBarWidth, singleUnitHeight * bars[i].val);
  }
}


// bubble sort
function bubbleSort(){
  for(let i=0;i<numBars;++i){
    for(let j=i+1;j<numBars;++j){
      if(lastMoveTimeMs + intervalMs < millis()){
        if(bars[i].val > bars[j].val){
          lastMoveTimeMs = millis();
          [bars[i],bars[j]] = [bars[j],bars[i]];
        } 
      } 
    }
  }
}

// function that changes bars' color
function changeColor(){
  for(let i=0;i<numBars;++i){
    if(floor(i/2)+1 === bars[i].val){
      bars[i].color = "green";
    } else{
      bars[i].color = "white";
    }
  }
}

// shuffle an array
function shuffling(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}