class GOImageSwitch extends DestroyableObject {
    #_PV = {};

    // ctor
    constructor(name, scene, x, y, offTexture, offFrame, offCallback, onTexture, onFrame, onCallback, isSuperControl) {
        super(name, scene);

        try {
            this.#_PV.scene = scene;
            this.#_PV.position = {
                x: x,
                y: y
            };
            this.#_PV.textureInfo = {
                offTexture: offTexture,
                offFrame: offFrame,
                onTexture: onTexture,
                onFrame: onFrame
            };
            this.#_PV.offCallback = offCallback;
            this.#_PV.onCallback = onCallback;
            this.#_PV.image = undefined;
            this.#_PV.buttonRect = new Rect();
            this.#_PV.pointerEvents = {};
            this.#_PV.isSuperControl = (isSuperControl === true) ? true : false;
            this.#_PV.isOn = false;

            // 
            if (this.#create() == false) {
                alert( stringFormat("{0} create failed.", this._name) );
                return;
            }
            this.#recomputeRect();
            this.#registerPointerEvent();
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        let pointerEvents = this.#_PV.pointerEvents;

        if (pointerEvents != undefined) {
            if (pointerEvents.down != undefined) {
                pointerEvents.down = undefined;
                if (this.#_PV.image != undefined) {
                    this.#_PV.image.off('pointerdown');
                }
            }
        }

        this.#_PV.pointerEvents = undefined;

        // image
        if (this.#_PV.image != undefined) {
            this.#_PV.image.destroy();
            this.#_PV.image = undefined;
        }
    }

    // create image
    #create() {
        try {
            this.#_PV.image = this.#_PV.scene.add.image(this.#_PV.position.x, this.#_PV.position.y, this.#_PV.textureInfo.offTexture, this.#_PV.textureInfo.offFrame);
            this.#_PV.image.setOrigin(0.5);

            return (this.#_PV.image == undefined || this.#_PV.image == null) ? false : true;
        } catch (e) {
            var errMsg = this.getExpMsg("create", e);
            console.log(errMsg);
            alert(errMsg);
        }
        return false;
    }

    // set scale x
    setScaleXPixel(x, isAutoYScale) {
        try {
            let v = this.#_PV;
            setPixelScaleX(v.image, x, isAutoYScale);
        } catch (e) {
            var errMsg = this.getExpMsg("setScaleXPixel", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set scale xy
    setScaleXY(x, y) {
        try {
            let v = this.#_PV;
            setPixelScaleX(v.image, x, false);
            setPixelScaleY(v.image, y, false);
        } catch (e) {
            var errMsg = this.getExpMsg("setScaleXY", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set scale y
    setScaleYPixel(y, isAutoXScale) {
        try {
            let v = this.#_PV;
            setPixelScaleY(v.image, x, isAutoXScale);
        } catch (e) {
            var errMsg = this.getExpMsg("setScaleYPixel", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // recompute area
    #recomputeRect() {
        try {
            let image = this.#_PV.image;
            let rc = this.#_PV.buttonRect;
            
            rc.X = image.x - (image.width / 2);
            rc.Y = image.y - (image.height / 2);
            rc.Width = image.width;
            rc.Height = image.height;
        } catch (e) {
            var errMsg = this.getExpMsg("recomputeRect", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // register pointer event
    #registerPointerEvent() {
        try {
            let selfIt = this;
            let scene = this.#_PV.scene;
            let textureInfo = this.#_PV.textureInfo;
            let image = this.#_PV.image;
            let buttonRc = this.#_PV.buttonRect;

            //
            this.#_PV.image.setInteractive();

            // pointerdown
            this.#_PV.pointerEvents.down = image.on('pointerdown', (pointer, x, y, event) => {
                selfIt.switch();
            });

        } catch (e) {
            var errMsg = this.getExpMsg("registerPointerEvent", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set depth
    setDepth(value) {
        this.#_PV.image.setDepth(value);
    }

    // set visible
    set visible(value) {
        this.#_PV.image.visible = value;
    }

    // get on
    get IsOn() {
        var ison = this.#_PV.isOn;
        return (ison === true) ? true : false;
    }

    // get off
    get IsOff() {
        return (this.#_PV.isOn === true) ? false : true;
    }

    // set on off
    setOnOff(isOn, isIgnoreCallback) {
        try {
            if (this.IsPause === true) { return; }

            let v = this.#_PV;
            v.isOn = isOn;
            let cb = undefined;

            if (isOn === true)
            {
                v.image.setTexture(v.textureInfo.onTexture, v.textureInfo.onFrame);
                cb = this.#_PV.onCallback;
            }
            else
            {
                v.image.setTexture(v.textureInfo.offTexture, v.textureInfo.offFrame);
                cb = this.#_PV.offCallback;
            }

            if (isIgnoreCallback === true || cb == undefined) {return;}
            setTimeout(() => cb() , 100);

        } catch (e) {
            var errMsg = this.getExpMsg("setOnOff", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // switch
    switch() {
        try {
            this.setOnOff( (this.#_PV.isOn === true) ? false : true );
        } catch (e) {
            var errMsg = this.getExpMsg("switch", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // is pause scene
    get IsPause() {
        try {
            let v = this.#_PV;

            if (v.isSuperControl === true) { return false; }
            return (v.scene.isPause() === true || v.scene.isUILocked() === true) ? true : false;
        } catch (e) {
            var errMsg = this.getExpMsg("IsPause", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}