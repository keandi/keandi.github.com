class SceneSwitch extends SceneMenuBase {

    #_PV = {};

    // ctor
    constructor(fps, gameHost) {
        super(fps, gameHost);
    }

    onCreate() {
        //alert("create " + this.getKey());
        this._testText = this.add.text(10, 100, "test text !!!").setOrigin(0);
        this._testText.scaleX = 2.0;
        this._testText.scaleY = 11.0;

    }

    getKey() {
        return SCENE_KEY_SWITCH;
    }   

    onStop() {
        super.onStop();

        this._testText.destroy();
    }

    onUpdate() {
        
    }
}


/*

var SceneSwitch = function(fps, gameHost) {
    MielScene.apply(this, arguments);
}

SceneSwitch.prototype = Object.create(MielScene.prototype);
SceneSwitch.prototype.constructor = SceneSwitch;

SceneSwitch.prototype.onInit = function() {
    //alert("init " + this.getKey());
}

SceneSwitch.prototype.onPreload = function() {
    //alert("preload " + this.getKey());
}

SceneSwitch.prototype.onCreate = function() {
    //alert("create " + this.getKey());
    this.cameras.main.setBackgroundColor('#AE3535');
    //this.cameras.main.backgroundColor.setTo(255,0,0);
    this.registerMenus();
}

SceneSwitch.prototype.onUpdate = function() {
    //console.log("update " + this.getKey());
}

SceneSwitch.prototype.getKey = function() {
    return SCENE_KEY_SWITCH;
}

SceneSwitch.prototype.registerMenus = function() {
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


*/