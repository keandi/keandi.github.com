class GameData extends ClsObject {
    #_PV = {};

    // ctor
    constructor(name) {
        try {
            super(name);

            this.#_PV.data = {};
            this.read();

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // read
    read() {
        try {
            var data = _browserComm.getObject(DATANAME_GAME);
            if (data == undefined) {
                this.#_PV.data.gold = 0;
                this.#_PV.data.lastLevel = 0;
            } else {
                if (data.gold == undefined || data.gold <= 0) {
                    this.#_PV.data.gold = 0;
                } else {
                    this.#_PV.data.gold = data.gold;
                }

                if (data.lastLevel == undefined || data.lastLevel < 0) {
                    this.#_PV.data.gold = 0;
                } else {
                    this.#_PV.data.lastLevel = data.lastLevel;
                }
            }

        } catch (e) {
            var errMsg = this.getExpMsg("read", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get gold
    get Gold() {
        return this.#_PV.data.gold;
    }

    // get last level
    get LastLevel() {
        return this.#_PV.data.lastLevel;
    }

    // use gold
    useGold(v) {
        try {
            if (v <= 0) { return; }
            this.#goldApply(-v);
        } catch (e) {
            var errMsg = this.getExpMsg("useGold", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // add gold
    addGold(v) {
        try {
            if (v <= 0) { return; }
            this.#goldApply(v);
        } catch (e) {
            var errMsg = this.getExpMsg("addGold", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    #goldApply(v) {
        try {
            this.#_PV.data.gold += v;
            if (this.#_PV.data.gold < 0) {
                this.#_PV.data.gold = 0;
            }
        } catch (e) {
            var errMsg = this.getExpMsg("goldApply", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}