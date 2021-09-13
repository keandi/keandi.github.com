class STSBaseCanon extends GameSprite {
    #_PV = {};

    // ctor
    constructor(name, scene, frameData, exhaustedCallback) {
        super(name, scene, frameData, false);

        try {
            let v = this.#_PV;
            let selfIt = this;
            
            v.scene = scene;
            v.frameData = frameData;
            v.exhaustedCallback = exhaustedCallback;
            v.fireCount = {
                limit: COUNTLIMIT_INFINITY,
                current: 0,
                reset: function() {
                    this.limit = COUNTLIMIT_INFINITY;
                    this.current = 0;
                },
                init: function() {
                    this.limit = selfIt.BulletLimit;
                    this.current = 0;
                },
                increase: function() {
                    if (this.limit === COUNTLIMIT_INFINITY) { return true; }
                    this.current++;
                    return (this.current >= this.limit) ? false : true; // false=더이상 사용 불가
                }
            };
            
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        super.destroy();

        this.#unregisterPointerDown();

        let v = this.#_PV;
        destroyObjects( v.waitTimer, v.sprite, v.waitPercent );
        v.sprite = v.waitPercent = v.waitTimer = undefined;
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

                // wait percent
                v.waitPercent = addText(v.scene, 0, 0, '', 12);
                v.waitPercent.setOrigin(0.5);
                v.waitPercent.setDepth(DEPTH_SHOOTTHESTARS_CANON);
                v.waitPercent.visible = false;
            }
            this.onRegisterAnimatorManager(this.getAnimatorManager(v.sprite));

            this.#_PV.fireCount.limit = this.BulletLimit;
            this.#_PV.fireCount.current = 0;
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
        try {
            this.play('ready');
        } catch (e) {
            var errMsg = this.getExpMsg("ready", e);
            console.log(errMsg);
            alert(errMsg);
        }
     }

     // fire
     fire() {
        try {
            this.play('fire');
        } catch (e) {
            var errMsg = this.getExpMsg("fire", e);
            console.log(errMsg);
            alert(errMsg);
        }
     }

     // wait
     wait() {
        try {
            this.play('wait');
        } catch (e) {
            var errMsg = this.getExpMsg("wait", e);
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
            if (value === false) {
                this.#_PV.waitPercent.visible = value;
            }
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
            this.resetState();

            this.#_PV.fireCount.init();

            this.ready();
            this.alpha = 1;
            this.#registerPointerDown();
        } catch (e) {
            var errMsg = this.getExpMsg("reset", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // remove
    remove() {
        try {
            this.#unregisterPointerDown();

            if (this.#_PV.waitTimer != undefined) { this.#_PV.waitTimer.stop(); }
            this.resetState();
            this.#_PV.fireCount.reset();
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

    // register pointer down
    #registerPointerDown() {
        try {
            let v = this.#_PV;
            let selfIt = this;
            this.#unregisterPointerDown();
            v.downEvent = v.scene.addPointerEvent('down', (pointer) => {
                if (v.spriteRect.ptInRect(pointer.x, pointer.y) === true) {
                    selfIt.enter('fire');
                }
            });
        } catch (e) {
            var errMsg = this.getExpMsg("registerPointerDown", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // unregister pointer down
    #unregisterPointerDown() {
        try {
            let v = this.#_PV;
            if (v.downEvent != undefined) {
                v.scene.removePointerEvent(v.downEvent);
                v.downEvent = undefined;
            }
        } catch (e) {
            var errMsg = this.getExpMsg("unregisterPointerDown", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // end animation
    onAnimationEnd() {
        try {
            let v = this.#_PV;
            if (v.stateMachine.Current === 'fire') {
                v.stateMachine.enter('wait');
            } else if (v.stateMachine.Current === 'wait') {
                //console.log('onAnimationEnd = ' + this.Name);
                this.#waitDisplay();
            }

        } catch (e) {
            var errMsg = this.getExpMsg("unregisterPointerDown", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // wait display
    #waitDisplay() {
        try {
            if (this.waitProcess() === true) { return; }
            //console.log('#waitDisplay = ' + this.Name);
            let v = this.#_PV;

            if (v.waitTimer == undefined) {
                v.waitTimer = new TimerOnPool('timeronpool_' + this.Name, v.scene.getTimerPool());
            }

            const waitTime = this.WaitTime;
            const interval = waitTime / 100;
            let percent = 0.00;
            v.sprite.alpha = 0.5;
            setPosition(v.waitPercent, v.sprite.x, v.sprite.y);
            v.waitPercent.setText('0');
            v.waitPercent.visible = true;
            v.waitTimer.startInterval(()=>{
                if (interval >= 20) { percent += 0.05; }
                else if (interval >= 15) { percent += 0.07; }
                else if (interval >= 10) { percent += 0.1; }
                else if (interval >= 7) { percent += 0.12; }
                else if (interval >= 5) { percent += 0.15; }
                else if (interval >= 3) { percent += 0.18; }
                else { percent += 0.20; }
                
                if (percent >= 1) {
                    v.sprite.alpha = 1;
                    v.waitPercent.visible = false;
                    if (v.waitTimer != undefined) { v.waitTimer.stop(); }
                    v.stateMachine.enter('ready');
                    //console.log('ready ok');
                }
                v.waitPercent.setText('' + parseInt(percent * 100));
            }, interval);
        } catch (e) {
            var errMsg = this.getExpMsg("waitDisplay", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // wait 처리를 sub class 에서 시도
    waitProcess() {
        return false; // 안했다.
    }

    // 대기 시간 설정. 상속 구현하여 canon 별로 처리
    get WaitTime() {
        return 6 * 1000;
    }

    // get rect
    get Sprite() {
        return this.#_PV.sprite;
    }

    // bullet limit
    get BulletLimit() {
        return COUNTLIMIT_INFINITY;
    }

    increaseFireCount() {
        try {
            let v = this.#_PV;

            if (v.fireCount.increase() === false) {
                //console.log(' fire ended !!!!');
                if (v.exhaustedCallback != undefined) {
                    v.exhaustedCallback(this);
                } else {
                    v.fireCount.init();
                }
                return;
            }

        } catch (e) {
            var errMsg = this.getExpMsg("increaseFireCount", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}