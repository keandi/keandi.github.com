class FireBase extends GOWImage {
    // ctor
    constructor(name, scene, x, y) {
        try {
            super(name);
            this.printName();

            this.setImgInfo(x, y, "FireBase").loadByScene(scene);
        } catch(e) {
            logAlert(this._name + "ctor.catched: " + e);
        }
    }

    resetPosition() {
        this.setX(this._oriCoord.x).setY(this._oriCoord.y);
    }

}
