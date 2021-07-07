class SceneTile extends SceneMenuBase {
    // ctor
    constructor(fps, gameHost) {
        super(fps, gameHost);
    }

    onCreate() {
        //alert("create " + this.getKey());

        this._isStopped = false;
    }

    getKey() {
        return SCENE_KEY_TILE;
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
                this.load.image("tiles", ["assets/image/North-Korea-Flag-icon.png", "assets/image/South-Korea-Flag-icon.png"]);
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

            const area = this.getMainAreaIncludeCenter();
            this._tilesprite = this.add.tileSprite(area.x, area.y, area.width, area.height, 'tiles');//.setPipeline('Light2D');
            this._tilesprite.alpha = 0.6;
            this.appendReservedDestroy(this._tilesprite);

        } catch(e) {
            var errMsg = this.getKey() + ".onLoadAssetsComplete.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }


    onUpdate() {
        if (this._tilesprite == undefined) { return; }

        this._tilesprite.tilePositionX += 1.3;
        this._tilesprite.tilePositionY += 0.3;
    }
}