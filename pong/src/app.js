const anypixel = require('anypixel');
const Game = require("./game.js");
const playerBoardWidth = 0.2;
const ctx = anypixel.canvas.getContext2D();
const game = new Game(anypixel, ctx);

const ws = new WebSocket("ws://localhost:8080", "protocolOne");

ws.onopen = (event) => {
    ws.send("board");
};

ws.onmessage = (event) => {
    let player = null;
    const btnDownEvent = new Event("onButtonDown");
    const clientMessage = JSON.parse(event.data);
    console.log(clientMessage.player);
    if(clientMessage.player === "0")
        player = 0;
    else
        player = 1000000000;
    btnDownEvent.detail = {
        x: player,
        y: ((clientMessage.msg === "buttonUp" ? 0 : 100000000000))
    };

    document.dispatchEvent(btnDownEvent);

    if(clientMessage.msg === "false")
    {
        const buttonUpEvent = new Event("onButtonUp");
        buttonUpEvent.detail = {x: 0};
        document.dispatchEvent(buttonUpEvent);
    }
};

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


