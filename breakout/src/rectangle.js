const Hitbox = require("./hitbox");
const Vec = require("./vec");

class Rectangle extends Hitbox {

    constructor(color, w, h, x = 0, y = 0) {
        super();
        this.pos = new Vec(x, y);
        this.size = new Vec(w, h);
        this.vel = new Vec();
        this.color = color;
    }

}

module.exports = Rectangle;