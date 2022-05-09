class TestScene extends BaseScene {
    #_SPV = {};

    // ctor
    constructor(fps, gameHost) {
        try {
            super(fps, gameHost);

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // secene key 반환
    getKey() {
        return KEY_TEST;
    }

    onCreate() {
        //alert("create " + this.getKey());

        this._isStopped = false;

        //this.#addText();
    }

    onPreset() {
        this._isUseSerialLoader = true;
    }

    onStop() {
        try {
            //console.log("onStop " + this.getKey());

            super.onStop();

            this._isStopped = true;
            
        } catch(e) {
            var errMsg = this.getKey() + ".onStop.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onSerialLoadAssets() {
        _resources.setScene(this)
            .addArgs('enemy_test');
        /*this.addSerialLoadAsset( 'firework_yellow',
        () => {
            this.load.atlas(
                'firework_yellow',
                'assets/image/firework_yellow.png',
                'assets/atlas/firework_yellow.json'
            );
        }, 2 ); */
    };
    
    
    onCompleteSerialLoadAllAssets() {
        try {
            //console.log(this.getKey() + " asset load completed !!!");

            /*this.addDestroyableObject( this.anims.create({ key: 'firework', frames: this.anims.generateFrameNames('firework_yellow', { prefix: 'FW', end: 29, zeroPad: 4 }), duration: 1500, repeat: 0 },) );
            var firework = this.addDestroyableObject( this.add.sprite(this.getSceneCenterX(), this.getSceneCenterY(), 'firework').play('firework') );
            firework.setOrigin(0.5);

            this.#_SPV.firework = firework;
            
            // pointer event register
            this.addPointerEvent('down', (pointer)=>{
                _gameHost.switchScene(KEY_LEVEL);
            });
            */


            /*var aaaa = this.cache.json.get('aaaa');
            console.log(aaaa.frames[0].filename); */

            var testEnemy = new TestEnemy("testenemy", this, _resources.getJsonObject('enemy_test'));
            var myValue = 0;

        } catch(e) {
            var errMsg = this.getKey() + ".onCompleteSerialLoadAllAssets.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onUpdate() {

        //console.log("host time: " + this._gameHost.Time);
    }
}