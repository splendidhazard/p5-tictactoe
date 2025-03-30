class Game {
    constructor() {
      this.board = new Board(); // From board.js
      this.currentPlayer = 'X';
      this.gameOver = false;
      this.winner = null;
    }
  
    display() {
      this.board.display();
  
      if (this.gameOver) {
        const statusText = document.getElementById('game-status');

        if (this.winner) {
          statusText.innerHTML = `${this.winner} Win`;
        } else {
          statusText.innerHTML = "It's a tie";
        }
      }
    }
  
    handleClick(x, y) {
      if (this.gameOver) return;
  
      let row = floor(y / (height / 3));
      let col = floor(x / (width / 3));
  
      if (this.board.makeMove(row, col, this.currentPlayer)) {
        if (this.board.checkWinner()) {
          this.gameOver = true;
          this.winner = this.currentPlayer;
        } else if (this.board.isFull()) {
          this.gameOver = true;
          this.winner = null;
        } else {
          this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        }
      }
    }
  }
  