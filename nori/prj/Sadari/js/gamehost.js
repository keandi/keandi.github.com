///////////////////////////////////////////////////////////////////////
/// GameHost
///////////////////////////////////////////////////////////////////////

var GameHost = function(name) {
    ClsObject.apply(this, arguments);

    this.printName();

    this._game = undefined;
    this.O = undefined;
    this._fps = 60;
    this._frameTime = 0;
    this._frameTimeLimit = 0;

    this._vars = {};

    this.recomputeFps();
}

GameHost.prototype = Object.create(ClsObject.prototype);
GameHost.prototype.constructor = GameHost;

// fps 계산
GameHost.prototype.recomputeFps = function() {
    try {
        this._frameTimeLimit = 1000 / this._fps;
    } catch (e) {
        var errMsg = this._name + ".recomputeFps.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

// preload
GameHost.prototype.preload = function() {
    try {

    } catch (e) {
        var errMsg = this._name + ".preload.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

// create
GameHost.prototype.create = function() {
    try {

    } catch (e) {
        var errMsg = this._name + ".create.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

// update (private)
GameHost.prototype.update = function(time, delta) {
    try {
        this._frameTime += delta;
        if (this._frameTime > this._frameTimeLimit) {
            this._frameTime = 0;
            this.onUpdate();
        }

    } catch (e) {
        var errMsg = this._name + ".update?.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

// real update event
GameHost.prototype.onUpdate = function() {
    try {

    } catch (e) {
        var errMsg = this._name + ".onUpdate.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

///////////////////////////////////////////////////////////////////////
/// Global variables
///////////////////////////////////////////////////////////////////////
let _gameHost = undefined;

///////////////////////////////////////////////////////////////////////
/// Global function
///////////////////////////////////////////////////////////////////////
function createGameHost(gameHost, backgroundColorStr, sceneWidth, sceneHeight, gravity, fps) {
    try {
        _gameHost = gameHost;

        _gameHost._config = {
            type: Phaser.AUTO,
            scale: {
                parent: 'scene',
                width: sceneWidth,
                height: sceneHeight
            },
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: {y: gravity}
                }
            },
            scene: {
                preload: preload,
                create: create,
                update: update
            },
            backgroundColor: backgroundColorStr
        };

        _gameHost._game = new Phaser.Game(_gameHost._config);
        _gameHost._fps = fps;
        
        _gameHost.recomputeFps();


        return true;

    } catch (e) {
        var errMsg = "createGameHost.catched: " + e;
        console.log(errMsg);
        alert(errMsg);

        _gameHost = undefined;
    }  

    return false;
}

// game preload
function preload() {
    try {
        _gameHost.O = this;
        _gameHost.preload();
    } catch (e) {
        var errMsg = "preload.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

// game create
function create() {
    try {
        _gameHost.create();
    } catch (e) {
        var errMsg = "create.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

// game update
function update(time, delta) {
    try {
        _gameHost.update(time, delta);
    } catch (e) {
        var errMsg = "update.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
    
}