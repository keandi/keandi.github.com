class WebApi extends ClsObject {
    #_PV = {};

    constructor(name) {
        super(name);

        try {


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
            this.#setLocalStorage(name, value);
            
        } catch (e) {
            var errMsg = this.getExpMsg("set", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    //get
    get(name) {
        try {
            return this.#getLocalStorage(name);
        } catch (e) {
            var errMsg = this.getExpMsg("get", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // vibration
    cmdVib(level) {
        console.log("web vibration: " + level);
    }

    // ad
    cmdAd() {
        setTimeout(() => onCalledbyApp(ACMD_AD, ""), 100);
    }
}
