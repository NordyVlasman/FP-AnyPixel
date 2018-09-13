const anypixel = require('anypixel');
const ctx = anypixel.canvas.getContext2D();

let colors = ['#336B87', '#763626'];
let counter = 0;
let letters = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split("");

drawLetter(letters[counter]);

/**
 * Listen for onButtonDown events and draw a 2x2 rectangle at the event site
 */
document.addEventListener('onButtonDown', function(event) {

    drawLetter(letters[++counter]);

    if(counter === letters.length - 1) counter = 0;
});

/**
 * Draw the chosen letter
 */
function drawLetter(letter) {
    clearScreen();
    ctx.fillStyle = colors[Math.floor(Math.random() * 2)];
    ctx.font = "15px 'anypixelfont'";

    ctx.fillText(letter, 0, anypixel.config.height - 10);
}

/**
 * Clear the screen
 */
function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0,
        ctx.canvas.width,
        ctx.canvas.height);
}