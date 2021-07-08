class SceneCameraMove extends SceneMenuBase {
    // ctor
    constructor(fps, gameHost) {
        super(fps, gameHost);
    }

    onCreate() {
        //alert("create " + this.getKey());
    }

    getKey() {
        return SCENE_KEY_CAMERAMOVE;
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
                this.load.image("background_gif", "assets/image/text-background.gif");
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

            // background
            let background = this.addDestroyableObject( this.add.image(this.getSceneCenterX(), this.getSceneCenterY(), 'background_gif') );

            // background position reset
            background.x += ((background.width / 2) - (this.getSceneWidth() / 2));
            background.y += ((background.height / 2) - (this.getSceneHeight() / 2));

            // camera set
            this.cameras.main.setBounds(0, 0, background.width, background.height);
            this._cameraCenter = { x: 0, y: 0};

            //
            this.sceneDragOn();

        } catch(e) {
            var errMsg = this.getKey() + ".onLoadAssetsComplete.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onSceneDrag(x, y) {
        try {
            //console.log( stringFormat("{0}::onDragDrag x: {1}, y: {2}", this.getKey(), x, y) );

            this._cameraCenter.x -= (x * 5);
            this._cameraCenter.y -= (y * 5);

            /* console.log( stringFormat("{0}::onDragDrag x: {1}, y: {2}, camera-x: {3}, camera-y: {4}"
                , this.getKey(), x, y
                , this._cameraCenter.x, this._cameraCenter.y) ); */

            this.cameras.main.centerOn(this._cameraCenter.x, this._cameraCenter.y);

        } catch(e) {
            var errMsg = this.getKey() + ".onSceneDrag.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
    
}