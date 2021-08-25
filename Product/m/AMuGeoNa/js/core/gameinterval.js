class GameInterval extends ClsObject {
    #_PV = {};

    //ctor
    constructor(name, scene, interval, callback, runImmidately) {
        try {
            super(name);

            // destroy 등록
            scene.addDestroyableObject( this );

            this.#_PV.scene = scene;
            this.#_PV.interval = interval;
            this.#_PV.callback = callback;
            this.#_PV.isRun = (runImmidately === true) ? true : false;

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

    // set isrun
    set IsRun(value) {
        this.#_PV.isRun = value;
    }

    // get isrun
    get IsRun() {
        return this.#_PV.isRun;
    }

    // reset
    reset(isRun) {
        this.#_PV.gametime.resetTime();
        this.#_PV.isRun = (isRun === true) ? true : false;
    }

    // destroy
    destroy() {
        try {
            this.IsRun = false;
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
            if (this.#_PV.isRun === false) { return; }

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