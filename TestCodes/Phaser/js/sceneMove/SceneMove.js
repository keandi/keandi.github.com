var SceneMove = function(fps, gameHost) {
    MielScene.apply(this, arguments);
}

SceneMove.prototype = Object.create(MielScene.prototype);
SceneMove.prototype.constructor = SceneMove;

SceneMove.prototype.onInit = function() {
    //alert("init " + this.getKey());
}

SceneMove.prototype.onPreload = function() {
    //alert("preload " + this.getKey());
}

SceneMove.prototype.onCreate = function() {
    //alert("create " + this.getKey());
    this.cameras.main.setBackgroundColor('#255225');
    this.registerMenus();
    //this.loadAudio();
}

SceneMove.prototype.onUpdate = function() {
    //console.log("update " + this.getKey());

    if (this._assetLoadCompleted != true) { return; }


}

SceneMove.prototype.getKey = function() {
    return SCENE_KEY_MOVE;
}

SceneMove.prototype.registerMenus = function() {
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


SceneMove.prototype.onStop = function() {
    try {
        //alert("onStop " + this.getKey());
        this.input.off('pointerdown');
    } catch(e) {
        var errMsg = this.getKey() + ".onStop.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneMove.prototype.onLoadAssets = function() {
    try {
        this.load.image("Thunder", "assets/image/Thunder-icon.png");
        this.load.start();
    } catch(e) {
        var errMsg = this.getKey() + ".onLoadAssets.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneMove.prototype.onLoadingAssets = function(value) {
    try {
        console.log(this.getKey() + " loadinig... " + value);
    } catch(e) {
        var errMsg = this.getKey() + ".onLoadingAssets.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneMove.prototype.onLoadAssetsComplete = function() {
    try {
        console.log(this.getKey() + " asset load completed !!!");

        var selfIt = this;
        this.input.on('pointerdown', function(pointer, x, y, event) {
            selfIt.pointAction(pointer.x, pointer.y);
        });

    } catch(e) {
        var errMsg = this.getKey() + ".onLoadAssetsComplete.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneMove.prototype.pointAction = function(x, y) {
    try {
        var thunderObj = new Thunder(this, x, y);
        //this.children.add(thunderObj);
        thunderObj.action(x, y);

        /*var selfIt = this;

        var thunderObj = new Thunder(this, x, y);
        this.children.add(thunderObj);

        function action() {
            selfIt.children.remove(thunderObj);
            thunderObj.destroy();
        };
        setTimeout(() => action(), 2000);*/

    } catch(e) {
        var errMsg = this.getKey() + ".pointAction.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}