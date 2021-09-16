class SpawnManager extends DestroyableObject {
    #_PV = {};

    // ctor
    constructor(name, scene, positions, createCallbacks, max, interval) {
        super(name, scene, true);

        try {
            let v = this.#_PV;
            
            v.scene = scene;
            v.positions = positions;    // [{x, y}, ...]
            v.max = max;
            v.current = 0;
            v.interval = interval;

            v.checkTimer = new TimerOnPool('timeronpool_' + this.Name, v.scene.getTimerPool());

            //
            //createCallbacks; // [{cb: ()={}, count: 7}, {cb: ()={}, count: 2}...]
            v.createCallbacks = [];
            createCallbacks.forEach(element => {
                for (var i = 0; i < element.count; i++) {
                    v.createCallbacks.push(element.cb);
                }
            });

            //
            this.#check();
            
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
    destroy() {
        super.destroy();

        let v = this.#_PV;
        destroyObjects( v.checkTimer );
        v.checkTimer = undefined;
        v.createCallbacks = undefined;
    }

    // get create position
    #getPosition() {
        try {
            let v = this.#_PV;
            return v.positions[Phaser.Math.Between(0, v.positions.length - 1)];
            
        } catch (e) {
            var errMsg = this.getExpMsg("getPosition", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get create callback
    #getCreateCallback() {
        try {
            let v = this.#_PV;
            return v.createCallbacks[Phaser.Math.Between(0, v.createCallbacks.length - 1)];
            
        } catch (e) {
            var errMsg = this.getExpMsg("getCreateCallback", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // check
    #check() {
        try {
            let selfIt = this;
            let v = this.#_PV;

            v.checkTimer.startInterval(()=>{
                if (v.current < v.max) {
                    if (v.current > 0) {
                        if (Phaser.Math.Between(0, 2) === 0) { return; }
                    }
                    // create
                    let pos = selfIt.#getPosition();
                    let cb = selfIt.#getCreateCallback();

                    cb(pos.x, pos.y);

                    v.current++;
                }
            }, v.interval, true);
        } catch (e) {
            var errMsg = this.getExpMsg("check", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // decrease
    decrease(value) {
        try {
            if (value == undefined) { value = 1; }
            else if (value <= 0) { return; }

            let v = this.#_PV;
            v.current -= value;
            if (v.current < 0) { v.current = 0; }

        } catch (e) {
            var errMsg = this.getExpMsg("check", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}