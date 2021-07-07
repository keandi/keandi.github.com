class GCBallImage extends GOWImage {
    // ctor
    constructor(name, scene, x, y) {
        try {
            super(name);
            this.printName();

            this.setImgInfo(x, y, "groupCollision_BALL").loadByPhysics(scene);
            
            this._image.setImmovable(true);
            this._image.body.setAllowGravity(false);
            this._image.body.debugShowBody = true;    
            this._image.setBounce(0.2);
            this._image.setCollideWorldBounds(false);
            
            this.setInteractive(true);
            this.setScale(1);

        } catch(e) {
            var errMsg = this._name + "ctor.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
}
