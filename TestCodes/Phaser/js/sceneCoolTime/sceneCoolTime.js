class SceneCoolTime extends SceneMenuBase {
    // ctor
    constructor(fps, gameHost) {
        super(fps, gameHost);
    }

    onCreate() {
        //alert("create " + this.getKey());
    }

    getKey() {
        return SCENE_KEY_COOLTIME;
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
                this.load.image("buttonImage", "assets/image/South-Korea-Flag-icon.png");
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

            // button base
            let button = this.addDestroyableObject( this.add.image(this.getSceneCenterX(), this.getSceneCenterY(), 'buttonImage') );
            button.setInteractive();
            button.on('pointerdown', (pointer, x, y, event) => {
                if (selfIt._isCoolTime == true) { return; }
                console.log( stringFormat("click x: {0}, y: {1}, img x: {2}, y: {3}", pointer.x, pointer.y
                    , button.x, button.y) ); 

                selfIt._isCoolTime = true;
                percentText.visible = true;

                let alpha = 0.0;
                button.alpha = alpha;

                let onCoolTime = function() {
                    alpha += 0.01;
                    if (alpha >= 1.0) {
                        clearInterval(timerId);
                        button.alpha = 1.0;
                        percentText.visible = false;
                        selfIt._isCoolTime = false;
                        return;
                    } else {
                        button.alpha = alpha;
                        percentText.setText( stringFormat("{0}%", parseInt(alpha * 100)) );
                    }
                }
                let timerId = setInterval( () => onCoolTime(), 30 );
            });
            this.addDestroyCB( () => { 
                button.off('pointerdown'); 
            } );

            // percent text
            let percentText = this.addDestroyableObject( this.add.text(this.getSceneCenterX(), this.getSceneCenterY(), "100%").setOrigin(0.5) );
            percentText.visible = false;

        } catch(e) {
            var errMsg = this.getKey() + ".onLoadAssetsComplete.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
    
    isGoMainEnable() {
        return (this._isCoolTime == true) ? false : true;
    }
}