class LightsOut {
  constructor(container, size) {
    this.container = container;
    this.size = size;
    this.grid = [];
    this.target = 0;
    this.moves = 0;
    this.timer = null;
    this.time = 0;
    this.playerName = ''; // Store the player's name
    this.init();
  }

  init() {
    this.container.innerHTML = '';
    this.grid = Array.from({ length: this.size }, () =>
      Array.from({ length: this.size }, () => Math.random() < 0.5)
    );
    this.renderGrid();
    this.target = this.calculateTarget();
    this.moves = 0;
    this.time = 0;
    this.updateUI();
    this.startTimer();
    this.askPlayerName();
  }

  askPlayerName() {
    if (!this.playerName) {
      this.playerName = window.prompt('Enter your name to start the game:', 'Player');
      if (!this.playerName) {
        this.playerName = 'Player'; // Default name if no input
      }
    }
    document.getElementById('playerName').textContent = this.playerName;
  }

  renderGrid() {
    this.container.style.gridTemplateRows = `repeat(${this.size}, 1fr)`;
    this.container.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`;

    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        const cell = document.createElement('div');
        cell.className = this.grid[r][c] ? 'flip' : '';
        cell.dataset.row = r;
        cell.dataset.col = c;
        cell.addEventListener('click', () => this.handleClick(r, c));
        this.container.appendChild(cell);
      }
    }
  }

  handleClick(row, col) {
    this.toggle(row, col);
    this.toggle(row - 1, col);
    this.toggle(row + 1, col);
    this.toggle(row, col - 1);
    this.toggle(row, col + 1);
    this.moves++;
    this.updateUI();
    if (this.checkWin()) {
      clearInterval(this.timer);
      alert(`Congratulations, ${this.playerName}! You win!`);
    }
  }

  toggle(row, col) {
    if (row >= 0 && row < this.size && col >= 0 && col < this.size) {
      this.grid[row][col] = !this.grid[row][col];
      const cell = this.container.querySelector(`[data-row="${row}"][data-col="${col}"]`);
      cell.classList.toggle('flip');
    }
  }

  checkWin() {
    return this.grid.every(row => row.every(cell => !cell));
  }

  calculateTarget() {
    return this.grid.flat().filter(Boolean).length;
  }

  updateUI() {
    document.getElementById('target').textContent = this.target;
    document.getElementById('moves').textContent = this.moves;
    document.getElementById('time').textContent = this.formatTime(this.time);
  }

  startTimer() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.time++;
      this.updateUI();
    }, 1000);
  }

  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');
  
  if (!container) {
    console.error('Game container not found.');
    return;
  }

  const game = new LightsOut(container, 5);

  const newGameButton = document.getElementById('newGame');
  
  if (!newGameButton) {
    console.error('New Game button not found.');
    return;
  }

  // Debugging: Log game and button instances
  console.log('Game instance:', game);
  console.log('New Game button:', newGameButton);

  newGameButton.addEventListener('click', () => {
    console.log('New Game button clicked');
    game.init(); // Reinitialize the game
  });

  const lastModifiedElement = document.getElementById('lastModified');
  
  if (lastModifiedElement) {
    const lastModified = new Date(document.lastModified);
    lastModifiedElement.textContent = lastModified.toLocaleString();
  } else {
    console.warn('Last modified element not found.');
  }
});


