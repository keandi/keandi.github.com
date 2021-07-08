class DestroyCallbacks {
    #_arr = undefined;

    // ctor
    constructor() {
        try {
            this.#_arr = [];
        } catch(e) {
            var errMsg = "DestroyCallbacks.ctor.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy all
    destroyAll() {
        try {
            this.#_arr.forEach((cb) => {
                cb();
            });
            this.#_arr = [];

        } catch(e) {
            var errMsg = "DestroyCallbacks.destroyAll.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // add destroy callback
    add(cb) {
        try {
            if (cb == undefined) { return; }

            this.#_arr.push(cb);

        } catch(e) {
            var errMsg = "DestroyCallbacks.add.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
}