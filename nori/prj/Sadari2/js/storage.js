class Storage extends ClsObject {
    #_PV = {};

    constructor(name) {
        super(name);

        try {

            this.#_PV.os = getOSType();
            this.#_PV.app = getAppType();

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }  
    }

    #setLocalStorage(name, value) {
        localStorage[name] = value;
    }
    
    #getLocalStorage(name) {
        var value = localStorage[name];
        return (value == null || value == undefined) ? "" : value;
    }

    //set
    set(name, value) {
        try {
            if (this.#_PV.app.value == AppType.WEBAPPTESTER.value) {
                _webapp_api.setData(name, value);
            } else {
                this.#setLocalStorage(name, value);
            }
            
        } catch (e) {
            var errMsg = this.getExpMsg("set", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    //get
    get(name) {
        try {
            if (this.#_PV.app.value == AppType.WEBAPPTESTER.value) {
                return _webapp_api.getData(name);
            } else {
                return this.#getLocalStorage(name);
            }
        } catch (e) {
            var errMsg = this.getExpMsg("get", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}
