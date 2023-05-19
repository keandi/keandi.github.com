class Point {
    #_PV = {};
    constructor(x, y) {
        this.#_PV.x = x;
        this.#_PV.y = y;
    }

    // set x
    set X(value) {
        this.#_PV.x = value;
    }

    // get x
    get X() {
        return this.#_PV.x;
    }

    // set y
    set Y(value) {
        this.#_PV.y = value;
    }

    // get y
    get Y() {
        return this.#_PV.y;
    }

    // set x, y
    set(x, y) {
        this.X = x;
        this.Y = y;
    }

    // equal
    isEqualPoint(point) {
        return (this.X === point.X && this.Y === point.Y) ? true : false;
    }

    // equal
    isEqual(x, y) {
        return (this.X === x && this.Y === y) ? true : false;
    }
}