class SceneIntro extends BaseScene {
    #_SPV = {};

    // ctor
    constructor(fps, gameHost) {
        try {
            super(fps, gameHost);

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // secene key 반환
    getKey() {
        return KEY_INTRO;
    }

    onCreate() {
        //alert("create " + this.getKey());

        this._isStopped = false;

        this.#addText();
    }

    onPreset() {
        this._isUseSerialLoader = true;
    }

    onStop() {
        try {
            //console.log("onStop " + this.getKey());

            super.onStop();

            if (this.#_SPV.fireworkTimeout != undefined) {
                clearTimeout(this.#_SPV.fireworkTimeout);
                this.#_SPV.fireworkTimeout = undefined;
            }

            if (this.#_SPV.touchInterval != undefined) {
                clearInterval(this.#_SPV.touchInterval);
                this.#_SPV.touchInterval = undefined;
            }

            this._isStopped = true;
            
        } catch(e) {
            var errMsg = this.getKey() + ".onStop.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onSerialLoadAssets() {
        /*this.addSerialLoadAsset( 'ggg',
        () => {
            this.load.atlas(
                'ggg',
                'assets/imagdfee/ggg.png',
                'assets/atlas/ggg.json'
            );
        }, 2 );*/

        this.addSerialLoadAsset( 'firework_yellow',
        () => {
            this.load.atlas(
                'firework_yellow',
                'assets/image/firework_yellow.png',
                'assets/atlas/firework_yellow.json'
            );
        }, 2 );

        /*this.addSerialLoadAsset( 'aaaa',
        () => {
            this.load.json(
                'aaaa',
                'assets/atlas/firework_yellow.json'
            );
        }, 1 ); */
    };
    
    
    onCompleteSerialLoadAllAssets() {
        try {
            //console.log(this.getKey() + " asset load completed !!!");

            this.addDestroyableObject( this.anims.create({ key: 'firework', frames: this.anims.generateFrameNames('firework_yellow', { prefix: 'FW', end: 29, zeroPad: 4 }), duration: 1500, repeat: 0 },) );
            var firework = this.addDestroyableObject( this.add.sprite(this.getSceneCenterX(), this.getSceneCenterY(), 'firework').play('firework') );
            firework.setOrigin(0.5);

            this.#_SPV.firework = firework;
            
            // pointer event register
            this.addPointerEvent('down', (pointer)=>{
                _gameHost.switchScene( (_globalData.isTest === false) ? KEY_LEVEL : KEY_SCENE_TEST );
            });


            /*var aaaa = this.cache.json.get('aaaa');
            console.log(aaaa.frames[0].filename); */

            /*let v = this.#_SPV;
            v.count = 0;
            let downCb = this.addKeyboardEvent('W', 'down', ()=>{
                console.log("W down");
                v.count++;
                if (v.count > 3) {
                    console.log("try release");
                    this.removeKeyboardEvent(downCb);
                    this.removeKeyboardEvent(upCb);
                }
            });
            let upCb = this.addKeyboardEvent('W', 'up', ()=>{
                console.log("W up");
            }); */

        } catch(e) {
            var errMsg = this.getKey() + ".onCompleteSerialLoadAllAssets.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    #addText() {
        try {
            const sceneCenterY = this.getSceneCenterY();
            const sceneCenterX = this.getSceneCenterX();
            const sceneWidth = this.getSceneWidth();

            // 아무거나
            const logoTextY = sceneCenterY - (sceneWidth / 3);
            this.addDestroyableObject( addText(this, sceneCenterX, logoTextY, _gameOption.selectText("아.무.거.나", "A.Mu.Geo.Na"), 50, 0x73BAE7) );

            // touch please
            const touchTextY = sceneCenterY + 35;
            let touch = this.addDestroyableObject( addText(this, sceneCenterX, touchTextY, "Touch for 'start'", 16, COLOR_INTRO_TOUCHBLINK_ON) );
            let touchOff = false;
            let touchBlink = function() {
                if (touchOff == false) {
                    touch.setTint(COLOR_INTRO_TOUCHBLINK_OFF);
                    touchOff = true;
                } else {
                    touch.setTint(COLOR_INTRO_TOUCHBLINK_ON);
                    touchOff = false;
                }
            };
            //setInterval(()=>touchBlink(), 500);
            let touchInterval = new GameInterval("touch_interval", this, 500, ()=>touchBlink());

            // W.H.Soft
            const companyTextY = sceneCenterY + (sceneWidth / 2);
            this.addDestroyableObject( addText(this, sceneCenterX, companyTextY, "W.H.Soft (2021)", 16, COLOR_INTRO_COMPANY) );

            // Thank you
            const thankyouTextY = companyTextY + 30;
            this.addDestroyableObject( addText(this, sceneCenterX, thankyouTextY, "Thank you, opengameart.org", 12, COLOR_INTRO_THANKYOU) );
        } catch(e) {
            var errMsg = this.getKey() + ".addText.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    randomFireWork() {
        try {
            var firework = this.#_SPV.firework;
            const fwHalfCX = Math.floor( firework.width / 2 );
            const fwHalfCY = Math.floor( firework.height / 2 );
            const areaWidth = this.getSceneWidth() - firework.width;
            const areaHeight = this.getSceneHeight() - firework.height;

            const x = Math.floor(Math.random() * areaWidth) + fwHalfCX;
            const y = Math.floor(Math.random() * areaHeight) + fwHalfCY;

            firework.x = x;
            firework.y = y;
            this.#_SPV.firework.visible = true;
            firework.play('firework');

            switch (Phaser.Math.Between(1, 5))
            {
                case 1:
                    firework.setTint(0xFF0000);
                    break;
                
                case 2:
                    firework.setTint(0xFF00FF);
                    break;

                case 3:
                    firework.setTint(0x00FF00);
                    break;

                case 4:
                    firework.setTint(0x0000FF);
                    break;

                default:
                    firework.setTint(0xFFFFFF);
                    break;
            }

        } catch(e) {
            var errMsg = this.getKey() + ".randomFireWork.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onUpdate() {
        if (this.#_SPV.firework == undefined) { return; }
        //console.log("onUpdate => " + this.#_SPV.firework.frame.name);
        if (this.#_SPV.firework.frame.name === "FW0029" && this.#_SPV.firework.visible == true) {
            this.#_SPV.fireworkTimeout = setTimeout(() => this.randomFireWork(), 2000);
            this.#_SPV.firework.visible = false;
        }

        //console.log("host time: " + this._gameHost.Time);
    }
}