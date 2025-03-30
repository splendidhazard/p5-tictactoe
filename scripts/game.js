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
        textSize(32);
        fill(0);
        textAlign(CENTER, CENTER);
        if (this.winner) {
          text(`${this.winner} wins!`, width / 2, height / 2);
        } else {
          text(`It's a tie!`, width / 2, height / 2);
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
  