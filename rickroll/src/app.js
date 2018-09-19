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


var anypixel = require('anypixel');
var ctx = anypixel.canvas.getContext2D();

let rickRollCoordinates = [0, 0];

generateCoords();

/**
 * Listen for onButtonDown events and draw a 2x2 rectangle at the event site
 */
document.addEventListener('onButtonDown', function(event) {
	if(event.detail.x === rickRollCoordinates[0] && event.detail.y === rickRollCoordinates[1]) rickRoll();
    // rickRoll();
});

function rickRoll() {
	const video = document.createElement("video");
	video.setAttribute("src", "./video.mp4");
    video.load();
    video.play();
    video.volume = 1;

    video.addEventListener('play', function () {
        let $this = this; //cache
        (function loop() {
            if (!$this.paused && !$this.ended) {
                ctx.drawImage($this, 0, 0);
                setTimeout(loop, 1000 / 30); // drawing at 30fps
            }
        })();
    }, 0);
}

function generateCoords() {
	rickRollCoordinates[0] = Math.floor(Math.random() * anypixel.config.width);
	rickRollCoordinates[1] = Math.floor(Math.random() * anypixel.config.height);

	console.log(rickRollCoordinates);
}