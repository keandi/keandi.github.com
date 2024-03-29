class STSMissile extends STSBaseBullet {
    #_PV = {};

    // ctor
    constructor(name, scene, frameData, gameRect) {
        super(name, scene, frameData, gameRect);

        try {
            let v = this.#_PV;
            
            v.scene = scene;
            v.frameData = frameData;
            
            //
            super.initialize(); // 구현의 가장 하층에서 호출되어야 된다.
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        super.destroy();

        let v = this.#_PV;
        destroyObjects( v.moveTimer );
        v.moveTimer = undefined;
    }

    // get sprite
    getSprite() {
        try {
            let v = this.#_PV;

            if (v.sprite == undefined) {
                v.sprite = v.scene.add.sprite(0, 0, 'shootthestars_sprite', 'MISSILE');
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
        return ['MISSILE'];
    }

    // onInitialize
    onInitialize() {
        try {
            super.onInitialize();
            this.ActiveFrameName = 'MISSILE';
        } catch (e) {
            var errMsg = this.getExpMsg("onInitialize", e);
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
            v.sprite.setDepth(DEPTH_SHOOTTHESTARS_UPBULLET); // 미사일은 canon 보다 상단 레이어에 위치해야 한다.

            if (v.moveTimer == undefined) {
                v.moveTimer = new TimerOnPool('timeronpool_' + this.Name, v.scene.getTimerPool());
            }

            let upBullet = function() {
                selfIt.moveY(-20);
                return (selfIt.visible === false || selfIt.SpriteRect.Bottom <= selfIt.GameRect.Top) ? false : true;
            };

            v.moveTimer.startInterval(()=>{
                if (upBullet() === false) {
                    v.moveTimer.stop();
                    v.scene.releaseGameObject(selfIt);
                }
            }, fps(60));
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
        return 'missile';
    }
}