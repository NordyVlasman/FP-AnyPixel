const Rectangle = require('./rectangle');
const Ball = require('./ball');
const Player = require('./player');

class Game {

    constructor(anypixel) {
        this.config = anypixel.config;
        this.canvas = anypixel.canvas;
        this.ctx = this.canvas.getContext2D();
        this.player = new Player("#FFF", 15, 1);
        this.background = "#000";
        this.barsPerRow = 7;
        this.barRows = 5;
        this.bars = [];
        this.barColors = ["#3fd8d9", "#cb2b20", "#c515ca", "#3dcb38"];
        this.ball = new Ball("#FFF", 4, 4);
        this.speedIncreasePerBounce = 1.02;
        this.gameOverVar = this.started = false;
        this.score = 0;

        let lastTime;

        this.reset();

        const callback = (ms) => {
            if(lastTime) this.update((lastTime - ms) / 1000);
            lastTime = ms;
            requestAnimationFrame(callback);
        };

        callback();
    }

    reset() {
        this.ball.pos.x = this.config.width / 2 - this.ball.size.x / 2;
        this.ball.pos.y = this.config.height - 15;

        this.player.pos.x = this.config.width / 2 - this.player.size.x / 2;
        this.player.pos.y = this.config.height - 5;

        for(let i=0;i<this.barRows;i++) {
            this.bars[i] = [];
            for(let j=0;j<this.barsPerRow;j++) {
                this.bars[i].push(new Rectangle(this.barColors[Math.floor(Math.random() * this.barColors.length)], 15, 3, j * 20 + 2, i * 5 + 2));
            }
        }
    }

    collide() {
        if(!this.started) return;

        if(this.player.left <= 0 || this.player.right >= this.config.width) {
            this.player.vel.x = 0;
            this.player.pos.x = Math.round(this.player.pos.x);
            console.log(this.player.pos.x);
        }

        let hit = false;
        if(this.ball.bottom >= this.config.height) {
            this.gameOver();
        }
        else if(this.ball.left <= 0 || this.ball.right >= this.config.width) {
            this.ball.vel.x = -this.ball.vel.x;
            // this.ball.vel.y = -this.ball.vel.y;
        }
        else if(this.ball.top <= 0) {

            hit = true;
        }
        else {
            // use for instead of foreach so we can add an label and break the loops;
            loop1: for (let i = 0; i < this.bars.length; i++) {
                for (let j = 0; j < this.bars[i].length; j++) {
                    const bar = this.bars[i][j];
                    if (this.ball.right >= bar.left && this.ball.left <= bar.right && this.ball.top <= bar.bottom && this.ball.bottom >= bar.top) {
                        hit = true;
                        // bar.size.x = bar.size.y = 0;
                        this.bars[i].splice(j, 1);
                        this.score++;
                        break loop1;
                    }
                }
            }
        }

        if(!hit)
            hit = ((this.ball.left <= this.player.right && this.ball.right >= this.player.left) && this.ball.top <= this.player.bottom && this.ball.bottom >= this.player.top);

        if(hit) {
        // if(this.ball.left <= this.player.right && this.ball.right >= this.player.left && this.ball.top <= this.player.bottom && this.ball.bottom >= this.player.top) {

            const len = this.ball.vel.len;
            this.ball.vel.x += this.ball.vel.x * (Math.random() * (.5 - .4));
            this.ball.vel.y = -this.ball.vel.y * this.speedIncreasePerBounce;
            this.ball.vel.len = len * this.speedIncreasePerBounce;
        }
    }

    gameOver() {
        this.gameOverVar = true;
        // this.ctx.clearRect(0, 0, this.config.width, this.config.height);
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.config.width, this.config.height);

        this.ctx.fillStyle = "#fff";
        this.ctx.font = "15px Comic Sans MS";

        this.ctx.fillText("You ded!", this.config.width / 2 - 25 , this.config.height / 2);

        this.ctx.font = "10px Comic Sans MS";
        this.ctx.fillText("Final score: " + this.score, this.config.width / 2 - 25 , this.config.height / 2 + 10);
    }

    update(dt) {
        this.collide();

        this.ball.pos.x += this.ball.vel.x * dt;
        this.ball.pos.y += this.ball.vel.y * dt;

        this.player.pos.x += this.player.vel.x * dt;

        this.draw();
    }

    start() {
        if(this.ball.vel.x === 0 && this.ball.vel.y === 0) {
            this.ball.vel.y = -10;
            this.ball.vel.x = (Math.random() > .5 ? 10 : -10);
            this.started = true;
        }
    }

    draw() {
        if(this.gameOverVar) return;
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(0, 0, this.config.width, this.config.height);

        // this.ctx.fillStyle = this.player.color;
        // this.ctx.fillRect(this.player.pos.x, this.player.pos.y, this.player.size.x, this.player.size.y);
        this.drawRect(this.player);
        this.drawRect(this.ball);

        this.bars.forEach((barRow) => {
            barRow.forEach((bar) => {
                this.drawRect(bar);
            });
        });
    }

    drawRect(object) {
        this.ctx.fillStyle = object.color;
        this.ctx.fillRect(object.pos.x, object.pos.y, object.size.x, object.size.y);
    }
}

module.exports = Game;