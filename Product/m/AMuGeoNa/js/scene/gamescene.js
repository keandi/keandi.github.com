class GameScene extends BaseScene {
    #_PV = {};

    // ctor
    constructor(fps, gameHost) {
        try {
            super(fps, gameHost);

            this.#_PV.isNeedExitButton = true;
            this.#_PV.isNeedUserExitQuery = true;

        } catch (e) {
            var errMsg = this.getKey() + ".ctor.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onStop() {
        try {
            super.onStop();
            
            this.#destroyGoldNotify();
        } catch(e) {
            var errMsg = this.getKey() + ".onStop.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // exit 버튼 필요여부 설정. 
    set IsNeedExitButton(value) {
        this.#_PV.isNeedExitButton = value;
    }

    // value: true-사용자 질문 필요, false-정상 exit 처리
    set IsNeedUserExitQuery(value) {
        this.#_PV.isNeedUserExitQuery = value;
    }

    onSerialLoadAssets() {
        /*this.addSerialLoadAsset( 'coins',
        () => {
            this.load.atlas(
                'coins',
                'assets/image/coins.png',
                'assets/atlas/coins.json'
            );
        }, 2 ); */

        /*this.addSerialLoadAsset( 'msgbox_buttons',
        () => {
            this.load.atlas(
                'msgbox_buttons',
                'assets/image/msgbox_buttons.png',
                'assets/atlas/msgbox_buttons.json'
            );
        }, 2 );*/

        /*this.addSerialLoadAsset( 'coin_drop',
            () => this.load.audio('coin_drop', 'assets/audio/coin_drop.mp3'), 1 ); */

        _resourcePool.setScene(this)
            .addArgs('coins', 'msgbox_buttons', 'coin_add', 'coin_use', 'exit_button', 'help_button', 'pass_button');
    };    
    
    onCompleteSerialLoadAllAssets() {
        try {
            //console.log(this.getKey() + " asset load completed !!!");

            this.#createMenus();
        } catch(e) {
            var errMsg = this.getKey() + ".onCompleteSerialLoadAllAssets.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onCompleteSerialLoadAllAssetsAfter() {
        try {
            //console.log("entry info: " + JSON.stringify(_gameData.EntryGameLevelInfo));
            if (_gameData.EntryGameLevelInfo.arg.sceneKey != this.getKey()) {
                this.msgboxOk(_gameOption.selectText("경고", "Warning"), 
                _gameOption.selectText("잘못된 접근입니다.", "The wrong approach."), 
                ()=>this._gameHost.switchScene(KEY_LEVEL));
                return false;
            }
            return true;
        } catch(e) {
            var errMsg = this.getKey() + ".onCompleteSerialLoadAllAssetsAfter.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // game object pool 이용시 생성 과정을 여기에서 구현
    onRegisterObjectCreateCallback() {
        try {
            super.registerGameObjectCreateCallback();

            //
            let selfIt = this;
            let coinXY = {
               x: this.#_PV.coinText.x,
               y: this.BottomMenuRc.Top
            };
            // this.#_PV.coinText

            // add coin text
            this.registerGameObjectCreateCallback('addCoin', ()=>{
                return new CoinTextAction("cta_add", selfIt, coinXY.x, coinXY.y, true);
            });

            // use coin text
            this.registerGameObjectCreateCallback('useCoin', ()=>{
                return new CoinTextAction("cta_use", selfIt, coinXY.x, coinXY.y, false);
            });
        } catch(e) {
            var errMsg = this.getKey() + ".onRegisterObjectCreateCallback.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // game start
    onGameStart() {
        try {

        } catch(e) {
            var errMsg = this.getKey() + ".onGameStart.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    #createMenus() {
        try {
            const topCY = 40;
            const bottomCY = 32;
            this.#_PV.topMenuRc = new Rect(0, 0, this.getSceneWidth(), topCY);
            this.#_PV.bottomMenuRc = new Rect(0, this.getSceneHeight() - bottomCY, this.getSceneWidth(), bottomCY);
            this.#_PV.contentRc = new Rect(0, this.#_PV.topMenuRc.Bottom + 1, this.getSceneWidth(), 
                this.getSceneHeight() - (this.#_PV.topMenuRc.Height + this.#_PV.bottomMenuRc.Height));

            this.#_PV.graphics = this.addDestroyableObject( this.add.graphics() );
            this.#_PV.graphics.setDepth(DEPTH_MENU);
            
            this.#createTopMenu();
            this.#createBottomMenu();
            this.refreshGold();

        } catch (e) {
            var errMsg = this.getKey() + ".createMenus.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 상단 메뉴 설정
    #createTopMenu() {
        try {
            let menuRc = this.#_PV.topMenuRc;
            let g = this.#_PV.graphics;

            const height = menuRc.Height / 2;

            g.fillStyle(COLOR_MENUCOLOR_1, 1);
            g.fillRect(menuRc.Left, menuRc.Top, menuRc.Width, height);

            g.fillStyle(COLOR_MENUCOLOR_2, 1);
            g.fillRect(menuRc.Left, menuRc.Top + height, menuRc.Width, height);

            /*//
            g.fillGradientStyle(0x252525, 0x7A7A7A, 0x252525, 0x7A7A7A, 1);
            g.fillRect(menuRc.Left, menuRc.Top, menuRc.Width / 2, menuRc.Height);

            g.fillGradientStyle(0x7A7A7A, 0x252525, 0x7A7A7A, 0x252525, 1);
            g.fillRect(menuRc.Left + (menuRc.Width / 2), menuRc.Top, menuRc.Width / 2, menuRc.Height);

            //
            const lineDepth = 2;
            const color1 = 0x1AC1F1;
            const color2 = 0x2DA1C2;
            g.fillStyle(color1, 1);
            g.fillRect(menuRc.Left, menuRc.Top, menuRc.Width, lineDepth);

            g.fillStyle(color2, 1);
            g.fillRect(menuRc.Left, menuRc.Top + lineDepth, menuRc.Width, lineDepth);

            //
            g.fillStyle(color2, 1);
            g.fillRect(menuRc.Left, menuRc.Bottom - (lineDepth * 2), menuRc.Width, lineDepth);

            g.fillStyle(color1, 1);
            g.fillRect(menuRc.Left, menuRc.Bottom - lineDepth, menuRc.Width, lineDepth); */

            //
            if (this.#_PV.isNeedExitButton === true) {
                this.#createExitButton();
            }

        } catch(e) {
            var errMsg = this.getKey() + ".createTopMenu.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    #createExitButton() {
        try {

            let selfIt = this;

            // exit button
            const topMenuRc = this.TopMenuRc;
            const exit_button_x = topMenuRc.Right - 32;
            const exit_button_y = topMenuRc.CenterY;
            let exit_button = this.addDestroyableObject( new GOImageButton("exit_button", this, exit_button_x, exit_button_y, 
                'exit_button', 'BTN_UP', 'exit_button', 'BTN_DOWN',
                () => {
                    if (selfIt.#_PV.isNeedUserExitQuery === false) {
                        selfIt.gameEnd(GameExitType.GiveUp); //param 을 비워서 scene만 바꿈
                        return;
                    }

                    let kor = "게임을 종료하시겠습니까?";
                    let eng = "Are you sure\r\nyou want to quit the game?";
                    selfIt.msgboxYesNo(_gameOption.selectText("질문", "Quetion"),
                        _gameOption.selectText(kor, eng), ()=>{
                            selfIt.gameUserExit();
                        });
                })
            );
            exit_button.setDepth(DEPTH_MENU_BUTTON);

            // pass button
            if (this.GoldForPass > 0 && _gameData.IsPassEnable === true)
            {
                const pass_button_x = exit_button_x - 38;

                let pass_button = this.addDestroyableObject( new GOImageButton("pass_button", this, pass_button_x, exit_button_y, 
                    'pass_button', 'BTN_UP', 'pass_button', 'BTN_DOWN',
                    () => {
                        selfIt.gamePassTry();
                    })
                );
                pass_button.setDepth(DEPTH_MENU_BUTTON);
            }

        } catch(e) {
            var errMsg = this.getKey() + ".createExitButton.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 상단 게임 아이콘 생성
    createTopIcon(sprite, texture) {
        try {
            let topMenuRc = this.TopMenuRc;

            let icon = this.addDestroyableObject( this.add.image(32, topMenuRc.CenterY, sprite, texture) ).setDepth(DEPTH_MENU_BUTTON);
            setPixelScaleXorY(icon, 32);
        } catch(e) {
            var errMsg = this.getKey() + ".createTopIcon.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // create help button
    createHelpButton(content, beginX) {
        try {

            let selfIt = this;

            // button
            const topMenuRc = this.TopMenuRc;
            const button_x = beginX + 16; // 16 = 아이콘 사이즈 / 2
            const button_y = topMenuRc.CenterY;
            let button = this.addDestroyableObject( new GOImageButton("help_button", this, button_x, button_y, 
                'help_button', 'BTN_UP', 'help_button', 'BTN_DOWN',
                () => {
                    selfIt.msgboxOk( 'HELP', content );
                })
            );
            button.setDepth(DEPTH_MENU_BUTTON);

        } catch(e) {
            var errMsg = this.getKey() + ".createExitButton.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 하단 메뉴 설정
    #createBottomMenu() {
        try {
            let menuRc = this.#_PV.bottomMenuRc;
            let g = this.#_PV.graphics;

            //
            const height = menuRc.Height / 2;

            g.fillStyle(COLOR_MENUCOLOR_1, 1);
            g.fillRect(menuRc.Left, menuRc.Top, menuRc.Width, height);

            g.fillStyle(COLOR_MENUCOLOR_2, 1);
            g.fillRect(menuRc.Left, menuRc.Top + height, menuRc.Width, height);

            // coin
            let coin = this.addDestroyableObject( this.add.image(0, 0, "coins", "COIN") );
            coin.setDepth(DEPTH_MENU);
            coin.setOrigin(0, 0.5);
            coin.x = menuRc.Left + coin.width;
            coin.y = menuRc.CenterY;

            // coin text
            let coin_txt = this.addDestroyableObject( addText(this, coin.x + coin.width + 5, coin.y, "X 1,000 G", 12, COLOR_GOLD) );
            coin_txt.setOrigin(0, 0.5);
            coin_txt.setDepth(DEPTH_MENU);
            this.#_PV.coinText = coin_txt;

        } catch(e) {
            var errMsg = this.getKey() + ".createBottomMenu.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    //return gold for pass
    get GoldForPass() {
        try {
            if (_gameData.EntryGameLevelInfo.compensation <= 0 || _gameData.Gold < _gameData.EntryGameLevelInfo.compensation) { return 0; }

            return (_gameData.EntryGameLevelInfo.compensation * 2) + 50;
        } catch(e) {
            var errMsg = this.getKey() + ".GoldForPass.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // refresh gold
    refreshGold() {
        try {
            let coin_txt = this.#_PV.coinText;
            let gold = stringFormat( "X {0} G", numberWithCommas( _gameData.Gold ) );
            coin_txt.text = gold;
            
        } catch(e) {
            var errMsg = this.getKey() + ".refreshGold.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    useGold(v, isNoText) {
        try {
            const goldChanged = _gameData.useGold(v);
            this.playCoinSound(false);
            if (isNoText !== true) {
                this.getGameObject('useCoin').run(v);
            }
            this.refreshGold();
            if (goldChanged === true) { this.#notifyGoldChanged(); }
        } catch(e) {
            var errMsg = this.getKey() + ".refreshGold.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    addGold(v, isNoText) {
        try {
            const goldChanged = _gameData.addGold(v);
            this.playCoinSound(true);
            if (isNoText !== true) {
                this.getGameObject('addCoin').run(v);
            }
            this.refreshGold();
            if (goldChanged === true) { this.#notifyGoldChanged(); }
        } catch(e) {
            var errMsg = this.getKey() + ".addGold.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    playCoinSound(isAdd) {
        try {
            this.playSound( (isAdd === true) ? 'coin_add' : 'coin_use' );
        } catch(e) {
            var errMsg = this.getKey() + ".playCoinSound.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // print title
    printTitle(title) {
        try {
            let menuRc = this.#_PV.topMenuRc;

            if (title == undefined) {
                title = _gameOption.selectText("아.무.거.나", "A.Mu.Geo.Na");
            }

            this.addDestroyableObject( addText(this, menuRc.CenterX, menuRc.CenterY, 
                title, 22, COLOR_MENUTITLE) ).setDepth(DEPTH_MENU_GAMETITLE);

        } catch(e) {
            var errMsg = this.getKey() + ".printTitle.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get top menu area
    get TopMenuRc() {
        return this.#_PV.topMenuRc;
    }

    // get bottom menu area
    get BottomMenuRc() {
        return this.#_PV.bottomMenuRc;
    }

    // get content area
    get ContentRc() {
        return this.#_PV.contentRc;
    }

    ////////////////////////////////////
    //// <!-- msgbox

    // create msgbox
    #createMsgBox() {
        try {
            if (this.#_PV.msgbox != undefined) { return; }

            this.#_PV.msgbox = new MsgBox('msgbox_' + this.getKey(), this);
        } catch(e) {
            var errMsg = this.getKey() + ".showOk.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // run messagebox callback
    #callMsgBoxCallback(cb) {
        try {
            if (cb != undefined) {
                this._timerPool.setTimeout(cb, 200);
            }
        } catch(e) {
            var errMsg = this.getKey() + ".callMsgBoxCallback.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // show msgbox - ok
    msgboxOk(title, message, cb) {
        try {
            let xy = this.getMsgBoxXY();
            if (xy == undefined) { return; }

            let selfIt = this;
            this.#createMsgBox();

            this.#_PV.msgbox.showOk(title, message, xy.x, xy.y, ()=>{
                selfIt.resume();
                selfIt.#callMsgBoxCallback(cb);
            });
            this.pause();
        } catch(e) {
            var errMsg = this.getKey() + ".msgboxOk.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // show msgbox - yes no
    msgboxYesNo(title, message, cbYes, cbNo) {
        try {
            let xy = this.getMsgBoxXY();
            if (xy == undefined) { return; }

            let selfIt = this;
            this.#createMsgBox();

            this.#_PV.msgbox.showYesNo(title, message, xy.x, xy.y, ()=>{
                selfIt.resume();
                selfIt.#callMsgBoxCallback(cbYes);
            }, ()=>{
                selfIt.resume();
                selfIt.#callMsgBoxCallback(cbNo);
            });
            this.pause();
        } catch(e) {
            var errMsg = this.getKey() + ".msgboxYesNo.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get msgbox x, y (상속하여 반환 필요)
    getMsgBoxXY() {
        let msg = stringFormat('There is no required implementation - {0}::getMsgBoxXY', this.getKey());
        console.log(msg);
        alert( msg );
    }

    //// msgbox -->
    ////////////////////////////////////

    ////////////////////////////////////
    //// <!-- game end
    //
    gameEnd(gameExitType) {
        let selfIt = this;

        switch (gameExitType.value)
        {
            case GameExitType.GiveUp.value:
            case GameExitType.Failure.value:
                break;

            case GameExitType.Success.value:
                _gameData.setLastLevel(_gameData.EntryGameLevelInfo.level);
                _gameData.removePass();
                break;

            case GameExitType.Pass.value:
                this.useGold(this.GoldForPass, 'pass!!!');
                _gameData.setLastLevel(_gameData.EntryGameLevelInfo.level);
                _gameData.setPass();
                break;
        }

        // 현재 정보 저장
        _gameData.save();

        this.getTimerPool().setTimeout(()=>{
            // go level
            selfIt._gameHost.switchScene(KEY_LEVEL);
        }, 500);
        
    }

    // 게임 강제종료 처리 (반드시 상속 구현 필요)
    gameUserExit() {
        alert("'gameUserExit' is not implemented.");
    }

    // 게임 정상종료 처리
    gameFinished(isFailed) {
        try {
            let kor = "", eng = "";
            let gameExitType;
            if (isFailed === true) { // case failed
                kor = "- 게임 실패 -";
                eng = "- Game failure -";
                gameExitType = GameExitType.Failure;
            } else {    // case success
                let gold = numberWithCommas(_gameData.EntryGameLevelInfo.compensation);
                kor = stringFormat("- 게임 성공 -\r\n보상: {0}G", gold);
                eng = stringFormat("- Game success -\r\nReward: {0}G", gold);
                gameExitType = GameExitType.Success;

                this.addGold(_gameData.EntryGameLevelInfo.compensation);
            }

            let selfIt = this;
            this.getTimerPool().setTimeout(()=>{
                selfIt.msgboxOk(_gameOption.selectText("결과", "Result"), _gameOption.selectText(kor, eng), ()=>selfIt.gameEnd(gameExitType));
            }, 250);

        } catch(e) {
            var errMsg = this.getKey() + ".gameFinished.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 게임 Pass 처리
    gamePassTry() {
        try {
            const needGold = numberWithCommas(this.GoldForPass);
            const kor = "게임을 통과하시겠습니까?\r\n필요골드: " + needGold + "G";
            const eng = "Do you want to pass the game?\r\nRequired Gold: " + needGold + "G";

            let selfIt = this;
            this.getTimerPool().setTimeout(()=>{
                selfIt.msgboxYesNo(_gameOption.selectText("통과", "Pass"), _gameOption.selectText(kor, eng)
                    , ()=>selfIt.gameEnd(GameExitType.Pass)
                    , ()=>{}
                );
            }, 500);

        } catch(e) {
            var errMsg = this.getKey() + ".gameFinished.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    //// game end -->
    ////////////////////////////////////

    ////////////////////////////////////
    //// <!-- gold 변경 알림 서비스

    // destroy
    #destroyGoldNotify() {
        try {
            destroyObject( this.#_PV.goldChangedNotifier );
        } catch(e) {
            var errMsg = this.getKey() + ".destroyGoldNotify.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // register
    registerGoldNotify(cb) {
        try {
            let v = this.#_PV;

            if (v.goldChangedNotifier == undefined) {
                v.goldChangedNotifier = new CallbackMap("gold_chaged_notifier");
            }

            v.goldChangedNotifier.add(cb);
        } catch(e) {
            var errMsg = this.getKey() + ".registerGoldNotify.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // unregister
    unregisterGoldNotify(cb) {
        try {
            let v = this.#_PV;

            if (v.goldChangedNotifier == undefined) { return; }

            v.goldChangedNotifier.remove(cb);
        } catch(e) {
            var errMsg = this.getKey() + ".unregisterGoldNotify.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // notify gold changed event
    #notifyGoldChanged() {
        try {
            let v = this.#_PV;
            if (v.goldChangedNotifier == undefined) { return; }

            const gold = _gameData.Gold;
            v.goldChangedNotifier.forEach((callback)=>{
                callback(gold);
            });

        } catch(e) {
            var errMsg = this.getKey() + ".notifyGoldChanged.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    //// gold 변경 알림 서비스 -->
    ////////////////////////////////////
}