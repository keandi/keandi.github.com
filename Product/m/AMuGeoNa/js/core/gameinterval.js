class GameInterval extends ClsObject {
    #_PV = {};

    //ctor
    constructor(name, scene, interval, callback) {
        try {
            super(name);

            this.#_PV.scene = scene;
            this.#_PV.interval = interval;
            this.#_PV.callback = callback;

            this.#_PV.gametime = new GameTime(name + "_gameinterval", scene._gameHost);

            ////
            scene.subscribeUpdate(this);
            this.#_PV.gametime.resetTime();

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // time object
    get Time() {
        return this.#_PV.gametime;
    }

    // destroy
    destroy() {
        try {
            this.#_PV.scene.unsubscribeUpdate(this);
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // update
    update() {
        try {
            this.#_PV.gametime.isExpired( this.#_PV.interval, this.#_PV.callback, true );
        } catch (e) {
            var errMsg = this.getExpMsg("update", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}

// create game interval
function createGameInterval(name, scene, interval, callback) {
    return new GameInterval(name, scene, interval, callback);
}