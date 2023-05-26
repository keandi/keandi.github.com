class Loader extends ClsObject {
    #_PV = {};

    // ctor
    constructor(name) {
        try {
            super(name);

            this.#setCanas();

            // canvas 확인
            if (this.#_PV.sceneSize.w < 400 || this.#_PV.sceneSize.h < 600) {
                alert("Too small game screen!!!!");
                return;
            }

            this.#createGlobalData();
            if (this.#createGame() !== true) {
                alert(_gameOption.selectText("게임 생성에 실패하였습니다.", "Failed to create game."));
                return;
            }

            //_gameHost.switchScene(KEY_INTRO);

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // create global data
    #createGlobalData() {
        try {
            _resourcePool = new ResourcePool("resourcePool");
            _serialLoadHistory = new SerialLoadHistory("global_serial_asset_load_history");
            _gameHost = new GameHost("gamehost", this.#_PV.sceneSize.w, this.#_PV.sceneSize.h, COLOR_BACKGROUND, 0);

            // 임시 디버깅
            {
                let url = window.location.href;
                const isCall_IT = (param)=>{
                    return (url.indexOf(param) > 0) ? true : false;
                };
                const isCall_RESETALL = ()=>{
                    return isCall_IT("#reset_all");
                };
                const isCall_RESETLEVEL = ()=>{
                    return isCall_IT("#reset_level");
                };
                const isCall_RESETGOLD = ()=>{
                    return isCall_IT("#reset_gold");
                };

                //
                if (isCall_RESETGOLD() === true) { 
                    _gameData.useGold(_gameData.Gold); 
                    _gameData.save();
                    alert("게임 데이터(GOLD)를 초기화 하였습니다.");
                }
                if (isCall_RESETLEVEL() === true) { 
                    _gameData.LastLevel = 0;
                    _gameData.removeAllPass();
                    _gameData.save();
                    alert("게임 데이터(LEVEL)를 초기화 하였습니다.");
                }
                if (isCall_RESETALL() === true) { 
                    _gameData.LastLevel = 0;
                    _gameData.removeAllPass();
                    _gameData.useGold(_gameData.Gold); 
                    _gameData.save();
                    alert("게임 데이터(LEVEL,GOLD)를 초기화 하였습니다.");
                }

                if (isCall_IT('#set_test_data') === true) {
                    _gameData.LastLevel = 1;
                    _gameData.removeAllPass();
                    _gameData.useGold(_gameData.Gold); 
                    _gameData.addGold(200);
                    _gameData.save();
                    alert("게임 데이터(LEVEL=1,GOLD=200)를 테스트 데이터로 설정하였습니다.");
                }

                if (isCall_IT('#addgold') === true) {
                    const gold = peekString(url, '#gs', '#ge');
                    if (gold.length > 0) {
                        const nGold = parseInt(gold);

                        _gameData.addGold(nGold);
                        _gameData.save();
                        alert( stringFormat("임시 골드({0}G)를 추가하였습니다.", nGold) );
                    }
                }
            }

            // test scene
            {
                let url = window.location.href;
                let pos = url.indexOf("#test");
                _globalData.isTest = (pos > 0) ? true : false;
            }

            _sceneData = [
                {
                    key: KEY_MAIN,
                    getScene: function() {
                        if (_scenes.main == undefined) {
                            _scenes.main = new SceneMain(GAME_FPS, _gameHost);
                        }
                        return _scenes.main;
                    }
                }
            ];

        } catch (e) {
            var errMsg = this.getExpMsg("createGlobalData", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set game scene area
    #setCanas() {
        try {
            
            let w, h;
            let sceneDiv = document.getElementById('scene');
            _sceneDiv.div = sceneDiv;

            if (_browser.isApp === true)
            {
                alert("Invalid access!!!");
                return;
            }
            else
            {
                switch (_browser.os.value)
                {
                    case OSType.WINDOWS.value:
                        {
                            h = window.innerHeight - 50;
                            //w = parseInt(h * (2/3));
                            w = parseInt((9 * h) / 16);
            
                            _sceneDiv.width = w;
                            _sceneDiv.height = h;
                            _sceneDiv.marginLeft = - parseInt(w / 2);
                            _sceneDiv.marginTop = - parseInt(h / 2);
            
                            sceneDiv.style.width = w + 'px';
                            sceneDiv.style.height = h + 'px';
                            sceneDiv.style.marginLeft = _sceneDiv.marginLeft + 'px';
                            sceneDiv.style.marginTop = _sceneDiv.marginTop + 'px';
                        }
                        break;

                    case OSType.ANDROID.value:
                    case OSType.IOS.value:
                        {
                            document.documentElement.classList.add("mobile-only");
                            document.documentElement.requestFullscreen();

                            h = window.innerHeight - 50;
                            //w = parseInt(h * (2/3));
                            w = parseInt((9 * h) / 16);
            
                            _sceneDiv.width = w;
                            _sceneDiv.height = h;
                            _sceneDiv.marginLeft = - parseInt(w / 2);
                            _sceneDiv.marginTop = - parseInt(h / 2);
            
                            sceneDiv.style.width = w + 'px';
                            sceneDiv.style.height = h + 'px';
                            sceneDiv.style.marginLeft = _sceneDiv.marginLeft + 'px';
                            sceneDiv.style.marginTop = _sceneDiv.marginTop + 'px';
                        }
                        break;
                    default:
                        alert("Invalid access!!!");
                        return;
                }

                console.log( stringFormat("canvas size w: {0} px, h: {1} px", w, h));
            }

            //
            this.#_PV.sceneSize = {
                w: w,
                h: h
            };
            this.#_PV.sceneDiv = sceneDiv;

        } catch (e) {
            var errMsg = this.getExpMsg("setCanas", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    #createGame() {
        try {
            let scenes = [];
            _sceneData.forEach(element=>{
                scenes.push(element.getScene())
            });

            return _gameHost.createGame(this.#_PV.sceneDiv.id, scenes);

        } catch (e) {
            var errMsg = this.getExpMsg("createGame", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return false;
    }
}