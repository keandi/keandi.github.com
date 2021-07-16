class MaxCounter {
    #_max = 0;
    #_current = 0;

    constructor(max) {
        this.#_max = max;
    }

    Add(value) {
        this.#_current += value;
    }

    Increase() {
        this.Add(1);
    }

    Decrease() {
        this.Add(-1);
    }

    get IsMaxOver() {
        return (this.#_current >= this.#_max) ? true : false;
    }

    print() {
        console.log("counter: " + this.#_current + ", max: " + this.#_max);
    }

}