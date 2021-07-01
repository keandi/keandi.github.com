class SceneMenuBase extends MielScene {
    // ctor
    constructor(fps, gameHost, config) {
        super(fps, gameHost, config);

        this._menuPanHeight = 40;
    }

    create() {
        this.setOriginalBackground('#252525', true);
        this.makeMenuPan();
        this.registerMenus();
    
        this.onCreate();
    }

    makeMenuPan() {
        try {
            const w = this._gameHost._config.scale.width;
            const h = this._menuPanHeight;//this._gameHost._config.scale.height;
            const x = parseInt(w / 2);
            const y = parseInt(h / 2);

            this._menuPan = this.add.rectangle(x, y, w, h, 0x6666ff);
        } catch(e) {
            var errMsg = this._identify + ".makeMenuPan.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    registerMenus() {
        try {
            // switch scene
            {
                var menu = this.add.text(80, 20, "[Go To Main]").setOrigin(0.5);
                var selfIt = this;
                var menuUp = function() {
                    selfIt._gameHost.switchScene(SCENE_KEY_MAIN);
                }
                setClick(menu, menuUp);                

                this._goMainMenu = menu;
            }
        } catch(e) {
            var errMsg = this._identify + ".registerMenus.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onStop() {
        try {
            //alert("onStop " + this.getKey());

            this._goMainMenu.destroy();
            this._menuPan.destroy();
            
        } catch(e) {
            var errMsg = this.getKey() + ".onStop.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    getMenuBottom() {
        return this._menuPanHeight;
    }
}

