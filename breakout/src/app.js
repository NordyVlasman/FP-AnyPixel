var anypixel = require('anypixel');
// var ctx = anypixel.canvas.getContext2D();
const Game = require("./game");

const game = new Game(anypixel);

document.addEventListener("onButtonDown", (event) => {
    game.start();
    game.player.vel.x = (event.detail.x > anypixel.config.width / 2 ? -game.player.baseSpeed : game.player.baseSpeed);
});

document.addEventListener('onButtonUp', (event) => {
   game.player.vel.x = 0;
});