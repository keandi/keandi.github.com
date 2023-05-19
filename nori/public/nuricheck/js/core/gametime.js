class GameTime extends ClsObject {
    #_PV = {};

    //ctor
    constructor(name, gamehost) {
        try {
            super(name);

            this.#_PV.gamehost = gamehost;

            this.resetTime();

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    //reset time
    resetTime() {
        try {
            this.#_PV.time = this.#_PV.gamehost.Time;
        } catch (e) {
            var errMsg = this.getExpMsg("resetTime", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // elapsed
    get Elapsed() {
        try {
            return this.#_PV.gamehost.Time - this.#_PV.time;
        } catch (e) {
            var errMsg = this.getExpMsg("resetTime", e);
            console.log(errMsg);
            alert(errMsg);
        }
        return 0;
    }

    // is expired
    isExpired(duration, callback, isAutoReset) {
        try {
            if (this.Elapsed > duration) {
                if (callback != undefined) {
                    callback();
                }

                if (isAutoReset === true) {
                    this.resetTime();
                }

                return true;
            }
        } catch (e) {
            var errMsg = this.getExpMsg("isExpired", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return false;
    }
}