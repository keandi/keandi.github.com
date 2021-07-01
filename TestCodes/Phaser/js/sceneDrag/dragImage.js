class DragImage extends GOWImage {
    // ctor
    constructor(name, scene, x, y) {
        try {
            super(name);
            this.printName();

            this.setImgInfo(x, y, "dragImage").loadByScene(scene);
            this.setInteractive(true);
        } catch(e) {
            logAlert(this._name + "ctor.catched: " + e);
        }
    }

    /*onPointerDown(x, y) {
        try {
            //alert(this._name + " - x: " + x + ", y:" + y);
            this._scene.onImgDown(this);
        } catch(e) {
            logAlert(this._name + "ctor.catched: " + e);
        }
    }*/
}
