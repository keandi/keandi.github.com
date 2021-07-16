class SceneMultiCamera extends SceneMenuBase {
    // ctor
    constructor(fps, gameHost) {
        super(fps, gameHost);
    }

    onCreate() {
        //alert("create " + this.getKey());
    }

    getKey() {
        return SCENE_KEY_MULTICAMERA;
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
                this.load.image("tile_for_multicamera", "assets/image/South-Korea-Flag-icon.png");
                //this.load.image("mainIcon", "assets/image/South-Korea-Flag-icon.png");
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

            // background
            const fullSize = { 
                width: 1920, 
                height: 1080,
                left: selfIt.getSceneWidth() + 1,
                top: selfIt.getMenuBottom() + 1,
                right: 0,
                bottom: 0,
                compute: function() {
                    this.right = this.left + this.width;
                    this.bottom = this.top + this.height;
                }
            };
            fullSize.compute();
            this._fullSize = fullSize;
            const area = this.getMainAreaIncludeCenter();
            //let background = this.addDestroyableObject( this.add.tileSprite(area.x, area.y, fullSize.width, fullSize.height, 'tile_for_multicamera') );
            let background = this.addDestroyableObject( this.add.tileSprite(fullSize.left, fullSize.top, fullSize.width, fullSize.height, 'tile_for_multicamera') );
            background.alpha = 0.2;

            // mark images
            this.addDestroyableObject( this.add.image(fullSize.left, fullSize.top, 'tile_for_multicamera') );
            this.addDestroyableObject( this.add.image(fullSize.right, fullSize.top, 'tile_for_multicamera') );
            this.addDestroyableObject( this.add.image(fullSize.right, fullSize.bottom, 'tile_for_multicamera') );
            this.addDestroyableObject( this.add.image(fullSize.left, fullSize.bottom, 'tile_for_multicamera') );

            // flow image
            this._flowImage = this.addDestroyableObject( this.add.image(0, 0, 'tile_for_multicamera') );

            // background position reset
            background.x += ((background.width / 2));// + (this.getSceneWidth() / 2));
            background.y += ((background.height / 2));// - (this.getSceneHeight() / 2));

            // main camera
            //this.cameras.main.setBounds(0, 0, this.getSceneWidth() , this.getMenuBottom());
            //this._firstCamera = this.cameras.add(0, 0, this.getSceneWidth() , this.getMenuBottom());
            this.cameras.main.setBounds(0, 0, this.getSceneWidth() , this.getMenuBottom());

            // second-camera
            const mainArea = this.getMainArea();
            //this._sencodCamera = this.cameras.add(mainArea.left, mainArea.top, mainArea.right - mainArea.left, mainArea.bottom - mainArea.top);
            this._sencodCamera = this.cameras.add(mainArea.left + 50, mainArea.top + 50, mainArea.right - mainArea.left - 100, mainArea.bottom - mainArea.top - 100);
            this._cameraCenter = { x: 0, y: 0};

            // camera set
            this._cameraBounds = {
                left: this.getSceneCenterX() + (this.getSceneWidth() - 50),  
                top: this.getSceneCenterY() + this._menuPanHeight,
                right: this.getSceneCenterX() + fullSize.width,// - this.getSceneCenterX(),
                bottom: fullSize.height - this.getSceneCenterY() + this._menuPanHeight,
            };

            //
            this.sceneDragOn();
            this.onSceneDrag(0, 0);
            

        } catch(e) {
            var errMsg = this.getKey() + ".onLoadAssetsComplete.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    isDragEnable(x, y) {
        return true;
    }

    onSceneDrag(x, y) {
        try {
            //console.log( stringFormat("{0}::onDragDrag x: {1}, y: {2}", this.getKey(), x, y) );

            this._cameraCenter.x -= x;//(x * 5);
            this._cameraCenter.y -= y;//(y * 5);

            /*if (this._cameraCenter.x < 0) {
                this._cameraCenter.x = 0;
            } else if (this._cameraCenter.x > this._fullSize.width) {
                this._cameraCenter.x = this._fullSize.width;
            }*/

            if (this._cameraCenter.x < this._cameraBounds.left) {
                this._cameraCenter.x = this._cameraBounds.left;
            } else if (this._cameraCenter.x > this._cameraBounds.right) {
                this._cameraCenter.x = this._cameraBounds.right;
            }
            if (this._cameraCenter.y < this._cameraBounds.top) {
                this._cameraCenter.y = this._cameraBounds.top;
            } else if (this._cameraCenter.y > this._cameraBounds.bottom) {
                this._cameraCenter.y = this._cameraBounds.bottom;
            }

            console.log( stringFormat("{0}::onDragDrag x: {1}, y: {2}, camera-x: {3}, camera-y: {4}, bound_left: {5}"
                , this.getKey(), x, y
                , this._cameraCenter.x, this._cameraCenter.y
                , this._cameraBounds.left) ); 

            this._sencodCamera.centerOn(this._cameraCenter.x, this._cameraCenter.y);

            this._flowImage.x = this._cameraCenter.x - (this.getSceneCenterX() - 32);
            this._flowImage.y = this._cameraCenter.y - (this.getSceneCenterY() - 100);// - (this._cameraBounds.top + 64);

        } catch(e) {
            var errMsg = this.getKey() + ".onSceneDrag.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
    
}
