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
      if (this.gameOver || this.currentPlayer !== 'X') return;
    
      let row = floor(y / (height / 3));
      let col = floor(x / (width / 3));
    
      if (this.board.makeMove(row, col, this.currentPlayer)) {
        if (this.board.checkWinner()) {
          this.gameOver = true;
          this.winner = this.currentPlayer;
          return;
        } else if (this.board.isFull()) {
          this.gameOver = true;
          this.winner = null;
          return;
        }
    
        this.currentPlayer = 'O';
        this.aiMove(); // Let the AI play
      }
    }
    
    aiMove() {
      // First, check if AI can block the player
      let move = this.board.findBlockingMove('X');
      if (!move) {
        // Else pick the first available cell (very basic fallback)
        move = this.board.findFirstEmpty();
      }
    
      if (move) {
        this.board.makeMove(move.row, move.col, 'O');
    
        if (this.board.checkWinner()) {
          this.gameOver = true;
          this.winner = 'O';
        } else if (this.board.isFull()) {
          this.gameOver = true;
          this.winner = null;
        } else {
          this.currentPlayer = 'X';
        }
      }
    }
    
  }
  