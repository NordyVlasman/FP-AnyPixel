const Rectangle = require("./rectangle");

class Ball extends  Rectangle {

    get len() {
        return Math.sqrt(this.x * this.x + this.y + this.y);
    }

    set len(value) {
        const fact = value / this.len;
        this.x *= fact;
        this.y *= fact;
    }

}

module.exports = Ball;
