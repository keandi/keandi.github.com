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
            let frame = 0;
            this.input.on('pointerdown', function(pointer, x, y, event) {
                frame += 5;
                if (frame > 35) { frame = 0; }

                selfIt._sprite.setTexture('SpriteSheet_ARROW', frame);
            });
            this.pushInputEvent('pointerdown');


        } catch(e) {
            var errMsg = this.getKey() + ".onLoadAssetsComplete.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }


    onUpdate() {
  
    }
}