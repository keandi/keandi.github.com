class CoinTextAction extends ClsObject {
    #_PV = {};

    // ctor
    constructor(name, scene, x, y, isAdd) {
        super(name);

        try {
            this.#_PV.scene = scene;
            this.#_PV.coords = {
                x: x,
                y: y
            };
            this.#_PV.isAdd = isAdd;
            this.#_PV.text = undefined;

            // 
            this.#create();
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
    destroy() {
        let v = this.#_PV;

        this.#clearTimer();

        destroyObject( v.text );
        v.text = undefined;
    }

    //clear timer
    #clearTimer() {
        try {
            let v = this.#_PV;
            if (v.timerId != undefined) {
                //console.log("coin action timer remove: " + v.timerId);
                v.scene.getTimerPool().remove(v.timerId);
                v.timerId = undefined;
            }
        } catch (e) {
            var errMsg = this.getExpMsg("clearTimer", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // create image
    #create() {
        try {
            let v = this.#_PV;

            v.text = addText(v.scene, v.coords.x, v.coords.y, " ", FONTSIZE_COINACTIONTEXT, (v.isAdd === true) ? COLOR_ADDCOIN_TEXT : COLOR_USECOIN_TEXT);
            v.text.setDepth( DEPTH_COIN_ACTION_TEXT );

        } catch (e) {
            var errMsg = this.getExpMsg("create", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // action end
    #endAction() {
        try {
            this.#clearTimer();
            let v = this.#_PV;

            v.scene.releaseGameObject(this);

        } catch (e) {
            var errMsg = this.getExpMsg("endAction", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // action
    run(coin) {
        try {

            let selfIt = this;
            let v = this.#_PV;
            let timerPool = v.scene.getTimerPool();
            this.#clearTimer();

            let text = ((v.isAdd === false) ? "-" : "+" ) + numberWithCommas(coin) + "G";
            v.text.setText( text );
            v.text.alpha = 1;
            setPosition(v.text, v.coords.x, v.coords.y);

            v.timerId = timerPool.setInterval(() => {
                if (objectMoveTowardsY(v.text, 0, VELOCITY_COINTEXT) === true) {
                    selfIt.#endAction();
                    return;
                } 

                v.text.alpha -= OPACITY_COINACTIONTEXT_DECREASE;
                if (v.text.alpha <= OPACITY_COINACTIONTEXT_MIN) {
                    selfIt.#endAction();
                    return;
                }
            }, INTERVAL_COINTEXT_MOVE);
            //console.log("coin action timer start: " + v.timerId);

        } catch (e) {
            var errMsg = this.getExpMsg("run", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set depth
    setDepth(value) {
        this.#_PV.text.setDepth(value);
    }

    // set visible
    set visible(value) {
        this.#_PV.text.visible = value;
    }
}