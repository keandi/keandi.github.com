class WAApi extends ClsObject {

    #_PV = {};

    constructor(name, appId) {

        super(name);

        try {

            this.#_PV.appId = appId;

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set data
    set(name, value) {
        //WebAppApi.sd(this.#_PV.appId, name, value);
        WebAppApi.setData(this.#_PV.appId, name, value);
    }
    
    // get data
    get(name) {
        return WebAppApi.getData(this.#_PV.appId, name);
    }

    // command
    command(type, value) {
        return WebAppApi.command(this.#_PV.appId, type, value);
    }

    // vibration
    cmdVib(level) {
        if (level == 1) {
            this.command(BCMD_VIBRATION1, "");
        }
    }

    // ad
    cmdAd() {
        this.command(ACMD_AD, "");
    }
}