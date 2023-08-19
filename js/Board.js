class Board {
  constructor(width, height, boardElement) {
    this.width = width;
    this.height = height;
    this.cells = [];
    this.boardElement = boardElement;
    this.#boardRender();
  }

  #boardRender() {
    for (let i = 0; i < this.height; i++) {
      const row = document.createElement("div");
      row.classList.add("row");
      this.boardElement.appendChild(row);
      this.cells.push([]);
      for (let j = 0; j < this.width; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-xy", String(i) + j);
        row.appendChild(cell);
        this.cells[i][j] = cell;
      }
    }
  }

  getCell(x, y) {
    return this.cells[y][x];
  }
}

export { Board };
