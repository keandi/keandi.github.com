class SceneTextureAtlas extends SceneMenuBase {
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
            var jump_ken = this.addDestroyableObject( this.anims.create({ key: 'JUMP', frames: this.anims.generateFrameNames('KEN-sprite', { prefix: 'JUMP', end: 16, zeroPad: 4 }), duration: 1600, repeat: -1 },) );
            var ani_ken = this.addDestroyableObject( this.anims.create({ key: 'KEN', frames: this.anims.generateFrameNames('KEN-sprite', { prefix: 'KEN', end: 10, zeroPad: 4 }), duration: 1000, repeat: -1 },) );

            // play
            var ken = this.addDestroyableObject( this.add.sprite(this.getSceneWidth() - 20, this.getSceneHeight() - 20, 'JANGPUNG').play('KEN') );
            ken.setOrigin(1);

            // jump
            var jump = this.addDestroyableObject( this.add.sprite(this.getSceneWidth() - 20, this.getSceneHeight() - 160, 'JUMP').play('JUMP') );
            jump.setOrigin(1);

            //
            this.#_PV.ani = {
                ken: ken,
                jump: {
                    obj: jump,
                    orgY: jump.y
                }               
            }

        } catch(e) {
            var errMsg = this.getKey() + ".onCompleteSerialLoadAllAssets.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onUpdate() {
        var ani = this.#_PV.ani;
        if (ani != undefined) {
            var frameIndex = parseInt(ani.jump.obj.frame.name.substr(6));
            //console.log( stringFormat("jump index: {0}", frameIndex) );
            var jumpY = 0;

            switch (frameIndex)
            {
                case 7:
                    jumpY = 20;
                    break;

                case 8:
                    jumpY = 40;
                    break;

                case 9:
                    jumpY = 60;
                    break;

                case 10:
                    jumpY = 80;
                    break;

                case 11:
                    jumpY = 95;
                    break;

                case 12:
                    jumpY = 80;
                    break;

                case 13:
                    jumpY = 60;
                    break;

                case 14:
                    jumpY = 40;
                    break;

                case 15:
                    jumpY = 20;
                    break;

                default:
                    jumpY = 0;
                    break;
            }
            //console.log("frameIndex: " + frameIndex);

            if (frameIndex == 0) {
                ani.jump.obj.flipX = !ani.jump.obj.flipX;
            }

            ani.jump.obj.y = ani.jump.orgY - jumpY;
        }
    }
}