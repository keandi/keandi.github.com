class MoleTarget extends GameSprite {
    #_PV = {};

    // ctor
    constructor(name, scene, frameData, targetMoleIndex, gameRect, endCallback) {
        super(name, scene, frameData, true);

        try {
            let v = this.#_PV;
            
            v.scene = scene;
            v.frameData = frameData;
            v.gameRect = gameRect;
            v.targetMoleIndex = targetMoleIndex;
            v.endCallback = endCallback;

            // sprite text
            {
                v.spriteText = '';
                if (targetMoleIndex == INDEX_MOLE_COLOR_BLUE) {
                    v.spriteText = 'MOLE_BLUE';
                } else if (targetMoleIndex == INDEX_MOLE_COLOR_GREEN) {
                    v.spriteText = 'MOLE_GREEN';
                } else if (targetMoleIndex == INDEX_MOLE_COLOR_PURPLE) {
                    v.spriteText = 'MOLE_PURPLE';
                } else if (targetMoleIndex == INDEX_MOLE_COLOR_RED) {
                    v.spriteText = 'MOLE_RED';
                } else if (targetMoleIndex == INDEX_MOLE_COLOR_YELLOW) {
                    v.spriteText = 'MOLE_YELLOW';
                }
            }

            // run y compute value set
            {
                var sourceSize = frameData.frames.get(v.spriteText).sourceSize;
                v.runYValues = {
                    computeStart: sourceSize.h / 2,
                    computeEnd: - sourceSize.h,
                    moveSpeed: 0,
                    stayDuration: 0,
                    top: 0,
                    bottom: 0,
                };

                var level = _gameData.EntryGameLevelInfo.gamelevel;
                
                v.runYValues.moveSpeed = 3 + (level - 1);
                if (v.runYValues.moveSpeed > 20) { v.runYValues.moveSpeed = 20; }
                v.runYValues.stayDuration = 1500 - ((level - 1) * 42);
                if (v.runYValues.stayDuration < 25) { v.runYValues.stayDuration = 25; }
            }

            super.initialize();

            v.collisionGroup = this.CollisionGroup;
            this.registerOnGroup('mole');
            
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

        this.#clearMoveTimer();
    }

    // onInitialize
    onInitialize(config) {
        try {
            super.onInitialize();

            let v = this.#_PV;
            if (v.sprite == undefined) {
                v.sprite = this.getSprite();
                v.sprite.setOrigin(0.5);
            }
            this.onRegisterAnimatorManager(this.getAnimatorManager(v.sprite));

            let isFullX = (config == undefined) ? false : config.isFullX;
            let isFullY = (config == undefined) ? false : config.isFullY;

            v.collisionData = new CollisionData('collisionData_' + this.Name, v.scene, v.frameData, this.AllFrameNames, this, isFullX, isFullY);
        } catch (e) {
            var errMsg = this.getExpMsg("onInitialize", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // animator 등록
    onRegisterAnimatorManager(animatorManager) {
        try {
            let v = this.#_PV;
            let selfIt = this;
            const frameDuration = fps(60);

            animatorManager.add('appear', {
                asset: 'mole_sprite',
                textures: [v.spriteText],
                duration: frameDuration,
                repeat: 1,
                endCallback: ()=>selfIt.onAnimationEnd(),
            });
        } catch (e) {
             var errMsg = this.getExpMsg("onRegisterAnimatorManager", e);
             console.log(errMsg);
             alert(errMsg);
         }
     }

     // get sprite
     getSprite() {
        try {
            let v = this.#_PV;

            if (v.sprite == undefined) {
                v.sprite = v.scene.add.sprite(0, 0, 'mole_sprite', v.spriteText);
            }

            return v.sprite;
        } catch (e) {
            var errMsg = this.getExpMsg("getSprite", e);
            console.log(errMsg);
            alert(errMsg);
        }
     }

    // get all framenames
    get AllFrameNames() {
        return [this.#_PV.spriteText];
    }

    // state machine 등록
    onRegisterStateMachine() {
        try {
            let v = this.#_PV;
            v.stateMachine = this.getStateMachine();

            v.stateMachine.add('appear', true)
                .addEntry('play', ()=>this.play());

            v.stateMachine.add('play')
                .addEntry('up', ()=>this.up());

            v.stateMachine.add('up')
                .addEntry('stay', ()=>this.stay())
                .addEntry('down', ()=>this.down());

            v.stateMachine.add('stay')
                .addEntry('down', ()=>this.down());

            v.stateMachine.add('down')
                .addEntry('disappear', ()=>this.disappear());

            v.stateMachine.add('disappear')
            .addEntry('appear', ()=>this.appear());

        } catch (e) {
            var errMsg = this.getExpMsg("onRegisterStateMachine", e);
            console.log(errMsg);
            alert(errMsg);
        }
     }

    // appear
    appear() {
        try {
            //let v = this.#_PV;
            this.play('appear');
        } catch (e) {
            var errMsg = this.getExpMsg("appear", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // play
    play() {
        try {
            let v = this.#_PV;
            if (v.stateMachine.enter('up') === false) { return; }
        } catch (e) {
            var errMsg = this.getExpMsg("play", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // up
    up() {
        try {
            let v = this.#_PV;
            console.log("let's up");
            let selfIt = this;
            let timer = this.#getMoveTimer();
            const duration = fps(60);
            const velocity = Phaser.Math.Between(v.runYValues.moveSpeed, v.runYValues.moveSpeed + 7);
            //console.log("move velocity: " + velocity);

            timer.startInterval(()=>{

                var res = objectMoveTowardsY(v.sprite, v.runYValues.top, velocity);
                this.recomputeSpriteRect();
                if (res == true)
                {
                    selfIt.#clearMoveTimer();
                    console.log("up ended");
                    v.stateMachine.enter('stay');
                    return;
                }

                //console.log("up y: " + v.sprite.y);
            }, duration);
            

        } catch (e) {
            var errMsg = this.getExpMsg("up", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // stay
    stay() {
        try {
            let v = this.#_PV;
            let selfIt = this;
            console.log("let's stay");
            let timer = this.#getMoveTimer();
            const duration = Phaser.Math.Between(v.runYValues.stayDuration, v.runYValues.stayDuration + 50);

            timer.startTimeout(()=>{
                selfIt.#clearMoveTimer();
                console.log("stay ended");
                v.stateMachine.enter('down');
            }, duration);

        } catch (e) {
            var errMsg = this.getExpMsg("stay", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // down
    down() {
        try {
            let v = this.#_PV;
            console.log("let's down");
            let selfIt = this;
            let timer = this.#getMoveTimer();
            const duration = fps(60);
            const velocity = Phaser.Math.Between(v.runYValues.moveSpeed, v.runYValues.moveSpeed + 7);
            //console.log("move velocity: " + velocity);

            timer.startInterval(()=>{

                var res = objectMoveTowardsY(v.sprite, v.runYValues.bottom, velocity);
                this.recomputeSpriteRect();
                if (res == true)
                {
                    selfIt.#clearMoveTimer();
                    console.log("down ended.");
                    v.stateMachine.enter('disappear');
                    return;
                }

                //console.log("up y: " + v.sprite.y);
            }, duration);

        } catch (e) {
            var errMsg = this.getExpMsg("down", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // disappear
    disappear() {
        try {
            let v = this.#_PV;
            console.log("let's disappear");
            this.#clearMoveTimer();
            this.setPosition(-100, -1000);
            this.visible = false;
            v.endCallback(this);
        } catch (e) {
            var errMsg = this.getExpMsg("disappear", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // run
    run(x, y, depth) {
        try {
            let v = this.#_PV;

            this.ActiveFrameName = v.spriteText;

            v.stateMachine.reset();

            v.sprite.setDepth(depth);

            y += v.runYValues.computeStart;
            v.runYValues.top = y + v.runYValues.computeEnd;
            v.runYValues.bottom = y;

            this.setPosition(x, y);
            this.visible = true;

            if (v.stateMachine.enter('play') === false) { return; }
        } catch (e) {
            var errMsg = this.getExpMsg("run", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // frame changed event
    onFrameChanged(frameIndex, frameName) {
        try {
            //let v = this.#_PV;
            
        } catch (e) {
            var errMsg = this.getExpMsg("onFrameChanged", e);
            console.log(errMsg);
            alert(errMsg);
       }
    }

    // end animation
    onAnimationEnd() {
        try {
            /*let v = this.#_PV;
            if (v.stateMachine.Current === 'appear') {
                this.ActiveFrameName = v.spriteText;
            }*/
        } catch (e) {
            var errMsg = this.getExpMsg("onAnimationEnd", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set active collision frame
    set ActiveFrameName(value) {
        try {
            this.#_PV.collisionData.ActiveFrameName = value;
        } catch (e) {
            var errMsg = this.getExpMsg("ActiveFrameName", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    //////////////////////////////////
    //// <!-- visible (상속 구현 필요)
    set visible(value) {
        try {
            this.#_PV.sprite.visible = value;
            this.#_PV.collisionData.IsSkip = !value;
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

    // 좌표가 변경되었는지 여부
    isChangedXY(x, y) {
        return (this.#_PV.sprite.x != x || this.#_PV.sprite.y != y) ? true : false;
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
            let v = this.#_PV;
            if (v.spriteRect == undefined) {
                v.spriteRect = new Rect();
            }

            v.spriteRect.Width = v.sprite.width;
            v.spriteRect.Height = v.sprite.height;
            v.spriteRect.X = v.sprite.x - (v.sprite.width / 2);
            v.spriteRect.Y = v.sprite.y - (v.sprite.height / 2);

            v.collisionData.setRecomputeFlag();
            //v.collisionData.forcedRecomputeActiveFrame();
            //v.collisionGroup.checkCollisionAttackerXBody(this);

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

    // set active collision frame
    set ActiveFrameName(value) {
        try {
            this.#_PV.collisionData.ActiveFrameName = value;
        } catch (e) {
            var errMsg = this.getExpMsg("ActiveFrameName", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get collision data
    get CollisionData() {
        return this.#_PV.collisionData;
    }

    // get index
    get MoleIndex() {
        return this.#_PV.targetMoleIndex;
    }

    #clearMoveTimer() {
        try {
            let v = this.#_PV;
            destroyObject( v.moveTimer );
            v.moveTimer = undefined;
        } catch (e) {
            var errMsg = this.getExpMsg("clearMoveTimer", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    #getMoveTimer() {
        try {
            this.#clearMoveTimer();

            let v = this.#_PV;
            if (v.moveTimer == undefined) {
                v.moveTimer = new TimerOnPool('timeronpool_' + this.Name, v.scene.getTimerPool());
            }

            return v.moveTimer;
        } catch (e) {
            var errMsg = this.getExpMsg("getMoveTimer", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}