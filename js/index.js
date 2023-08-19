import { Board } from './Board.js';
import { Snake } from './Snake.js';
import { Apple } from './Apple.js';
import { Game } from './Game.js';

document.addEventListener("DOMContentLoaded", () => {
    const boardElement = document.querySelector(".board");
    const restartButton = document.querySelector(".button_restart");
    const scoreElement = document.querySelector(".score");
    const recordElement = document.querySelector(".record");

    const width = 10;
    const height = 10;

    const board = new Board(width, height, boardElement);
    const game = new Game(board, restartButton, scoreElement, recordElement);
    const snake = new Snake(board, game);
    const apple = new Apple(snake, board);

    game.apple = apple;
    game.snake = snake;

    const record = localStorage.getItem("record");
    if (record !== null) {
        document.querySelector(".record").textContent = "RECORD:" + record
    }
});