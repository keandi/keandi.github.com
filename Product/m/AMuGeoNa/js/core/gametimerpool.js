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
                    return this.#_PV.idIssue;
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
            timerObj.timer.destroy();
            v.timers.delete(id);
             
         } catch (e) {
             var errMsg = this.getExpMsg("remove", e);
             console.log(errMsg);
             alert(errMsg);
         }
    }

    // setTimeout
    setTimeout(cb, interval) {
        try {
            let selfIt = this;
            let v = this.#_PV;

            let timerObj = {};
            timerObj.timer = new GameTimeout("pool_gametimeout", v.scene, interval, ()=>{
                selfIt.remove(timerObj.id);
                cb();
            }, true);
            timerObj.id = this.#NewId;
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
            timerObj.timer = new GameInterval("pool_gametinterval", v.scene, interval, ()=>{
                cb();
            }, true);
            timerObj.id = this.#NewId;
            v.timers.set(timerObj.id, timerObj)

            return timerObj.id;
             
         } catch (e) {
             var errMsg = this.getExpMsg("setTimeout", e);
             console.log(errMsg);
             alert(errMsg);
         }
    }
}