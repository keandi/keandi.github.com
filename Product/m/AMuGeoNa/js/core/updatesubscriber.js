class UpdateSubcriber extends ClsObject {
    #_PV = {};

    //ctor
    constructor(name, scene, isEntrustDestroy) {
        try {
            super(name);

            this.#_PV.scene = scene;

            ////
            scene.subscribeUpdate(this);

            if (isEntrustDestroy === true) { scene.addDestroyableObject(this); }

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
    destroy() {
        try {
            this.#_PV.scene.unsubscribeUpdate(this);
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // update (상속하여 사용)
    update() {
        //
    }
}
