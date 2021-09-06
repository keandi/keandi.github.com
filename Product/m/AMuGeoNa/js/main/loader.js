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
            
            _browserComm = new BrowserComm("browser_comm");
            _gameOption = new GameOption("option");
            _gameData = new GameData("gameData");
            _gameLevelTable = new GameLevelTable("gameLevelTable");
            _resourcePool = new ResourcePool("resourcePool");
            _serialLoadHistory = new SerialLoadHistory("global_serial_asset_load_history");
            _gameHost = new GameHost("gamehost", this.#_PV.sceneSize.w, this.#_PV.sceneSize.h, COLOR_BACKGROUND, 0);

            // 임시 디버깅
            {
                let url = window.location.href;
                let pos = url.indexOf("#reset");
                if (pos > 0) {
                    _gameData.LastLevel = 0;
                    _gameData.useGold(10000);
                    _gameData.save();
                    alert("게임 데이터를 초기화 하였습니다.");
                }
            }

            _sceneData = [
                {
                    key: KEY_INTRO,
                    getScene: function() {
                        if (_scenes.intro == undefined) {
                            _scenes.intro = new SceneIntro(60, _gameHost);
                        }
                        return _scenes.intro;
                    }
                },
                {
                    key: KEY_LEVEL,
                    getScene: function() {
                        if (_scenes.level == undefined) {
                            _scenes.level = new SceneLevel(30, _gameHost);
                        }
                        return _scenes.level;
                    }
                },
                {
                    key: KEY_OPTION,
                    getScene: function() {
                        if (_scenes.option == undefined) {
                            _scenes.option = new SceneOption(15, _gameHost);
                        }
                        return _scenes.option;
                    }
                },
                {
                    key: KEY_GAME_SHOOTTHESTARS,
                    getScene: function() {
                        if (_scenes.shootthestars == undefined) {
                            _scenes.shootthestars = new SceneShootTheStars(60, _gameHost);
                        }
                        return _scenes.shootthestars;
                    }
                },
                {
                    key: KEY_GAME_ROLLDICE,
                    getScene: function() {
                        if (_scenes.rolldice == undefined) {
                            _scenes.rolldice = new SceneRollDice(60, _gameHost);
                        }
                        return _scenes.rolldice;
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

            _browser = new Browser("browser"); // 가장 먼저 생성되어져야 함.
            
            let w, h;
            let sceneDiv = document.getElementById('scene');

            if (_browser.isApp === true)
            {
                sceneDiv.className = "appBackBorder";
                w = window.innerWidth;
                h = window.innerHeight;
                sceneDiv.style.width = w + 'px';
                sceneDiv.style.height = h + 'px';

            }
            else
            {
                if (_browser.os !== OSType.WINDOWS)
                {
                    alert("Invalid access!!!");
                    return;
                }

                h = window.innerHeight - 50;
                w = parseInt(h * (2/3));

                sceneDiv.style.width = w + 'px';
                sceneDiv.style.height = h + 'px';
                sceneDiv.style.marginLeft = '-' + (parseInt(w / 2)) + 'px';
                sceneDiv.style.marginTop = '-' + (parseInt(h / 2)) + 'px';

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