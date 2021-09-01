class GameTimerPool extends DestroyableObject {
    #_PV = {};

    //ctor
    constructor(name, scene) {
        try {
            super(name, scene);

            this.#_PV.scene = scene;
            this.#_PV.timers = new Map(); //[id, {id, timer}]            
            this.#_PV.idIssue = new RINum(1, 1, 9999);
            this.#_PV.restTimeoutQueue = new Queue();
            this.#_PV.restIntervalQueue = new Queue();
            
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
    destroy() {
        try {
            super.destroy();

           if (this.#_PV.timers == undefined) { return; }

           this.#_PV.timers.forEach(timerObj => {
            timerObj.timer.destroy();
           });
           this.#_PV.timers.clear();

           this.#_PV.restTimeoutQueue.clear();
           this.#_PV.restIntervalQueue.clear();
            
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // new id
    get #NewId() {
        try {
            let tryCount = 0;
            while (true) {
                var id = this.#_PV.idIssue.Next;

                if (this.#_PV.timers.has(id) === false) {
                    return id;
                }
                tryCount++;

                if (tryCount > 100) {
                    throw new Error("timerpool id issue error - too many try!");
                }
            }      
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // remove timer
    remove(id) {
        try {
            let v = this.#_PV;
            if (v.timers.has(id) === false) { 
                //console.log("remove = unknown timer id: " + id);
                return; 
            }

            //
            let timerObj = v.timers.get(id);

            //console.log("timer-pool remove: " + id + ", objId: " + timerObj.id);

            timerObj.timer.destroy();
            v.timers.delete(id);
            this.pushRestTimer(timerObj);

            //this.#dbgPrint_existTimerIds();
             
         } catch (e) {
             var errMsg = this.getExpMsg("remove", e);
             console.log(errMsg);
             alert(errMsg);
         }
    }

    #dbgPrint_existTimerIds() {
        let v = this.#_PV;
        if (v.timers.size <= 0) {
            console.log("no more timer id");
        } else {
            var ids = "";
            v.timers.forEach(timerObj => {
                ids += timerObj.id + ", ";
            });
            console.log("exist timers: " + ids);
        }
    }

    // setTimeout
    setTimeout(cb, interval) {
        try {
            let selfIt = this;
            let v = this.#_PV;

            // rest timer
            {
                let timerObj = this.popRestTimer(TimerType.TIMEOUT);
                if (timerObj != undefined) { 
                    //console.log("timer-pool timeout set(rest): " + timerObj.id);
                    timerObj.timer.subcribeUpdate(()=>{
                        selfIt.remove(timerObj.id);
                        cb();
                    }, interval);
                    timerObj.timer.IsRun = true;
                    v.timers.set(timerObj.id, timerObj)
                    return timerObj.id; 
                }
            }

            let timerObj = {};
            timerObj.id = this.#NewId;
            timerObj.timer = new GameTimeout("pool_gametimeout_" + timerObj.id, v.scene, interval, ()=>{
                //console.log("timer-pool timeout remove try: " + timerObj.id);
                selfIt.remove(timerObj.id);
                cb();
            }, true);
            
            //console.log("timer-pool timeout set: " + timerObj.id);
            v.timers.set(timerObj.id, timerObj)

            return timerObj.id;
             
         } catch (e) {
             var errMsg = this.getExpMsg("setTimeout", e);
             console.log(errMsg);
             alert(errMsg);
         }
    }

    // setInterval
    setInterval(cb, interval) {
        try {
            let v = this.#_PV;

            // rest timer
            {
                let timerObj = this.popRestTimer(TimerType.INTERVAL);
                if (timerObj != undefined) { 
                    //console.log("timer-pool interval set(rest): " + timerObj.id);
                    timerObj.timer.subcribeUpdate(cb, interval);
                    timerObj.timer.IsRun = true;
                    v.timers.set(timerObj.id, timerObj)
                    return timerObj.id; 
                }
            }

            let timerObj = {};
            timerObj.id = this.#NewId;
            timerObj.timer = new GameInterval("pool_gametinterval_" + timerObj.id, v.scene, interval, cb, true);
            v.timers.set(timerObj.id, timerObj)

            //console.log("timer-pool interval set: " + timerObj.id);

            return timerObj.id;
             
         } catch (e) {
             var errMsg = this.getExpMsg("setInterval", e);
             console.log(errMsg);
             alert(errMsg);
         }
    }

    // push rest timer
    pushRestTimer(timerObj) {
        try {
            if (timerObj.timer.Type.value === TimerType.INTERVAL.value) {
                this.#_PV.restIntervalQueue.enque(timerObj);
            } else if (timerObj.timer.Type.value === TimerType.TIMEOUT.value) {
                this.#_PV.restTimeoutQueue.enque(timerObj);
            }
        } catch (e) {
             var errMsg = this.getExpMsg("pushRestTimer", e);
             console.log(errMsg);
             alert(errMsg);
         }
    }

    // pop rest timer
    popRestTimer(type) {
        try {
            if (type.value === TimerType.INTERVAL.value) {
                if (this.#_PV.restIntervalQueue.count > 0) {
                    return this.#_PV.restIntervalQueue.deque();
                }
            } else if (type.value === TimerType.TIMEOUT.value) {
                if (this.#_PV.restTimeoutQueue.count > 0) {
                    return this.#_PV.restTimeoutQueue.deque();
                }
            }
        } catch (e) {
             var errMsg = this.getExpMsg("popRestTimer", e);
             console.log(errMsg);
             alert(errMsg);
         }
    }
}