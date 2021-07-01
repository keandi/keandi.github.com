var SceneDrag = function(fps, gameHost) {
    MielScene.apply(this, arguments);
}

SceneDrag.prototype = Object.create(MielScene.prototype);
SceneDrag.prototype.constructor = SceneDrag;

////////////////////////////////

SceneDrag.prototype.onInit = function() {
    //alert("init " + this.getKey());
}

SceneDrag.prototype.onPreload = function() {
    //alert("preload " + this.getKey());
}

SceneDrag.prototype.onCreate = function() {
    //alert("create " + this.getKey());
    
    this.setOriginalBackground('#453241', true);
    this.registerMenus();
}

SceneDrag.prototype.onUpdate = function() {
    //console.log("update " + this.getKey());
}

SceneDrag.prototype.getKey = function() {
    return SCENE_KEY_DRAG;
}

SceneDrag.prototype.registerMenus = function() {
    try {
        // switch scene
        {
            var menu = this.add.text(100, 50, "Go To Main").setOrigin(0.5);
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

SceneDrag.prototype.onStop = function() {
    try {
        console.log("onStop " + this.getKey());

        this.unregisterDragEvent();
        
        this._image.destroy();
        
    } catch(e) {
        var errMsg = this.getKey() + ".onStop.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneDrag.prototype.onLoadAssets = function() {
    try {   
        if (this._assetLoadCompleted == true)
        {
            this.addImages();
        }
        else
        {
            this.load.image("dragImage", "assets/image/South-Korea-Flag-icon.png");
            this.load.start();
        }
    } catch(e) {
        var errMsg = this.getKey() + ".onLoadAssets.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneDrag.prototype.onLoadingAssets = function(value) {
    try {
        console.log(this.getKey() + " loadinig... " + value);
    } catch(e) {
        var errMsg = this.getKey() + ".onLoadingAssets.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneDrag.prototype.onLoadAssetsComplete = function() {
    try {
        console.log(this.getKey() + " asset load completed !!!");

        this.addImages();

    } catch(e) {
        var errMsg = this.getKey() + ".onLoadAssetsComplete.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneDrag.prototype.addImages = function() {
    try {

        const screenWidth = this._gameHost._config.scale.width;
        const screenHeight = this._gameHost._config.scale.height;

        let xCenter = parseInt(screenWidth / 2);
        let yCenter = parseInt(screenHeight / 2);

        this._image = new DragImage("DragImage", this, xCenter, yCenter)

        this.registerDragEvent();
    } catch(e) {
        var errMsg = this.getKey() + ".addImages.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneDrag.prototype.registerDragEvent = function() {
    try {
        this.unregisterDragEvent();
        this._image.setDraggable();

        let selfIt = this;

        this.input.on('dragstart', function(pointer, gameObject) {
            
        });

        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            if (selfIt._image.isThat(gameObject) == true) {
                gameObject.x = dragX;
                gameObject.y = dragY;
            }
        });

        this.input.on('dragend', function(pointer, gameObject) {
            
        });

    } catch (e) {
        logAlert(this.getKey() + ".registerDragEvent.catched: " + e);
    }
}

SceneDrag.prototype.unregisterDragEvent = function() {
    try {
        this.input.off('dragstart');
        this.input.off('drag');
        this.input.off('dragend');        
    } catch (e) {
        logAlert(this.getKey() + ".unregisterDragEvent.catched: " + e);
    }
}