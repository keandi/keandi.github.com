class TimerOnPool extends ClsObject {
    #_PV = {};

    //ctor
    constructor(name, timerPool) {
        try {
            super(name);

            this.#_PV.timerPool = timerPool;
            
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
    destroy() {
        try {
            this.stop();
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // stop
    stop() {
        try {
            let v = this.#_PV;
            
            if (v.id == undefined) { return; }
            v.timerPool.remove(v.id);
            v.id = undefined;
            v.isStopped = true;
        } catch (e) {
            var errMsg = this.getExpMsg("stop", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // start timeout
    startTimeout(cb, interval) {
        try {
            this.stop();

            let v = this.#_PV;
            
            v.id = v.timerPool.setTimeout(()=>{
                v.id = undefined;
                cb();
            }, interval);
        } catch (e) {
            var errMsg = this.getExpMsg("startTimeout", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // start timeout
    startInterval(cb, interval, isEarlyStart) {
        try {
            this.stop();

            let v = this.#_PV;

            if (isEarlyStart === true) { 
                v.isStopped = false;
                cb(); 
                if (v.isStopped === true) { return; } // cb() 선처리에서 stop이 되어버림
            }
            v.id = v.timerPool.setInterval(()=>cb(), interval);
        } catch (e) {
            var errMsg = this.getExpMsg("startInterval", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}