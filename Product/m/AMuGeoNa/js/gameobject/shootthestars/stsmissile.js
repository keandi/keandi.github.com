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

    // run
    run(x, y) {
        try {
            let v = this.#_PV;
            let selfIt = this;

            setPosition(v.sprite, x, y);
            v.sprite.setDepth(DEPTH_SHOOTTHESTARS_UPBULLET); // 미사일은 canon 보다 상단 레이어에 위치해야 한다.

            if (v.moveTimer == undefined) {
                v.moveTimer = new TimerOnPool('timeronpool_' + this.Name, v.scene.getTimerPool());
            }

            let upBullet = function() {
                selfIt.Y -= 20;
                return (selfIt.SpriteRect.Bottom <= selfIt.GameRect.Top) ? false : true;
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
}