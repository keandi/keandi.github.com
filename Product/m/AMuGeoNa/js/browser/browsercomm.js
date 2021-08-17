class BrowserComm extends ClsObject {

    #_PV = {};

    // ctor
    constructor(name) {

        super(name);

        try {

            if (_browser.isApp === true) {
                this.#_PV.api = new WAApi("webappapi", _browser.appId);
            } else {
                this.#_PV.api = new WebApi("webapi");    
            }

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set data
    set(name, value) {
        this.#_PV.api.set(name, value);
    }
    
    // get data
    get(name) {
        return this.#_PV.api.get(name);
    }

    // set data (object)
    setObject(name, obj) {
        var value = JSON.stringify(obj);
        this.#_PV.api.set(name, value);
    }
    
    // get data (object)
    getObject(name) {
        try {
            var value = this.#_PV.api.get(name);
            return JSON.parse(value);
        } catch (e) {
            console.log("browsercomm.getObject: " + e);
        }
        return undefined
    }
}