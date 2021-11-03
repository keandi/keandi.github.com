class STSBulletExplosion extends STSBaseBullet {
    #_PV = {};

    // ctor
    constructor(name, scene, frameData, gameRect, exhaustedCallback) {
        super(name, scene, frameData, gameRect);

        try {
            let v = this.#_PV;
            let selfIt = this;
            
            v.scene = scene;
            v.frameData = frameData;
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
            this.onRegisterAnimatorManager(this.getAnimatorManager(this.#_PV.sprite));
        } catch (e) {
            var errMsg = this.getExpMsg("onInitialize", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get all framenames
    get AllFrameNames() {
        return makePrefixNumNames('EX', 0, 15, '_', 4);
    }

    // get sprite
    getSprite() {
        try {
            let v = this.#_PV;

            if (v.sprite == undefined) {
                v.sprite = v.scene.add.sprite(0, 0, 'explosion_sprite_02', 'EX_0000');
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
                    asset: 'explosion_sprite_02',
                    prefix: 'EX',
                    start: 0,
                    end: 15,
                    duration: fps(60),
                    repeat: 1,
                    frameCallback: (idx, name)=>selfIt.onFrameChanged(idx, name),
                    endCallback: ()=>v.exhaustedCallback(selfIt),
                });
        } catch (e) {
             var errMsg = this.getExpMsg("onRegisterAnimatorManager", e);
             console.log(errMsg);
             alert(errMsg);
         }
     }

     // frame changed event
    onFrameChanged(frameIndex, frameName) {
        try {
            this.ActiveFrameName = frameName;
            this.recomputeSpriteRect();
        } catch (e) {
            var errMsg = this.getExpMsg("onFrameChanged", e);
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

    // get sprite rect
    get SpriteRect() {
        return this.#_PV.spriteRect;
    }

    // reset
    reset() {
        try {
            this.alpha = 1;
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

    // run
    run(x, y) {
        try {
            let v = this.#_PV;
            let selfIt = this;

            setPosition(v.sprite, x, y);
            this.visible = true;
            v.sprite.setDepth(DEPTH_GAMEEFFECT_TOP);

            this.explosion();
        } catch (e) {
            var errMsg = this.getExpMsg("run", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // strength
    get Strength() {
        return 50; // 탄마다 별도 처리
    }

    // get object kind
    get ObjectKind() {
        return 'explosion';
    }

}