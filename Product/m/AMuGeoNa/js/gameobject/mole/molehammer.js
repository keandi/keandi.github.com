class MoleHammer extends GameSprite {
    #_PV = {};

    // ctor
    constructor(name, scene, frameData, gameRect) {
        super(name, scene, frameData, true);

        try {
            let v = this.#_PV;
            
            v.scene = scene;
            v.frameData = frameData;
            v.gameRect = gameRect;

            super.initialize();

            v.collisionGroup = this.CollisionGroup;
            this.registerOnGroup('hammer');
            
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
    onInitialize(config) {
        try {
            super.onInitialize();

            let v = this.#_PV;
            if (v.sprite == undefined) {
                v.sprite = this.getSprite();
                v.sprite.setOrigin(0.4, 0.9);
                v.sprite.setDepth(DEPTH_MOLE_HAMMER);
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
 
             animatorManager.add('ready', {
                     asset: 'mole_sprite',
                     textures: ['HAMMER_0001'],
                     duration: frameDuration,
                     repeat: 1,
                     endCallback: ()=>selfIt.onAnimationEnd(),
                 })
                 .add('hammerdown', {
                     asset: 'mole_sprite',
                     textures: ['HAMMER_0001','HAMMER_0002','HAMMER_0003','HAMMER_0004','HAMMER_0005','HAMMER_0004','HAMMER_0003','HAMMER_0002','HAMMER_0001',],
                     duration: frameDuration,
                     repeat: 1,
                     frameCallback: (idx, name)=>selfIt.onFrameChanged(idx, name),
                     endCallback: ()=>selfIt.onAnimationEnd()
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
                v.sprite = v.scene.add.sprite(0, 0, 'mole_sprite', 'HAMMER_0001');
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
        return ['HAMMER_0001', 'HAMMER_0002', 'HAMMER_0003', 'HAMMER_0004', 'HAMMER_0005'];
    }

    // state machine 등록
    onRegisterStateMachine() {
        try {
            let v = this.#_PV;
            v.stateMachine = this.getStateMachine();

            v.stateMachine.add('ready', true)
                .addEntry('hammerdown', ()=>this.hammerdown());

            v.stateMachine.add('hammerdown')
                .addEntry('hammerdown', ()=>this.hammerdown())
                .addEntry('ready', ()=>this.ready());

        } catch (e) {
            var errMsg = this.getExpMsg("onRegisterStateMachine", e);
            console.log(errMsg);
            alert(errMsg);
        }
     }

    // ready
    ready() {
        try {
            //let v = this.#_PV;

            this.play('ready');
            this.setPosition(-200, -1000);
        } catch (e) {
            var errMsg = this.getExpMsg("ready", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // hammerdown
    hammerdown() {
        try {
            this.play('hammerdown');
        } catch (e) {
            var errMsg = this.getExpMsg("ready", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // down run
    run(x, y) {
        try {
            let v = this.#_PV;
            if (v.stateMachine.enter('hammerdown') === false) { return; }

            this.setPosition(x, y);
            this.visible = true;
        } catch (e) {
            var errMsg = this.getExpMsg("run", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // frame changed event
    onFrameChanged(frameIndex, frameName) {
        try {
            let v = this.#_PV;
            if (v.stateMachine.Current === 'hammerdown') {
                this.ActiveFrameName = frameName;
                this.recomputeSpriteRect();
            }
        } catch (e) {
            var errMsg = this.getExpMsg("onFrameChanged", e);
            console.log(errMsg);
            alert(errMsg);
       }
    }

    // end animation
    onAnimationEnd() {
        try {
            let v = this.#_PV;
            if (v.stateMachine.Current === 'hammerdown') {
                v.stateMachine.enter('ready');
            }
        } catch (e) {
            var errMsg = this.getExpMsg("onAnimationEnd", e);
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
            v.collisionGroup.checkCollisionAttackerXBody(this);

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
}