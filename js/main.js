const Snake = require("./snake.js");
const Board = require("./board.js");
const SnakeView = require("./snake-view.js");

$l(() => {

  const rootEl = $l("body");
  const snakeEl = $l("section");

  const newGame = new SnakeView(rootEl, snakeEl);
  $("#play-button").click(function() {
    document.getElementById('instruction-popup').classList.add("hidden");
    newGame.step();
  })
});
