class SceneTileMapCameraMove extends SceneMenuBase {
    // ctor
    constructor(fps, gameHost) {
        super(fps, gameHost);
    }

    onCreate() {
        //alert("create " + this.getKey());
    }

    getKey() {
        return SCENE_KEY_TILEMAPCAMERAMOVE;
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
                this.load.image("tile_for_cameramove", "assets/image/South-Korea-Flag-icon.png");
                this.load.image("mainIcon", "assets/image/South-Korea-Flag-icon.png");
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
            const fullSize = { width: 1920, height: 1080 };
            this._fullSize = fullSize;
            const area = this.getMainAreaIncludeCenter();
            let background = this.addDestroyableObject( this.add.tileSprite(area.x, area.y, fullSize.width, fullSize.height, 'tile_for_cameramove') );
            background.alpha = 0.6;

            // background position reset
            background.x += ((background.width / 2) - (this.getSceneWidth() / 2));
            background.y += ((background.height / 2) - (this.getSceneHeight() / 2));

            // camera set
            this._cameraBounds = {
                left: this.getSceneCenterX(),  
                top: this.getSceneCenterY(),
                right: fullSize.width - this.getSceneCenterX(),
                bottom: fullSize.height - this.getSceneCenterY(),
            };
            this.cameras.main.setBounds(0, 0, fullSize.width, fullSize.height);
            //this.cameras.main.setBounds(cameraBounds.x, cameraBounds.y, cameraBounds.width, cameraBounds.heigh);
            this._cameraCenter = { x: 0, y: 0};

            //
            this.sceneDragOn();

            // temp-rectangle
            /*const rectSize = 64;
            const rectRadius = rectSize / 2;
            this._tmpGraphic = this.addDestroyableObject( this.add.graphics() );
            this._tmpGraphic.fillStyle(0xBB2525);
            //this._tmpGraphic.fillRoundedRect(this.getSceneCenterX(), this.getSceneCenterY(), 64, 64, 15);
            this._tmpGraphic.fillRoundedRect(-rectRadius, -rectRadius, rectSize, rectSize, 15);
            this._tmpGraphic.setInteractive();

            this._tmpGraphic.x = this.getSceneCenterX();
            this._tmpGraphic.y = this.getSceneCenterY();

            this._tmpGraphic.on('pointerdown', (pointer, x, y, event) => {
                alert('click');
            });
            */

            // temp-icon
            let tempIcon = undefined;
            let makeTempIcon = function() {
                tempIcon = selfIt.addDestroyableObject( selfIt.add.image(selfIt.getSceneCenterX() + 64, selfIt.getSceneCenterY() + 64, 'mainIcon') );
                tempIcon.setInteractive();
                tempIcon.on('pointerdown', (pointer) => {
                    selfIt._objDownPointer = { x: pointer.x, y: pointer.y };
                    alert('This is temp-Icon !!!');
                });
                selfIt.addDestroyCB(()=>{ tempIcon.off('pointerdown'); });
            }

            // mainIcon
            this._mainIcon = this.addDestroyableObject( this.add.image(this.getSceneCenterX(), this.getSceneCenterY(), 'mainIcon') );
            this._mainIcon.setInteractive();
            this._mainIcon.on('pointerdown', (pointer, x, y, event) => {
                /*console.log( stringFormat("click x: {0}, y: {1}, img x: {2}, y: {3}", pointer.x, pointer.y
                    , selfIt._mainIcon.x, selfIt._mainIcon.y) ); */

                selfIt._objDownPointer = { x: pointer.x, y: pointer.y };

                if (tempIcon == undefined) {
                    makeTempIcon();
                }
            });
            this.addDestroyCB( () => { 
                selfIt._mainIcon.off('pointerdown'); 
            } );

        } catch(e) {
            var errMsg = this.getKey() + ".onLoadAssetsComplete.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    isDragEnable(x, y) {
        /*console.log( stringFormat("{0}::isDragEnable - x: {1}, y: {2}, tmpRect x: {3}, y: {4}", this.getKey(), x, y
            , this._mainIcon.x, this._mainIcon.y) ); */

        var result = false;
        if (this._objDownPointer == undefined) { 
            result = true;
        } else if (this._objDownPointer.x == x && this._objDownPointer.y == y) {
            result = false;
        } else {
            result = true;
        }

        //console.log("isDragEnable: " + result);
        this._objDownPointer = undefined;
        return result;
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