class BlockImage extends GOWImage {
    // ctor
    constructor(name, scene, x, y, isEffectBlock) {
        try {
            super(name);
            this.printName();

            if (isEffectBlock == true)
            {
                this.setImgInfo(x, y, "blockImage").loadByScene(scene);

                let selfIt = this;
                let alpha = 0.5;
                let scale = 4;

                this.setAlpha(alpha);
                this.setScale(scale);
                let effectTimer = setInterval(() => {
                    alpha -= 0.1;
                    if (alpha <= 0.0) {
                        selfIt.destroy();
                        return;
                    }

                    selfIt.setAlpha(alpha);

                    scale += 0.2;
                    selfIt.setScale(scale);
                }, 60);
            }
            else
            {
                this.setImgInfo(x, y, "blockImage").loadByPhysics(scene);
                this.setInteractive(true);
                this.setScale(4);
    
                this._image.setImmovable(true);
                this._image.body.setAllowGravity(false);
                this._image.body.debugShowBody = true;    
                this._image.setBounce(0.2);
                this._image.setCollideWorldBounds(true);
            }
        } catch(e) {
            logAlert(this._name + "ctor.catched: " + e);
        }
    }

}
