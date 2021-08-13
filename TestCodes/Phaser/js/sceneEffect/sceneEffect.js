var SceneEffect = function(fps, gameHost) {
    MielScene.apply(this, arguments);
}

SceneEffect.prototype = Object.create(MielScene.prototype);
SceneEffect.prototype.constructor = SceneEffect;

SceneEffect.prototype.onInit = function() {
    //alert("init " + this.getKey());
}

SceneEffect.prototype.onPreload = function() {
    //alert("preload " + this.getKey());
}

SceneEffect.prototype.onCreate = function() {
    //alert("create " + this.getKey());
    this.setOriginalBackground('#252525', true);
    this.registerMenus();
    //this.loadAudio();
}

SceneEffect.prototype.onUpdate = function() {
    //console.log("update " + this.getKey());
}

SceneEffect.prototype.getKey = function() {
    return SCENE_KEY_SCENEEFFECT;
}

SceneEffect.prototype.registerMenus = function() {
    try {
        // switch scene
        {
            var menu = this.add.text(80, 20, "[Go To Main]").setOrigin(0.5);
            var selfIt = this;
            var menuUp = function() {
                selfIt._gameHost.switchScene(SCENE_KEY_MAIN);
            }
            setClick(menu, menuUp);
            
        }
    } catch(e) {
        var errMsg = this._identify + ".registerMenus.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneEffect.prototype.onStop = function() {
    try {
        //alert("onStop " + this.getKey());

        //this.input.off('pointerdown');
        
    } catch(e) {
        var errMsg = this.getKey() + ".onStop.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneEffect.prototype.onLoadAssets = function() {
    try {

        if (this._assetLoadCompleted == true)
        {
            this.onLoadAssetsComplete();
        }
        else
        {
            this.load.image("brokenGlass", "assets/image/glass-crack.png");
        this.load.start();
        }

    } catch(e) {
        var errMsg = this.getKey() + ".onLoadAssets.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneEffect.prototype.onLoadingAssets = function(value) {
    try {
        console.log(this.getKey() + ": assets loadinig... ");
    } catch(e) {
        var errMsg = this.getKey() + ".onLoadingAssets.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneEffect.prototype.onLoadAssetsComplete = function() {
    try {
        console.log(this.getKey() + ": assets load completed !!! ");

        let selfIt = this;
        /* this.input.on('pointerdown', function(pointer, x, y, event) {
            selfIt.pointAction(pointer.x, pointer.y);
        }); */
        this.addPointerEvent('down', (pointer)=>{
            selfIt.pointAction(pointer.x, pointer.y);
        });
    } catch(e) {
        var errMsg = this.getKey() + ".onLoadAssetsComplete.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneEffect.prototype.pointAction = function(x, y) {
    try {
        // 
        if (y < 40 && x < 160) { return; }

        let brokenImg = new BrokenImg("Broken-Glass", this, x, y);
        brokenImg.action(x, y);

        this.flashEffect('#F01111', '#11F011', 3, 50, FlashEffect_LaunchOption.APPEND);
    } catch(e) {
        var errMsg = this.getKey() + ".pointAction.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}