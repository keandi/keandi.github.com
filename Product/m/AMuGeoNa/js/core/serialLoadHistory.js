class SerialLoadHistory extends ClsObject {
    #_PV = {};

    // ctor
    constructor(name) {
        super(name);

        try {
            this.#_PV.history = new Map();
        } catch (e) {
            var m = this.getExpMsg("ctor", e);
            console.log(m);
            alert(m);
        }
    }

    // reserved asset key
    set ReservedKey(key) {
        this.#_PV.assetKey = key;
    }

    // add complete asset key
    addReservedKey() {
        try {
            if (this.#_PV.assetKey == undefined) {
                //console.log("no reserved-key");
                return; 
            }

            this.#_PV.history.set(this.#_PV.assetKey, true);
            this.#_PV.assetKey = undefined;
        } catch (e) {
            var m = this.getExpMsg("addReservedKey", e);
            console.log(m);
            alert(m);
        }
    }

    // 로딩 확인
    isLoadedAsset(key) {
        try {
            return this.#_PV.history.has(key);
        } catch (e) {
            var m = this.getExpMsg("isLoadedAsset", e);
            console.log(m);
            alert(m);
        }
    }
}