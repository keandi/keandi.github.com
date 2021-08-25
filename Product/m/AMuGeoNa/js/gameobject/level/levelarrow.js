class LevelArrow extends GameInterval {
    #_PV = {}

    // ctor
    constructor(name, scene, x, y, width) {
        try {
            super(name, scene, 25, ()=>this.onInterval(), false);

            this.#_PV.scene = scene;
            this.#_PV.image = {
                x: x,
                y: y,
                w: width,
                obj: undefined
            };

            this.#create();

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
    destroy() {
        try {

            super.destroy();
            destroyObjects( this.#_PV.image.obj );

        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // onInterval
    onInterval() {
        try {
            if (this.#_PV.targetBlock == undefined || this.#_PV.targetCallback == undefined) {
                this.#_PV.targetBlock = undefined;
                this.#_PV.targetCallback = undefined;
                this.IsRun = false;
                return;
            }

            const moveGap = Math.abs( this.#_PV.targetBlock.CenterY - this.#_PV.image.obj.y );
            let velocity = 12;
            if (moveGap > 200) {
                velocity = 48;
            } else if (moveGap > 150) {
                velocity = 32;
            } else if (moveGap > 100) {
                velocity = 20;
            } else if (moveGap > 50) {
                velocity = 15;
            }

            if (objectMoveTowardsY(this.#_PV.image.obj, this.#_PV.targetBlock.CenterY, velocity) === true) {
                this.IsRun = false;
                this.#_PV.targetCallback(this.#_PV.targetBlock);
                this.#_PV.targetBlock = undefined;
                this.#_PV.targetCallback = undefined;
                return;
            }

            //console.log("xx: " + this.#_PV.image.obj.x + "y: " + this.#_PV.image.obj.y);

        } catch (e) {
            var errMsg = this.getExpMsg("onInterval", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // create arrow
    #create() {
        try {
            let v = this.#_PV;

            v.image.obj = v.scene.add.image( v.image.x, v.image.y, 'arrow');
            v.image.obj.setOrigin(0.5);
            v.image.obj.setDepth(DEPTH_LEVEL_ARROW);
            setPixelScaleX(v.image.obj, v.image.w, true);

        } catch (e) {
            var errMsg = this.getExpMsg("create", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // reserve move
    setTargetBlock(block, callback) {
        try {
            //console.log( stringFormat("setTargetBlock group: {0}", block.LevelGroup) );

            if (this.#_PV.targetBlock == undefined) {
                if (block.CenterY === this.#_PV.image.obj.y) {
                    //console.log("no-move");
                    return false;
                }
            }

            this.#_PV.targetCallback = callback;
            this.#_PV.targetBlock = block;

            this.reset(true);

            return true;
        } catch (e) {
            var errMsg = this.getExpMsg("setTargetBlock", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return false;
    }
}