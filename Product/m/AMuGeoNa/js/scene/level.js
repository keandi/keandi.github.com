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
                    alert("option");
                })
            );
            option_button.setDepth(DEPTH_MENU_BUTTON);

            // ad button
            const ad_button_x = topMenuRc.Left + 32;
            const ad_button_y = topMenuRc.CenterY;
            let ad_button = this.addDestroyableObject( new GOImageButton("ad_button", this, ad_button_x, ad_button_y, 
                'ad_button', 'BTN_UP', 'ad_button', 'BTN_DOWN',
                () => {
                    alert("ad");
                })
            );
            ad_button.setDepth(DEPTH_MENU_BUTTON);

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

    onUpdate() {

    }
}