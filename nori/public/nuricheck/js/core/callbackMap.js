class CallbackMap extends ClsObject {
    #_PV = {};

    //ctor
    constructor(name) {
        try {
            super(name);

            this.#_PV.map = new Map();

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
    destroy() {
        try {
            this.#_PV.map.clear();
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    //get count
    get Count() {
        try {
            return this.#_PV.map.size;
        } catch (e) {
            var errMsg = this.getExpMsg("Count", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    add(cb) {
        try {

            this.#_PV.map.set(cb, cb);

        } catch (e) {
            var errMsg = this.getExpMsg("add", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    remove(cb) {
        try {

            if (this.#_PV.map.has(cb) == false) { return; }
            this.#_PV.map.delete(cb);

        } catch (e) {
            var errMsg = this.getExpMsg("remove", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    forEach(cb) {
        try {
            this.#_PV.map.forEach(element => {
                cb(element);
            });
        } catch (e) {
            var errMsg = this.getExpMsg("forEach", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}