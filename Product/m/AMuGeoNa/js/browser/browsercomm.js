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

    #getDataName(name) {
        return _browser.appId + "+" + name;
    }

    // set data
    set(name, value) {
        name = this.#getDataName(name);
        this.#_PV.api.set(name, value);
    }
    
    // get data
    get(name) {
        name = this.#getDataName(name);
        return this.#_PV.api.get(name);
    }

    // set data (object)
    setObject(name, obj) {
        var value = JSON.stringify(obj);
        this.set(name, value);
    }
    
    // get data (object)
    getObject(name) {
        try {
            var value = this.get(name);
            return JSON.parse(value);
        } catch (e) {
            console.log("browsercomm.getObject: " + e);
        }
        return undefined
    }
}