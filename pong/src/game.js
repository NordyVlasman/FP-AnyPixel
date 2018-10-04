const Ball = require("./ball.js");
const Player = require("./player.js");
const io = require('socket.io-client');

const socket = io('http://localhost:5000');

class Game {

    constructor(anypixel, ctx) {
        this.config = anypixel.config;

        this.gameOverVar = this.started = false;

        this.background = "#000";
        this.playerColor = "#FF4500";
        this.ballColor = "#fff";
        this.anypixel = anypixel;
        this.ctx = ctx;
        this.speedIncreasePerBounce = 1.05;
        this.ballBaseSpeed = 25;

        let lastTime;

        this.players = [];
        for(let i=0;i<2;i++) {
            this.players.push(new Player(5, 10));
        }
        this.started = true;
        this.clearBoard();

        const callback = (ms) => {
            if(lastTime) this.update((lastTime - ms) / 1000);
            lastTime = ms;
            requestAnimationFrame(callback);
        };
        this.gameOverVar = this.started = false;

        callback();
    }

    update(dt) {
        if(this.gameOverVar) return;
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

    checkScore() {
        if(this.players[0].score >= 10 ||  this.players[1].score >= 10  )
        {
            this.haltGame()
        }
    }

    collision() {

        if(this.ball.left <= 0) {
            this.players[0].score++;
            socket.emit('newscore', { 'gameName': 'anypixel', 'player1': this.players[0].score, 'player2': this.players[1].score});
            this.checkScore();
            this.clearBoard();
        } else if(this.ball.right >= this.anypixel.config.width) {
            this.players[1].score++;
            socket.emit('newscore', { 'gameName': 'anypixel', 'player1': this.players[0].score, 'player2': this.players[1].score});
            this.checkScore();
            this.clearBoard();
        } else if(this.ball.top <= 0 || this.ball.bottom >= this.anypixel.config.height)
            this.ball.vel.y = -this.ball.vel.y;

        this.players.forEach((player) => {
            this.collidePlayer(player);
            if(player.top <= 0 || player.bottom >= this.anypixel.config.height) player.vel.y = 0;
        });
    }

    collidePlayer(player) {
        if(this.ball.left <= player.right && this.ball.right >= player.left && this.ball.top <= player.bottom && this.ball.bottom >= player.top) {
            const len = this.ball.vel.len;
            this.ball.vel.x = -this.ball.vel.x * this.speedIncreasePerBounce;
            this.ball.vel.y += this.ballBaseSpeed * (Math.random() * -.5);
            //add 5% speed after a player hits the ball
            this.ball.vel.len = len * this.speedIncreasePerBounce;
        }
    }

    start() {
        // console.log(this.ball);
        this.ball.vel.x = this.ballBaseSpeed * (Math.random() > .5 ? 1 : -1);
        this.ball.vel.y = this.ballBaseSpeed * (Math.random() * 2 -1);
        this.ball.vel.len = this.ballBaseSpeed;
    }

    clearBoard() {
        this.ball = new Ball(this.anypixel.config.width / 2, this.anypixel.config.height / 2);

        this.players.forEach((player, index) => {
            player.pos.y = this.anypixel.config.height / 2 - player.size.y / 2;
            player.pos.x = (index === 0 ? player.xAxisOffset: this.anypixel.config.width - (player.xAxisOffset + player.size.x));
        });

        setTimeout(() => {this.start()}, 3000);
    }

    haltGame() {
        this.gameOverVar = true;

        this.ball = new Ball(this.anypixel.config.width / 2, this.anypixel.config.height / 2);

        this.players.forEach((player, index) => {
            player.pos.y = this.anypixel.config.height / 2 - player.size.y / 2;
            player.pos.x = (index === 0 ? player.xAxisOffset: this.anypixel.config.width - (player.xAxisOffset + player.size.x));
        });

        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.config.width, this.config.height);

        this.ctx.fillStyle = "#fff";
        this.ctx.font = "15px Arial";
        this.ctx.fillText("User disconnected", 10 , this.config.height / 2);

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