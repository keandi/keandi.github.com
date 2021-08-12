class ScenePixelScale extends SceneMenuBase {
    #_PV = {};

    // ctor
    constructor(fps, gameHost) {
        super(fps, gameHost);
    }

    onCreate() {
        //alert("create " + this.getKey());

        this._isStopped = false;
    }

    onPreset() {
        this._isUseSerialLoader = true;
    }

    getKey() {
        return SCENE_KEY_PIXELSCALE;
    }   

    onStop() {
        try {
            console.log("onStop " + this.getKey());

            super.onStop();

            this._isStopped = true;
            
        } catch(e) {
            var errMsg = this.getKey() + ".onStop.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onSerialLoadAssets() {
        // texture-atlas
        this.addSerialLoadAsset( 'KEN-sprite',
            () => {
                this.load.atlas(
                    'KEN-sprite',
                    'assets/image/KEN-sprite.png',
                    'assets/atlas/KEN-sprite.json'
                );
            }, 2
        );    
    };
    
    
    onCompleteSerialLoadAllAssets() {
        try {
            console.log(this.getKey() + " asset load completed !!!");

            const mainArea = this.getMainArea();
            let selfIt = this;

            // display image
            let showImage = function(top, widthPixel, heightPixel) {
                var ken = selfIt.addDestroyableObject( selfIt.add.image(mainArea.left, top, "KEN-sprite", "KEN0000") );
                ken.setOrigin(0, 0);
                let kenSize = {
                    orgW: ken.width,
                    orgH: ken.height,
                    changedW: widthPixel,
                    changedH: heightPixel
                }

                setPixelScale(ken, kenSize.changedW, kenSize.changedH);

                let ken_txt_left = ken.x + kenSize.changedW + 2;
                let ken_txt_top = ken.y;
                var txt = selfIt.addDestroyableObject( addText(selfIt, ken_txt_left, ken_txt_top, stringFormat("KEN W: {0}, H: {1}", kenSize.changedW, kenSize.changedH) ) );
                txt.setOrigin(0, 0);

                return top + kenSize.changedH; // image bottom
            };

            //
            var nextTop = showImage(mainArea.top, 100, 110);
            nextTop = showImage(nextTop, 50, 60);
            nextTop = showImage(nextTop, 150, 170);
            nextTop = showImage(nextTop, 200, 260);

            // default
            /*var ken1 = this.addDestroyableObject( this.add.image(mainArea.left, mainArea.top, "KEN-sprite", "KEN0000") );
            ken1.setOrigin(0, 0);
            let kenSize = {
                orgW: ken1.width,
                orgH: ken1.height,
                changedW: 300,
                changedH: 400
            }

            setPixelScale(ken1, kenSize.changedW, kenSize.changedH);

            let ken1_txt_left = ken1.x + kenSize.changedW + 2;
            let ken1_txt_top = ken1.y;
            var txt = this.addDestroyableObject( addText(this, ken1_txt_left, ken1_txt_top, stringFormat("KEN1 W: {0}, H: {1}", kenSize.changedW, kenSize.changedH) ) );
            txt.setOrigin(0, 0); */

        } catch(e) {
            var errMsg = this.getKey() + ".onCompleteSerialLoadAllAssets.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
}