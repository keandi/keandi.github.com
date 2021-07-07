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
        let selfIt = this;
        return this.load(scene, ()=> {
            selfIt._image = scene.add.image(selfIt._imgInfo.x, selfIt._imgInfo.y, selfIt._imgInfo.key);
        });
    }

    // load on scene
    loadByPhysics(scene) {
        let selfIt = this;
        return this.load(scene, ()=> {
            selfIt._image = scene.physics.add.image(selfIt._imgInfo.x, selfIt._imgInfo.y, selfIt._imgInfo.key);
        });
    }

    load(scene, loadCallback) {
        try {
            if (this._imgInfo == undefined) {
                logAlert("Please set image info!!!");
                return false;
            }

            this.destroy();
            
            this._scene = scene;
            loadCallback();
            return true;
        } catch(e) {
            var errMsg = this._name + ".loadByPhysics.catched: " + e;
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
        return this.setScaleX(scale).setScaleY(scale);
    }

    // set scale x
    setScaleX(scale) {
        try {
            this._image.scaleX = scale;
        } catch(e) {
            logAlert(this._name + ".setScaleX.catched: " + e);
        }
        return this;
    }

    // set scale y
    setScaleY(scale) {
        try {
            this._image.scaleY = scale;
        } catch(e) {
            logAlert(this._name + ".setScaleY.catched: " + e);
        }
        return this;
    }

    // get width
    getWidth(isCurrent) {
        try {
            return (isCurrent == true) ? this._image.width * this._image.scaleX : this._image.width;
        } catch(e) {
            var errMsg = this._name + ".getWidth.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
        return 0;
    }

    // get height
    getHeight(isCurrent) {
        try {
            return (isCurrent == true) ? this._image.height * this._image.scaleY : this._image.height;
        } catch(e) {
            var errMsg = this._name + ".getHeight.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
        return 0;
    }

    // print width / height
    printSize(isCurrent) {
        console.log(stringFormat("{0}.image width: {1}, height{2}", this._name, this.getWidth(isCurrent), this.getHeight(isCurrent)));
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

    // drag enable
    setDraggable() {
        try {
            this._scene.input.setDraggable(this._image);
        } catch(e) {
            var errMsg = this._name + ".setDraggable.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get X
    getX() {
        try {
            return this._image.x;
        } catch(e) {
            var errMsg = this._name + ".getX.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get Y
    getY() {
        try {
            return this._image.y;
        } catch(e) {
            var errMsg = this._name + ".getY.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set X
    setX(x) {
        try {
            this._image.x = x;
        } catch(e) {
            var errMsg = this._name + ".setX.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }

        return this;
    }

    // set Y
    setY(y) {
        try {
            this._image.y = y;
        } catch(e) {
            var errMsg = this._name + ".setY.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }

        return this;
    }

    // move to x, y
    moveTo(x, y) {
        try {
            this._image.x = x;
            this._image.y = y;
        } catch(e) {
            var errMsg = this._name + ".setY.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }

        return this;
    }

    // offset X
    offsetX(x) {
        try {
            this._image.x += x;
        } catch(e) {
            var errMsg = this._name + ".offsetX.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }

        return this;
    }

    // offset Y
    offsetY(y) {
        try {
            this._image.y += y;
        } catch(e) {
            var errMsg = this._name + ".offsetY.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }

        return this;
    }

    // print x, y
    printXY() {
        try {
            console.log(this._name + ".image x: " + this.getX() + ", y: " + this.getY());
        } catch(e) {
            var errMsg = this._name + ".printXY.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set rotate
    setRotate(val) {
        try {
            this._image.rotation = val;
        } catch(e) {
            var errMsg = this._name + ".setRotate.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // increase rotate
    incRotate(val) {
        try {
            this._image.rotation += val;
        } catch(e) {
            var errMsg = this._name + ".setRotate.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get rotate
    getRotate() {
        try {
            return this._image.rotation;
        } catch(e) {
            var errMsg = this._name + ".setRotate.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
}

