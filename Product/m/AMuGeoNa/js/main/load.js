
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
    } catch (e) {
        var errMsg = "onCalledbyApp.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
    
}