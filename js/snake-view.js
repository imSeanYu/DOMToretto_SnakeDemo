const Snake = require("./snake.js");
const Board = require("./board.js");

class View {
  constructor($lel) {
    this.board = new Board();
    for (let i = 0; i < 400; i++) {
      $lel.append("<li>");
    }

    $l("li").each((el,idx) => {
      el.setAttribute("data-pos", [Math.floor(idx/20), idx%20]);
    });

    this.bindEvents($lel);

    this.step();
  }

  bindEvents($lel) {
    $lel.on("keypress", (event) => {
      let direction = null;
      // debugger
      if (event.keyCode === 97) {
        direction = "W";
      } else if (event.keyCode === 119) {
        direction = "N";
      } else if (event.keyCode === 100) {
        direction = "E";
      } else if (event.keyCode === 115) {
        direction = "S";
      }

      this.board.snake.turn(direction);
    });
  }

  step() {
    const id = setInterval( () => {
      this.board.snake.move();
      this.board.generateApple();
      this.renderBoard();

      if (this.board.snake.head === this.board.apple) {
        this.board.snake.eat();
        this.board.apple = null;
      }
      if (this.board.isLost()) {
        alert("You Lose!");
        clearInterval(id);
      }
    }, 200);
  }

  renderBoard() {
    $l("li").each(($lidx) => {
      const pos = this.posToInt($lidx.getAttribute("data-pos"));

      if (this.isArrayInArray(this.board.snake.segments, pos)) {
        $l($lidx).addClass("segment");
      } else {
        $l($lidx).removeClass("segment");
      }

      if (this.board.apple && this.isArrayInArray([this.board.apple], pos)) {
        $l($lidx).addClass("apple");
      }
    });

  }

  isArrayInArray(arr, item) {
    var item_as_string = JSON.stringify(item);

    var contains = arr.some(function(ele){
      return JSON.stringify(ele) === item_as_string;
    });
    return contains;
  }

  posToInt(pos) {
    var posSplitArr = pos.split(',');
    return [parseInt(posSplitArr[0]),parseInt(posSplitArr[1])];
  }
}



module.exports = View;
