const Snake = require("./snake.js");
const Board = require("./board.js");

class View {
  constructor($el) {
    this.board = new Board();
    for (let i = 0; i < 100; i++) {
      $el.append("<li>");
    }
    $("li").each((idx) => {
      $($("li")[idx]).data("pos", [Math.floor(idx/10), idx%10]);
    });
    
    this.bindEvents($el);
    
    this.step();
  }
  
  bindEvents($el) {
    $el.on("keypress", (event) => {
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
      this.renderBoard();
      if (this.board.isLost()) {
        alert("You Lose!");
        clearInterval(id);
        
      }
    }, 200);
  }
  
  renderBoard() {
    $("li").each((idx) => {
      const pos = $($("li")[idx]).data("pos");
      
      if (this.isArrayInArray(this.board.snake.segments, pos)) {
        $($("li")[idx]).addClass("segment");
      } else {
        $($("li")[idx]).removeClass();
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
}



module.exports = View;