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
    // stop flash effect
    this.stopFlashEffect();

    //scene stop
    this.onStop();

    this.load.off('progress');
    this.load.off('complete');
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

// set original backgound-color
MielScene.prototype.setOriginalBackground = function(color, isSet) {
    this._originalBackgroundColor = color;
    if (isSet)
    {
        this.cameras.main.setBackgroundColor(this._originalBackgroundColor);
    }
}

// set background-color as original
MielScene.prototype.resetBackgroundColor = function() {
    this.setBackgroundColor(this._originalBackgroundColor);
}

// set backgound-color
MielScene.prototype.setBackgroundColor = function(color) {
    if (color == undefined) { return; }
    this.cameras.main.setBackgroundColor(color);
}

// flash effect launch option
let FlashEffect_LaunchOption = {
    APPEND: {value: 0, description: "끝나면 뒤에 추가"},
    IGNORE_IF_EXIST: {value: 1, description: "존재하면 추가 안함"},
    RIGHTNOW: {value: 2, description: "존재하면 멈추고 자신을 시작"}
};

// flash effect
MielScene.prototype.flashEffect = function(color1, color2, count, interval, launchOption) {
    try {
        // init
        if (this._flashEffects == undefined) {
            this._flashEffects = [];
        }

        // fix
        if (count <= 0) { count = 1; }
        if (interval < 1) { interval = 1; }

        let selfIt = this;
        let makeFlashEffectData = function() {
            selfIt._flashEffects.push({
                color1: color1,
                color2: color2,
                count: count,
                interval: interval,
                nextColor: 1,
                tryCount: 0
            });
        }

        // option process
        if (launchOption == FlashEffect_LaunchOption.APPEND) {
            makeFlashEffectData();

            if (this._currentEffect != undefined) { return; } // 작업 중이므로 return

        } else if (launchOption == FlashEffect_LaunchOption.IGNORE_IF_EXIST) {
            if (this.existFlashEffect() == true) { return; }

            makeFlashEffectData();

            if (this._currentEffect != undefined) { return; } // 작업 중이므로 return

        } else if (launchOption == FlashEffect_LaunchOption.RIGHTNOW) {
            this.clearFlashEffectTimer();
            this._flashEffects = [];
            
            makeFlashEffectData();
        }

        this.startFlashEffect();
    } catch (e) {
        let errMsg = this.getKey() + ".flashEffect.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// stop flash effect 
MielScene.prototype.stopFlashEffect = function() {
    try {
        if (this.existFlashEffect() == false) { return; }
        this.clearFlashEffectTimer();

    } catch (e) {
        logAlert(this.getKey() + ".stopFlashEffect.catched: " + e);
    }
}

// launch flash effect 
MielScene.prototype.startFlashEffect = function() {
    try {
        // 기본값 확인
        if (this.existFlashEffect() == false) { return; }

        // 타이머 초기화
        this.clearFlashEffectTimer();

        // 대상 꺼내기
        this._currentEffect = this._flashEffects[0];
        this._flashEffects.splice(0, 1);

        //
        let selfIt = this;
        let flash = function() {
            selfIt.setBackgroundColor((selfIt._currentEffect.nextColor == 2) ? selfIt._currentEffect.color2 : selfIt._currentEffect.color1);

            if (selfIt._currentEffect.nextColor == 1) {
                selfIt._currentEffect.nextColor = 2;
            } else {
                selfIt._currentEffect.nextColor = 1;
                selfIt._currentEffect.tryCount++;
                if (selfIt._currentEffect.tryCount >= selfIt._currentEffect.count) {
                    selfIt.clearFlashEffectTimer();

                    if (selfIt.existFlashEffect() == true)
                        selfIt.startFlashEffect();
                    else
                    {
                        selfIt.resetBackgroundColor();
                        selfIt._currentEffect = undefined;
                    }    
                }
            }
        };

        //
        this._flashEffectTimerId = setInterval(() => flash(), this._currentEffect.interval);

    } catch (e) {
        logAlert(this.getKey() + ".startFlashEffect.catched: " + e);
    }
}

// is exist flash-effect
MielScene.prototype.existFlashEffect = function() {
    if (this._flashEffects == undefined) { return false; }
    else if (this._flashEffects.length <= 0) { return false; }

    return true;
};

// clear flash-effect timer 
MielScene.prototype.clearFlashEffectTimer = function() {
    if (this._flashEffectTimerId != undefined) {
        clearInterval(this._flashEffectTimerId);
        this._flashEffectTimerId = undefined;
    }

    this._currentEffect = undefined; //강제 초기화
};

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