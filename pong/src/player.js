const Vec = require("./vec.js");
const Hitbox = require("./hitbox.js");

class Player extends Hitbox {
    constructor(w, h) {
        super();

        this.pos = new Vec(0, 0);
        this.size = new Vec(w, h);
        this.vel = new Vec();
        this.score = 0;
        this.velSpeed = 30;
        this.xAxisOffset = 5;
    }
}

module.exports = Player;