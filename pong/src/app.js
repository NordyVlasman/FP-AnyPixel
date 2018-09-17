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
const Player = require("./player.js");
const Ball = require("./ball.js");
const Game = require("./game.js");

const ctx = anypixel.canvas.getContext2D();

const game = new Game(anypixel, ctx);

console.log(game.ball);

game.ball.vel.x = 10;
game.ball.vel.y = 10;
/**
 * Listen for onButtonDown events and draw a 2x2 rectangle at the event site
 */
document.addEventListener('onButtonDown', function(event) {
    //if the click is on the left player's side of the screen
    if(event.detail.x < anypixel.config.width * 0.2) {
        //if the click is on the top half of the of the screen go up, else go down

        game.players[0].vel.y = (event.detail.y > anypixel.config.height / 2 ? -10 : 10);
        // click(0, true, event.detail.y > anypixel.config.height / 2);
    } else if(event.detail.x > anypixel.config.width * 0.2) {
        game.players[1].vel.y = (event.detail.y > anypixel.config.height / 2 ? -10 : 10);
        // click(1, true, event.detail.y > anypixel.config.height / 2);
    }
});

document.addEventListener('onButtonUp', function(event) {
    //if the click is on the left player's side of the screen
    if(event.detail.x < anypixel.config.width * 0.2) {
        //if the click is on the top half of the of the screen go up, else go down
        // click(0, false, event.detail.y > anypixel.config.height / 2);
        game.players[0].vel.y = 0;
    } else if(event.detail.x > anypixel.config.width * 0.2) {
        // click(1, false, event.detail.y > anypixel.config.height / 2);
        game.players[1].vel.y = 0;
    }
});


