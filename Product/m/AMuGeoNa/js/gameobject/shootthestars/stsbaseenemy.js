class STSBaseEnemy extends GameSprite {
    #_PV = {};

    // ctor
    constructor(name, scene, frameData, gameRect, getoutCallback) {
        super(name, scene, frameData, false);

        try {
            let v = this.#_PV;
            
            v.scene = scene;
            v.frameData = frameData;
            v.gameRect = gameRect;
            v.getoutCallback = getoutCallback;

            super.GroupTag = 'enemy';
            
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        super.destroy();

        let v = this.#_PV;
        destroyObjects( v.waitTimer, v.sprite, v.waitPercent );
        v.sprite = v.waitPercent = v.waitTimer = undefined;
    }

    // onInitialize
    onInitialize() {
        try {
            super.onInitialize();

            let selfIt = this;
            let v = this.#_PV;
            if (v.sprite == undefined) {
                v.sprite = this.getSprite();
                v.sprite.setOrigin(0.5);
                v.sprite.setDepth(DEPTH_SHOOTTHESTARS_ENEMY);
            }
            this.onRegisterAnimatorManager(this.getAnimatorManager(v.sprite));

            if (v.hp == undefined) {
                v.hp = new PointManager('hp_' + this.Name, this.MaxHP, ()=>{
                    selfIt.explosion();
                });
            } else {
                v.hp.resetMax(this.MaxHP);
            }

            v.collisionData = new CollisionData('collisionData_' + this.Name, v.scene, v.frameData, this.AllFrameNames, this);
        } catch (e) {
            var errMsg = this.getExpMsg("onInitialize", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // state machine 등록
    onRegisterStateMachine() {
        try {
            let v = this.#_PV;
            v.stateMachine = this.getStateMachine();

            v.stateMachine.add('patrol', true)
                .addEntry('attack', ()=>this.fire())
                .addEntry('explosion', ()=>this.explosion());

            v.stateMachine.add('attack')
                .addEntry('explosion', ()=>this.explosion());

        } catch (e) {
            var errMsg = this.getExpMsg("onRegisterStateMachine", e);
            console.log(errMsg);
            alert(errMsg);
        }
     }

     // get all framenames
     get AllFrameNames() {
         console.log("not implement - AllFrameNames !!!");
     }

     // get sprite
     getSprite() {
         // 상속 하여 반환 필요
         console.log('not implement - getSprite');
         return undefined;
     }

     // animator 등록
     onRegisterAnimatorManager(animatorManager) {
        // 상속 구현 필요
     }
     
     // patrol
     patrol() {
        try {
            this.play('patrol');
        } catch (e) {
            var errMsg = this.getExpMsg("patrol", e);
            console.log(errMsg);
            alert(errMsg);
        }
     }

     // attack
     attack() {
        try {
            this.play('attack');
        } catch (e) {
            var errMsg = this.getExpMsg("attack", e);
            console.log(errMsg);
            alert(errMsg);
        }
     }

     // explosion
     explosion() {
        try {
            console.log('I`m die');
            //this.play('explosion');
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

    // set x
    set X(value) {
        this.setX(value);
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

    // get width
    get W() {
        return this.#_PV.sprite.width;
    }

    // get height
    get H() {
        return this.#_PV.sprite.height;
    }

    // set y
    set Y(value) {
        this.setY(value);
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

    // set position event
    onSetPosition(x, y) {
        try {
            setPosition(this.#_PV.sprite, x, y);
        } catch (e) {
            var errMsg = this.getExpMsg("onSetPosition", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // recompute collision rect
    recomputeSpriteRect() {
        try {
            let v = this.#_PV;
            if (v.spriteRect == undefined) {
                v.spriteRect = new Rect();
            }

            v.spriteRect.Width = v.sprite.width;
            v.spriteRect.Height = v.sprite.height;
            v.spriteRect.X = v.sprite.x - (v.sprite.width / 2);
            v.spriteRect.Y = v.sprite.y - (v.sprite.height / 2);

            v.collisionData.setRecomputeFlag();
            v.collisionData.forcedRecomputeAllArea();

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
            this.resetState();
            this.patrol();
            this.alpha = 1;
            this.#_PV.hp.resetMax(this.MaxHP);

            this.recomputeSpriteRect();
        } catch (e) {
            var errMsg = this.getExpMsg("reset", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // remove
    remove() {
        try {
            if (this.#_PV.waitTimer != undefined) { this.#_PV.waitTimer.stop(); }
            this.resetState();

            //console.log("remove object = " + this.Name);
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

    // end animation
    onAnimationEnd() {
        try {
            let v = this.#_PV;
            

        } catch (e) {
            var errMsg = this.getExpMsg("onAnimationEnd", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get rect
    get Sprite() {
        return this.#_PV.sprite;
    }

    // HP max
    get MaxHP() {
        return 1;
    }

    // get hp info
    get HPInfo() {
        return this.#_PV.hp;
    }

    // get game rect
    get GameRect() {
        return this.#_PV.gameRect;
    }

    // get out event
    getOut() {
        try {
            let v = this.#_PV;
            
            if (v.getoutCallback == undefined) { return; }
            v.getoutCallback(this);

        } catch (e) {
            var errMsg = this.getExpMsg("getOut", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}