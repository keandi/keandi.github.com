class SceneSpriteChange extends SceneMenuBase {
    // ctor
    constructor(fps, gameHost) {
        super(fps, gameHost);
    }

    onCreate() {
        //alert("create " + this.getKey());
    }

    getKey() {
        return SCENE_KEY_SPRITECHANGE;
    }   

    onStop() {
        try {
            console.log("onStop " + this.getKey());

            super.onStop();
            
        } catch(e) {
            var errMsg = this.getKey() + ".onStop.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
    
    onLoadAssets() {
        try {   
            if (this._assetLoadCompleted == true)
            {
                this.onLoadAssetsComplete();
            }
            else
            {
                this.load.spritesheet("SpriteSheet_ARROW", "assets/image/Arrow_test.png", { frameWidth: 48, frameHeight: 48 });
                this.load.start();
            }
        } catch(e) {
            var errMsg = this.getKey() + ".onLoadAssets.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
    
    onLoadingAssets(value) {
        try {
            console.log(this.getKey() + " loadinig... " + value);
        } catch(e) {
            var errMsg = this.getKey() + ".onLoadingAssets.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
    
    onLoadAssetsComplete() {
        try {
            console.log(this.getKey() + " asset load completed !!!");

            let selfIt = this;

            // sprite
            this._sprite = this.add.sprite(this.getSceneCenterX(), this.getSceneCenterY(), 'SpriteSheet_ARROW').setOrigin(0, 0);
            this.appendReservedDestroy(this._sprite);

            // pointerdown
            let frame = new RINum(0, 5, 35);
            this.addPointerEvent('down', (pointer)=>{
                selfIt._sprite.setTexture('SpriteSheet_ARROW', frame.Next);
            });

        } catch(e) {
            var errMsg = this.getKey() + ".onLoadAssetsComplete.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }


    onUpdate() {
  
    }
}