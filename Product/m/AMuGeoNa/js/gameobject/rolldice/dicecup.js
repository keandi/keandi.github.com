class DiceCup extends DestroyableObject {
    #_PV = {};

    // ctor
    constructor(name, scene, x, bottom, hideBottom, maxSize) {
        super(name, scene);

        try {
            this.#_PV.scene = scene;
            this.#_PV.coords = {
                x: x,
                bottom: bottom,
                hideBottom: hideBottom,
                maxSize: maxSize
            };

            // 
            this.#create();
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        super.destroy();

        this.#clearTimer();
        destroyObjects( this.#_PV.image );
    }

    // create image
    #create() {
        try {

            let v = this.#_PV;

            v.image = v.scene.add.image(v.coords.x, v.coords.bottom, 'dice_sprite', 'CUP');
            setPixelScaleXorY(v.image, v.coords.maxSize);
            v.image.setDepth(DEPTH_ROLLDICE_CUP);
            v.image.setOrigin(0.5, 1);

        } catch (e) {
            var errMsg = this.getExpMsg("create", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // timer clear
    #clearTimer() {
        try {
            let v = this.#_PV;
            if (v.timerId == undefined) { return; }
            let timerPool = v.scene.getTimerPool();
            timerPool.remove(v.timerId);
            v.timerId = undefined;
        } catch (e) {
            var errMsg = this.getExpMsg("clearTimer", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 컵 위로 이동
    moveToTop(finishCallback) {
        try {
            this.#clearTimer();

            let selfIt = this;
            let v = this.#_PV;
            let timerPool = v.scene.getTimerPool();

            v.timerId = timerPool.setInterval( ()=> {
                if (objectMoveTowardsY(v.image, v.coords.hideBottom, VELOCITY_DICECUP_UP) === true) {
                    selfIt.#clearTimer();
                    finishCallback();
                }
            }, INTERVAL_DICECUP_UP_MOVE);

            
        } catch (e) {
            var errMsg = this.getExpMsg("moveToTop", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 컵 아래로 이동
    moveToDown() {
        try {
            this.#clearTimer();

            let selfIt = this;
            let v = this.#_PV;
            let timerPool = v.scene.getTimerPool();

            v.timerId = timerPool.setInterval( ()=> {
                if (objectMoveTowardsY(v.image, v.coords.bottom, VELOCITY_DICECUP_DOWN) === true) {
                    selfIt.#clearTimer();
                }
            }, INTERVAL_DICECUP_DOWN_MOVE);

            
        } catch (e) {
            var errMsg = this.getExpMsg("moveToDown", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 강제 컵 이동
    forcedMoveToBottom() {
        try {
            this.#clearTimer();

            let v = this.#_PV;
            
            v.image.y = v.coords.bottom;

            
        } catch (e) {
            var errMsg = this.getExpMsg("forcedMoveToBottom", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}