class SceneLevel extends GameScene {
    #_SPV = {};

    // ctor
    constructor(name, gameHost) {
        try {
            super(name, gameHost);

        } catch (e) {
            var errMsg = this.getKey() + ".ctor.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // secene key 반환
    getKey() {
        return KEY_LEVEL;
    }

    onCreate() {
        //alert("create " + this.getKey());

        this._isStopped = false;
    }

    onPreset() {
        this._isUseSerialLoader = true;
    }

    onStop() {
        try {
            //console.log("onStop " + this.getKey());

            super.onStop();


            this._isStopped = true;
            
        } catch(e) {
            var errMsg = this.getKey() + ".onStop.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onSerialLoadAssets() {
        super.onSerialLoadAssets();

        this.addSerialLoadAsset( 'option_button',
        () => {
            this.load.atlas(
                'option_button',
                'assets/image/option_button.png',
                'assets/atlas/option_button.json'
            );
        }, 2 );

        this.addSerialLoadAsset( 'ad_button',
        () => {
            this.load.atlas(
                'ad_button',
                'assets/image/ad_button.png',
                'assets/atlas/ad_button.json'
            );
        }, 2 );
    };    
    
    onCompleteSerialLoadAllAssets() {
        try {
            super.onCompleteSerialLoadAllAssets();

            let selfIt = this;

            //
            //this.printTitle();

            // option button
            const topMenuRc = this.TopMenuRc;
            const option_button_x = topMenuRc.Right - 32;
            const option_button_y = topMenuRc.CenterY;
            let option_button = this.addDestroyableObject( new GOImageButton("option_button", this, option_button_x, option_button_y, 
                'option_button', 'BTN_UP', 'option_button', 'BTN_DOWN',
                () => {
                    _gameHost.switchScene(KEY_OPTION);
                })
            );
            option_button.setDepth(DEPTH_MENU_BUTTON);

            // ad button
            const ad_button_x = topMenuRc.Left + 32;
            const ad_button_y = topMenuRc.CenterY;
            let ad_button = this.addDestroyableObject( new GOImageButton("ad_button", this, ad_button_x, ad_button_y, 
                'ad_button', 'BTN_UP', 'ad_button', 'BTN_DOWN',
                () => {
                    _browserComm.goAd();
                })
            );
            ad_button.setDepth(DEPTH_MENU_BUTTON);

            // 
            this.#makeLevelObjects();

            //
            // pointerdown
            
            /*selfIt.addPointerEvent('down', (pointer)=>{
                selfIt.addGold(1);
            }); */
            
        } catch(e) {
            var errMsg = this.getKey() + ".onCompleteSerialLoadAllAssets.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // make level objects
    #makeLevelObjects() {
        try {
            const contentRc = this.ContentRc;

            // 영역 100 단위
            let lv100Rc = new Rect(contentRc.Left, contentRc.Top, contentRc.Width / 5, contentRc.Height);

            // 영역 10 단위
            let lv10Rc = lv100Rc.copyFromThis();
            lv10Rc.Left = lv100Rc.Right + 1;

            // 영역 1 단위
            let lv1Rc = new Rect(lv10Rc.Right + 1, lv10Rc.Top, contentRc.Width - (lv100Rc.Width + lv10Rc.Width), contentRc.Height);

            lv100Rc.deflate(3, 3);
            lv10Rc.deflate(3, 3);
            lv1Rc.deflate(3, 3);

            // test rect
            { // 
                /* var g = this.addDestroyableObject( this.add.graphics() );
                g.fillStyle(0xFE8730, 1);
                g.fillRect(lv100Rc.Left, lv100Rc.Top, lv100Rc.Width, lv100Rc.Height);

                g.fillStyle(0xFE0730, 1);
                g.fillRect(lv10Rc.Left, lv10Rc.Top, lv10Rc.Width, lv10Rc.Height);

                g.fillStyle(0x6E8770, 1);
                g.fillRect(lv1Rc.Left, lv1Rc.Top, lv1Rc.Width, lv1Rc.Height); */
            }

            // block 최대 
            const block_max = 10;
            const blockSize = { cx: lv100Rc.Width, cy: parseInt(lv100Rc.Height / block_max) };

            // 영역 100 그리기
            for (var i = 1; i <= 1; i++) // 현재 100 까지
            {
                var tmpRc = new Rect(lv100Rc.X, lv100Rc.Bottom - (blockSize.cy * i), blockSize.cx, blockSize.cy);
                tmpRc.deflate(5, 12);

                var block = new LevelBlock("lb_100_" + i, this, tmpRc, LevelBlockType.BLOCK100, 100, (levelBlock, levelGroup) => {
                    
                } );
            }

        } catch(e) {
            var errMsg = this.getKey() + ".makeLevelObjects.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onUpdate() {

    }
}