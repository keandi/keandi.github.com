class SceneLevel extends BaseScene {
    #_SPV = {};

    // ctor
    constructor(name, gameHost) {
        try {
            super(name, gameHost);

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // secene key 반환
    getKey() {
        return KEY_LEVEL;
    }

    onCreate() {
        //alert("create " + this.getKey());

        this._isStopped = false;
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
        this.addSerialLoadAsset( 'firework_yellow',
        () => {
            this.load.atlas(
                'firework_yellow',
                'assets/image/firework_yellow.png',
                'assets/atlas/firework_yellow.json'
            );
        }, 2 );
    };
    
    
    onCompleteSerialLoadAllAssets() {
        try {
            //console.log(this.getKey() + " asset load completed !!!");

            this.#createMenu();
        } catch(e) {
            var errMsg = this.getKey() + ".onCompleteSerialLoadAllAssets.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 상단 메뉴 설정
    #createMenu() {
        try {
            let menuRc = new Rect(0, 0, this.getSceneWidth(), 52);
            let selfIt = this;

            // bottom
            {
                let graphics = this.addDestroyableObject( this.add.graphics() );

                graphics.fillGradientStyle(0x252525, 0x7A7A7A, 0x252525, 0x7A7A7A, 1);
                graphics.fillRect(menuRc.Left, menuRc.Top, menuRc.Width / 2, menuRc.Height);

                graphics.fillGradientStyle(0x7A7A7A, 0x252525, 0x7A7A7A, 0x252525, 1);
                graphics.fillRect(menuRc.Left + (menuRc.Width / 2), menuRc.Top, menuRc.Width / 2, menuRc.Height);
            }

            // border
            {
                let create = function(x, y, w, h, c) {
                    var g = selfIt.addDestroyableObject( selfIt.add.graphics() );
                    g.fillStyle(c, 1);
                    g.fillRect(x, y, w, h);
                    return g;
                }

                const borderDepth = 6;
                const borderEdge = 2;
                create(0, 0, menuRc.Width, borderDepth, 0xFFFFFF);
            }

        } catch(e) {
            var errMsg = this.getKey() + ".createMenu.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onUpdate() {

    }
}