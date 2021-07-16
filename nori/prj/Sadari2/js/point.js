class Point {
    #_x = 0;
    #_y = 0;

    constructor(x, y) {
        if (x == undefined) { x = 0; }
        if (y == undefined) { y = 0; }
        this.set(x, y);
    }

    set(x, y) {
        this.#_x = x;
        this.#_y = y;
    }

    set X(x) {
        this.#_x = x;
    }

    set Y(y) {
        this.#_y = y;
    }

    get X() {
        return this.#_x;
    }

    get Y() {
        return this.#_y;
    }
}