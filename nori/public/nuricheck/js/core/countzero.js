class CountZero {
    #_PV = {};

    //ctor
    constructor(name, current, zeroCallback) {
        try {
            this.#_PV.name = name;
            this.#_PV.current = current;
            this.#_PV.zeroCallback = zeroCallback;
            
        } catch (e) {
            var errMsg = this.#_PV.name + ".ctor.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    //set current
    set Count(value) {
        this.#_PV.current = value;
    }

    //get current
    get Count() {
        return this.#_PV.current;
    }

    //count decrease
    decrease() {
        try {
            if (this.#_PV.current > 0) {
                this.#_PV.current--;
            }

            if (this.#_PV.current <= 0) {
                this.#_PV.zeroCallback();
            }
        } catch (e) {
            var errMsg = this.#_PV.name + ".decrease.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }

        return this.#_PV.current;
    }
}