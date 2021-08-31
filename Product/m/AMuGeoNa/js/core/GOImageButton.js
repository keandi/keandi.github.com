class GOImageButton extends DestroyableObject {
    #_PV = {};

    // ctor
    constructor(name, scene, x, y, normalTexture, normalFrame, pressTexture, pressFrame, fireCallback, isSuperControl) {
        super(name, scene);

        try {
            this.#_PV.scene = scene;
            this.#_PV.position = {
                x: x,
                y: y
            };
            this.#_PV.textureInfo = {
                normalTexture: normalTexture,
                normalFrame: normalFrame,
                pressTexture: pressTexture,
                pressFrame: pressFrame
            };
            this.#_PV.fireCallback = fireCallback;
            this.#_PV.image = undefined;
            this.#_PV.buttonRect = new Rect();
            this.#_PV.pointerEvents = {};
            this.#_PV.isSuperControl = (isSuperControl === true) ? true : false;

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

            if (pointerEvents.up != undefined) {
                pointerEvents.up = undefined;
                if (this.#_PV.image != undefined) {
                    this.#_PV.image.off('pointerup');
                }
            }

            if (pointerEvents.move != undefined) {
                this.#_PV.scene.removePointerEvent(pointerEvents.move);
                pointerEvents.move = undefined;
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
            this.#_PV.image = this.#_PV.scene.add.image(this.#_PV.position.x, this.#_PV.position.y, this.#_PV.textureInfo.normalTexture, this.#_PV.textureInfo.normalFrame);
            this.#_PV.image.setOrigin(0.5);

            return (this.#_PV.image == undefined || this.#_PV.image == null) ? false : true;
        } catch (e) {
            var errMsg = this.getExpMsg("create", e);
            console.log(errMsg);
            alert(errMsg);
        }
        return false;
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
            let fireCb = this.#_PV.fireCallback;
            let buttonRc = this.#_PV.buttonRect;

            let isPressed = false;

            // scene pause 처리
            let ifPause = function() {
                if (selfIt.#_PV.isSuperControl === true) { return false; }
                if (scene.isPause() === true || scene.isUILocked() === true) {
                    if (isPressed === false) {
                        image.setTexture(textureInfo.normalTexture, textureInfo.normalFrame);
                        isPressed = false;
                    }
                    return true;
                }
                return false;
            }

            // down image
            let setDown = function() {
                if (ifPause() === true) { return; }
                if (isPressed == true) { return; }
                isPressed = true;
                image.setTexture(textureInfo.pressTexture, textureInfo.pressFrame);
            }

            // up image
            let setUp = function(isCancel) {
                if (ifPause === true) { return; }
                if (isPressed == false) { return; }
                isPressed = false;

                image.setTexture(textureInfo.normalTexture, textureInfo.normalFrame);
                
                if (isCancel == false) {
                    setTimeout(() => fireCb() , 1);
                }
            }


            //
            this.#_PV.image.setInteractive();

            // pointerdown
            this.#_PV.pointerEvents.down = image.on('pointerdown', (pointer, x, y, event) => {
                setDown();
            });

            // pointerup
            this.#_PV.pointerEvents.up = image.on('pointerup', (pointer, x, y, event) => {
                setUp(false);
            });

            this.#_PV.pointerEvents.move = this.#_PV.scene.addPointerEvent('move', (pointer)=>{
                //console.log( stringFormat( "move pointer - x: {0}, y: {1}", pointer.x, pointer.y) );
                if (buttonRc.ptInRect(pointer.x, pointer.y) == false) {
                    if (isPressed == true) {
                        setUp(true);
                    }
                }
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
}