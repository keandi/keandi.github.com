class GameTimeout extends GameInterval {
    #_PV = {};

    //ctor
    constructor(name, scene, interval, callback) {
        try {
            super(name, scene, interval, callback);
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // update
    update() {
        try {
            if (this.Time.isExpired( this.#_PV.interval, this.#_PV.callback ) === true)
            {
                this.#_PV.callback();
                this.destroy();
            }
        } catch (e) {
            var errMsg = this.getExpMsg("update", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // reset
    reset() {
        try {
            this.Time.resetTime();
        } catch (e) {
            var errMsg = this.getExpMsg("reset", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}

// create game timeout
function createGameTimeout(name, scene, interval, callback) {
    return new GameTimeout(name, scene, interval, callback);
}