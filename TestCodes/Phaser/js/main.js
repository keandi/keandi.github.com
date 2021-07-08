// window.load
window.onload = function() {
    //setTimeout(() => delayedInit(), 1000);
    try {
        _os = getOSType();

        if (_os == OSType.ANDROID)
        {
            loadCSS("orientationCss", "./css/orientation.css");
        }

        let sceneDiv = document.getElementById('scene');
        let sizeGapWidth = 50;
        let sizeGapHeight = 50;

        let w, h;
        if (_os == OSType.ANDROID)
        {
            w = screen.width - 50;
            h = screen.height - 240;
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
        
        _gameHost = new GameHost("PhaserPratice", w, h, "#00FF00", 0);
        
        _sceneMain = new SceneMain(20, _gameHost);
        _sceneSwitch = new SceneSwitch(20, _gameHost);
        _sceneSound = new SceneSound(20, _gameHost);

        {
            var config = {
                physics: {
                    arcade: {
                        debug: true,
                        gravity: { y: 200 }
                    },
                    matter: {
                        debug: true,
                        gravity: { y: 0.5 }
                    },
                    impact: {
                        gravity: 100,
                        debug: true,
                        setBounds: {
                            x: 100,
                            y: 100,
                            width: 600,
                            height: 300,
                            thickness: 32
                        },
                        maxVelocity: 500
                    }
                }
            };
            _sceneCollision = new SceneCollision(60, _gameHost, config);
        }

        _sceneMove = new SceneMove(60, _gameHost);

        _sceneZOrder = new SceneZOrder(5, _gameHost);

        _sceneSceneEffect = new SceneEffect(60, _gameHost);

        _sceneDrag = new SceneDrag(60, _gameHost);

        _sceneDelayEffect = new SceneDelayEffect(60, _gameHost);

        _sceneHtml = new SceneHtml(5, _gameHost);

        //_sceneRotate = new SceneRotate(60, _gameHost);

        let scenes = [ _sceneMain, _sceneSwitch, _sceneSound, _sceneCollision, _sceneMove, _sceneZOrder, _sceneSceneEffect, _sceneDrag, _sceneDelayEffect, _sceneHtml/*, _sceneRotate*/ ];

        _sceneData.forEach(element=>{
            scenes.push(element.getScene())
        });

        if (_gameHost.createGame(sceneDiv.id, scenes) == false) {
            alert("Failed createGame");
            return;
        } else {
            //_gameHost.switchScene(_sceneSwitch.getKey());
            //_gameHost.switchScene(_sceneMain.getKey());
        }

    } catch (e) {
        var errMsg = "window.onload.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }   
}

//////////////////////////////////////////////////////////////////////
// //// test - codes /////////////////////////////////////////////////

