const Rectangle = require("./rectangle");

class Player extends Rectangle {

    constructor(color, w, h) {
        super(color, w, h);
        this.baseSpeed = 30;
    }
}

module.exports = Player;