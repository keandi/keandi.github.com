
window.onload = function() {
    try {
        
        let loader = new Loader("loader");

    } catch (e) {
        var errMsg = "window.onload.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// call by App
function onCalledbyApp(type, value) {
    try {
        if (type === ACMD_AD) {
            _gameData.read();

            var scene = _gameHost.ActiveScene;
            scene.refreshGold();
        }
        else if (type === BCMD_APP_ONPAUSE) {
            _gameHost.scenePause();
        }
        else if (type === BCMD_APP_ONRESUME) {
            _gameHost.sceneResume();
        }
        else if (type === BCMD_APP_ONSTOP) {
            var scene = _gameHost.ActiveScene;
            alert("app - onStop");
        }
    } catch (e) {
        var errMsg = "onCalledbyApp.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
    
}