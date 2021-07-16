class EvtLock extends ClsObject {
    constructor(name) {
        super(name);
    }

    //// <!-- drag lock
    #_isDragLock = false;
    get IsDragLock() {
        return this.#_isDragLock;
    }
    set IsDragLock(value) {
        //console.log("IsDragLock: " + value)
        this.#_isDragLock = value;
    }
    //// drag lock -->

    //// <!-- button click lock
    #_isButtonClickLock = false;
    get IsButtonClickLock() {
        return this.#_isButtonClickLock;
    }
    set IsButtonClickLock(value) {
        this.#_isButtonClickLock = value;
    }
    //// button click lock -->

}



