class SceneOption extends GameScene {
    #_SPV = {};

    // ctor
    constructor(fps, gameHost) {
        try {
            super(fps, gameHost);

            this.IsNeedUserExitQuery = false;
        } catch (e) {
            var errMsg = this.getKey() + ".ctor.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // secene key 반환
    getKey() {
        return KEY_OPTION;
    }

    onCreate() {
        //alert("create " + this.getKey());

        this._isStopped = false;
    }

    onPreset() {
        this._isUseSerialLoader = true;
    }

    onStop() {
        try {
            //console.log("onStop " + this.getKey());

            super.onStop();


            this._isStopped = true;
            
        } catch(e) {
            var errMsg = this.getKey() + ".onStop.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onSerialLoadAssets() {
        super.onSerialLoadAssets();

        this.addSerialLoadAsset( 'exit_button',
        () => {
            this.load.atlas(
                'exit_button',
                'assets/image/exit_button.png?v=1',
                'assets/atlas/exit_button.json'
            );
        }, 2 );

        this.addSerialLoadAsset( 'option_button',
        () => {
            this.load.atlas(
                'option_button',
                'assets/image/option_button.png',
                'assets/atlas/option_button.json'
            );
        }, 2 );
    };    
    
    onCompleteSerialLoadAllAssets() {
        try {
            super.onCompleteSerialLoadAllAssets();

            //
            this.printTitle(_gameOption.selectText('옵션', 'Option'));

            //
            this.#createIcon();
            this.#createOptionMenus();
            
        } catch(e) {
            var errMsg = this.getKey() + ".onCompleteSerialLoadAllAssets.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onCompleteSerialLoadAllAssetsAfter() {
        // nothing. 구현하여 게임 접근 체크를 하지 않도록 한다.
    }

    // title icon
    #createIcon() {
        try {
            const topMenuRc = this.TopMenuRc;

            this.addDestroyableObject( this.add.image(32, topMenuRc.CenterY, 'option_button', 'BTN_UP') ).setDepth(DEPTH_MENU_BUTTON);
        } catch(e) {
            var errMsg = this.getKey() + ".createIcon.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // create option menu
    #createOptionMenus() {
        try {
            let menu = this.addDestroyableObject( new HorizontalOptionMenu("option_menu", this) );

            // language
            menu.addMenu(_gameOption.selectText("언어", "Language"))
                .appendMenuOption("KOREAN", (_gameOption.language.value === Language.KOREAN.value) ? true : false, ()=>{
                    _gameOption.saveLanguage(Language.KOREAN);
                })
                .appendMenuOption("ENGLISH", (_gameOption.language.value === Language.ENGLISH.value) ? true : false, ()=>{
                    _gameOption.saveLanguage(Language.ENGLISH);
                });

            // vibration
            menu.addMenu(_gameOption.selectText("진동", "Vibration"))
                .appendMenuOption("Yes", _gameOption.Vibration, ()=>{
                    _gameOption.saveVibration(true);
                })
                .appendMenuOption("No", !_gameOption.Vibration, ()=>{
                    _gameOption.saveVibration(false);
                });

            // make
            menu.makeObjects(COORD_OPTION_BEGIN_TOP/*this.getSceneCenterY() - 100*/);

        } catch(e) {
            var errMsg = this.getKey() + ".createOptionMenus.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onUpdate() {

    }
}