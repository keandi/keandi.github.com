var BaseScene = function(fps, gameHost, config) {
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

    this._isPause = false; //pause flag

    this._assetLoadCompleted = false;
    this._destroyMap = new DestroyMap();
    this._destroyCB = new DestroyCallbacks();
    this._sleepCounter = new SleepCounter('sleep_counter_' + this.getKey());
    this._pointerEventManager = new PointerEventManager("pem_" + this.getKey(), this);
    this._cameraDragManager = new CameraDragManager("cdm_" + this.getKey());

    this._timerPool = new GameTimerPool("scene_timerpool_" + this.getKey(), this);
    this._soundPool = new GameSoundPool("scene_soundpool_" + this.getKey(), this, 10);

    // serial load count
    this._serialLoadCount = {
        max: 0,
        current: 0,
        reset: function(max) {
            if (max == undefined || max <= 0) { max = 1; }
            this.max = max;
            this.current = 0;
        },
        increase: function(value) {
            if (value == undefined || value <= 0) { value = 1; }
            this.current += value;
        },
        isOver: function() {
            return (this.current >= this.max) ? true : false;
        }
    };

    // preset
    this.onPreset();

    //
    this._gameTimerPool = new GameTimerPool("gametimerpool", this);

    // create game object pool
    this.createGameObjectPool();
}

BaseScene.prototype = Object.create(Phaser.Scene.prototype);
BaseScene.prototype.constructor = BaseScene;

///////////////////////////////////////////////////////

// BaseScene 생성자 실행 시 초기화 할 내용을 밖에서 할 수 있도록
BaseScene.prototype.onPreset = function() {
    this._isUseSerialLoader = false;
}

// init
BaseScene.prototype.init = function() {
    this._reservedDestroy = [];
    this._reservedInput = [];
    this.loadAssets();
    this.onInit();
}

// preload
BaseScene.prototype.preload = function() {
    this.onPreload();
}

// create
BaseScene.prototype.create = function() {
    this._gameHost.Time = 0;
    this._gameHost.ActiveScene = this;
    this.unlockUI(); // ui unlock
    this.onCreate();
}

// init event (상속하여 사용)
BaseScene.prototype.onInit = function() {
    
}

// preload event (상속하여 사용)
BaseScene.prototype.onPreload = function() {

}

// create event (상속하여 사용)
BaseScene.prototype.onCreate = function() {

}

// update. fps 수치에 맞게 onUpdate 호출
BaseScene.prototype.update = function(time, delta) {
    if (this.checkSleep(delta) === true) { return; }
    if (this._isPause == true) { return; }
    
    //console.log("upate time: " + time + ", delta: " + delta);
    this._gameHost.Time += delta;
    this._fps.frameTime += delta;
    
    //console.log("mielscene update" + this._fps.frameTime + " / " + this._fps._frameTimeLimit);
    //this.publishUpdate();
    if (this._fps.frameTime > this._fps.frameTimeLimit) {
        this._fps.frameTime = 0;
        this.publishUpdate(); // 프레임 수준에 맞게 전달
        this.onUpdate();
    }
}

// update event (상속하여 사용)
BaseScene.prototype.onUpdate = function() {
    //console.log("update " + this.getKey());
}

// secene key 반환
BaseScene.prototype.getKey = function() {
    return "BaseScene";
}

// fps 재계산
BaseScene.prototype.recomputeFps = function(fps) {
    this._fps.frameTime = 0;
    this._fps.frameTimeLimit = (1000 / fps);
}

