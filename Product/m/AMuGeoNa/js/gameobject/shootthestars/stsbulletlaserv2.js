class STSBulletLaserV2 extends STSBaseBullet {
    #_PV = {};

    // ctor
    constructor(name, scene, frameData, gameRect) {
        super(name, scene, frameData, gameRect);

        try {
            let v = this.#_PV;
            
            v.scene = scene;
            v.frameData = frameData;
            
            //
            this.initialize(); // 구현의 가장 하층에서 호출되어야 된다.
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        super.destroy();
    }

    // get all framenames
    get AllFrameNames() {
        return ['LASER_V2'];
    }

    // onInitialize
    onInitialize() {
        try {

            this.#_PV.frameName = 'LASER_V2';
            super.onInitialize({isFullX: false, isFullY: true});
            this.ActiveFrameName = 'LASER_V2';
        
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
                v.sprite = v.scene.add.sprite(0, 0, 'shootthestars_sprite', v.frameName);
            }

            return v.sprite;
        } catch (e) {
            var errMsg = this.getExpMsg("getSprite", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get width
    get W() {
        try {
            return this.#_PV.frameData.frames.get(v.frameName).sourceSize.w;
        } catch (e) {
            var errMsg = this.getExpMsg("W", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get height
    get H() {
        try {
            let v = this.#_PV;
            const gameRect = this.GameRect;
            const canonHeight = v.frameData.frames.get('LASER2_0000').sourceSize.h;

            return gameRect.Height - canonHeight;            
        } catch (e) {
            var errMsg = this.getExpMsg("H", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // run
    run(x, y) {
        try {
            let v = this.#_PV;
            let selfIt = this;

            if (v.fireRect == undefined) {
                v.fireRect = new Rect();
            }

            const frame = v.frameData.frames.get(v.frameName);
            const gameRect = this.GameRect;
            const spriteHalfWidth = frame.sourceSize.w / 2;
            v.fireRect.Width = frame.sourceSize.w;
            v.fireRect.Height = y - gameRect.Top + 80;
            v.fireRect.X = x - spriteHalfWidth;
            v.fireRect.Y = gameRect.Top - 20;

            v.sprite.x = v.fireRect.CenterX;
            v.sprite.y = v.fireRect.CenterY;

            setPixelScaleY(v.sprite, v.fireRect.Height, false);

            //
            if (v.collisionTimer == undefined) {
                v.collisionTimer = new TimerOnPool('timeronpool_' + this.Name, v.scene.getTimerPool());
            }

            let checkCollision = function() {
                selfIt.recomputeSpriteRect();
            };

            v.collisionTimer.startInterval(()=>checkCollision(), 1000 / 60);
            
        } catch (e) {
            var errMsg = this.getExpMsg("run", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // remove
    remove() {
        try {
            let v = this.#_PV;
            if (v.collisionTimer != undefined) {
                v.collisionTimer.stop();
            }
        } catch (e) {
            var errMsg = this.getExpMsg("remove", e);
            console.log(errMsg);
            alert(errMsg);
        } 
    }

    // strength
    get Strength() {
        return 3; // 탄마다 별도 처리
    }
}