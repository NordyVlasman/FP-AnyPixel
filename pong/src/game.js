const Ball = require("./ball.js");
const Player = require("./player.js");

class Game {

    constructor(anypixel, ctx) {
        this.background = "#000";
        this.playerColor = "#FFF";
        this.ballColor = "#FFF";
        this.anypixel = anypixel;
        this.ctx = ctx;

        let colors = ['#F00', '#0F0', '#00F'];
        let lastTime;

        //don't forget about the width of the player
        this.players = [new Player(5, anypixel.config.height / 2 - 5, 5, 10), new Player(anypixel.config.width - 10, anypixel.config.height / 2 - 5, 5, 10)];
        this.ball = new Ball(anypixel.config.width / 2 - 1, anypixel.config.height / 2 - 1);

        const callback = (ms) => {
            if(lastTime) this.update((lastTime - ms) / 1000);
            lastTime = ms;
            requestAnimationFrame(callback);
        };

        callback();
    }

    update(dt) {
        this.ctx.fillStyle = this.background;
        this.ctx.fillRect(0, 0, this.anypixel.config.width, this.anypixel.config.height);

        this.updatePos(this.players[0], dt);
        this.updatePos(this.players[1], dt);
        this.updatePos(this.ball, dt);

        this.players.forEach((player) => {
            this.drawRect(this.playerColor, player);
        });

        this.drawRect(this.ballColor, this.ball);
        this.collision();
    }

    collision() {
        if(this.ball.left <= 0 || this.ball.right >= this.anypixel.config.width) this.ball.vel.x = -this.ball.vel.x;
        if(this.ball.top <= 0 || this.ball.bottom >= this.anypixel.config.height) this.ball.vel.y = -this.ball.vel.y;
    }

    updatePos(object, dt) {
        object.pos.y += object.vel.y * dt;
        object.pos.x += object.vel.x * dt;
    }

    drawRect(fillStyle, object) {
        this.ctx.fillStyle = fillStyle;
        this.ctx.fillRect(object.pos.x, object.pos.y, object.size.x, object.size.y);
    }
}

module.exports = Game;