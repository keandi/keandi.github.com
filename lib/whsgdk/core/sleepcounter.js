class SleepCounter extends ClsObject {
    #_PV = {};

    // ctor
    constructor(name) {
        try {
            super(name);

            this.#reset();
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
    destroy() {
        try {
            this.#reset();
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // reset
    #reset() {
        try {
            let v = this.#_PV;
            v.isSleeping = false;
            v.max = 0;
            v.delta = 0;
        } catch (e) {
            var errMsg = this.getExpMsg("reset", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get isSleeping
    get IsSleeping() {
        return this.#_PV.isSleeping;
    }

    // reserve sleep
    sleep(max) {
        try {
            let v = this.#_PV;
            v.isSleeping = true;
            v.max = (max > 0) ? max : 200;
            v.delta = 0;
        } catch (e) {
            var errMsg = this.getExpMsg("sleep", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // sleep check
    check(delta) {
        try {
            if (this.#_PV.isSleeping === false) { return false; }

            let v = this.#_PV;
            v.delta += delta;
            if (v.delta >= v.max) { 
                this.#reset();
                return false; 
            }
            return true;
        } catch (e) {
            var errMsg = this.getExpMsg("check", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return false;
    }
}