// DO NOT JAYWALK!
// Richard Shuai
// 2021 Aug
// number of layers: 15 (0~14), user stay at layer 12
// 11 different position in a col (0~10), initial at 5

let screenX, screenY, rowHeight, gameStatus, score, roads, ballLocatedCol, numLayer, carTypetoColor;
class Road {
	// car type - -1:no car; 0: green car; 1: blue car; 2: orange car; 3: purple; 4: red car
	constructor(_layer, _carType) {
		this.layer = _layer;
		rowHeight = screenY / numLayer;
		// this.y = rowHeight*this.layer;
		this.carType = _carType;
		this.carSpeed = (this.carType * 0.6 + 0.9) * 1.2;
		this.carDir = random([-1, 1]);
		this.carX = random(0, screenX);
	}
	display() {
		if (this.carType === -1) {
			fill(3, 252, 44);
			rect(0, rowHeight * this.layer, screenX, rowHeight);
		} else {
			fill(0);
			rect(0, rowHeight * this.layer, screenX, rowHeight);
			// draw stripes
			fill(190, 190, 0);
			for (let i = 0; i < 4; ++i) {
				rect((screenY - 50 * 4) / 4 * i + 40, rowHeight * this.layer + (rowHeight - 8) / 2, 50, 8);
			}
			// draw cars, carWidth = rowHeight*2
			fill(carTypetoColor[this.carType]);
			rect(this.carX, rowHeight * this.layer, rowHeight * 2, rowHeight);
			fill(255);
			rect(this.carX + 15, rowHeight * this.layer + 15, rowHeight * 2 - 30, rowHeight - 30);
		}
	}
	updateCar() {
		this.carX += this.carSpeed * this.carDir;
		if (this.carX > screenX) {
			this.carX = 0 - rowHeight * 2;
		} else if (this.carX < 0 - rowHeight * 2) {
			this.carX = screenX;
		}
	}
}

function gameController() {
	if (gameStatus === "playing") {
		playGame();
	} else if (gameStatus === "over") {
		textSize(28);
		fill(255);
		text("Your score is " + score + ", press any keys to restart", 20, screenY / 2);
	}
}

function playGame() {
	for (let i = 0; i < roads.length; ++i) {
		roads[i].display();
		roads[i].updateCar();
	}
	checkGameOver();
	fill(255);
	circle(screenX / 11 * ballLocatedCol + 0.5 * rowHeight, 12.5 * rowHeight, rowHeight);
	displayScore();
}

function setupRoads() {
	for (let i = 0; i < 15; ++i) {
		if (i >= 12) {
			roads.push(new Road(i, -1));
		} else roads.push(new Road(i, random([-1, -1, -1, 0, 1, 2, 3, 4])));
	}
}

function moveForward() {
	roads.splice(roads.length - 1, 1);
	roads.splice(0, 0, new Road(0, random([-1, -1, -1, 0, 1, 2, 3, 4])));
	for (let i = 0; i < roads.length; ++i) {
		roads[i].layer = i;
	}
	++score;
}

function checkGameOver() {
	if (roads[12].carType !== -1) {
		let ballX = screenX / 11 * ballLocatedCol + 0.5 * rowHeight,
			ballY = 12.5 * rowHeight;
		if (ballX + rowHeight / 2 >= roads[12].carX && ballX - rowHeight / 2 <= roads[12].carX + 2 * rowHeight) {
			gameStatus = "over";
		}
	}
}

function displayScore() {
	textSize(50);
	text(score, screenX - 80, 50);
}

function keyPressed() {
	if (gameStatus === "playing") {
		if (keyCode === LEFT_ARROW || key === "a") {
			ballLocatedCol = max(0, ballLocatedCol - 1);
		}
		if (keyCode === RIGHT_ARROW || key === "d") {
			ballLocatedCol = min(10, ballLocatedCol + 1);
		}
		if (key === " " || keyCode === UP_ARROW || key === "w") {
			moveForward();
		}
	} else if (gameStatus === "over") {
		setup();
	}
}

function mouseClicked(){
	if(gameStatus === "playing") moveForward();
	else if(gameStatus === "over") setup();
}

function setup() {
	carTypetoColor = {
		0: color(91, 245, 83),
		1: color(97, 158, 237),
		2: color(240, 126, 50),
		3: color(102, 50, 168),
		4: color(240, 50, 50)
	};
	screenX = 600;
	screenY = 800;
	gameStatus = "playing";
	score = 0;
	ballLocatedCol = 5;
	numLayer = 15;
	roads = [];
	rowHeight = screenY / numLayer;
	createCanvas(screenX, screenY);
	setupRoads();
}

function draw() {
	noStroke();
	background(0);
	gameController();
}