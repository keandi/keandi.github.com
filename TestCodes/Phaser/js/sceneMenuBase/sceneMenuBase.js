class SceneMenuBase extends MielScene {
    #_PV = {};

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
            this._menuPan.setDepth(1000);

            //
            this.#_PV.menuArea = {
                left: 0,
                top: 0,
                right: w,
                bottom: h,
                width: w,
                height: h
            };
        } catch(e) {
            var errMsg = this._identify + ".makeMenuPan.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    registerMenus() {
        try {
            var selfIt = this;
            this._goMainMenu = this.registerMenu(80, 20, "[Go To Main]", ()=>{
                if (selfIt.isGoMainEnable() != true) { return; }
                selfIt._gameHost.switchScene(SCENE_KEY_MAIN)
            });
            /*{
                var menu = this.add.text(80, 20, "[Go To Main]").setOrigin(0.5);
                var selfIt = this;
                var menuUp = function() {
                    selfIt._gameHost.switchScene(SCENE_KEY_MAIN);
                }
                setClick(menu, menuUp);                

                this._goMainMenu = menu;
            }*/
        } catch(e) {
            var errMsg = this._identify + ".registerMenus.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 이동 메뉴 사용 가능 체크 (상속하여 사용)
    isGoMainEnable() {
        return true;
    }

    registerMenu(x, y, text, cb) {
        try {
            var menu = this.add.text(x, y, text).setOrigin(0.5);
            menu.setDepth(1000);
            setClick(menu, cb);

            if (this._menus == undefined) { this._menus = []; }
            this._menus.push(menu);
            return menu;
        } catch(e) {
            var errMsg = this._identify + ".registerMenu.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onStop() {
        try {
            //alert("onStop " + this.getKey());

            //this._goMainMenu.destroy();
            if (this._menus != undefined) {
                this._menus.forEach(element => {
                    element.destroy();
                });
            }
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

    // 메뉴 제외 구역 정보 반환
    getMainArea() {
        return {
            left: 0,
            top: this._menuPanHeight + 1,
            right: this.getSceneWidth(),
            bottom: this.getSceneHeight()
        };
    }

    // 메뉴 제외 구역 center 기반 정보 반환
    getMainAreaIncludeCenter() {
        const area = this.getMainArea();
        const wh = {
            w: area.right - area.left,
            h: area.bottom - area.top
        }
        return {
            x: wh.w / 2,
            y: (wh.h / 2) + this._menuPanHeight,
            width: wh.w,
            height: wh.h
        }
    }

    // 
    isInMenuArea(x, y) {
        try {
            return (x >= this.#_PV.menuArea.left
                && x <= this.#_PV.menuArea.right
                && y >= this.#_PV.menuArea.top
                && y <= this.#_PV.menuArea.bottom)
                ? true : false;

        } catch(e) {
            var errMsg = this.getKey() + ".isInMenuArea.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
}

