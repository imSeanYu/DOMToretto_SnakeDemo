const Snake = require("./snake.js");
const Board = require("./board.js");
const SnakeView = require("./snake-view.js");

$( () => {
  
  const rootEl = $("body");

  new SnakeView(rootEl);
  
});