const Snake = require("./snake.js");

class Board {
  constructor() {
    this.snake = new Snake("N", [[14,10],[15,10],[16,10],[17,10],[18,10]]);
    this.makeGrid();
    this.apple = null;
  }

  makeGrid() {
    const grid = [];

    for (let i = 0; i < 20; i++) {
      grid.push([]);
      for (let j = 0; j < 20; j++) {
        grid[i].push(null);
      }
    }

    return grid;
  }

  generateApple() {
    var randomPos = this.generateRandomPosition();
    while (this.isArrayInArray(this.snake.segments, randomPos)) {
      randomPos = this.generateRandomPosition();
    }

    if (this.apple === null) {
      this.apple = randomPos;
    }
    // console.log(this.apple);
  }

  generateRandomPosition() {
    var randomX = Math.floor(Math.random()*20);
    var randomY = Math.floor(Math.random()*20);
    return [randomX, randomY];
  }


  isLost() {
    if (this.snake.head[0] > 19 || this.snake.head[0] < 0 || this.snake.head[1] > 19 || this.snake.head[1] < 0) {
      return true;
    } else if (this.isArrayInArray(this.snake.segments.slice(1), this.snake.head)) {
      return true;
    } else {
      return false;
    }
  }

  isArrayInArray(arr, item) {
    var item_as_string = JSON.stringify(item);

    var contains = arr.some(function(ele){
      return JSON.stringify(ele) === item_as_string;
    });
    return contains;
  }
}


module.exports = Board;
