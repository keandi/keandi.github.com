class DestroyMap {
    #_map = undefined;  // internal map

    // ctor
    constructor() {
        try {
            this.#_map = new Map();
        } catch (e) {
            var errMsg = "DestroyMap.ctor.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // all destroy
    destroyAll() {
        try {
            this.#_map.forEach(element => {
                element.destroy();
            });
            this.#_map.clear();
        } catch (e) {
            var errMsg = "DestroyMap.ctor.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 특정 item destroy
    destroy(item) {
        try {

            if (this.#_map.has(item) == false) { return; }
            this.#_map.delete(item);
            item.destroy();

        } catch (e) {
            var errMsg = "DestroyMap.destroy.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // add item
    add(item) {
        try {

            this.#_map.set(item, item);

        } catch (e) {
            var errMsg = "DestroyMap.add.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get count
    get Count() {
        try {

            return this.#_map.length;

        } catch (e) {
            var errMsg = "DestroyMap.count.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }

        return 0;
    }
}