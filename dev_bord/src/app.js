/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/license-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the license.
 */


const anypixel = require('anypixel');
const ctx = anypixel.canvas.getContext2D();

const ws = new WebSocket("ws://localhost:8080", "protocolOne");
// const Pong = require('./Pong.js');

let colors = ['#F00', '#0F0', '#00F'];
let counter = 0;
let letters = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ").split("");

drawLetter(letters[counter]);

// ctx.clearRect(0, 0, anypixel.config.width,  anypixel.config.height);
/**
 * Listen for onButtonDown events and draw a 2x2 rectangle at the event site
 */

ws.onopen = (event) => {
    console.log("Ready");
};

ws.onmessage = (event) => {
    console.log(event.data);
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
    ctx.fillStyle = colors[Math.floor(Math.random() * 3)];
    ctx.font = "15px 'anypixelfont'";

    ctx.fillText(letter, 0, anypixel.config.height - 10);
    ctx.closePath();

    if(counter === letters.length - 1) counter = -1;
}