class ClsObject {
    constructor(name) {
        this._name = name;
    }
    printName(preText) {
        if (preText != undefined) {
            if (preText.length > 0) {
                console.log(preText + ": " + this._name);
                return;
            }
        }
        console.log(this._name);
    }
    
    // get exception error
    getExpMsg(f, e) {
        return this._name + "." + f + ".catched: " + e;
    }
}