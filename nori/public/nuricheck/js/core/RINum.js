class RINum {
    #_begin = 0;
    #_increase = 0;
    #_max = 0;
    #_current = 0;

    constructor(begin, increase, max) {
        try {
            this.#_begin = begin;
            this.#_increase = increase;
            this.#_max = max;

            this.#_current = this.#_begin;
        } catch(e) {
            var errMsg = "RINum.ctor.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    get Current() {
        return this.#_current;
    }

    get Next() {
        this.#_current += this.#_increase;
        if (this.#_current > this.#_max) {
            this.#_current = this.#_begin;
        }

        return this.#_current;
    }
}

//export { RINum };