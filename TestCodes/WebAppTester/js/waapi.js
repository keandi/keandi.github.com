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
    setData(name, value) {
        //WebAppApi.sd(this.#_PV.appId, name, value);
        WebAppApi.setData(this.#_PV.appId, name, value);
    }
    
    // get data
    getData(name) {
        return WebAppApi.getData(this.#_PV.appId, name);
    }

    // command
    command(type, value) {
        return WebAppApi.command(this.#_PV.appId, type, value);
    }

    // vib
    cmdVib() {
        this.command("DxV1", "");
    }
}