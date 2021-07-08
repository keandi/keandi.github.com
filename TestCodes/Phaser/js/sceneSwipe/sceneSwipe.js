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
            this.swipeOn(25, 100);

        } catch(e) {
            var errMsg = this.getKey() + ".onLoadAssetsComplete.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onSwipe(direction, value, swipeCount, isEnd, isCancel) {
        try {
            /* console.log( stringFormat("{0}::onSwipe direction: {1}, value: {2}, swipeCount: {3}, isEnd: {4}, isCancel: {5}", this.getKey()
                , direction.description
                , value
                , swipeCount
                , isEnd
                , isCancel)); */

            let selfIt = this;
            
            if (swipeCount == 0) {
                this._orgCoord = {
                    x: this._swipeImage.x,
                    y: this._swipeImage.y
                };
            }

            // get target coord
            let getTargetCoord = function() {
                switch (direction)
                {
                    case SwipeDirection.LEFT:
                    case SwipeDirection.RIGHT:
                        return {
                            x: selfIt._orgCoord.x + value,
                            y: selfIt._orgCoord.y
                        };

                    case SwipeDirection.UP:
                    case SwipeDirection.DOWN:
                        return {
                            x: selfIt._orgCoord.x,
                            y: selfIt._orgCoord.y + value
                        };

                    case SwipeDirection.UNKNOWN:
                    default:
                        return selfIt._orgCoord;
                }
            }

            // get swipe result coord
            let getSwipeEndCoord = function() {
                switch (direction)
                {
                    case SwipeDirection.LEFT:
                        return {
                            x: (selfIt._swipeImage.width / 2) + 1,
                            y: selfIt._orgCoord.y
                        };

                    case SwipeDirection.RIGHT:
                        return {
                            x: selfIt.getSceneWidth() - (selfIt._swipeImage.width / 2) - 1,
                            y: selfIt._orgCoord.y
                        };

                    case SwipeDirection.UP:
                        return {
                            x: selfIt._orgCoord.x,
                            y: selfIt.getMainArea().top + (selfIt._swipeImage.height / 2) + 1
                        };

                    case SwipeDirection.DOWN:
                        return {
                            x: selfIt._orgCoord.x,
                            y: selfIt.getSceneHeight() - (selfIt._swipeImage.height / 2) - 1
                        };

                    case SwipeDirection.UNKNOWN:
                    default:
                        return selfIt._orgCoord;
                }
            }

            if (isEnd == false) { // 임의 이동 중
                this._targetCoord = getTargetCoord();
                this._moveSpeed = 12.0;
            } else if (isEnd == true) { // 종료 시
                if (isCancel == true) { // 원복 필요
                    this._targetCoord = this._orgCoord;
                } else {
                    this._targetCoord = getSwipeEndCoord();
                }
                this._moveSpeed = 35.0;
            }

        } catch(e) {
            var errMsg = this.getKey() + ".onSwipe.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onUpdate() {

        if (this._targetCoord == undefined) { return; }

        var res = MoveTowards(this._swipeImage.x, this._swipeImage.y, this._targetCoord.x, this._targetCoord.y, this._moveSpeed);
        this._swipeImage.x = res[0];
        this._swipeImage.y = res[1];

        if (res[2] == true) {
            this._targetCoord = undefined;
        }

        /*
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
        */
    }
}