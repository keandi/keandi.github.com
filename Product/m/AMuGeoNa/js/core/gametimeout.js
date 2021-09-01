class GameTimeout extends GameInterval {
    #_PV = {};

    //ctor
    constructor(name, scene, interval, callback, runImmidately) {
        try {
            super(name, scene, interval, callback, runImmidately, false);

            this.subcribeUpdate(callback, interval);

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    //subscribeUpdate
    subcribeUpdate(cb, interval) {
        this.#_PV.interval = interval;
        this.#_PV.callback = cb;

        super.subcribeUpdate(cb, interval);
    }

    // update
    update() {
        try {
            if (this.IsRun === false) { return; }

            if (this.Time.isExpired( this.#_PV.interval, undefined, true ) === true)
            {
                this.IsRun = false;
                this.#_PV.callback();
                //this.destroy();                
            }
        } catch (e) {
            var errMsg = this.getExpMsg("update", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // reset
    reset(isRun) {
        try {
            this.Time.resetTime();
            this.IsRun = (isRun === true) ? true : false
        } catch (e) {
            var errMsg = this.getExpMsg("reset", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get type
    get Type() {
        return TimerType.TIMEOUT;
    }
}

// create game timeout
function createGameTimeout(name, scene, interval, callback) {
    return new GameTimeout(name, scene, interval, callback);
}