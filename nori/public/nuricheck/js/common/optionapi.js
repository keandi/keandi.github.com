// 진동 처리
function apiVibration(level) {
    try {
        if (_gameOption.Vibration === true) {
            _browserComm.goVibration(level);
        }
    } catch(e) {
        var errMsg = "optionapi.js > apiVibration: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}