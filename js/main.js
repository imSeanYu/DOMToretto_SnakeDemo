const Snake = require("./snake.js");
const Board = require("./board.js");
const SnakeView = require("./snake-view.js");

$l( () => {

  const rootEl = $l("body");

  new SnakeView(rootEl);

});
