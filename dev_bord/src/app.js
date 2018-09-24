const anypixel = require('anypixel');
const ctx = anypixel.canvas.getContext2D();

const ws = new WebSocket("ws://localhost:8080/path?param=1", "protocolOne");

let colors = ['#247BA0', '#FF1654'];
let counter = 0;
let letters = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split("");

drawLetter(letters[counter]);

ws.onopen = (event) => {
    console.log("Ready");
    ws.send("board");
};

ws.onmessage = (event) => {
    if(event.data === "click") drawLetter(letters[++counter]);
};

document.addEventListener('onButtonDown', function(event) {
	drawLetter(letters[++counter]);
});

function drawLetter(letter) {
    ctx.clearRect(0, 0, anypixel.config.width, anypixel.config.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, anypixel.config.width, anypixel.config.height);

    ctx.beginPath();
    ctx.fillStyle = colors[Math.floor(Math.random() * 2)];
    ctx.font = "20px 'anypixelfont'";

    ctx.fillText(letter, anypixel.config.width / 2 -5, anypixel.config.height - 15);
    ctx.closePath();

    if(counter === letters.length - 1) counter = -1;
}
