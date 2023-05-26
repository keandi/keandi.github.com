
window.onload = function() {
    try {
        
        _browser = new Browser("browser"); // 가장 먼저 생성되어져야 함.
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
                    play();
                    break;

                case OSType.ANDROID.value:
                case OSType.IOS.value:
                    //...
                    break;
                default:
                    alert("Invalid access!!!");
                    return;
            }

        }

    } catch (e) {
        var errMsg = "window.onload.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// go play
function play() {
    try {
        removePlayButton();
        let loader = new Loader("loader");
    } catch (e) {
        var errMsg = "play: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// remove play button
function removePlayButton() {
    try {
        const btn = document.getElementById('entryDiv');
        btn.parentNode.removeChild(btn);
    } catch (e) {
        var errMsg = "removePlayButton: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}