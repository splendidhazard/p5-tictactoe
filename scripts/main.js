let game;

function setup() {
  createCanvas(400, 400); // Square canvas
  
  game = new Game(); // Game class defined in game.js

  const btn = document.getElementById('btn-restart');
  btn.addEventListener('click', () => {
    game = new Game(); // Create new game instance
    loop(); // Restart draw loop if needed
  });

}

function draw() {
  background(255);
  game.display(); // Display the board and current state

  if (game.gameOver) {
    noLoop();
    if (game.winner) {
      statusEl.textContent = `${game.winner} wins!`;
    } else {
      statusEl.textContent = `It's a tie!`;
    }
  }
}

function mousePressed() {
  game.handleClick(mouseX, mouseY); // Handle player's move
}
