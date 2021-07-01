class BlockImage extends GOWImage {
    // ctor
    constructor(name, scene, x, y) {
        try {
            super(name);
            this.printName();

            this.setImgInfo(x, y, "blockImage").loadByPhysics(scene);
            this.setInteractive(true);
            this.setScale(4);

            this._image.setImmovable(true);
            this._image.body.setAllowGravity(false);
            this._image.body.debugShowBody = true;    
            this._image.setBounce(0.2);
            this._image.setCollideWorldBounds(true);
        } catch(e) {
            logAlert(this._name + "ctor.catched: " + e);
        }
    }

}
