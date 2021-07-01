var SceneZOrder = function(fps, gameHost) {
    MielScene.apply(this, arguments);
}

SceneZOrder.prototype = Object.create(MielScene.prototype);
SceneZOrder.prototype.constructor = SceneZOrder;

////////////////////////////////

SceneZOrder.prototype.onInit = function() {
    //alert("init " + this.getKey());
}

SceneZOrder.prototype.onPreload = function() {
    //alert("preload " + this.getKey());
}

SceneZOrder.prototype.onCreate = function() {
    //alert("create " + this.getKey());
    this.cameras.main.setBackgroundColor('#378762');
    //this.cameras.main.backgroundColor.setTo(255,0,0);
    this.registerMenus();
}

SceneZOrder.prototype.onUpdate = function() {
    //console.log("update " + this.getKey());
}

SceneZOrder.prototype.getKey = function() {
    return SCENE_KEY_ZORDER;
}

SceneZOrder.prototype.registerMenus = function() {
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

SceneZOrder.prototype.onStop = function() {
    try {
        console.log("onStop " + this.getKey());

        if (this._images != undefined) {
            if (this._images.length > 0) {
                this._images.forEach(element => {
                    element.destroy();
                });
            }
            this._images = undefined;            
        }
        
    } catch(e) {
        var errMsg = this.getKey() + ".onStop.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneZOrder.prototype.onLoadAssets = function() {
    try {   
        if (this._assetLoadCompleted == true)
        {
            this.addImages();
        }
        else
        {
            this.load.image("zorderImage", "assets/image/South-Korea-Flag-icon.png");
            //this.load.image("Thunder", "assets/image/Thunder-icon.png");
            this.load.start();
        }
    } catch(e) {
        var errMsg = this.getKey() + ".onLoadAssets.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneZOrder.prototype.onLoadingAssets = function(value) {
    try {
        console.log(this.getKey() + " loadinig... " + value);
    } catch(e) {
        var errMsg = this.getKey() + ".onLoadingAssets.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneZOrder.prototype.onLoadAssetsComplete = function() {
    try {
        console.log(this.getKey() + " asset load completed !!!");

        this.addImages();

    } catch(e) {
        var errMsg = this.getKey() + ".onLoadAssetsComplete.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneZOrder.prototype.addImages = function() {
    try {

        const screenWidth = this._gameHost._config.scale.width;
        const screenHeight = this._gameHost._config.scale.height;

        let xCenter = parseInt(screenWidth / 2);
        let yCenter = parseInt(screenHeight / 2);

        this._images = new Array();

        this._images.push(new SouthKorea("SouthKorea_01", this, xCenter, yCenter - 50));
        this._images.push(new SouthKorea("SouthKorea_02", this, xCenter + 50, yCenter + 50));
        this._images.push(new SouthKorea("SouthKorea_03", this, xCenter - 50, yCenter + 50));

        /*var onObjDown = function(pointer, gameObject) {
            alert('down');
        }

        this.input.on('gameobjectdown', onObjDown);*/

        //this._images.push(new Thunder(this, 100, 100));

        /*var selfIt = this;
        function addImages() {
            var aa = new SouthKorea(selfIt, 200, 200);
            alert('added');
        }

        setTimeout(() => addImages(), 3000);

        //this.add.image(100, 100, 'southKorea');

        console.log("addImages - " + this.getKey());*/
        
    } catch(e) {
        var errMsg = this.getKey() + ".addImages.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneZOrder.prototype.onImgDown = function(img) {
    try {
        this._images.forEach(element => {
            if (element == img) {
                element.setZOrder(1);
            } else {
                element.setZOrder(0);
            }
        });
    } catch (e) {
        logAlert(this.getKey() + ".onImgDown.catched: " + e);
    }
}