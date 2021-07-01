class BallImage extends GOWImage {
    // ctor
    constructor(name, scene, x, y, isDragBall) {
        try {
            super(name);
            this.printName();

            this.setImgInfo(x, y, "ballImage").loadByPhysics(scene);
            
            if (isDragBall != true)
            {
                this._image.setImmovable(true);
                this._image.body.setAllowGravity(false);
                this._image.body.debugShowBody = true;    
                this._image.setBounce(0.2);
                this._image.setCollideWorldBounds(false);
                
                this.setInteractive(true);
                this.setScale(2);
            }
            else
            {
                this.setScale(5);
                this.setAlpha(0.5);
            }

            this._oriCoord = {
                x: x,
                y: y
            };
        } catch(e) {
            logAlert(this._name + "ctor.catched: " + e);
        }
    }

    resetPosition() {
        this.setX(this._oriCoord.x).setY(this._oriCoord.y);
    }

}
