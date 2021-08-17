class Queue {
    #_arr = undefined;

    // ctor
    constructor() {
        this.#_arr = [];
    }

    // enque
    enque(item) {
        this.#_arr.push(item);
    }

    // deque
    deque() {
        return this.#_arr.shift();
    }

    // count
    get count() {
        return this.#_arr.length;
    }

    // clear
    clear(cb) {
        if (cb != undefined) {
            this.#_arr.array.forEach(element => {
                cb(element);
            });
        }
        this.#_arr = [];
    }
}