// game object
let _sadariGame = undefined;

// start game
function onGameBegin(inputedData) {
    try {

        SetGameStep(GameStep.MAIN);
        _sadariGame = new SadariGame("Sadari", inputedData);

        createGameHost(_sadariGame, BACKGROUND_COLOR_STR, SCENE_WIDTH, SCENE_HEIGHT, 200, FPS);
        return;
        
        var config = {
            type: Phaser.AUTO,
            scale: {
                parent: 'scene',
                width: SCENE_WIDTH,
                height: SCENE_HEIGHT
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {y: 200}
                }
            },
            scene: {
                preload: preload,
                create: create,
                update: update
            },
            backgroundColor: BACKGROUND_COLOR_STR
        };

        _game = new Phaser.Game(config);
        _game._name = "Sadari";

        _inputedData = inputedData;
        //alert(_inputedData.ToString());

    } catch (e) {
        var errMsg = "onGameBegin.catched: " + e;
        console.log(errMsg);
        _game = undefined;
        _inputedData = undefined;
        alert(errMsg);
    }  
}
/*
// game preload
function preload() {
    try {
        _game.O = this;
        _game.O.frameTime = 0
        _game.O.frameTimeLimit = 1000 / FPS;

        _game.O.tmp = _game.O.add.rectangle(200, 200, 50, 60, 0xFE2525);

    } catch (e) {
        var errMsg = "preload.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

// game create
function create() {
    
}

// game update
//var _cnt = 0;
function update(time, delta) {
    _game.O.frameTime += delta

    if (_game.O.frameTime > _game.O.frameTimeLimit) {  
        _game.O.frameTime = 0;

        onUpdate();
    }
    
}

// update event
var _moveFinished = false;
function onUpdate() {
    //console.log("x: " + _game.O.tmp.x + ", y: " + _game.O.tmp.y);

    var gotoX = 300;
    var gotoY = 250;
    //if (_game.O.tmp.x != gotoX || _game.O.tmp.y != gotoY)
    if (_moveFinished == false)
    {
        var res = MoveTowards(_game.O.tmp.x, _game.O.tmp.y, gotoX, gotoY, 3.0);
        _game.O.tmp.x = res[0];
        _game.O.tmp.y = res[1];
        _moveFinished = res[2];

       // console.log("x a: " + _game.O.tmp.x + ", y a: " + _game.O.tmp.y);
    }
}

*/