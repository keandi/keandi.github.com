class GOWImage extends ClsObject {
    // ctor
    constructor(name) {
        super(name);
    }

    // image load info set
    setImgInfo(x, y, key) {
        try {
            this._imgInfo = {
                x: x,
                y: y,
                key: key
            };
        } catch(e) {
            var errMsg = this._name + ".setImgInfo.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }

        return this;
    }

    // destroy
    destroy() {
        try {
            if (this._image != undefined) {
                this.unregisterPointerDown();

                this._image.destroy();
                this._image = undefined;
            }
        } catch(e) {
            var errMsg = this._name + ".destroy.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // load on scene
    loadByScene(scene) {
        try {
            if (this._imgInfo == undefined) {
                logAlert("Please set image info!!!");
                return false;
            }

            this.destroy();
            
            this._scene = scene;
            this._image = scene.add.image(this._imgInfo.x, this._imgInfo.y, this._imgInfo.key);
            return true;
        } catch(e) {
            var errMsg = this._name + ".loadByScene.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }

        return false;
    }

    // set z-order
    setZOrder(order) {
        try {
            this._image.setDepth(order);
        } catch(e) {
            logAlert(this._name + ".setZOrder.catched: " + e);
        }
    }

    // set scale
    setScale(scale) {
        try {
            this._image.scaleX = scale;
            this._image.scaleY = scale;
        } catch(e) {
            logAlert(this._name + ".setScale.catched: " + e);
        }
    }

    // set alpha
    setAlpha(alpha) {
        try {
            this._image.alpha = alpha;
        } catch(e) {
            logAlert(this._name + ".setAlpha.catched: " + e);
        }
    }

    // register pointerdown event
    registerPointerDown() {
        try {
            this.unregisterPointerDown();

            let selfIt = this;
            this._image.on('pointerdown', (pointer, x, y, event) => {
                selfIt.onPointerDown(pointer.x, pointer.y);
            });
        } catch(e) {
            logAlert(this._name + ".registerPointerDown.catched: " + e);
        }
    }

    // unregister pointerdown event
    unregisterPointerDown() {
        try {
            this._image.off('pointerdown');
        } catch(e) {
            logAlert(this._name + ".registerPointerDown.catched: " + e);
        }
    }

    onPointerDown(x, y) {
        // nothing
    }

    // set interactive
    setInteractive(enable) {
        try {
            if (enable == false)
                this._image.setInteractive(false);
            else
                this._image.setInteractive();
        } catch(e) {
            logAlert(this._name + ".setInteractive.catched: " + e);
        }
    }

    // image == ?
    isThat(img) {
        if (img == undefined) { return false; }
        return (img == this._image) ? true : false;
    }
}

