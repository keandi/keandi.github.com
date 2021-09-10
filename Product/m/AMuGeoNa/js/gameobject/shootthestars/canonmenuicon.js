class CanonMenuIcon extends GoldNotifyGameObject {
    #_PV = {};

    // ctor
    constructor(name, scene, canonType, size, dragCallback, touchCallback) {
        super(name, scene, false);

        try {
            let v = this.#_PV;
            v.scene = scene;

            //
            v.canonType = canonType;
            v.size = size;
            v.dragCallback = dragCallback; // callback(this, x, y, dragprocess)
            v.touchCallback = touchCallback; // callback(this)
            v.goldEnable = false;
            v.rect = new Rect(0, 0, size, size);

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
            this.unregisterDrag(v.image);
            this.#unregisterTouchEvent();
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

            v.imageScaleBackup = {
                x: v.image.scaleX,
                y: v.image.scaleY
            };

            v.goldTextBackground = addText(v.scene, 0, 0, stringFormat("{0}G", v.canonType.needgold), FONTSIZE_SHOOTTHESTARS_CANONICON_GOLD, COLOR_BACKGROUND);
            v.goldTextBackground.setDepth(DEPTH_GAMEMENU);
            v.goldTextBackground.setOrigin(0, 0);

            v.goldText = addText(v.scene, 0, 0, stringFormat("{0}G", v.canonType.needgold), FONTSIZE_SHOOTTHESTARS_CANONICON_GOLD, COLOR_SHOOTTHESTARS_CANONICON_GOLD);
            v.goldText.setDepth(DEPTH_GAMEMENU);
            v.goldText.setOrigin(0, 0);

            //
            this.onGoldChanged(_gameData.Gold);

            //
            if (v.canonType.value == ShootTheStarsCanonIconType.HP_UP.value) {
                this.#registerTouchEvent();
            } else {
                this.registerDrag(v.image);
            }
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

            v.rect.X = imageLT.left;
            v.rect.Y = imageLT.top;

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
                v.goldEnable = true;
            } else {
                v.goldEnable = (gold < v.canonType.needgold) ? false : true;
            }

            this.#uiUpdate();

        } catch (e) {
            var errMsg = this.getExpMsg("onGoldChanged", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // ui change
    #uiUpdate() {
        try {
            let v = this.#_PV;

            let enable = v.goldEnable;

            if (v.forcedEnable === false) {
                enable = false;
            }

            //
            v.image.alpha = ( enable === false ) ? 0.65 : 1.0;
            if ( enable === false ) {
                v.image.setTint(0x808080);
            } else {
                v.image.clearTint();
            }
        } catch (e) {
            var errMsg = this.getExpMsg("uiUpdate", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // enable
    set Enable(value) {
        try {
            this.#_PV.forcedEnable = value;
            this.onGoldChanged(_gameData.Gold);
        } catch (e) {
            var errMsg = this.getExpMsg("Enable", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // pointdown 해제
    #unregisterTouchEvent() {
        try {
            let v = this.#_PV;
            if (v.touchEvent == undefined) { return; }
            v.scene.removePointerEvent(v.touchEvent);
            v.touchEvent = undefined;
        } catch (e) {
            var errMsg = this.getExpMsg("unregisterTouchEvent", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // pointdown 등록
    #registerTouchEvent() {
        try {
            this.#unregisterTouchEvent();

            let selfIt = this;
            let v = this.#_PV;
            v.touchEvent = v.scene.addPointerEvent('down', (pointer)=>{
                if (v.forcedEnable === false || v.goldEnable === false) { return; }
                if (v.rect.ptInRect(pointer.x, pointer.y) === true) {
                    let timerPool = v.scene.getTimerPool();
                    timerPool.setTimeout(()=>{
                        setScaleXY(v.image, v.imageScaleBackup.x - 0.1, v.imageScaleBackup.y - 0.1);
                        timerPool.setTimeout(()=>{
                            setScaleXY(v.image, v.imageScaleBackup.x, v.imageScaleBackup.y);
                        }, 100);
                    }, 10);

                    v.touchCallback(selfIt);
                }
            });
        } catch (e) {
            var errMsg = this.getExpMsg("registerTouchEvent", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // on drag start (상속 사용)
    onDragStart(pointer, gameObject) {
        try {
            //console.log(stringFormat("onDragStart x: {0}, y: {1}", pointer.x, pointer.y));

            if (this.#_PV.goldEnable === false) { return; }
            this.#_PV.dragCallback(this, pointer.x, pointer.y, DragProcess.START);
        } catch (e) {
            var errMsg = this.getExpMsg("onDragStart", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // on drag (상속 사용)
    onDrag(pointer, gameObject, dragX, dragY) {
        try {
            //console.log(stringFormat("onDrag x: {0}, y: {1}, dragX: {2}, dragY: {3}", pointer.x, pointer.y, dragX, dragY));

            if (this.#_PV.goldEnable === false) { return; }
            this.#_PV.dragCallback(this, pointer.x, pointer.y, DragProcess.DRAG);
        } catch (e) {
            var errMsg = this.getExpMsg("onDrag", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // on drag end (상속 사용)
    onDragEnd(pointer, gameObject) {
        try {
            //console.log(stringFormat("onDragEnd x: {0}, y: {1}", pointer.x, pointer.y));

            if (this.#_PV.goldEnable === false) { return; }
            this.#_PV.dragCallback(this, pointer.x, pointer.y, DragProcess.END);
        } catch (e) {
            var errMsg = this.getExpMsg("onDragEnd", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get icon type
    get IconType() {
        return this.#_PV.canonType;
    }

}