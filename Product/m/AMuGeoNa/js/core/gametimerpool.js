class GameTimerPool extends DestroyableObject {
    #_PV = {};

    //ctor
    constructor(name, scene) {
        try {
            super(name, scene);

            this.#_PV.scene = scene;
            this.#_PV.timers = new Map(); //[id, {id, timer}]            
            this.#_PV.idIssue = new RINum(1, 1, 9999);
            
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
            if (v.timers.has(id) === false) { return; }

            //
            let timerObj = v.timers.get(id);

            //console.log("timer-pool remove: " + id + ", objId: " + timerObj.id);

            timerObj.timer.destroy();
            v.timers.delete(id);

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

            let timerObj = {};
            timerObj.id = this.#NewId;
            timerObj.timer = new GameTimeout("pool_gametimeout_" + timerObj.id, v.scene, interval, ()=>{
                //console.log("timer-pool timeout remove try: " + timerObj.id);
                selfIt.remove(timerObj.id);
                cb();
            }, true);
            
            //console.log("timer-pool timeout set: " + timerObj.id);
            v.timers.set(timerObj.id, timerObj)
             
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

            let timerObj = {};
            timerObj.id = this.#NewId;
            timerObj.timer = new GameInterval("pool_gametinterval_" + timerObj.id, v.scene, interval, ()=>{
                cb();
            }, true);
            v.timers.set(timerObj.id, timerObj)

            //console.log("timer-pool set: " + timerObj.id);

            return timerObj.id;
             
         } catch (e) {
             var errMsg = this.getExpMsg("setTimeout", e);
             console.log(errMsg);
             alert(errMsg);
         }
    }
}