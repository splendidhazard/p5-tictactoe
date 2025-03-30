class Game {
  constructor() {
    this.board = new Board();
    this.currentPlayer = random(['X', 'O']); // Random start
    this.gameOver = false;
    this.winner = null;

    this.playerSymbol = 'X';
    this.computerSymbol = 'O';

    const statusText = document.getElementById('game-status');

    if (this.currentPlayer === this.computerSymbol) {
      statusText.innerHTML = `Computer goes first`;
      setTimeout(() => this.aiMove(), 500); // Slight delay for realism
    } else {
      statusText.innerHTML = `You go first`;
    }
  }

  display() {
    this.board.display();

    const statusText = document.getElementById('game-status');

    if (this.gameOver) {
      if (this.winner) {
        statusText.innerHTML = this.winner === this.playerSymbol ? `You win! 🎉` : `Computer wins! 🤖`;
      } else {
        statusText.innerHTML = "It's a tie!";
      }
    } else {
      if (this.currentPlayer === this.playerSymbol) {
        statusText.innerHTML = "Your Turn";
      } else {
        statusText.innerHTML = "Computer's Turn";
      }
    }
  }

  handleClick(x, y) {
    if (this.gameOver || this.currentPlayer !== this.playerSymbol) return;

    let row = floor(y / (height / 3));
    let col = floor(x / (width / 3));

    if (this.board.makeMove(row, col, this.playerSymbol)) {
      if (this.board.checkWinner()) {
        this.gameOver = true;
        this.winner = this.playerSymbol;
        return;
      } else if (this.board.isFull()) {
        this.gameOver = true;
        this.winner = null;
        return;
      }

      this.currentPlayer = this.computerSymbol;
      setTimeout(() => this.aiMove(), 500); // Delay for better UX
    }
  }

  aiMove() {
    if (this.gameOver) return;

    let move = null;

    // 1. Try to win
    move = this.board.findWinningMove(this.computerSymbol);
    // 2. Try to block
    if (!move) move = this.board.findWinningMove(this.playerSymbol);
    // 3. Take center
    if (!move && this.board.isEmpty(1, 1)) move = { row: 1, col: 1 };
    // 4. Random
    if (!move) move = this.board.findRandomEmpty();

    if (move) {
      this.board.makeMove(move.row, move.col, this.computerSymbol);

      if (this.board.checkWinner()) {
        this.gameOver = true;
        this.winner = this.computerSymbol;
      } else if (this.board.isFull()) {
        this.gameOver = true;
        this.winner = null;
      } else {
        this.currentPlayer = this.playerSymbol;
      }
    }
  }
}
