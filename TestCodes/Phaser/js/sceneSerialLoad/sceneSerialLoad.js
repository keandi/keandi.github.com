class SceneSerialLoad extends SceneMenuBase {
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
        return SCENE_KEY_SERIALLOAD;
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
        var selfIt = this;
        for (var i = 0; i < 150; i++) {
            let imgName = "FireBase_" + i;
            this.addSerialLoadAsset( () => {
                    selfIt.load.image(imgName, "assets/image/fire_base.png"); 
                    //console.log("img name=" + imgName);
                } );
        } 

        //this.addSerialLoadAsset( () => { this.load.image("FireBase_10", "assets/image/fire_base.png"); } );
        //this.addSerialLoadAsset( () => { this.load.image("FireBase_11", "assets/image/fire_base.png"); } );
        //this.addSerialLoadAsset( () => { this.load.image("FireBase_12", "assets/image/fire_base.png"); } );
    }
    
    
    onCompleteSerialLoadAllAssets() {
        try {
            console.log(this.getKey() + " asset load completed !!!");

            this.addDestroyableObject( this.add.image(100, 100, "FireBase_10") );
            this.addDestroyableObject( this.add.image(130, 130, "FireBase_48") );
            this.addDestroyableObject( this.add.image(190, 190, "FireBase_49") );
            

        } catch(e) {
            var errMsg = this.getKey() + ".onCompleteSerialLoadAllAssets.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
}