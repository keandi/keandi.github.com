class CameraDragManager extends ClsObject {
    #_PV = {};

    // ctor
    constructor(name) {
        try {
            super(name);

            this.#_PV.cameraDrags = new Map();
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        try {
            this.#_PV.cameraDrags.clear();

        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    get Count() {
        return this.#_PV.cameraDrags.size;
    }

    add(name, camera, bounds, boundsLimit) {
        try {

            let cameraDrag = new CameraDrag(name, camera, bounds, boundsLimit);
            this.#_PV.cameraDrags.set(camera, cameraDrag);
            return cameraDrag;
            
        } catch (e) {
            var errMsg = this.getExpMsg("add", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    remove(camera) {
        try {

            if (this.#_PV.cameraDrags.has(camera) == false) { return; }
            this.#_PV.cameraDrags.delete(camera);
            
        } catch (e) {
            var errMsg = this.getExpMsg("add", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onSceneDrag(camera, x, y) {
        try {

            if (this.#_PV.cameraDrags.has(camera) == false) { return; }
            let cameraDrag = this.#_PV.cameraDrags.get(camera);
            cameraDrag.onSceneDrag(x, y);

        } catch (e) {
            var errMsg = this.getExpMsg("onSceneDrag", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}