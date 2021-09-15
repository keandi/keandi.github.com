class STSBulletLaserV extends STSBaseBullet {
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

    // onInitialize
    onInitialize() {
        try {

            this.#_PV.frameName = 'LASER_V1';
            super.onInitialize();
        
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
            
        } catch (e) {
            var errMsg = this.getExpMsg("run", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // strength
    get Strength() {
        return 3; // 탄마다 별도 처리
    }
}