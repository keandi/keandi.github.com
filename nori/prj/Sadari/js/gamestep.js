// game step enum
let GameStep = {
    READY: {value: 0, name: "ready"},
    MAIN: {value: 0, name: "main"},
    PLAY: {value: 0, name: "play"},
    END: {value: 0, name: "end"},
};

// 현재 게임 상태 
let _gameStep = GameStep.READY;

// game step 변경
function SetGameStep(step) {
    try {
        _gameStep = step;
        console.log("current game step: " + _gameStep.name);
    } catch (e) {
        var errMsg = "SetGameStep.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}