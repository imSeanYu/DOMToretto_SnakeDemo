const Snake = require("./snake.js");
const Board = require("./board.js");
const SnakeView = require("./snake-view.js");

$l( () => {

  const rootEl = $l("body");
  const snakeEl = $l("section");

  new SnakeView(rootEl, snakeEl);

});
