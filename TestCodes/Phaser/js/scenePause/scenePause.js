class ScenePause extends SceneMenuBase {
    #_PV = {};

    // ctor
    constructor(fps, gameHost) {
        super(fps, gameHost);
    }

    onCreate() {
        //alert("create " + this.getKey());

        this._isStopped = false;

        this.#_PV.pauseText = undefined;
    }

    onPreset() {
        this._isUseSerialLoader = true;
    }

    getKey() {
        return SCENE_KEY_PAUSE;
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
        );    
    };
    
    
    onCompleteSerialLoadAllAssets() {
        try {
            console.log(this.getKey() + " asset load completed !!!");

            let selfIt = this;

            const sceneCenter = {
                x: this.getSceneCenterX(),
                y: this.getSceneCenterY()
            };
            
            // animation
            this.addDestroyableObject( this.anims.create({ key: 'KEN', frames: this.anims.generateFrameNames('KEN-sprite', { prefix: 'KEN', end: 10, zeroPad: 4 }), duration: 1000, repeat: -1 },) );

            // play
            var ken = this.addDestroyableObject( this.add.sprite(this.getSceneWidth() - 20, this.getSceneHeight() - 20, 'JANGPUNG').play('KEN') );
            ken.setOrigin(1);
            this.#_PV.ken = ken;

            // pointer event register
            this.addPointerEvent('down', (pointer)=>{
                if (this.isInMenuArea(pointer.x, pointer.y) == true) {return;}
                if (this._isPause == true) {
                    this.resume();
                } else {
                    this.pause();
                }
            });

            // time text
            this.#_PV.timeText = this.addDestroyableObject( addText(this, 100, 50, "It's time", 22) );

        } catch(e) {
            var errMsg = this.getKey() + ".onCompleteSerialLoadAllAssets.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onPreUpdate(time, delta) {
        if (this.#_PV.timeText == undefined) { return; }

        var t = parseInt(time / 1000);
        this.#_PV.timeText.setText( "sec: " + t );
    }

    onUpdate() {
        
    }

    // on pause (상속하여 사용)
    onPause() {
        try {
            console.log("onPause");

            if (this.#_PV.pauseText == undefined) {
                this.#_PV.pauseText = this.addDestroyableObject( addText(this, this.getSceneCenterX(), this.getSceneCenterY(), "PAUSE", 48) );
            }
            this.#_PV.pauseText.visible = true;

            this.#_PV.ken.stop();
        } catch(e) {
            var errMsg = this.getKey() + ".onPause.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // on resume (상속하여 사용)
    onResume() {
        try {
            console.log("onResume");

            if (this.#_PV.pauseText == undefined) { return; }
            this.#_PV.pauseText.visible = false;

            this.#_PV.ken.play('KEN');
        } catch(e) {
            var errMsg = this.getKey() + ".onPause.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 
}