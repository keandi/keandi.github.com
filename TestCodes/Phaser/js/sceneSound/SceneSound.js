var SceneSound = function(fps, gameHost) {
    MielScene.apply(this, arguments);
}

SceneSound.prototype = Object.create(MielScene.prototype);
SceneSound.prototype.constructor = SceneSound;

SceneSound.prototype.onInit = function() {
    //alert("init " + this.getKey());
}

SceneSound.prototype.onPreload = function() {
    //alert("preload " + this.getKey());
}

SceneSound.prototype.onCreate = function() {
    //alert("create " + this.getKey());
    this.cameras.main.setBackgroundColor('#938475');
    this.registerMenus();
    //this.loadAudio();
}

SceneSound.prototype.onUpdate = function() {
    //console.log("update " + this.getKey());
}

SceneSound.prototype.getKey = function() {
    return SCENE_KEY_SOUND;
}

SceneSound.prototype.registerMenus = function() {
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
        
        // play sound
        {
            var menu = this.add.text(80, 100, "[Play Sound]").setOrigin(0.5);
            var selfIt = this;
            var menuUp = function() {
                selfIt._audio.stop();
                selfIt._audio.play();
                //selfIt.sound.stop("testAudio");
                //selfIt.sound.play("testAudio");
            }
            setClick(menu, menuUp);
        }
    } catch(e) {
        var errMsg = this._identify + ".registerMenus.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

/*
SceneSound.prototype.loadAudio = function() {
    try {
        this.load.audio("testAudio", "assets/audio/481372bf-d442-46f1-ae34-a1fc4bf97c93.mp3");
        this.load.start();

        var selfIt = this;
        this.load.on('complete', function(){
            selfIt._audio = selfIt.sound.add("testAudio");
        });

        //this._audio = this.sound.add("testAudio");
    } catch(e) {
        var errMsg = this.getKey() + ".loadAudio.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}*/

SceneSound.prototype.onStop = function() {
    try {
        //alert("onStop " + this.getKey());
        this._audio.stop();
    } catch(e) {
        var errMsg = this.getKey() + ".onStop.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneSound.prototype.onLoadAssets = function() {
    try {
        this.load.audio("testAudio", "assets/audio/481372bf-d442-46f1-ae34-a1fc4bf97c93.mp3");
        this.load.start();
    } catch(e) {
        var errMsg = this.getKey() + ".onLoadAssets.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneSound.prototype.onLoadingAssets = function(value) {
    try {
        console.log("loadinig... " + value);
    } catch(e) {
        var errMsg = this.getKey() + ".onLoadingAssets.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneSound.prototype.onLoadAssetsComplete = function() {
    try {
        this._audio = this.sound.add("testAudio");
    } catch(e) {
        var errMsg = this.getKey() + ".onLoadAssetsComplete.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}