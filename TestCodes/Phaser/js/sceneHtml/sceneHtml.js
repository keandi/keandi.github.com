class SceneHtml extends SceneMenuBase {
    // ctor
    constructor(fps, gameHost) {
        super(fps, gameHost);
    }

    onCreate() {
        //alert("create " + this.getKey());

        this.createHtmlMenu();
    }

    getKey() {
        return SCENE_KEY_HTML;
    }   

    onStop() {
        try {
            console.log("onStop " + this.getKey());

            super.onStop();

            this.destroyHtmlDom();
            
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
                this.load.html('inputbox', 'assets/html/inputbox.html');
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

        } catch(e) {
            var errMsg = this.getKey() + ".onLoadAssetsComplete.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    createHtmlMenu() {
        try {
            const screenWidth = this._gameHost._config.scale.width;
            const screenHeight = this._gameHost._config.scale.height;
            const xCenter = parseInt(screenWidth / 2);
            const yCenter = parseInt(screenHeight / 2);

            //
            let selfIt = this;

            this.registerMenu(60, 60, "Show HTML", ()=>{               
                selfIt.destroyHtmlDom();
                selfIt._htmlDom = selfIt.add.dom(200, 200).createFromCache('inputbox');
                selfIt._htmlDom.setDepth(10);
            });
    
            this.registerMenu(200, 60, "Get Value", ()=>{
                if (selfIt._htmlDom == undefined) {
                    alert("Input first!!!")
                    return; 
                }

                var inputText = selfIt._htmlDom.getChildByID('inputId');
                //var inputText = selfIt._htmlDom.getChildByName('inputName');
                var text = inputText.value;
                selfIt.destroyHtmlDom();

                alert(stringFormat("Input-text: [{0}]", text));
            });

        } catch(e) {
            var errMsg = this.getKey() + ".createHtmlMenu.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroyHtmlDom() {
        try {

            if (this._htmlDom == undefined) { return; }

            this._htmlDom.destroy();
            this._htmlDom = undefined;

        } catch(e) {
            var errMsg = this.getKey() + ".destroyHtmlDom.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

}