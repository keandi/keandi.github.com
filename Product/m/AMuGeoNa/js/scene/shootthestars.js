class SceneShootTheStars extends GameScene {
    #_SPV = {};

    // ctor
    constructor(fps, gameHost) {
        try {
            super(fps, gameHost);

        } catch (e) {
            var errMsg = this.getKey() + ".ctor.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // secene key 반환
    getKey() {
        return KEY_GAME_SHOOTTHESTARS;
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

        _resourcePool.setScene(this)
            .addArgs('shootthestars_sprite' );
    };    

    // game object pool 이용시 생성 과정을 여기에서 구현
    onRegisterObjectCreateCallback() {
        try {
            super.onRegisterObjectCreateCallback();

            let selfIt = this;
            let v = this.#_SPV;

            const contentRc = this.ContentRc;

            // json data
            v.frameInfo = {
                frames: _resourcePool.getJsonFrameMap('shootthestars_sprite'),
            };

            // menu icon coords
            const menuIconCount = 7;
            const menuIconGapTotal = COORD_SHOOTTHESTARS_MENUICON_GAP * (menuIconCount - 1);
            let menuIconSize = {
                original: v.frameInfo.frames.get('MENU_HP_UP').sourceSize
            };
            let minMenuWidth = (menuIconSize.original.w * menuIconCount) + menuIconGapTotal;
            menuIconSize.w = menuIconSize.original.w;
            menuIconSize.h = menuIconSize.original.h;

            if (contentRc.Width < minMenuWidth) {
                menuIconSize.w = menuIconSize.h = parseInt((contentRc.Width - menuIconGapTotal) / menuIconCount);
            }

            // menu canon icon - base 2
            {
                this.registerGameObjectCreateCallback('canonIcon_base2', ()=>{
                    return new CanonMenuIcon('icon_base2', selfIt, ShootTheStarsCanonIconType.BASE_2, menuIconSize.w, (who, x, y, isFinished)=>{
                        // drag 구현 필요
                        console.log( stringFormat('drag x: {0}, y: {1}, isFinished: {2}', x, y, isFinished) );
                    });
                });
            }

        } catch(e) {
            var errMsg = this.getKey() + ".onRegisterObjectCreateCallback.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

     // game start
     onGameStart() {
        try {
            // 메뉴 설정
            {
                // title
                this.printTitle(_gameOption.selectText('별을 쏘다', 'ShootTheStars'));

                // icon
                this.createTopIcon('shootthestars_sprite', 'STAR');

                // help button
                {
                    /*let kor = "- 주사위 - \r\n맞추면? +6G\r\n틀리면? -1G";
                    let eng = "- Dice - \r\nif it fits? +6G\r\nwrong? -1G";
                    this.createHelpButton(_gameOption.selectText(kor, eng), 32 + 16 + 5); */
                }
            }            

            let selfIt = this;
            let v = this.#_SPV;

            // background
            this.setBackgroundColor( COLOR_SHOOTTHESTARS_BACKGROUND );

            // menu 
            {
                v.menus = {
                    base2: this.getGameObject('canonIcon_base2')
                };
                
                v.menus.base2.setPosition(100, 100);
            }

        } catch(e) {
            var errMsg = this.getKey() + ".onGameStart.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }


     // get msgbox x, y (상속하여 반환 필요)
     getMsgBoxXY() {
         const contentRc = this.ContentRc;
         return { x: contentRc.CenterX, y: contentRc.CenterY };
    }

    // 게임 강제종료 처리 (반드시 상속 구현 필요)
    gameUserExit() {
        this.gameEnd(true);
    }

    // 게임 정상종료 처리
    gameFinished() {
        this.gameEnd(false);
    }
}