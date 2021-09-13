class STSBaseBullet extends GameSprite {
    #_PV = {};

    // ctor
    constructor(name, scene, frameData, gameRect) {
        super(name, scene, frameData, false);

        try {
            let v = this.#_PV;
            
            v.scene = scene;
            v.frameData = frameData;
            v.gameRect = gameRect;
            
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        super.destroy();

        let v = this.#_PV;
        destroyObjects( v.sprite );
        v.sprite = undefined;
    }

    // onInitialize
    onInitialize() {
        try {
            super.onInitialize();

            let v = this.#_PV;
            if (v.sprite == undefined) {
                v.sprite = this.getSprite();
                v.sprite.setOrigin(0.5);
                v.sprite.setDepth(DEPTH_SHOOTTHESTARS_BULLET);
            }
        } catch (e) {
            var errMsg = this.getExpMsg("onInitialize", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

     // get sprite
     getSprite() {
         // 상속 하여 반환 필요
         console.log('not implement - getSprite');
         return undefined;
     }

    //////////////////////////////////
    //// <!-- visible (상속 구현 필요)
    set visible(value) {
        try {
            this.#_PV.sprite.visible = value;
        } catch (e) {
            var errMsg = this.getExpMsg("set_visible", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    get visible() {
        try {
            return this.#_PV.sprite.visible;
        } catch (e) {
            var errMsg = this.getExpMsg("get_visible", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
    //// visible -->
    //////////////////////////////////

    // set x
    set X(value) {
        try {
            if (this.#_PV.sprite.x != value) {
                this.#_PV.sprite.x = value;
                this.#onChangedPosition();
            }
        } catch (e) {
            var errMsg = this.getExpMsg("set_X", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get x
    get X() {
        try {
            return this.#_PV.sprite.x;
        } catch (e) {
            var errMsg = this.getExpMsg("get_X", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set y
    set Y(value) {
        try {
            if (this.#_PV.sprite.y != value) {
                this.#_PV.sprite.y = value;
                this.#onChangedPosition();
            }
        } catch (e) {
            var errMsg = this.getExpMsg("set_Y", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get y
    get Y() {
        try {
            return this.#_PV.sprite.y;
        } catch (e) {
            var errMsg = this.getExpMsg("get_Y", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // changed position
    #onChangedPosition() {
        try {
            let v = this.#_PV;
            if (v.spriteRect == undefined) {
                v.spriteRect = new Rect();
            }

            v.spriteRect.Width = v.sprite.width;
            v.spriteRect.Height = v.sprite.height;
            v.spriteRect.X = v.sprite.x - (v.sprite.width / 2);
            v.spriteRect.Y = v.sprite.y - (v.sprite.height / 2);

            this.IsNeedCollisionRect = true;
        } catch (e) {
            var errMsg = this.getExpMsg("onChangedPosition", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get sprite rect
    get SpriteRect() {
        return this.#_PV.spriteRect;
    }

    ///////////////////////////////
    //// <!-- need collision rect recompute

    // set need collision rect recompute
    set IsNeedCollisionRect(value) {
        try {
            let v = this.#_PV;

            v.isNeedCollisionRectRecompute = value;
        } catch (e) {
            var errMsg = this.getExpMsg("set_IsNeedCollisionRect", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get need collision rect recompute
    get IsNeedCollisionRect() {
        try {
            return (v.isNeedCollisionRectRecompute === false) ? false : true;
        } catch (e) {
            var errMsg = this.getExpMsg("get_IsNeedCollisionRect", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    //// collision rect -->
    ///////////////////////////////

    // reset
    reset() {
        try {

        } catch (e) {
            var errMsg = this.getExpMsg("reset", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // remove
    remove() {
        try {

        } catch (e) {
            var errMsg = this.getExpMsg("remove", e);
            console.log(errMsg);
            alert(errMsg);
        } 
    }

    //////////////////////////////////
    //// <!-- alpha

    // set
    set alpha(value) {
        try {
            this.#_PV.sprite.alpha = value;
        } catch (e) {
            var errMsg = this.getExpMsg("set_alpha", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get
    get alpha() {
        try {
            return this.#_PV.sprite.alpha;
        } catch (e) {
            var errMsg = this.getExpMsg("get_alpha", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
    //// alpha -->
    //////////////////////////////////

    // get game rect
    get GameRect() {
        return this.#_PV.gameRect;
    }

    // run
    run(x, y) {
        //상속 구현 필요
        console.log("Not implement - run !!!");
    }
}