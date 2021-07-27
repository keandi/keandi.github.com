// window.load
window.onload = function() {
    //setTimeout(() => delayedInit(), 1000);
    try {
        _os = getOSType();
        _app = getAppType();
        let w, h;
        let sceneDiv = document.getElementById('scene');

        if (_app.value == AppType.SADARIAPP.value)
        {
            sceneDiv.className = "appBackBorder";
            w = window.innerWidth;
            h = window.innerHeight;
            sceneDiv.style.width = w + 'px';
            sceneDiv.style.height = h + 'px';

            _webapp_api = new WAApi("sadariAppApi", "SADARIAPP");
            _storage = new Storage("sadariStorage");
        }
        else
        {
            if (_os == OSType.ANDROID)
            {
                loadCSS("orientationCss", "./css/orientation.css");
            }

            let sizeGapWidth = 50;
            let sizeGapHeight = 50;

            if (_os == OSType.ANDROID)
            {
                w = screen.width - 30;
                h = screen.height - 220;
            }
            else
            {
                h = window.innerHeight - 50;
                w = parseInt(h * (2/3));
            }

            sceneDiv.style.width = w + 'px';
            sceneDiv.style.height = h + 'px';
            sceneDiv.style.marginLeft = '-' + (parseInt(w / 2)) + 'px';
            sceneDiv.style.marginTop = '-' + (parseInt(h / 2)) + 'px';
        }
        
        _gameHost = new GameHost("Sadari2", w, h, BACK_COLOR, 0);
        
        _sceneMain = new SceneMain(60, _gameHost);
        let scenes = [ _sceneMain ];

        if (_gameHost.createGame(sceneDiv.id, scenes) == false) {
            alert("Failed createGame");
            return;
        } else {
            //_gameHost.switchScene(_sceneSwitch.getKey());
            //_gameHost.switchScene(_sceneMain.getKey());
        }

        // event lock
        _evtLock = new EvtLock("event_lock");

    } catch (e) {
        var errMsg = "window.onload.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }   
}

//////////////////////////////////////////////////////////////////////
// //// test - codes /////////////////////////////////////////////////