class TimeOut extends ClsObject {

    #_PV = {};

    // ctor
    constructor(name) {

        super(name);

        try {


        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
    destroy() {
        try {
            if (this.#_PV.timer == undefined) { return; }
            clearTimeout(this.#_PV.timer);
            this.#_PV.timer = undefined;
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set timeout
    set(callback, timeout) {
        try {
            this.destroy();

            this.#_PV.timer = setTimeout(()=>callback(), timeout);
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}