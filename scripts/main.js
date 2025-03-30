let game;

function setup() {
  createCanvas(400, 400); // Square canvas
  game = new Game(); // Game class defined in game.js
}

function draw() {
  background(255);
  game.display(); // Display the board and current state
}

function mousePressed() {
  game.handleClick(mouseX, mouseY); // Handle player's move
}
