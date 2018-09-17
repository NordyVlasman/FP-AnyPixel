const Vec = require("./vec.js");
const Hitbox = require("./hitbox.js");

class Ball extends Hitbox {

    constructor(x, y) {
        super();
        this.pos = new Vec(x, y);
        this.size = new Vec(4, 4);
        this.vel = new Vec();
    }
}

module.exports = Ball;