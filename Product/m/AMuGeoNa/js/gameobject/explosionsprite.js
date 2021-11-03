class ExplosionSprite extends GameSprite {
    #_PV = {};

    // ctor
    constructor(name, scene, frameData, atlasName, explosionName, exhaustedCallback) {
        super(name, scene, frameData, false);

        try {
            let v = this.#_PV;
            let selfIt = this;
            
            v.scene = scene;
            v.frameData = frameData;
            v.explosionName = explosionName;
            v.atlasName = atlasName;
            v.exhaustedCallback = exhaustedCallback;

            this.initialize();
            
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        super.destroy();
    }

    // onInitialize
    onInitialize() {
        try {
            super.onInitialize();

            let v = this.#_PV;
            if (v.sprite == undefined) {
                v.sprite = this.getSprite();
                v.sprite.setOrigin(0.5);
                v.sprite.setDepth(DEPTH_GAMEEFFECT_TOP);
            }
            this.onRegisterAnimatorManager(this.getAnimatorManager(v.sprite));
        } catch (e) {
            var errMsg = this.getExpMsg("onInitialize", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get sprite
    getSprite() {
        try {
            let v = this.#_PV;

            if (v.sprite == undefined) {
                v.sprite = v.scene.add.sprite(0, 0, v.atlasName, v.explosionName + '_0000');
            }

            return v.sprite;
        } catch (e) {
            var errMsg = this.getExpMsg("getSprite", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

     // animator 등록
     onRegisterAnimatorManager(animatorManager) {
        try {
            let v = this.#_PV;
            let selfIt = this;

            animatorManager.add('explosion', {
                    asset: v.atlasName,
                    prefix: v.explosionName,
                    start: 0,
                    end: 6,
                    duration: fps(60),
                    repeat: 1,
                    endCallback: ()=>v.exhaustedCallback(selfIt),
                });
        } catch (e) {
             var errMsg = this.getExpMsg("onRegisterAnimatorManager", e);
             console.log(errMsg);
             alert(errMsg);
         }
     }
     
     // explosion
     explosion() {
        try {
            this.play('explosion');
        } catch (e) {
            var errMsg = this.getExpMsg("explosion", e);
            console.log(errMsg);
            alert(errMsg);
        }
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

    // recompute collision rect
    recomputeSpriteRect() {
        try {
            //nothing

        } catch (e) {
            var errMsg = this.getExpMsg("recomputeSpriteRect", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get sprite rect
    get SpriteRect() {
        return this.#_PV.spriteRect;
    }

    // reset
    reset() {
        try {
            this.alpha = 1;
            this.visible = true;
            this.explosion();
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

    // get rect
    get Sprite() {
        return this.#_PV.sprite;
    }

    // set position event
    onSetPosition(x, y) {
        try {
            this.#_PV.sprite.x = x;
            this.#_PV.sprite.y = y;
        } catch (e) {
            var errMsg = this.getExpMsg("onSetPosition", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

}