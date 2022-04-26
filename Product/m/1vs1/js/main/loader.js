class Loader extends ClsObject {
    #_PV = {};

    // ctor
    constructor(name) {
        try {
            super(name);

            this.#setCanas();

            // canvas 확인
            if (this.#_PV.sceneSize.w < 400 || this.#_PV.sceneSize.h < 600) {
                alert("Too small game screen!!!!  " + stringFormat("canvas size w: {0} px, h: {1} px", this.#_PV.sceneSize.w , this.#_PV.sceneSize.h));
                return;
            }

            this.#createGlobalData();
            if (this.#createGame() !== true) {
                alert(_gameOption.selectText("게임 생성에 실패하였습니다.", "Failed to create game."));
                return;
            }

            //_wgl_gameHost.switchScene(KEY_INTRO);

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // create global data
    #createGlobalData() {
        try {
            
            _wgl_browserComm = new BrowserComm("browser_comm");
            _wgl_resourcePool = new ResourcePool("resourcePool");
            _wgl_serialLoadHistory = new SerialLoadHistory("global_serial_asset_load_history");
            _wgl_gameHost = new GameHost("gamehost", this.#_PV.sceneSize.w, this.#_PV.sceneSize.h, COLOR_BACKGROUND, 0);

            _wgl_sceneData = [
                {
                    key: KEY_TEST,
                    getScene: function() {
                        if (_wgl_scenes.test == undefined) {
                            _wgl_scenes.test = new TestScene(FPS_NORMAL, _wgl_gameHost);
                        }
                        return _wgl_scenes.test;
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

            _wgl_browser = new Browser("browser"); // 가장 먼저 생성되어져야 함.
            
            let w, h;
            let sceneDiv = document.getElementById('scene');
            _wgl_sceneDiv.div = sceneDiv;

            if (_wgl_browser.isApp === true)
            {
                sceneDiv.className = "appBackBorder";
                w = window.innerWidth;
                h = window.innerHeight;
                sceneDiv.style.width = w + 'px';
                sceneDiv.style.height = h + 'px';

                _wgl_sceneDiv.width = w;
                _wgl_sceneDiv.height = h;

            }
            else
            {
                if (_wgl_browser.os !== OSType.WINDOWS)
                {
                    alert("Invalid access!!!");
                    return;
                }

                h = window.innerHeight - 50;
                //w = parseInt(h * (2/3));
                w = parseInt((9 * h) / 16);

                _wgl_sceneDiv.width = w;
                _wgl_sceneDiv.height = h;
                _wgl_sceneDiv.marginLeft = - parseInt(w / 2);
                _wgl_sceneDiv.marginTop = - parseInt(h / 2);

                sceneDiv.style.width = w + 'px';
                sceneDiv.style.height = h + 'px';
                sceneDiv.style.marginLeft = _wgl_sceneDiv.marginLeft + 'px';
                sceneDiv.style.marginTop = _wgl_sceneDiv.marginTop + 'px';

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
            _wgl_sceneData.forEach(element=>{
                scenes.push(element.getScene())
            });

            return _wgl_gameHost.createGame(this.#_PV.sceneDiv.id, scenes);

        } catch (e) {
            var errMsg = this.getExpMsg("createGame", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return false;
    }
}