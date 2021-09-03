class CanonMenuIcon extends GameObject {
    #_PV = {};

    // ctor
    constructor(name, scene, canonType, size, dragCallback) {
        super(name, scene, false, true);

        try {
            let v = this.#_PV;
            v.scene = scene;

            //
            v.canonType = canonType;
            v.size = size;
            v.dragCallback = dragCallback; // callback(this, x, y, isFinished)
            v.enable = false;

            //
            this.#create();
            
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
    destroy() {
        try {
            super.destroy();

            let v = this.#_PV;
            destroyObjects( v.sprite, v.goldText, v.goldTextBackground );
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // create
    #create() {
        try {
            let v = this.#_PV;

            let texture = v.canonType.texture;
            if (texture == undefined) { throw 'unknown canon icon texture!!!'; }

            v.image = v.scene.add.image(0, 0, 'shootthestars_sprite', texture);
            setPixelScaleXorY( v.image, v.size );
            v.image.setDepth(DEPTH_GAMEMENU);
            v.image.setOrigin(0.5);

            v.goldTextBackground = addText(v.scene, 0, 0, stringFormat("{0}G", v.canonType.needgold), FONTSIZE_SHOOTTHESTARS_CANONICON_GOLD, COLOR_BACKGROUND);
            v.goldTextBackground.setDepth(DEPTH_GAMEMENU);
            v.goldTextBackground.setOrigin(0, 0);

            v.goldText = addText(v.scene, 0, 0, stringFormat("{0}G", v.canonType.needgold), FONTSIZE_SHOOTTHESTARS_CANONICON_GOLD, COLOR_SHOOTTHESTARS_CANONICON_GOLD);
            v.goldText.setDepth(DEPTH_GAMEMENU);
            v.goldText.setOrigin(0, 0);

            //
            this.onGoldChanged(_gameData.Gold);
        } catch (e) {
            var errMsg = this.getExpMsg("create", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 위치 설정
    setPosition(x, y) {
        try {
            let v = this.#_PV;

            v.image.x = x;
            v.image.y = y;

            const halfSize = parseInt(v.size / 2);
            const imageLT = {
                left: x - halfSize,
                top: y - halfSize
            };

            v.goldText.x = imageLT.left + 7;
            v.goldText.y = imageLT.top + 4;

            v.goldTextBackground.x = v.goldText.x + 1;
            v.goldTextBackground.y = v.goldText.y + 1;
        } catch (e) {
            var errMsg = this.getExpMsg("setPosition", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
    
    // gold change event (상속 구현 필요)
    onGoldChanged(gold) {
        try {
            let v = this.#_PV;

            if (v.canonType.needgold <= 0) {
                v.enable = true;
            } else {
                v.enable = (gold < v.canonType.needgold) ? false : true;
            }

            //
            v.image.alpha = ( v.enable === false ) ? 0.65 : 1.0;
            v.image.setTint(( v.enable === false ) ? 0x808080 : 0xFFFFFF);

        } catch (e) {
            var errMsg = this.getExpMsg("onGoldChanged", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

}