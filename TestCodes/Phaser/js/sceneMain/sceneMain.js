var SceneMain = function(fps, gameHost) {
    MielScene.apply(this, arguments);
}

SceneMain.prototype = Object.create(MielScene.prototype);
SceneMain.prototype.constructor = SceneMain;


SceneMain.prototype.onInit = function() {
    //alert("init " + this.getKey());
}

SceneMain.prototype.onPreload = function() {
    //alert("preload " + this.getKey());
}

SceneMain.prototype.onCreate = function() {
    //alert("create " + this.getKey());
    this.cameras.main.setBackgroundColor('#000');
    //this.cameras.main.backgroundColor.setTo(255,0,0);
    this.registerMenus();
}

SceneMain.prototype.onUpdate = function() {
    //console.log("update " + this.getKey());
}

SceneMain.prototype.getKey = function() {
    return SCENE_KEY_MAIN;
}

SceneMain.prototype.registerMenus = function() {
    try {

        const screenWidth = this._gameHost._config.scale.width;
        const divGap = parseInt(screenWidth / 3);
        const lineGap = 35;

        let menuOrder = 0;
        let selfIt = this;

        var makeMenu = function(text, sceneKey) {

            var menuLineIndex = 0;
            var menuLRIndex = 0;
            if (menuOrder >= 2) {
                menuLineIndex = parseInt(menuOrder / 2);
            }
            if (menuOrder >= 0) {
                if ((menuOrder % 2) != 0) {
                    menuLRIndex = 1;
                }
            }

            var y = (menuLineIndex + 1) * lineGap;
            var x = (menuLRIndex + 1) * divGap;

            var menu = selfIt.add.text(x, y, text).setOrigin(0.5);
            var menuUp = function() {
                selfIt._gameHost.switchScene(sceneKey);
            }
            setClick(menu, menuUp);

            menuOrder++;
        }

        // switch scene
        makeMenu("Switch", SCENE_KEY_SWITCH);
        /*{
            var menu = this.add.text(80, 25, "Switch Scene").setOrigin(0.5);
            var selfIt = this;
            var menuUp = function() {
                selfIt._gameHost.switchScene(SCENE_KEY_SWITCH);
            }
            setClick(menu, menuUp);
        }*/

        // sound scene
        makeMenu("Sound", SCENE_KEY_SOUND);

        // collision scene
        makeMenu("Collision", SCENE_KEY_COLLISION);

        // move scene
        makeMenu("Move", SCENE_KEY_MOVE);

        // z-order scene
        makeMenu("Z-Order", SCENE_KEY_ZORDER);

        // effect scene
        makeMenu("Scene-Effect", SCENE_KEY_SCENEEFFECT);

        // drag scene
        makeMenu("Drag", SCENE_KEY_DRAG);

        // delay effect scene
        makeMenu("Delay-Effect", SCENE_KEY_DELAYEFFECT);

        // html example scene
        makeMenu("Html", SCENE_KEY_HTML);

    } catch(e) {
        var errMsg = this._identify + ".registerMenus.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}


/*var SceneMain = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        /*var config = {
            key: this.getKey(),
            active: true,
            x: 0,
            y: 0,
            width: 200,
            height: 200,
            zoom: 1,
            scrollX: 0,
            scrollY: 0,
            roundPixels: false,
            visible: true,
            backgroundColor: '#FF0000',
            bounds: null, // {x, y, width, height}
        };*//*
        //Phaser.Scene.call(this, config);
        Phaser.Scene.call(this, {key: this.getKey()});

        this._identify = "SCENE_MAIN";
    },
    init: function(){
        //alert("init");
    },
    preload:  function() {
        //alert("preload");
    },
    create: function() {
        //alert("create " + this.getKey());
        this.cameras.main.setBackgroundColor('#000000');

        this.registerMenus();
    },
    update: function() {

    },
    getKey: function() {
        return SCENE_KEY_MAIN;
    },
    registerMenus: function() {
        try {
            // switch scene
            {
                var menu = this.add.text(100, 50, "Switch Scene").setOrigin(0.5);
                var menuY = menu.y;
                var selfIt = this;
                menu.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
                    //menu.setInteractive().off('pointerdown');
                    menu.y = menuY + 5;

                    function menuUp() {
                        menu.y = menuY;
                        selfIt._gameHost.switchScene(SCENE_KEY_SWITCH);
                    };
                    setTimeout(() => menuUp(), 100);
                });
            }
        } catch(e) {
            var errMsg = this._identify + ".registerMenus.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    },
    setGameHost: function(gameHost) {
        this._gameHost = gameHost;
    }
});

*/