class GOSelectImageButton extends DestroyableObject {
    #_PV = {};

    // ctor
    constructor(name, scene, x, y, maxSize, texture, frame, selectValue, selectCallback) {
        super(name, scene);

        try {
            this.#_PV.scene = scene;
            this.#_PV.coords = {
                x: x,
                y: y,
                maxSize: maxSize,
            };
            this.#_PV.scale = {
                select: 1,
                unselect: 0.8
            }
            this.#_PV.textureInfo = {
                texture: texture,
                frame: frame
            };
            this.#_PV.image = undefined;
            this.#_PV.select = {
                value: selectValue,
                cb: selectCallback
            };
            this.#_PV.pointerEvents = {};

            // 
            if (this.#create() == false) {
                alert( stringFormat("{0} create failed.", this._name) );
                return;
            }
            this.#registerPointerEvent();
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
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
            let v = this.#_PV;
            let image = this.#_PV.scene.add.image(v.coords.x, v.coords.y, v.textureInfo.texture, v.textureInfo.frame);
            image.setOrigin(0.5);

            setPixelScaleXorY(image, v.coords.maxSize);
            v.scale.select = image.scaleX;
            v.scale.unselect = v.scale.select - 0.15;

            v.image = image;
            this.select(false);

            return (this.#_PV.image == undefined || this.#_PV.image == null) ? false : true;
        } catch (e) {
            var errMsg = this.getExpMsg("create", e);
            console.log(errMsg);
            alert(errMsg);
        }
        return false;
    }

    // register pointer event
    #registerPointerEvent() {
        try {
            let selfIt = this;
            let v = this.#_PV;

            //
            this.#_PV.image.setInteractive();

            // pointerdown
            this.#_PV.pointerEvents.down = this.#_PV.image.on('pointerdown', (pointer, x, y, event) => {
                selfIt.select(true);
                v.select.cb(v.select.value);
            });

        } catch (e) {
            var errMsg = this.getExpMsg("registerPointerEvent", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // select/unselect
    select(isSelect) {
        try {
            this.#_PV.image.alpha = (isSelect === false) ? 0.5 : 1;
            setScale( this.#_PV.image, (isSelect === false) ? this.#_PV.scale.unselect : this.#_PV.scale.select );
        } catch (e) {
            var errMsg = this.getExpMsg("unselect", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get value
    get Value() {
        return this.#_PV.select.value;
    }

    // set depth
    setDepth(value) {
        this.#_PV.image.setDepth(value);
    }

    // set visible
    set Visible(value) {
        this.#_PV.image.visible = value;
    }
}