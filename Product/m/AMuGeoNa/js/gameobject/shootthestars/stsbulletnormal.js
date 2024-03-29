class STSBulletNormal extends STSBaseBullet {
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

    // onInitialize
    onInitialize() {
        try {
            super.onInitialize();
            this.ActiveFrameName = 'BULLET';
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
                v.sprite = v.scene.add.sprite(0, 0, 'shootthestars_sprite', 'BULLET');
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
        return ['BULLET'];
    }

    // run
    run(x, y) {
        try {
            let v = this.#_PV;
            let selfIt = this;

            this.setPosition(x, y);
            this.visible = true;

            if (v.moveTimer == undefined) {
                v.moveTimer = new TimerOnPool('timeronpool_' + this.Name, v.scene.getTimerPool());
            }

            let upBullet = function() {
                selfIt.moveY(-35);
                return (selfIt.visible === false || selfIt.SpriteRect.Bottom <= selfIt.GameRect.Top) ? false : true;
            };

            v.moveTimer.startInterval(()=>{
                if (upBullet() === false) {
                    v.moveTimer.stop();
                    v.scene.releaseGameObject(selfIt);
                }
            }, 1000 / 60);
        } catch (e) {
            var errMsg = this.getExpMsg("run", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // strength
    get Strength() {
        return 5; // 탄마다 별도 처리 
    }

    // get object kind
    get ObjectKind() {
        return 'bullet';
    }
}