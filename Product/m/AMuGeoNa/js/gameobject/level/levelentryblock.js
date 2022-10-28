class LevelEntryBlock extends DestroyableObject {
    #_PV = {};

    //ctor
    constructor(name, scene, representationImage, rect, entryCallback) {
        try {
            super(name, scene);

            this.#_PV.scene = scene;
            this.#_PV.representationImage = representationImage;
            this.#_PV.rect = rect;
            this.#_PV.level = 0;
            this.#_PV.entryCallback = entryCallback;

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
            destroyObjects( this.#_PV.block.enable, this.#_PV.block.disable, this.#_PV.levelText );
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

            // create graphic rect
            let makeRect = function(color) {
                var g = v.scene.add.graphics();

                g.fillStyle(color, OPACITY_LEVELBLOCK_BODY);
                g.fillRoundedRect(v.rect.Left, v.rect.Top, v.rect.Width, v.rect.Height, 5);
    
                g.lineStyle(3, color, 1);
                g.strokeRoundedRect(v.rect.Left, v.rect.Top, v.rect.Width, v.rect.Height, 5);
                g.setDepth( DEPTH_LEVEL_BLOCK );

                return g;
            };

            v.block = {
                enable: makeRect(COLOR_LEVELBLOCK),
                disable: makeRect(COLOR_LEVELBLOCK_DISABLE)
            };
            this.setEnable();

            // 대표 이미지 영역
            {
                let blockRc = this.#_PV.rect;
                const imgSize = {
                    cx: parseInt(blockRc.HalfWidth),
                    cy: parseInt(blockRc.HalfHeight)
                };
                this.#_PV.rpImg = {
                    rect: new Rect(blockRc.Left + (imgSize.cx / 2), blockRc.Top + (imgSize.cy / 2) + 5, imgSize.cx, imgSize.cy)
                };
                this.#_PV.rpImg.smallerSize = (this.#_PV.rpImg.rect.Width <  this.#_PV.rpImg.rect.Height) ? this.#_PV.rpImg.rect.Width : this.#_PV.rpImg.rect.Height;

                /* var g = v.scene.add.graphics();
                var r = this.#_PV.rpImg.rect;
                g.fillStyle(0xFFFFFF, OPACITY_LEVELBLOCK_BODY);
                g.fillRect(r.Left, r.Top, r.Width, r.Height, 1); */
            }

            // level text
            {
                var levelText = addText(v.scene, v.rect.CenterX, v.rect.Top + 12, this.#_PV.level, 12, COLOR_LEVEL_TEXT);
                levelText.setDepth( DEPTH_LEVEL_BLOCK );
                this.#_PV.levelText = levelText;
            }

            // down 유효 시간
            let isDownEnableTime = function() {
                if (v.downExpire == undefined) {
                    v.downExpire = new GameTime("entryblock_down_expire", v.scene._gameHost);
                    return true;
                }

                return v.downExpire.isExpired(500, undefined, true);
            }

            // down event 등록
            {
                v.scene.addPointerEvent('down', (pointer) => {
                    if (v.rect.ptInRect(pointer.x, pointer.y) === true 
                        && v.block.enable.visible === true
                        && isDownEnableTime() === true) {
                        v.entryCallback(this);
                    }
                });
            }
        } catch (e) {
            var errMsg = this.getExpMsg("create", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set enable
    setEnable() {
        try {
            let v = this.#_PV;
            if (v.level <= _gameData.LastLevel + 1) {
                v.block.enable.visible = true;
                v.block.disable.visible = false;
            } else {
                v.block.enable.visible = false;
                v.block.disable.visible = true;
            }
        } catch (e) {
            var errMsg = this.getExpMsg("setEnable", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // is enable
    get IsEnable() {
        try {
            let v = this.#_PV;            
            return (v.block.enable.visible === false || v.block.disable.visible === true) ? false : true;
        } catch (e) {
            var errMsg = this.getExpMsg("IsEnable", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get level 
    get Level() {
        return this.#_PV.level;
    }

    // set level
    set Level(value) {
        //this.#_PV.level = value;
        //this.#_PV.levelText.setText( value );

        this.#setGameLevelInfo(value);
    }

    //
    #setGameLevelInfo(level) {
        try {
            let v = this.#_PV;

            v.levelInfo = _gameLevelTable.getInfo(level);
            let imageInfo = v.representationImage.getImage(v.levelInfo.arg.texture, v.rpImg.imgInfo);

            setPixelScaleXorY(imageInfo.obj, v.rpImg.smallerSize);
            setPosition(imageInfo.obj, v.rpImg.rect.CenterX, v.rpImg.rect.CenterY);

            //console.log("img smaller size: " + v.rpImg.smallerSize + ", w: " + imageInfo.obj.width);

            v.rpImg.imgInfo = imageInfo;

            this.#_PV.level = level;
            this.#_PV.levelText.setText( level );

            this.setEnable();

            this.#setPassedImage();

        } catch (e) {
            var errMsg = this.getExpMsg("setGameLevelInfo", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get level info
    get LevelInfo() {
        return this.#_PV.levelInfo;
    }

    // set passed image
    #setPassedImage() {
        try {
            if (this.IsEnable !== true) { return; }

            let v = this.#_PV;
            if (_gameData.isPassedGameInfo(v.levelInfo) !== true) { return; }

            let imageInfo = v.representationImage.getImage("PASSMARK", v.rpImg.passMarkImgInfo);

            setPixelScaleXorY(imageInfo.obj, v.rect.Width - 20);
            setPosition(imageInfo.obj, v.rpImg.rect.CenterX, v.rpImg.rect.CenterY);
            imageInfo.obj.setDepth(DEPTH_LEVEL_PASSED_IMAGE);
            imageInfo.obj.alpha = 0.8;

            //console.log("img smaller size: " + v.rpImg.smallerSize + ", w: " + imageInfo.obj.width);

            v.rpImg.passMarkImgInfo = imageInfo;


        } catch (e) {
            var errMsg = this.getExpMsg("#setPassedImage", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}
