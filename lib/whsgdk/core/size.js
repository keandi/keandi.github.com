class Size {
    #_PV = {};
    constructor(cx, cy) {
        this.#_PV.cx = cx;
        this.#_PV.cy = cy;
    }

    // set x
    set CX(value) {
        this.#_PV.cx = value;
    }

    // get x
    get CX() {
        return this.#_PV.cx;
    }

    // set y
    set CY(value) {
        this.#_PV.cy = value;
    }

    // get y
    get CY() {
        return this.#_PV.cy;
    }

    // set x, y
    set(cx, cy) {
        this.CX = cx;
        this.CY = cy;
    }
}