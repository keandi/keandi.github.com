class ClsObject {
    #_PV = {};

    constructor(name) {
        this.#_PV.name = name;
    }

    printName(preText) {
        if (preText != undefined) {
            if (preText.length > 0) {
                console.log(preText + ": " + this.#_PV.name);
                return;
            }
        }
        console.log(this.#_PV.name);
    }

    // get exception error
    getExpMsg(f, e) {
        return this.#_PV.name + "." + f + ".catched: " + e;
    }

    // get name
    get Name() {
        return this.#_PV.name;
    }
}