class Snake {
  #canChangeDirection = true;
  #newHead = { x: 0, y: 0 };

  constructor(board, game, apple) {
    this.board = board;
    this.apple = apple;
    this.game = game;
    this.direction = "right";
    this.snakeCoords = [
      { x: 5, y: 4 },
      { x: 4, y: 4 },
    ];
    this.gameStarted = false;
    this.gameEnded = false;
    this.moveInterval = 500;
    this.renderSnake();
    this.#startMoving();
    document.addEventListener("keydown", (event) => {
      this.#snakeDirection(event);
    });
  }

  #startMoving() {
    this.board.boardElement.addEventListener("click", () => {
      if (!this.gameStarted) {
        this.gameStarted = true;
        this.board.boardElement.classList.remove("game_not_started");
        this.game.apple.renderApple();
        this.moveInterval = 500;
        this.#moveSnake();
      }
    });
  }

  renderSnake() {
    this.snakeCoords.forEach((coord) => {
      const cell = this.board.getCell(coord.x, coord.y);
      cell.classList.add("snake");
    });
  }

  #moveSnake() {
    this.#newHead = { ...this.snakeCoords[0] };

    if (this.direction === "up") {
      this.#newHead.y =
        (this.#newHead.y - 1 + this.board.height) % this.board.height;
    } else if (this.direction === "right") {
      this.#newHead.x = (this.#newHead.x + 1) % this.board.width;
    } else if (this.direction === "down") {
      this.#newHead.y = (this.#newHead.y + 1) % this.board.height;
    } else if (this.direction === "left") {
      this.#newHead.x =
        (this.#newHead.x - 1 + this.board.width) % this.board.width;
    }

    const newHeadCell = this.board.getCell(this.#newHead.x, this.#newHead.y);

    this.#canChangeDirection = true;

    this.#checkCell(newHeadCell);

    this.renderSnake();
    setTimeout(this.#moveSnake.bind(this), this.moveInterval);
  }

  #checkCell(newHeadCell) {
    if (newHeadCell.classList.contains("snake")) {
      if (!this.gameEnded) {
        this.gameEnded = true;
        this.game.createRestartButton();
        this.game.updateRecord();
      }
      return;
    }
    if (newHeadCell.classList.contains("apple")) {
      this.snakeCoords.unshift(this.#newHead);
      newHeadCell.classList.add("snake");
      newHeadCell.classList.remove("apple");
      this.game.updateScore(++this.game.currentScore);
      this.game.apple.renderApple();
      this.moveInterval -= 10;
    } else {
      this.snakeCoords.unshift(this.#newHead);
      newHeadCell.classList.add("snake");
      const tail = this.snakeCoords.pop();
      const tailCell = this.board.getCell(tail.x, tail.y);
      tailCell.classList.remove("snake");
    }
  }

  #snakeDirection(event) {
    if (this.gameStarted && !this.gameEnded && this.#canChangeDirection) {
      this.#canChangeDirection = false;
      if (event.key == "ArrowUp" && this.direction !== "down") {
        this.direction = "up";
      } else if (event.key == "ArrowRight" && this.direction !== "left") {
        this.direction = "right";
      } else if (event.key == "ArrowDown" && this.direction !== "up") {
        this.direction = "down";
      } else if (event.key == "ArrowLeft" && this.direction !== "right") {
        this.direction = "left";
      }
    }
  }

  get canChangeDirection() {
    return this.#canChangeDirection;
  }

  get newHead() {
    return this.#newHead;
  }
}

export { Snake };
