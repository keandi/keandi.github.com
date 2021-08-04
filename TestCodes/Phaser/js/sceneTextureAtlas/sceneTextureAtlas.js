class SceneTextureAtlas extends SceneMenuBase {
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
        return SCENE_KEY_TEXTUREATLAS;
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
        );    };
    
        /*
        this.addSerialLoadAsset( 'KEN-sprite',
            () => {
                this.load.atlas({
                    key: 'KEN-sprite',
                    textureURL: 'assets/image/KEN-sprite.png',
                    atlasURL: 'assets/atlas/KEN-sprite.json'
                });
            }, 2
        );    }
         */
    
    onCompleteSerialLoadAllAssets() {
        try {
            console.log(this.getKey() + " asset load completed !!!");

            const sceneCenter = {
                x: this.getSceneCenterX(),
                y: this.getSceneCenterY()
            };

            // background
            var background = this.addDestroyableObject( this.add.image(sceneCenter.x, sceneCenter.y, "KEN-sprite", "background") );
            background.scaleX = 3.5;
            background.scaleY = 3.5;
            
            // animation
            var ani_ken = this.addDestroyableObject( this.anims.create({ key: 'KEN', frames: this.anims.generateFrameNames('KEN-sprite', { prefix: 'KEN', end: 10, zeroPad: 4 }), duration: 1000, repeat: -1 },) );

            // play
            var ken = this.addDestroyableObject( this.add.sprite(this.getSceneWidth() - 20, this.getSceneHeight() - 20, 'character').play('KEN') );
            ken.setOrigin(1);

        } catch(e) {
            var errMsg = this.getKey() + ".onCompleteSerialLoadAllAssets.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
}