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

/*
class SceneSwitch extends MielScene {
    constructor() {
        super();
        super.constructor(2);
    }

    init() {
        alert("init " + this.getKey());
    }

    preload() {
        alert("preload " + this.getKey());
    }
    
    create() {
        //alert("create " + this.getKey());
        this.cameras.main.setBackgroundColor('#6e6eef');
        //this.cameras.main.backgroundColor.setTo(255,0,0);
        this.registerMenus();
    }

    onUpdate() {
        console.log("onUpdate " + this.getKey());
    }

    getKey() {
        return SCENE_KEY_SWITCH;
    }
    
    registerMenus() {
        try {
            // switch scene
            {
                var menu = this.add.text(100, 50, "Go To Main").setOrigin(0.5);
                var menuY = menu.y;
                var selfIt = this;
                menu.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
                    //menu.setInteractive().off('pointerdown');
                    menu.y = menuY + 5;

                    function menuUp() {
                        menu.y = menuY;
                        selfIt._gameHost.switchScene(SCENE_KEY_MAIN);
                    };
                    setTimeout(() => menuUp(), 100);
                });
            }
        } catch(e) {
            var errMsg = this._identify + ".registerMenus.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    setGameHost(gameHost) {
        this._gameHost = gameHost;
    }


}*/


/*
class SceneSwitch extends MielScene {
    constructor() {
        super();
        super.constructor(2);
    }

    init() {
        alert("init " + this.getKey());
    }

    preload() {
        alert("preload " + this.getKey());
    }
    
    create() {
        //alert("create " + this.getKey());
        this.cameras.main.setBackgroundColor('#6e6eef');
        //this.cameras.main.backgroundColor.setTo(255,0,0);
        this.registerMenus();
    }

    onUpdate() {
        console.log("onUpdate " + this.getKey());
    }

    getKey() {
        return SCENE_KEY_SWITCH;
    }
    
    registerMenus() {
        try {
            // switch scene
            {
                var menu = this.add.text(100, 50, "Go To Main").setOrigin(0.5);
                var menuY = menu.y;
                var selfIt = this;
                menu.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
                    //menu.setInteractive().off('pointerdown');
                    menu.y = menuY + 5;

                    function menuUp() {
                        menu.y = menuY;
                        selfIt._gameHost.switchScene(SCENE_KEY_MAIN);
                    };
                    setTimeout(() => menuUp(), 100);
                });
            }
        } catch(e) {
            var errMsg = this._identify + ".registerMenus.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    setGameHost(gameHost) {
        this._gameHost = gameHost;
    }


}

*/

/*
var SceneSwitch = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function() {
        Phaser.Scene.call(this, {key: this.getKey()});

        this._identify = "SCENE_SWITCH";
    },
    init: function(){
        //alert("init " + this.getKey());
    },
    preload:  function() {
        //alert("preload " + this.getKey());
    },
    create: function() {
        //alert("create " + this.getKey());
        this.cameras.main.setBackgroundColor('#6e6eef');
        //this.cameras.main.backgroundColor.setTo(255,0,0);
        this.registerMenus();
    },
    update: function() {

    },
    getKey: function() {
        return SCENE_KEY_SWITCH;
    },
    registerMenus: function() {
        try {
            // switch scene
            {
                var menu = this.add.text(100, 50, "Go To Main").setOrigin(0.5);
                var menuY = menu.y;
                var selfIt = this;
                menu.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
                    //menu.setInteractive().off('pointerdown');
                    menu.y = menuY + 5;

                    function menuUp() {
                        menu.y = menuY;
                        selfIt._gameHost.switchScene(SCENE_KEY_MAIN);
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