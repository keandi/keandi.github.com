var MielScene = function(fps, gameHost, config) {
    //Phaser.Scene.apply(this, arguments);

    if (config == undefined) {
        this._config = { key: this.getKey() };
    } else {
        this._config = config;
        this._config.key = this.getKey();
    }
    Phaser.Scene.call(this, this._config);

    this._fps = {};
    this._gameHost = gameHost;
    this.recomputeFps(fps);

    this._assetLoadCompleted = false;
}

MielScene.prototype = Object.create(Phaser.Scene.prototype);
MielScene.prototype.constructor = MielScene;

///////////////////////////////////////////////////////

// init
MielScene.prototype.init = function() {
    this.loadAssets();
    this.onInit();
}

// preload
MielScene.prototype.preload = function() {
    this.onPreload();
}

// create
MielScene.prototype.create = function() {
    this.onCreate();
}

// init event (상속하여 사용)
MielScene.prototype.onInit = function() {
    
}

// preload event (상속하여 사용)
MielScene.prototype.onPreload = function() {

}

// create event (상속하여 사용)
MielScene.prototype.onCreate = function() {

}

// update. fps 수치에 맞게 onUpdate 호출
MielScene.prototype.update = function(time, delta) {
    this._fps.frameTime += delta;
    //console.log("mielscene update" + this._fps.frameTime + " / " + this._fps._frameTimeLimit);
    if (this._fps.frameTime > this._fps.frameTimeLimit) {
        this._fps.frameTime = 0;
        this.onUpdate();
    }
}

// update event (상속하여 사용)
MielScene.prototype.onUpdate = function() {
    //console.log("update " + this.getKey());
}

// secene key 반환
MielScene.prototype.getKey = function() {
    return "MeilScene";
}

// fps 재계산
MielScene.prototype.recomputeFps = function(fps) {
    this._fps.frameTime = 0;
    this._fps.frameTimeLimit = (1000 / fps);
}

// 외부에서 이 secene 멈출 것이라는 통지용 함수
MielScene.prototype.stop = function() {
    //scene stop
    this.onStop();
}

// scene stop event. (상속하여 사용)
MielScene.prototype.onStop = function() {
    //nothing
}

// asset load
MielScene.prototype.loadAssets = function() {
    this.onLoadAssets();

    var selfIt = this;
    this.load.on('progress', function(value){
        selfIt.onLoadingAssets(value);
    });

    this.load.on('complete', function(){
        selfIt.onLoadAssetsComplete();
        selfIt._assetLoadCompleted = true;
    });
}

// asset load 를 구현 (상속하여 사용)
MielScene.prototype.onLoadAssets = function() {

}

// asset load 진행 중을 구현 (상속하여 사용)
MielScene.prototype.onLoadingAssets = function(value) {

}


// asset load 완료 구현 (상속하여 사용)
MielScene.prototype.onLoadAssetsComplete = function() {
    
}

/*class MielScene extends Phaser.Scene {
    constructor(fps) {
        super();
        super.constructor({key: this.getKey()});

        this._fps = {};
        this.recomputeFps(fps);
    }

    init() {
    }

    preload() {
    }
    
    create() {
    }

    update(time, delta) {
        this._fps.frameTime += delta;
        if (this._fps.frameTime > this._fps._frameTimeLimit) {
            this._fps.frameTime = 0;
            this.onUpdate();
        }
    }

    onUpdate() {

    }

    getKey() {
        return "MielScene";
    }

    recomputeFps(fps) {
        this._fps.frameTime = 0;
        this._fps.frameTimeLimit = (1000 / fps);
    }
}

class ABC {
    constructor() {}
}

class ABC1 extends ABC {
    constructor() {
        super();
        super.constructor();
    }
}*/