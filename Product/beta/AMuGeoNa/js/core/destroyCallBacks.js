class DestroyCallbacks {
    #_map = undefined;

    // ctor
    constructor() {
        try {
            this.#_map = new Map();
        } catch(e) {
            var errMsg = "DestroyCallbacks.ctor.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy all
    destroyAll() {
        try {
            this.#_map.forEach(cb => {
                cb();
            });
            this.#_map.clear();

        } catch(e) {
            var errMsg = "DestroyCallbacks.destroyAll.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 특정 item destroy
    destroy(cb) {
        try {

            if (this.#_map.has(cb) == false) { return; }
            this.#_map.delete(cb);
            cb();

        } catch (e) {
            var errMsg = "DestroyCallbacks.destroy.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // add destroy callback
    add(cb) {
        try {
            if (cb == undefined) { return; }
            
            this.#_map.set(cb, cb);

        } catch(e) {
            var errMsg = "DestroyCallbacks.add.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
}
