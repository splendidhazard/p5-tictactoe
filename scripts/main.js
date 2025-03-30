let game;
let cnv; // canvas reference

function setup() {
  const canvasSize = 400;
  cnv = createCanvas(canvasSize, canvasSize);

  centerCanvas();

  game = new Game();

  const btn = document.getElementById('btn-restart');
  btn.addEventListener('click', () => {
    const statusText = document.getElementById('game-status');
    statusText.innerHTML = "";
    game = new Game();
    loop(); // Resume drawing
  });
}

function draw() {
  background(255);
  game.display();

  if (game.gameOver) {
    noLoop(); // Stop drawing when game is over
  }
}

function mousePressed() {
  game.handleClick(mouseX, mouseY);
}

function windowResized() {
  centerCanvas(); // Recenter canvas if window is resized
}

function centerCanvas() {
  const x = (windowWidth - width) / 2;
  const y = (windowHeight - height) / 2;
  cnv.position(x, y);
}
