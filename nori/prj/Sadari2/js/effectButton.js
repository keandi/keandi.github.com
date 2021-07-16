class EffectButton extends ClsObject {
    #_cb = undefined;
    #_scene = undefined;
    #_image = undefined;
    #_isPreClicked = false;

    constructor(name, x, y, texture, scene, depth, cb) {
        super(name)

        try {

            this.#_scene = scene;
            this.#_cb = cb;

            // this
            let selfIt = this;

            // add image
            this.#_image = this.#_scene.add.image(x, y, texture);
            //this.#_image.x = this.#_image.width / 2;
            //this.#_image.y = this.#_image.height / 2;
            this.#_image.setDepth(depth);

            // register button event
            this.#_image.setInteractive();
            this.#_image.on('pointerdown', (pointer, x, y, event) => {
                selfIt.onClick(pointer);
            });

            // print name
            //this.printName();

        } catch(e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        try {

            this.#_image.disableInteractive();
            this.#_image.off('pointerdown');
            this.#_image.destroy();

        } catch(e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // on click
    onClick(pointer) {
        try {
            if (this.#_isPreClicked == true) { return; }

            //
            this.#_scene.firedObjectPointerEvt(pointer);

            // check event
            if (this.#_isSuperLevel != true) {
                if (_evtLock.IsButtonClickLock == true) { return; }
            }

            //
            this.#_isPreClicked = true;
            _evtLock.IsDragLock = true;

            // this
            let selfIt = this;
            let alpha = 1.0;
            let scale = 1.0;
            let motionImg = undefined;
            let onMotion = function() {
                if (motionImg == undefined) {
                    motionImg = selfIt.#_scene.add.image(selfIt.#_image.x, selfIt.#_image.y, selfIt.#_image.texture);
                }

                alpha -= 0.1;
                scale += 0.05;

                if (alpha <= 0) {
                    clearInterval(timerId);

                    motionImg.destroy();
                    motionImg = undefined;
                    
                    selfIt.#_isPreClicked = false;
                    _evtLock.IsDragLock = false;
                    selfIt.#_cb();
                    return;
                }

                motionImg.alpha = alpha;
                motionImg.scaleX = scale;
                motionImg.scaleY = scale;
            }
            let timerId = setInterval(() => onMotion(), 25);

        } catch(e) {
            var errMsg = this.getExpMsg("onClick", e);
            console.log(errMsg);
            alert(errMsg);
        }
        
    }

    set visible(value) {
        try {
            this.#_image.visible = value;
        } catch(e) {
            var errMsg = this.getExpMsg("visible", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    setXY(x, y) {
        try {
            this.#_image.x = x;
            this.#_image.y = y;
        } catch(e) {
            var errMsg = this.getExpMsg("setXY", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    get Width() {
        try {
            return this.#_image.width;
        } catch(e) {
            var errMsg = this.getExpMsg("Width", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    get Height() {
        try {
            return this.#_image.height;
        } catch(e) {
            var errMsg = this.getExpMsg("Height", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set depth
    setDepth(depth) {
        try {
            this.#_image.setDepth(depth);
        } catch(e) {
            var errMsg = this.getExpMsg("Height", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    ///// <!-- super level button
    #_isSuperLevel = false;
    set IsSuperLevel(value) {
        this.#_isSuperLevel = value;
    }
    ///// super level button -->
}