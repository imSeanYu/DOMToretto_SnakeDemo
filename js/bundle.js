/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class Snake {
  constructor(direction, segments) {
    this.direction = direction; // ["N", "E", "S", "W"]
    this.segments = segments; // grid coordinates
    this.head = this.segments[0];
    this.appleCounter = 0;
  }

  move() {
    const head = this.segments[0];
    // debugger
    if (this.direction === "N") {
      this.segments.unshift([head[0] - 1, head[1]]);
    } else if (this.direction === "S") {
      this.segments.unshift([head[0] + 1, head[1]]);
    } else if (this.direction === "W") {
      this.segments.unshift([head[0], head[1] - 1]);
    } else {
      this.segments.unshift([head[0], head[1] + 1]);
    }
    if (this.appleCounter > 0) {
      this.appleCounter--;
    } else {
      this.segments.pop();
    }
    this.head = this.segments[0];
  }

  turn(direction) {
    if (direction === null) {
      return false;
    }

    this.direction = direction;
  }

  eat() {
    this.appleCounter+=3
  }

}


module.exports = Snake;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(0);

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(0);
const Board = __webpack_require__(1);
const SnakeView = __webpack_require__(3);

$l(() => {

  const rootEl = $l("body");
  const snakeEl = $l("section");

  const newGame = new SnakeView(rootEl, snakeEl);
  $("#play-button").click(function() {
    document.getElementById('instruction-popup').classList.add("hidden");
    newGame.step();
  })
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(0);
const Board = __webpack_require__(1);

class View {
  constructor($lbody, $lel) {
    this.board = new Board();
    for (let i = 0; i < 400; i++) {
      $lel.append("<li>");
    }

    $l("li").each((el,idx) => {
      el.setAttribute("data-pos", [Math.floor(idx/20), idx%20]);
    });

    this.bindEvents($lbody);

    // this.step();
  }


  bindEvents($lel) {
    $lel.on("keypress", (event) => {
      let direction = null;

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

      if (this.board.snake.head[0] === this.board.apple[0] && this.board.snake.head[1] === this.board.apple[1]) {
        this.board.snake.eat();
        this.board.apple = null;
      }
      if (this.board.isLost()) {
        alert("You Lose!");
        clearInterval(id);
        document.getElementById('instruction-popup').classList.remove("hidden");
        this.board = new Board();
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
      } else {
        $l($lidx).removeClass("apple");
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


/***/ })
/******/ ]);