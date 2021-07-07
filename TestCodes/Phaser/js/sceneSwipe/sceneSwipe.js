class SceneSwipe extends SceneMenuBase {
    // ctor
    constructor(fps, gameHost) {
        super(fps, gameHost);
    }

    onCreate() {
        //alert("create " + this.getKey());
    }

    getKey() {
        return SCENE_KEY_SWIPE;
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
                this.load.image("swipeImage", "assets/image/South-Korea-Flag-icon.png");
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

            // image
            this._swipeImage = this.add.image(this.getSceneCenterX(), this.getSceneCenterY(), "swipeImage");
            this.appendReservedDestroy(this._swipeImage);

            //
            this.swipeOn();

        } catch(e) {
            var errMsg = this.getKey() + ".onLoadAssetsComplete.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onSwipe(direction) {
        try {
            this._direction = direction;
        } catch(e) {
            var errMsg = this.getKey() + ".onSwipe.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onUpdate() {
        if (this._direction == undefined) { return; }

        const move = 16.0;
        if (this._direction.left == true) {
            let to = this._swipeImage.x - move;
            
            var x = to - (this._swipeImage.width / 2);
            if (x <= this.getMainArea().left) {
                this._direction = undefined;
                return;
            }

            this._swipeImage.x = to;
            
        } else if (this._direction.right == true) {
            let to = this._swipeImage.x + move;

            var x = to + (this._swipeImage.width / 2);
            if (x >= this.getMainArea().right) {
                this._direction = undefined;
                return;
            }

            this._swipeImage.x = to;
        } 

        if (this._direction.top == true) {
            let to = this._swipeImage.y - move;

            var y = to - (this._swipeImage.height / 2);
            if (y <= this.getMainArea().top) {
                this._direction = undefined;
                return;
            }

            this._swipeImage.y = to;

        } else if (this._direction.bottom == true) {
            let to = this._swipeImage.y + move;

            var y = to + (this._swipeImage.height / 2);
            if (y >= this.getMainArea().bottom) {
                this._direction = undefined;
                return;
            }

            this._swipeImage.y = to;
        } 
    }
}