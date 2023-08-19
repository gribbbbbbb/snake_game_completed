class Game {
  #recordElement;
  #scoreElement;
  #restartButton;

  constructor(board, restartButton, scoreElement, recordElement) {
    this.board = board;
    this.#scoreElement = scoreElement;
    this.#recordElement = recordElement;
    this.#restartButton = restartButton;
    this.currentScore = 0;
  }

  createRestartButton() {
    this.#restartButton.style.display = "block";

    this.#restartButton.addEventListener("click", () => {
      this.#restartGame();
    });
  }

  updateScore(score) {
    this.currentScore = score;
    this.#scoreElement.textContent = `SCORE:${score}`;
  }

  updateRecord() {
    const record = localStorage.getItem("record");
    if (record === null || this.currentScore > parseInt(record)) {
        localStorage.setItem("record", this.currentScore);
        this.#recordElement.textContent = "RECORD:" + this.currentScore;
    }
  }

  #restartGame() {
    this.board.cells.forEach((row) => {
      row.forEach((cell) => {
        cell.classList.remove("snake");
        cell.classList.remove("apple");
      });
    });

    this.snakeCoords = [
      { x: 5, y: 4 },
      { x: 4, y: 4 },
    ];

    this.snake.snakeCoords = this.snakeCoords;
    this.apple.renderApple();
    this.snake.renderSnake();

    this.#restartButton.style.display = "none";

    this.snake.gameEnded = false;
    this.gameStarted = true;
    this.currentScore = 0;
    this.#scoreElement.textContent = "SCORE:0";

    this.snake.direction = "right";
    this.snake.moveInterval = 500;
  }

  get scoreElement() {
    return this.#scoreElement;
  }

  get recordElement() {
    return this.#recordElement;
  }

  get restartButton() {
    return this.#restartButton;
  }
}

export { Game };
