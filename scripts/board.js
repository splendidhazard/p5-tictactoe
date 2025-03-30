class Board {
    constructor() {
      this.grid = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];
    }
  
    display() {
      let w = width / 3;
      let h = height / 3;
  
      strokeWeight(4);
  
      // Draw grid lines
      for (let i = 1; i < 3; i++) {
        line(0, i * h, width, i * h); // Horizontal
        line(i * w, 0, i * w, height); // Vertical
      }
  
      // Draw Xs and Os
      textSize(64);
      textAlign(CENTER, CENTER);
  
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          let x = c * w + w / 2;
          let y = r * h + h / 2;
          let spot = this.grid[r][c];
  
          if (spot === 'X') {
            fill(200, 0, 0);
            text('X', x, y);
          } else if (spot === 'O') {
            fill(0, 0, 200);
            text('O', x, y);
          }
        }
      }
    }
  
    makeMove(row, col, player) {
      if (this.grid[row][col] === '') {
        this.grid[row][col] = player;
        return true;
      }
      return false;
    }
  
    isFull() {
      for (let row of this.grid) {
        for (let cell of row) {
          if (cell === '') {
            return false;
          }
        }
      }
      return true;
    }
  
    checkWinner() {
      const lines = [
        // Rows
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // Columns
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // Diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]],
      ];
  
      for (let line of lines) {
        const [a, b, c] = line;
        const valA = this.grid[a[0]][a[1]];
        const valB = this.grid[b[0]][b[1]];
        const valC = this.grid[c[0]][c[1]];
  
        if (valA && valA === valB && valA === valC) {
          return true;
        }
      }
  
      return false;
    }

    findBlockingMove(playerSymbol) {
      // Try every empty cell and see if the player would win there
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (this.grid[r][c] === '') {
            this.grid[r][c] = playerSymbol;
            const wouldWin = this.checkWinner();
            this.grid[r][c] = ''; // Undo the move
            if (wouldWin) {
              return { row: r, col: c };
            }
          }
        }
      }
      return null;
    }
    
    findFirstEmpty() {
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (this.grid[r][c] === '') {
            return { row: r, col: c };
          }
        }
      }
      return null;
    }
    
  }
  