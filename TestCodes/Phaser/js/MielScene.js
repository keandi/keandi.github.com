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
    this._destroyMap = new DestroyMap();
    this._destroyCB = new DestroyCallbacks();

    // preset
    this.onPreset();
}

MielScene.prototype = Object.create(Phaser.Scene.prototype);
MielScene.prototype.constructor = MielScene;

///////////////////////////////////////////////////////

// MielScene 생성자 실행 시 초기화 할 내용을 밖에서 할 수 있도록
MielScene.prototype.onPreset = function() {
    this._isUseSerialLoader = false;
}

// init
MielScene.prototype.init = function() {
    this._reservedDestroy = [];
    this._reservedInput = [];
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
    this.swipeOff();
    this.sceneDragOff();

    //예약된 destroy 진행
    if (this._reservedDestroy.length > 0) {
        this._reservedDestroy.forEach(element=>{element.destroy();});
        this._reservedDestroy = [];
    }
    this._destroyMap.destroyAll();
    this._destroyCB.destroyAll();

    //예약된 .input.off
    if (this._reservedInput.length > 0) {
        this._reservedInput.forEach(element=>{ this.input.off(element); });
        this._reservedInput = [];
    }
}

// scene stop event. (상속하여 사용)
MielScene.prototype.onStop = function() {
    //nothing
}

