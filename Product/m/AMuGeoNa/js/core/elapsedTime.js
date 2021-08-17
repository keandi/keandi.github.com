class ElapsedTime {
    #_PV = {};

    constructor() {
        this.reset();
    }

    reset() {
        this.#_PV.startTime = new Date();
    }

    get Elapsed() {
        let endTime = new Date();
        return endTime - this.#_PV.startTime;
    }

}