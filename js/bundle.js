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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(1);
const Board = __webpack_require__(2);
const SnakeView = __webpack_require__(3);

$( () => {
  
  const rootEl = $("body");

  new SnakeView(rootEl);
  
});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

class Snake {
  constructor(direction, segments) {
    this.direction = direction; // ["N", "E", "S", "W"]
    this.segments = segments; // grid coordinates
    this.head = this.segments[0];
    
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
    // debugger
    this.segments.pop();
    this.head = this.segments[0];
  }
  
  turn(direction) {
    if (direction === null) {
      return false;
    }
    
    this.direction = direction;
  }
  
  eat() {
    this.segments.concat([null, null, null]);
  }

}


module.exports = Snake;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(1);

class Board {
  constructor() {
    this.snake = new Snake("N", [[4,5],[5,5],[6,5],[7,5],[8,5]]);
    this.makeGrid();
  }
  
  makeGrid() {
    const grid = [];

    for (let i = 0; i < 10; i++) {
      grid.push([]);
      for (let j = 0; j < 10; j++) {
        grid[i].push(null);
      }
    }

    return grid;
  }
  
  
  isLost() {
    // debugger
    if (this.snake.head[0] > 9 || this.snake.head[0] < 0 || this.snake.head[1] > 9 || this.snake.head[1] < 0) {
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
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(1);
const Board = __webpack_require__(2);

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

/***/ })
/******/ ]);