// asset load
MielScene.prototype.loadAssets = function() {

    var selfIt = this;

    if (this._isUseSerialLoader == false)
    {
        this.onLoadAssets();

        this.load.on('progress', function(value){
            selfIt.onLoadingAssets(value);
        });

        this.load.on('complete', function(){
            selfIt.onLoadAssetsComplete();
            selfIt._assetLoadCompleted = true;
        });
    }
    else
    {
        /* _serialLoadHistory 을 사용하기 위해 막는다.
        if (this._assetLoadCompleted == true)
        {
            this.onCompleteSerialLoadAllAssets();
        }
        else */
        {
            this.onSerialLoadAssets();          // 상속된 함수에서 add 를 한다.
            this.makeSerialLoaderProgress();    

            // progress 등록
            this.load.on('progress', function(value){
                selfIt.onProgressSerialLoadAsset(value);
            });
        
            // complete 등록
            this.load.on('complete', function(){
                selfIt.onCompleteSerialLoadAsset(false);
                selfIt.showSerialLoaderProgress();
            });

            this._serialLoaderTotal = this._serialLoader.count;
            this.startSerialLoadAssets();   // 시작
        }
    }
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

//<!-- serial asset load

// asset load 를 구현 (상속하여 사용)
MielScene.prototype.onSerialLoadAssets = function() {

}

// add load asset
MielScene.prototype.addSerialLoadAsset = function(name, load_callback) {
    if (this._serialLoader == undefined) {
        this._serialLoader = new Queue();
    }

    this._serialLoader.enque(
        {
            name: name,
            cb: load_callback
        } );
}

// start serial load assset
MielScene.prototype.startSerialLoadAssets = function() {
    if (this._serialLoader.count <= 0) {
        this._assetLoadCompleted = true;
        this.onCompleteSerialLoadAsset(true);
        return;
    }

    var loader = this._serialLoader.deque();

    if (_serialLoadHistory.isLoadedAsset(loader.name) == true)
    {
        //console.log("이미 로딩=" + loader.name);

        this.onCompleteSerialLoadAsset(false);
        this.showSerialLoaderProgress();
    }
    else
    {
        //console.log("신규 로딩=" + loader.name);
        loader.cb();
        _serialLoadHistory.ReservedKey = loader.name;
        this.load.start();
    }
}

// serial load progress 
MielScene.prototype.onProgressSerialLoadAsset = function(value)
{
    //console.log( this.getKey() + " onProgressSerialLoadAsset = " + value);
}

// serial load complete
MielScene.prototype.onCompleteSerialLoadAsset = function(isAllFinished)
{
    //console.log( this.getKey() + " onCompleteSerialLoadAsset = " + isAllFinished);
    _serialLoadHistory.addReservedKey();

    if (isAllFinished == true)
    {
        this.destroySerialLoaderProgress();
        this._assetLoadCompleted = true;
        this.onCompleteSerialLoadAllAssets();
    }
    else
    { // 진행 중  
        setTimeout(()=>this.startSerialLoadAssets(), 1); // next load
    }
}

// perfect load finished
MielScene.prototype.onCompleteSerialLoadAllAssets = function() {

}

// 직렬 로딩 UI 생성
MielScene.prototype.makeSerialLoaderProgress = function() {
    try {
        //console.log("직렬 로딩 UI 생성");
        
        this.destroySerialLoaderProgress();
        this._serialLoaderProgress = new SerialLoaderProgress("loader_progress", this, 0, 0, this.getSceneWidth(), this.getSceneHeight(), this._serialLoader.count);

    } catch(e) {
        var errMsg = this.getKey() + ".makeSerialLoaderProgress.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// 직렬 로딩 UI 삭제
MielScene.prototype.destroySerialLoaderProgress = function() {
    try {
        //console.log("직렬 로딩 UI 삭제");

        if (this._serialLoaderProgress != undefined) {
            this._serialLoaderProgress.destroy();
            this._serialLoaderProgress = undefined;    
        }
    } catch(e) {
        var errMsg = this.getKey() + ".destroySerialLoaderProgress.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// 직렬 로딩 UI 진행
MielScene.prototype.showSerialLoaderProgress = function() {
    try {
        //console.log("직렬 로딩 UI 진행 = " + this._serialLoader.count);

        this._serialLoaderProgress.update();

    } catch(e) {
        var errMsg = this.getKey() + ".showSerialLoaderProgress.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }

}
// serial asset load -->

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

// get scene width
MielScene.prototype.getSceneWidth = function() {
    return this._gameHost._config.scale.width;
}

// get scene height
MielScene.prototype.getSceneHeight = function() {
    return this._gameHost._config.scale.height;
}

// get scene center x
MielScene.prototype.getSceneCenterX = function() {
    return (this._gameHost._config.scale.width / 2);
}

// get scene center y
MielScene.prototype.getSceneCenterY = function() {
    return (this._gameHost._config.scale.height / 2);
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

// 자동 destroy 호출 예약
MielScene.prototype.appendReservedDestroy = function(obj) {
    if (obj == undefined) { return; }

    if (this._reservedDestroy == undefined) {
        this._reservedDestroy = [];
    }

    this._reservedDestroy.push(obj);
}

////////////<!-- DestroyMap
// add
MielScene.prototype.addDestroyableObject = function(obj) {
    if (obj != undefined) {
        this._destroyMap.add(obj);
    }
    return obj;
}

// destroy
MielScene.prototype.destroyDestroyableObject = function(obj) {
    if (obj != undefined) {
        this._destroyMap.destroy(obj);
    }
}
////////////DestroyMap -->

////////////<!-- Destroy CallBack
// add
MielScene.prototype.addDestroyCB = function(cb) {
    if (cb != undefined) {
        this._destroyCB.add(cb)
    }
}

// destroy
MielScene.prototype.destroyDestroyCB = function(cb) {
    if (cb != undefined) {
        this._destroyCB.destroy(cb);
    }
}
////////////Destroy CallBack -->

////////////<!-- SWIPE 
let SwipeDirection = {
    UNKNOWN: {value: -1, description: "미정"},
    LEFT: {value: 0, description: "왼쪽으로"},
    UP: {value: 1, description: "위쪽으로"},
    RIGHT: {value: 2, description: "오른쪽으로"},
    DOWN: {value: 3, description: "아래쪽으로"},
};


// register
MielScene.prototype.swipeOn = function(minMove, maxMove) {
    try {
        if (this._swipeOn == true) { return; }

        let selfIt = this;

        // capture object
        let swipeData = {
            captured: false,
            swipeCount: 0,
            beginCoord: {
                x: 0,
                y: 0
            },
            endCoord: {
                x: 0,
                y: 0
            },
            direction: {
                left: false,
                top: false,
                right: false,
                bottom: false
            },
            resetDirection: function() {
                this.direction.left = this.direction.top = this.direction.right = this.direction.bottom = false;
            }
        };

        // swipe check
        let checkSwipe = function(pointer, isForcedEnd) {
            swipeData.endCoord.x = pointer.x;
            swipeData.endCoord.y = pointer.y;

            let xGap = swipeData.endCoord.x - swipeData.beginCoord.x;
            let yGap = swipeData.endCoord.y - swipeData.beginCoord.y;

            if (xGap > -minMove && xGap < 0) { xGap = 0; }
            else if (xGap < minMove && xGap > 0) { xGap = 0; }

            if (yGap > -minMove && yGap < 0) { yGap = 0; }
            else if (yGap < minMove && yGap > 0) { yGap = 0; }

            swipeData.resetDirection();

            //
            if (Math.abs(xGap) > Math.abs(yGap)) {
                yGap = 0;
            } else if (Math.abs(xGap) < Math.abs(yGap)) {
                xGap = 0;
            }

            if (xGap > 0) {
                swipeData.direction.right = true;
            } else if (xGap < 0) {
                swipeData.direction.left = true;
            }

            if (yGap > 0) {
                swipeData.direction.bottom = true;
            } else if (yGap < 0) {
                swipeData.direction.top = true;
            }

            if (swipeData.direction.left == true ||
                swipeData.direction.top == true ||
                swipeData.direction.right == true ||
                swipeData.direction.bottom == true) 
            {
                let direction = SwipeDirection.UP;
                let value = 0;
                let isEnd = false;
                if (swipeData.direction.left == true) {
                    direction = SwipeDirection.LEFT;
                    value = xGap;
                } else if (swipeData.direction.top == true) {
                    direction = SwipeDirection.UP;
                    value = yGap;
                } else if (swipeData.direction.right == true) {
                    direction = SwipeDirection.RIGHT;
                    value = xGap;
                } else if (swipeData.direction.bottom == true) {
                    direction = SwipeDirection.DOWN;
                    value = yGap;
                }

                let isCancel = false;
                if (Math.abs(value) >= maxMove) {
                    isEnd = true;
                } else if (isForcedEnd == true) {
                    isEnd = true;
                    isCancel = true;
                }

                selfIt.onSwipe(direction, value, swipeData.swipeCount++, isEnd, isCancel);
                
                if (isEnd == true) {
                    swipeData.captured = false;
                }
            }
        }

        // pointerdown
        this.input.on('pointerdown', function(pointer, x, y, event) {
            swipeData.beginCoord.x = pointer.x;
            swipeData.beginCoord.y = pointer.y;
            swipeData.endCoord.x = swipeData.endCoord.y = 0;
            swipeData.swipeCount = 0;
            swipeData.captured = true;
        });

        // pointerup
        this.input.on('pointerup', function(pointer, x, y, event) {
            if (swipeData.captured == false) { return; }
            swipeData.captured = false;

            checkSwipe(pointer, true);
        });

        // pointerdown
        this.input.on('pointermove', function(pointer, x, y, event) {
            if (swipeData.captured != true) { return; }

            checkSwipe(pointer, false);
        });
        
        this._swipeOn = true;

    } catch (e) {
        var errMsg = this.getKey() + ".swipeOn.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// event (상속하여 사용)
MielScene.prototype.onSwipe = function(direction, value, swipeCount, isEnd, isCancel) {
    // nothing
}

// unregister
MielScene.prototype.swipeOff = function() {
    try {
        if (this._swipeOn == false) { return; }

        this.input.off('pointerdown');
        this.input.off('pointerup');
        this.input.off('pointermove');
        
        this._swipeOn = false;

    } catch (e) {
        var errMsg = this.getKey() + ".swipeOff.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}
////////////SWIPE -->

////////////<!-- SCENEDRAG 

// register
MielScene.prototype.sceneDragOn = function() {
    try {
        if (this._sceneDragOn == true) { return; }

        let selfIt = this;

        // capture object
        let sceneDragData = {
            captured: false,
            sceneDragCount: 0,
            preCoord: {
                x: 0,
                y: 0
            },
            currentCoord: {
                x: 0,
                y: 0
            },
            isNoMove: function() {
                return ((this.preCoord.x == this.currentCoord.x) && (this.preCoord.y == this.currentCoord.y)) ? true : false;
            }
        };

        // sceneDrag check
        let sceneDragging = function(pointer) {
            sceneDragData.currentCoord.x = pointer.x;
            sceneDragData.currentCoord.y = pointer.y;

            if (sceneDragData.isNoMove() == true) { return true; }

            selfIt.onSceneDrag(sceneDragData.currentCoord.x - sceneDragData.preCoord.x, sceneDragData.currentCoord.y - sceneDragData.preCoord.y);
            sceneDragData.preCoord.x = sceneDragData.currentCoord.x;
            sceneDragData.preCoord.y = sceneDragData.currentCoord.y;
        }

        // pointerdown
        this.input.on('pointerdown', function(pointer, x, y, event) {
            if (selfIt.isDragEnable(pointer.x, pointer.y) != true) { return; }

            sceneDragData.preCoord.x = sceneDragData.currentCoord.x = pointer.x;
            sceneDragData.preCoord.y = sceneDragData.currentCoord.y = pointer.y;
            sceneDragData.sceneDragCount = 0;
            sceneDragData.captured = true;
        });

        // pointerup
        this.input.on('pointerup', function(pointer, x, y, event) {
            if (sceneDragData.captured == false) { return; }
            sceneDragData.captured = false;

            sceneDragging(pointer);
        });

        // pointerdown
        this.input.on('pointermove', function(pointer, x, y, event) {
            if (sceneDragData.captured != true) { return; }

            sceneDragging(pointer);
        });
        
        this._swipeOn = true;

    } catch (e) {
        var errMsg = this.getKey() + ".sceneDragOn.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// drag 사용 가능한 좌표인지 확인 (상속하여 사용)
MielScene.prototype.isDragEnable = function(x, y) {
    return true;
}

// event (상속하여 사용)
MielScene.prototype.onSceneDrag = function(x, y) {
    // nothing
}

// unregister
MielScene.prototype.sceneDragOff = function() {
    try {
        if (this._sceneDragOn == false) { return; }

        this.input.off('pointerdown');
        this.input.off('pointerup');
        this.input.off('pointermove');
        
        this._sceneDragOn = false;

    } catch (e) {
        var errMsg = this.getKey() + ".sceneDragOff.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}
////////////SCENEDRAG -->

// push input on event
MielScene.prototype.pushInputEvent = function(evt) {
    if (this._reservedInput == undefined) {
        this._reservedInput = [];
    }

    this._reservedInput.push(evt);
}