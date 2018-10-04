const anypixel = require('anypixel');
const Game = require("./game.js");
const playerBoardWidth = 0.2;
const ctx = anypixel.canvas.getContext2D();
const io = require('socket.io-client');

const socket = io('http://localhost:5000');

socket.emit('host', { gameName: 'anypixel' });

//TODO: Hier even wat netjes van maken ofzo dingen doen
const game = new Game(anypixel, ctx);

socket.on('button_event', (data) => {
    let player = game.players[parseInt(data.player) -1];
    if(data.btnEvent === "false")
        player.vel.y = 0;
    else
        player.vel.y = (data.btnEvent === "buttonUp" ? 20 : -20);
});

socket.on('haltgame', () => [
   game.haltGame()
]);

/**
 * Listen for onButtonDown events and draw a 2x2 rectangle at the event site
 */
document.addEventListener('onButtonDown', function(event) {
    if(event.detail.x < anypixel.config.width * playerBoardWidth) {
        game.players[0].vel.y = (event.detail.y > anypixel.config.height / 2 ? -game.players[0].velSpeed : game.players[0].velSpeed);
    } else if(event.detail.x > anypixel.config.width * (1-playerBoardWidth)) {
        game.players[1].vel.y = (event.detail.y > anypixel.config.height / 2 ? -game.players[1].velSpeed : game.players[1].velSpeed);
    }
});

document.addEventListener('onButtonUp', function(event) {
    if(event.detail.x < anypixel.config.width * playerBoardWidth) {
        game.players[0].vel.y = 0;
    } else if(event.detail.x > anypixel.config.width * (1-playerBoardWidth)) {
        game.players[1].vel.y = 0;
    }
});


