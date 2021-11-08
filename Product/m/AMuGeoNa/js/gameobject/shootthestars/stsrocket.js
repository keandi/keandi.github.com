class STSRocket extends STSBaseCanon {
    #_PV = {};

    // ctor
    constructor(name, scene, frameData, fireCallback, exhaustedCallback) {
        super(name, scene, frameData, exhaustedCallback);

        try {
            let v = this.#_PV;            
            v.scene = scene;
            v.frameData = frameData;
            v.fireCallback = fireCallback;
            
            //
            super.initialize(); // 구현의 가장 하층에서 호출되어야 된다.
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        try {
            super.destroy();

            let v = this.#_PV;

            destroyObjects( v.missile );
            v.missile = undefined;
        } catch (e) {
            var errMsg = this.getExpMsg("onInitialize", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // onInitialize
    onInitialize() {
        try {
            super.onInitialize();
            this.ActiveFrameName = 'ROCKET'
        } catch (e) {
            var errMsg = this.getExpMsg("onInitialize", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get all framenames
    get AllFrameNames() {
        return ['ROCKET','DESTROYED_ROCKET'];
    }

    // get sprite
    getSprite() {
        try {
            let v = this.#_PV;
            let canonSprite = v.scene.add.sprite(0, 0, 'shootthestars_sprite', 'ROCKET');

            // missile
            v.missile = v.scene.add.sprite(0, 0, 'shootthestars_sprite', 'MISSILE');
            v.missile.setOrigin(0.5);
            v.missile.setDepth(DEPTH_SHOOTTHESTARS_CANON);
            v.missile.visible = false;

            return canonSprite;
        } catch (e) {
            var errMsg = this.getExpMsg("getSprite", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return undefined;
    }

    // animator 등록
    onRegisterAnimatorManager(animatorManager) {
       try {
           let v = this.#_PV;
           let selfIt = this;
           const fps = 16 / 1000;

            animatorManager.add('ready', {
                    asset: 'shootthestars_sprite',
                    textures: ['ROCKET'],
                    duration: fps,
                    repeat: 1,
                    endCallback: ()=>selfIt.onAnimationEnd(),
                })
                .add('fire', {
                    asset: 'shootthestars_sprite',
                    textures: ['ROCKET'],
                    duration: fps,
                    repeat: 8,
                    frameCallback: (idx, name)=>selfIt.onFrameChanged(idx, name),
                    endCallback: ()=>selfIt.onAnimationEnd()
                })
                .add('wait', {
                    asset: 'shootthestars_sprite',
                    textures: ['ROCKET'],
                    duration: fps,
                    repeat: 1,
                    endCallback: ()=>selfIt.onAnimationEnd(),
                })
                .add('explosion', {
                    asset: 'shootthestars_sprite',
                    textures: ['DESTROYED_ROCKET'],
                    duration: fps,
                    repeat: 1,
                    frameCallback: (idx, name)=>selfIt.onFrameChanged(idx, name),
                    endCallback: ()=>selfIt.onAnimationEnd(),
                });
       } catch (e) {
            var errMsg = this.getExpMsg("onRegisterAnimatorManager", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 대기 시간 설정. 상속 구현하여 canon 별로 처리
    get WaitTime() {
        return 5000;
    }

    // bullet limit
    get BulletLimit() {
        return 4; //missile 의 경우 원하는 수치 +1로 해줘야 한다.
    }

    // frame changed event
    onFrameChanged(frameIndex, frameName) {
        // 상속 구현 필요
        //console.log( stringFormat('not implement - onFrameChanged - idx[{0}], name[{1}]', frameIndex, frameName) );

        this.ActiveFrameName = frameName;
        this.recomputeSpriteRect();
    }

    // fire
    fire() {
        try {
            this.play('fire');
            //if (this.enter('fire') != true) { return; }

            let spriteRect = this.SpriteRect;
            let v = this.#_PV;

            v.missile.visible = false;

            v.fireCallback(v.missile.x, v.missile.y);
            //console.log("rocket fire~~~");
        } catch (e) {
            var errMsg = this.getExpMsg("fire", e);
            console.log(errMsg);
            alert(errMsg);
        }
     }
    
    // ready
    ready() {
        try {
            if (this.increaseFireCount() === true) { return; }
            this.play('ready');

            let spriteRect = this.SpriteRect;
            let v = this.#_PV;

            setPosition(v.missile, spriteRect.CenterX - 3, spriteRect.CenterY + 4);

            v.missile.visible = true;

            //console.log("rocket ready~~~");
        } catch (e) {
            var errMsg = this.getExpMsg("ready", e);
            console.log(errMsg);
            alert(errMsg);
        }
     }

    // visible
    set visible(value) {
        try {
            super.visible = value;

            if (value === false) {
                this.#_PV.missile.visible = value;
            }
        } catch (e) {
            var errMsg = this.getExpMsg("set_visible", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // explosion
    explosion() {
        try {
            super.explosion();
            this.#_PV.missile.visible = false;
        } catch (e) {
            var errMsg = this.getExpMsg("explosion", e);
            console.log(errMsg);
            alert(errMsg);
        }
     }
}