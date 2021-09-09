class STSBaseCanon extends GameSprite {
    #_PV = {};

    // ctor
    constructor(name, scene, frameData) {
        super(name, scene, frameData, false);

        try {
            let v = this.#_PV;
            
            v.scene = scene;
            v.frameData = frameData;
            
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
                v.sprite.setDepth(DEPTH_SHOOTTHESTARS_CANON);
            }
            this.onRegisterAnimatorManager(this.getAnimatorManager(v.sprite));
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

            v.stateMachine.add('ready', true)
                .addEntry('fire', ()=>this.fire())
                .addEntry('explosion', ()=>this.explosion());

            v.stateMachine.add('fire')
                .addEntry('wait', ()=>this.wait())
                .addEntry('explosion', ()=>this.explosion());

            v.stateMachine.add('wait')
                .addEntry('ready', ()=>this.wait())
                .addEntry('explosion', ()=>this.explosion());

        } catch (e) {
            var errMsg = this.getExpMsg("onRegisterStateMachine", e);
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

     // animator 등록
     onRegisterAnimatorManager(animatorManager) {
        // 상속 구현 필요
     }
     
     // ready
     ready() {
        console.log('not implement - ready');
     }

     // fire
     fire() {
        console.log('not implement - fire');
     }

     // wait
     wait() {
        console.log('not implement - wait');
     }

     // explosion
     explosion() {
        console.log('not implement - explosion');
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
        } catch (e) {
            var errMsg = this.getExpMsg("onChangedPosition", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // reset
    reset() {
        try {
            this.resetState();
            this.play('ready');
        } catch (e) {
            var errMsg = this.getExpMsg("reset", e);
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

    // register pointer down
    #registerPointerDown() {
        try {
            let v = this.#_PV;
            let selfIt = this;
            v.downEvent = v.scene.addPointerEvent('down', (pointer) => {
                if (v.spriteRect.ptInRect(pointer.x, pointer.y) === true) {
                    selfIt.entry('fire');
                }
            });
        } catch (e) {
            var errMsg = this.getExpMsg("get_alpha", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}