// 외부에서 이 secene 멈출 것이라는 통지용 함수
BaseScene.prototype.stop = function() {

    try {
        // stop flash effect
        this.stopFlashEffect();
        this._pointerEventManager.destroy();
        this._cameraDragManager.destroy();
        this._sleepCounter.destroy();

        //scene stop
        this.onStop();

        this.load.off('progress');
        this.load.off('complete');
        this.swipeOff();
        this.sceneDragOff();

        // clear subcribe update objects
        this.clearSubcribeUpdate();

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
    } catch(e) {
        var errMsg = this.getKey() + ".stop.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }

    
}

// scene stop event. (상속하여 사용)
BaseScene.prototype.onStop = function() {
    this.clearGameObjectPool();
    this.clearObjectDrag();
}

// asset load
BaseScene.prototype.loadAssets = function() {

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
        this._serialAssetsCount = 0;

        /* _serialLoadHistory 을 사용하기 위해 막는다.
        if (this._assetLoadCompleted == true)
        {
            this.onCompleteSerialLoadAllAssets();
        }
        else */
        {
            this.onSerialLoadAssets();          // 상속된 함수에서 add 를 한다.
            if (this._serialLoader == undefined || this._serialLoader.count == 0) {
                this.onCompleteSerialLoadAllAssets();
                if (this.onCompleteSerialLoadAllAssetsAfter() === false) {return;}
                this.startGame();
                return;
            }

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
BaseScene.prototype.onLoadAssets = function() {

}

// asset load 진행 중을 구현 (상속하여 사용)
BaseScene.prototype.onLoadingAssets = function(value) {

}


// asset load 완료 구현 (상속하여 사용)
BaseScene.prototype.onLoadAssetsComplete = function() {
    
}

//<!-- serial asset load

// asset load 를 구현 (상속하여 사용)
BaseScene.prototype.onSerialLoadAssets = function() {

}

// add load asset
BaseScene.prototype.addSerialLoadAsset = function(name, load_callback, load_count) {
    if (this._serialLoader == undefined) {
        this._serialLoader = new Queue();
    }

    if (load_count == undefined || load_count <= 0) {
        load_count = 1;
    }

    this._serialLoader.enque(
        {
            name: name,
            cb: load_callback,
            load_count: load_count
        } );

    // all assets count
    this._serialAssetsCount += load_count;
}

// start serial load assset
BaseScene.prototype.startSerialLoadAssets = function() {
    if (this._serialLoader.count <= 0) {
        this._assetLoadCompleted = true;
        this.onCompleteSerialLoadAsset(true);
        return;
    }

    var loader = this._serialLoader.deque();

    this.resetAssetDownloadTimeout();

    if (_serialLoadHistory.isLoadedAsset(loader.name) == true)
    {
        //console.log("이미 로딩=" + loader.name);

        this.onCompleteSerialLoadAsset(false);
        this.showSerialLoaderProgress(loader.load_count);
    }
    else
    {
        this._serialLoadCount.reset(loader.load_count);

        //console.log("신규 로딩=" + loader.name);
        loader.cb();
        _serialLoadHistory.ReservedKey = loader.name;
        this.load.start();
    }
}

// serial load progress 
BaseScene.prototype.onProgressSerialLoadAsset = function(value)
{
    //console.log( this.getKey() + " onProgressSerialLoadAsset = " + value);
    if (value == undefined || value <= 0) { return; }

    value = Math.ceil(value);
    this._serialLoadCount.increase(value);
}

// serial load complete
BaseScene.prototype.onCompleteSerialLoadAsset = function(isAllFinished)
{
    //console.log( this.getKey() + " onCompleteSerialLoadAsset = " + isAllFinished);
    _serialLoadHistory.addReservedKey();

    if (isAllFinished == true)
    {
        this.clearAssetDownloadTimeout();
        this.destroySerialLoaderProgress();
        this._assetLoadCompleted = true;
        this.onCompleteSerialLoadAllAssets();
        if (this.onCompleteSerialLoadAllAssetsAfter() === false) {return;}
        this.startGame();
    }
    else
    { // 진행 중  
        if (this._serialLoadCount.isOver() == true) {
            setTimeout(()=>this.startSerialLoadAssets(), 1); // next load
        }
    }
}

// perfect load finished
BaseScene.prototype.onCompleteSerialLoadAllAssets = function() {

}

// asset 로딩이 완료되어 다 처리 후 추가 발생 (상속하여 사용)
BaseScene.prototype.onCompleteSerialLoadAllAssetsAfter = function() {
    return true;
}

// 게임 시작 프로세스
BaseScene.prototype.startGame = function() {
    // create collision group
    this.createCollisionGroup();
    
    this.onRegisterObjectCreateCallback();
    this.onGameStart();
}

// 게임의 실제 시작은 여기서 부터 작업하세요 (상속하여 사용)
BaseScene.prototype.onGameStart = function() {

}

// 직렬 로딩 UI 생성
BaseScene.prototype.makeSerialLoaderProgress = function() {
    try {
        //console.log("직렬 로딩 UI 생성");
        
        this.destroySerialLoaderProgress();
        this._serialLoaderProgress = new SerialLoaderProgress("loader_progress", this, 0, 0, this.getSceneWidth(), this.getSceneHeight(), this._serialAssetsCount);

    } catch(e) {
        var errMsg = this.getKey() + ".makeSerialLoaderProgress.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// 직렬 로딩 UI 삭제
BaseScene.prototype.destroySerialLoaderProgress = function() {
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
BaseScene.prototype.showSerialLoaderProgress = function(value) {
    try {
        //console.log("직렬 로딩 UI 진행 = " + this._serialLoader.count);

        if (this._serialLoaderProgress == undefined) { return; }
        this._serialLoaderProgress.update(value);

    } catch(e) {
        var errMsg = this.getKey() + ".showSerialLoaderProgress.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }

}
// serial asset load -->

////////// <!-- serial load timeout

// asset download timeout event (상속하여 사용)
BaseScene.prototype.onAssetDownloadTimeout = function() {
    //
    console.log(this.getKey() + " => onAssetDownloadTimeout");
}

// reset download timeout
BaseScene.prototype.resetAssetDownloadTimeout = function() {
    try {
        if (this._assetDownloadTimeout == undefined) {
            let selfIt = this;
            this._assetDownloadTimeout = this.addDestroyableObject( new GameTimeout("assetdownload_timeout", this, TIMEOUT_ASSET_DOWNLOAD, ()=>selfIt.onAssetDownloadTimeout()) );
        } else {
            this._assetDownloadTimeout.reset();
        }
    } catch(e) {
        var errMsg = this.getKey() + ".resetAssetDownloadTimeout.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// reset download timeout
BaseScene.prototype.clearAssetDownloadTimeout = function() {
    try {
        if (this._assetDownloadTimeout == undefined) { return; }

        this._assetDownloadTimeout.destroy();
    } catch(e) {
        var errMsg = this.getKey() + ".clearAssetDownloadTimeout.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

////////// serial load timeout -->

// set original backgound-color
BaseScene.prototype.setOriginalBackground = function(color, isSet) {
    this._originalBackgroundColor = color;
    if (isSet)
    {
        this.cameras.main.setBackgroundColor(this._originalBackgroundColor);
    }
}

// set background-color as original
BaseScene.prototype.resetBackgroundColor = function() {
    this.setBackgroundColor(this._originalBackgroundColor);
}

// set backgound-color
BaseScene.prototype.setBackgroundColor = function(color) {
    if (color == undefined) { return; }
    this.cameras.main.setBackgroundColor(color);
}

// get scene width
BaseScene.prototype.getSceneWidth = function() {
    return this._gameHost._config.scale.width;
}

// get scene height
BaseScene.prototype.getSceneHeight = function() {
    return this._gameHost._config.scale.height;
}

// get scene center x
BaseScene.prototype.getSceneCenterX = function() {
    return (this._gameHost._config.scale.width / 2);
}

// get scene center y
BaseScene.prototype.getSceneCenterY = function() {
    return (this._gameHost._config.scale.height / 2);
}

// flash effect
BaseScene.prototype.flashEffect = function(color1, color2, count, interval, launchOption) {
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
BaseScene.prototype.stopFlashEffect = function() {
    try {
        if (this.existFlashEffect() == false) { return; }
        this.clearFlashEffectTimer();

    } catch (e) {
        logAlert(this.getKey() + ".stopFlashEffect.catched: " + e);
    }
}

// launch flash effect 
BaseScene.prototype.startFlashEffect = function() {
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
BaseScene.prototype.existFlashEffect = function() {
    if (this._flashEffects == undefined) { return false; }
    else if (this._flashEffects.length <= 0) { return false; }

    return true;
};

// clear flash-effect timer 
BaseScene.prototype.clearFlashEffectTimer = function() {
    if (this._flashEffectTimerId != undefined) {
        clearInterval(this._flashEffectTimerId);
        this._flashEffectTimerId = undefined;
    }

    this._currentEffect = undefined; //강제 초기화
};

// 자동 destroy 호출 예약
BaseScene.prototype.appendReservedDestroy = function(obj) {
    if (obj == undefined) { return; }

    if (this._reservedDestroy == undefined) {
        this._reservedDestroy = [];
    }

    this._reservedDestroy.push(obj);
}

////////////<!-- DestroyMap
// add
BaseScene.prototype.addDestroyableObject = function(obj) {
    if (obj != undefined) {
        this._destroyMap.add(obj);
    }
    return obj;
}

// destroy
BaseScene.prototype.destroyDestroyableObject = function(obj) {
    if (obj != undefined) {
        this._destroyMap.destroy(obj);
    }
}
////////////DestroyMap -->

////////////<!-- Destroy CallBack
// add
BaseScene.prototype.addDestroyCB = function(cb) {
    if (cb != undefined) {
        this._destroyCB.add(cb)
    }
}

// destroy
BaseScene.prototype.destroyDestroyCB = function(cb) {
    if (cb != undefined) {
        this._destroyCB.destroy(cb);
    }
}
////////////Destroy CallBack -->

///////////<!-- update publish

// subcribe
BaseScene.prototype.subscribeUpdate = function(obj) {
    if (this._updateReceivers == undefined) {
        this._updateReceivers = [];
    } else {
        if (this._updateReceivers.indexOf(obj) >= 0) { return; } // 이미 존재
    }

    this._updateReceivers.push(obj);

    //console.log("subscribeUpdate name: " + obj.Name + ", count: " + this._updateReceivers.length);
}

// unsubscribe
BaseScene.prototype.unsubscribeUpdate = function(obj) {
    if (this._updateReceivers == undefined) { return; }

    //console.log("pre unsubscribeUpdate name: " + obj.Name + ", count: " + this._updateReceivers.length);

    const idx = this._updateReceivers.indexOf(obj);
    if (idx > -1) {
        this._updateReceivers.splice(idx, 1);
    }

    //console.log("unsubscribeUpdate name: " + obj.Name + ", count: " + this._updateReceivers.length);
}

// remove all
BaseScene.prototype.clearSubcribeUpdate = function() {
    this._updateReceivers = undefined;
}

// update
BaseScene.prototype.publishUpdate = function() {
    if (this._updateReceivers == undefined) { return; }

    this._updateReceivers.forEach(element => {
        element.update();
    });
}

///////////update publish -->


// register
BaseScene.prototype.swipeOn = function(minMove, maxMove) {
    try {
        if (this._swipeDownEvent != undefined) { return; }

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
        this._swipeDownEvent = this.addPointerEvent('down', (pointer)=>{
            swipeData.beginCoord.x = pointer.x;
            swipeData.beginCoord.y = pointer.y;
            swipeData.endCoord.x = swipeData.endCoord.y = 0;
            swipeData.swipeCount = 0;
            swipeData.captured = true;
        });

        // pointerup
        this._swipeUpEvent = this.addPointerEvent('up', (pointer)=>{
            if (swipeData.captured == false) { return; }
            swipeData.captured = false;

            checkSwipe(pointer, true);
        });

        // pointerdown
        this._swipeMoveEvent = this.addPointerEvent('move', (pointer)=>{
            if (swipeData.captured != true) { return; }

            checkSwipe(pointer, false);
        });
        
        //this._swipeOn = true;

    } catch (e) {
        var errMsg = this.getKey() + ".swipeOn.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// event (상속하여 사용)
BaseScene.prototype.onSwipe = function(direction, value, swipeCount, isEnd, isCancel) {
    // nothing
}

// unregister
BaseScene.prototype.swipeOff = function() {
    try {
        if (this._swipeDownEvent != undefined) {
            this.removePointerEvent(this._swipeDownEvent);
            this._swipeDownEvent = undefined;
        }

        if (this._swipeUpEvent != undefined) {
            this.removePointerEvent(this._swipeUpEvent);
            this._swipeUpEvent = undefined;
        }

        if (this._swipeMoveEvent != undefined) {
            this.removePointerEvent(this._swipeMoveEvent);
            this._swipeMoveEvent = undefined;
        }

    } catch (e) {
        var errMsg = this.getKey() + ".swipeOff.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}
////////////SWIPE -->

////////////<!-- SCENEDRAG 

// register
BaseScene.prototype.sceneDragOn = function() {
    try {
        if (this._sceneDragDownEvent != undefined) { return; }

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
        this._sceneDragDownEvent = this.addPointerEvent('down', (pointer)=>{
            if (selfIt.isDragEnable(pointer.x, pointer.y) != true) { return; }

            sceneDragData.preCoord.x = sceneDragData.currentCoord.x = pointer.x;
            sceneDragData.preCoord.y = sceneDragData.currentCoord.y = pointer.y;
            sceneDragData.sceneDragCount = 0;
            sceneDragData.captured = true;
        });

        // pointerup
        this._sceneDragUpEvent = this.addPointerEvent('up', (pointer)=>{
            if (sceneDragData.captured == false) { return; }
            sceneDragData.captured = false;

            sceneDragging(pointer);
        });

        // pointermove
        this._sceneDragMoveEvent = this.addPointerEvent('move', (pointer)=>{
            if (sceneDragData.captured != true) { return; }

            sceneDragging(pointer);
        });

    } catch (e) {
        var errMsg = this.getKey() + ".sceneDragOn.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// drag 사용 가능한 좌표인지 확인 (상속하여 사용)
BaseScene.prototype.isDragEnable = function(x, y) {
    return true;
}

// event (상속하여 사용)
BaseScene.prototype.onSceneDrag = function(x, y) {
    // nothing
}

// unregister
BaseScene.prototype.sceneDragOff = function() {
    try {
        if (this._sceneDragDownEvent != undefined) {
            this.removePointerEvent(this._sceneDragDownEvent);
            this._sceneDragDownEvent = undefined;
        }

        if (this._sceneDragUpEvent != undefined) {
            this.removePointerEvent(this._sceneDragUpEvent);
            this._sceneDragUpEvent = undefined;
        }

        if (this._sceneDragMoveEvent != undefined) {
            this.removePointerEvent(this._sceneDragMoveEvent);
            this._sceneDragMoveEvent = undefined;
        }

    } catch (e) {
        var errMsg = this.getKey() + ".sceneDragOff.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}
////////////SCENEDRAG -->

// push input on event
BaseScene.prototype.pushInputEvent = function(evt) {
    if (this._reservedInput == undefined) {
        this._reservedInput = [];
    }

    this._reservedInput.push(evt);
}

////<!-- puase
// pause
BaseScene.prototype.isPause = function() {
    return this._isPause;
}

BaseScene.prototype.pause = function() {
    this.onPause();
    this._isPause = true;
}

// resume
BaseScene.prototype.resume = function() {
    this.onResume();
    this._isPause = false;
}

// on pause (상속하여 사용)
BaseScene.prototype.onPause = function() {
    
}

// on resume (상속하여 사용)
BaseScene.prototype.onResume = function() {
    
}
//// puase -->

//// <!-- ui lock: UI 컨트롤의 동작을 멈추기 위해

// set ui lock
BaseScene.prototype.lockUI = function() {
    this._uiLock = true;
}

BaseScene.prototype.unlockUI = function() {
    this._uiLock = false;
}

BaseScene.prototype.isUILocked = function() {
    return this._uiLock;
}

//// ui lock -->

/// <!-- pointer event manager
// add
BaseScene.prototype.addPointerEvent = function(kind, cb) {
    this._pointerEventManager.add(kind, cb);
    return cb;
}

// remove
BaseScene.prototype.removePointerEvent = function(cb) {
    this._pointerEventManager.remove(cb);
}

///  pointer event manager -->

/// <!-- camera

// add
BaseScene.prototype.addCameraDrag = function(name, camera, bounds, boundsLimit) {
    if (this._cameraDragManager.Count <= 0) {
        this.sceneDragOn();
    }
    return this._cameraDragManager.add(name, camera, bounds, boundsLimit);
}

// remove
BaseScene.prototype.removeCameraDrag = function(camera) {
    this._cameraDragManager.remove(camera);
    if (this._cameraDragManager.Count <= 0) {
        this.sceneDragOff();
    }
}

// camera drag
BaseScene.prototype.cameraDrag = function(camera, x, y) {
    this._cameraDragManager.onSceneDrag(camera, x, y);
}

/// camera  -->

///////////////////////////////
//// <!-- sound pool

// play sound
BaseScene.prototype.playSound = function(resource) {
    this._soundPool.play(resource);
}

//// sound pool -->
///////////////////////////////

// get timer pool
BaseScene.prototype.getTimerPool = function() {
    return this._timerPool;
}

///////////////////////////////
//// <!-- Game Object Pool

// create
BaseScene.prototype.clearGameObjectPool = function() {
    try {
        if (this._gameObjectPool == undefined) { return; } 
        this._gameObjectPool.destroy();
        this._gameObjectPool = undefined;

    } catch(e) {
        var errMsg = this.getKey() + ".clearGameObjectPool.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// create
BaseScene.prototype.createGameObjectPool = function() {
    try {
        if (this._gameObjectPool != undefined) { 
            this._gameObjectPool.destroy();
            this._gameObjectPool = undefined;
        }

        this._gameObjectPool = new GameObjectPool("gameobjectpool_" + this.getKey(), this);

    } catch(e) {
        var errMsg = this.getKey() + ".clearGameObjectPool.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// game object pool 이용시 생성 과정을 여기에서 구현 (상속하여 사용)
BaseScene.prototype.onRegisterObjectCreateCallback = function() {

}

// register callback
BaseScene.prototype.registerGameObjectCreateCallback = function(name, cb) {
    try {
        if (this._gameObjectPool == undefined) { this.createGameObjectPool(); }
        this._gameObjectPool.registerCreateCallback(name, cb);
    } catch(e) {
        var errMsg = this.getKey() + ".registerGameObjectCreateCallback.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// get game object
BaseScene.prototype.getGameObject = function(name) {
    try {
        if (this._gameObjectPool == undefined) { return; }
        return this._gameObjectPool.get(name);
    } catch(e) {
        var errMsg = this.getKey() + ".getGameObject.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// release game object
BaseScene.prototype.releaseGameObject = function(object) {
    try {
        if (this._gameObjectPool == undefined) { return; }
        return this._gameObjectPool.release(object);
    } catch(e) {
        var errMsg = this.getKey() + ".releaseGameObject.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}
//// Game Object Pool -->
///////////////////////////////

///////////////////////////////
//// <!-- game object drag

// event on
BaseScene.prototype.objectDragOn = function() {
    try {
        this.objectDragOff();

        let selfIt = this;

        this.input.on('dragstart', function(pointer, gameObject) {
            selfIt.onObjectDragStart(pointer, gameObject);
        });

        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            selfIt.onObjectDrag(pointer, gameObject, dragX, dragY);
        });

        this.input.on('dragend', function(pointer, gameObject) {
            selfIt.onObjectDragEnd(pointer, gameObject);
        });
    } catch(e) {
        var errMsg = this.getKey() + ".objectDragOn.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// event off
BaseScene.prototype.objectDragOff = function() {
    try {
        this.input.off('dragstart');
        this.input.off('drag');
        this.input.off('dragend');
    } catch(e) {
        var errMsg = this.getKey() + ".objectDragOff.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// clear
BaseScene.prototype.clearObjectDrag = function() {
    try {
        this.objectDragOff();
        
        if (this._objectDragMap == undefined) {return;}
        this._objectDragMap.clear();
        this._objectDragMap = undefined;
    } catch(e) {
        var errMsg = this.getKey() + ".objectDragOff.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// remove
BaseScene.prototype.removeObjectDrag = function(object) {
    try {
        if (this._objectDragMap == undefined) { return; }
        else if (this._objectDragMap.has(object) === false) { return ;}

        //
        this._objectDragMap.delete(object);

        //
        if (this._objectDragMap.size <= 0) {
            this.objectDragOff();
        }
    } catch(e) {
        var errMsg = this.getKey() + ".removeObjectDrag.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// add
BaseScene.prototype.addObjectDrag = function(object, cbDragStart, cbDrag, cbDragEnd) {
    try {
        if (this._objectDragMap == undefined) {
            this._objectDragMap = new Map();
        }

        //
        if (this._objectDragMap.has(object) === true) { return ;}

        //
        object.setInteractive();
        this.input.setDraggable(object);

        //
        this._objectDragMap.set(object, {cbDragStart: cbDragStart, cbDrag: cbDrag, cbDragEnd: cbDragEnd});

        //
        if (this._objectDragMap.size === 1) {
            this.objectDragOn();
        }
    } catch(e) {
        var errMsg = this.getKey() + ".addObjectDrag.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// on drag start
BaseScene.prototype.onObjectDragStart = function(pointer, gameObject) {
    try {
        if (this._objectDragMap == undefined) { return; }
        else if (this._objectDragMap.size <= 0) { return; }
        else if (this._objectDragMap.has(gameObject) === false) { return; }

        this._objectDragMap.get(gameObject).cbDragStart(pointer, gameObject);
    } catch(e) {
        var errMsg = this.getKey() + ".onObjectDragStart.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// on drag
BaseScene.prototype.onObjectDrag = function(pointer, gameObject, dragX, dragY) {
    try {
        if (this._objectDragMap == undefined) { return; }
        else if (this._objectDragMap.size <= 0) { return; }
        else if (this._objectDragMap.has(gameObject) === false) { return; }

        this._objectDragMap.get(gameObject).cbDrag(pointer, gameObject, dragX, dragY);
    } catch(e) {
        var errMsg = this.getKey() + ".onObjectDrag.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// on drag end
BaseScene.prototype.onObjectDragEnd = function(pointer, gameObject) {
    try {
        if (this._objectDragMap == undefined) { return; }
        else if (this._objectDragMap.size <= 0) { return; }
        else if (this._objectDragMap.has(gameObject) === false) { return; }

        this._objectDragMap.get(gameObject).cbDragEnd(pointer, gameObject); 
    } catch(e) {
        var errMsg = this.getKey() + ".onObjectDragEnd.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

//// game object drag -->
///////////////////////////////

// sleep counter reserve
BaseScene.prototype.reserveSleep = function(interval) {
    try {
        this._sleepCounter.sleep(interval);
    } catch(e) {
        var errMsg = this.getKey() + ".reserveSleep.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// sleep check
BaseScene.prototype.checkSleep = function(delta) {
    try {
        return this._sleepCounter.check(delta);
    } catch(e) {
        var errMsg = this.getKey() + ".checkSleep.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

/////////////////////////////////
//// <!-- collision group

// get group
BaseScene.prototype.getCollisionGroup = function() {
    try {
        if (this._collisionGroup == undefined) {
            let selfIt = this;
            this._collisionGroup = new CollisionGroup('collision_group_' + this.getKey(), this, {
                attackerXBody: (a, b)=>selfIt.onCollisionAttackerXBody(a, b), 
                attackerXAttacker: (a1, a2)=>selfIt.onCollisionAttackerXAttacker(a1, a2), 
                bodyXBody: (b1, b2)=>selfIt.onCollisionBodyXBody(b1, b2), 
                bodyXAttacker: (b, a)=>selfIt.onCollisionBodyXAttacker(b, a)
            });
        }

        return this._collisionGroup;
    } catch(e) {
        var errMsg = this.getKey() + ".getCollisionGroup.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// group create event
BaseScene.prototype.createCollisionGroup = function() {
    try {
        this.onCreateCollisionGroup(this.getCollisionGroup());
    } catch(e) {
        var errMsg = this.getKey() + ".createCollisionGroup.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// group create event
BaseScene.prototype.onCreateCollisionGroup = function(collisionGroup) {
    try {
        // nothing
    } catch(e) {
        var errMsg = this.getKey() + ".onCreateCollisionGroup.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// group collision event - attacker X body
BaseScene.prototype.onCollisionAttackerXBody = function(attacker, body) {
    console.log('not implement - onCollisionAttackerXBody !!!');
}

// group collision event - attacker X attacker
BaseScene.prototype.onCollisionAttackerXAttacker = function(attacker, attacker) {
    console.log('not implement - onCollisionAttackerXBody !!!');
}

// group collision event - body X attacker
BaseScene.prototype.onCollisionBodyXAttacker = function(body, attacker) {
    console.log('not implement - onCollisionBodyXAttacker !!!');
}

// group collision event - body X body
BaseScene.prototype.onCollisionBodyXBody = function(body, body) {
    console.log('not implement - onCollisionBodyXBody !!!');
}


//// collision group -->
/////////////////////////////////