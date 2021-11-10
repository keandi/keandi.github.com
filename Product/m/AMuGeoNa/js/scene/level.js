class SceneLevel extends GameScene {
    #_SPV = {};

    // ctor
    constructor(fps, gameHost) {
        try {
            super(fps, gameHost);

            this.IsNeedExitButton = false;
        } catch (e) {
            var errMsg = this.getKey() + ".ctor.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // secene key 반환
    getKey() {
        return KEY_LEVEL;
    }

    onCreate() {
        //alert("create " + this.getKey());

        this._isStopped = false;
    }

    onPreset() {
        this._isUseSerialLoader = true;
    }

    onStop() {
        try {
            //console.log("onStop " + this.getKey());

            super.onStop();

            this.#_SPV.representationImage = undefined; // undefine 처리해야 다시 생성 가능

            this._isStopped = true;
            
        } catch(e) {
            var errMsg = this.getKey() + ".onStop.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onSerialLoadAssets() {
        super.onSerialLoadAssets();

        _resourcePool.setScene(this)
            .addArgs('arrow', 'option_button', 'ad_button', 'level_entry_characters', 'twink');

        /*
        this.addSerialLoadAsset( 'arrow',
        () => {
            this.load.image(
                'arrow',
                'assets/image/arrow.png'
            );
        }, 1 );

        this.addSerialLoadAsset( 'option_button',
        () => {
            this.load.atlas(
                'option_button',
                'assets/image/option_button.png',
                'assets/atlas/option_button.json'
            );
        }, 2 );

        this.addSerialLoadAsset( 'ad_button',
        () => {
            this.load.atlas(
                'ad_button',
                'assets/image/ad_button.png',
                'assets/atlas/ad_button.json'
            );
        }, 2 );

        this.addSerialLoadAsset( 'level_entry_characters',
        () => {
            this.load.atlas(
                'level_entry_characters',
                'assets/image/level_entry_characters.png',
                'assets/atlas/level_entry_characters.json'
            );
        }, 2 );

        this.addSerialLoadAsset( 'twink', () => this.load.audio('twink', 'assets/audio/twink.ogg'), 1 );
        */
    };    
    
    onCompleteSerialLoadAllAssets() {
        try {
            super.onCompleteSerialLoadAllAssets();

            let selfIt = this;

            //
            this.printTitle(_gameOption.selectText('게임 선택', 'Game selection'));

            // option button
            const topMenuRc = this.TopMenuRc;
            const option_button_x = topMenuRc.Right - 32;
            const option_button_y = topMenuRc.CenterY;
            let option_button = this.addDestroyableObject( new GOImageButton("option_button", this, option_button_x, option_button_y, 
                'option_button', 'BTN_UP', 'option_button', 'BTN_DOWN',
                () => {
                    _gameHost.switchScene(KEY_OPTION);
                })
            );
            option_button.setDepth(DEPTH_MENU_BUTTON);

            // ad button
            const ad_button_x = topMenuRc.Left + 32;
            const ad_button_y = topMenuRc.CenterY;
            let ad_button = this.addDestroyableObject( new GOImageButton("ad_button", this, ad_button_x, ad_button_y, 
                'ad_button', 'BTN_UP', 'ad_button', 'BTN_DOWN',
                () => {
                    //_browserComm.goAd();
                    this.test();
                }, false)
            );
            ad_button.setDepth(DEPTH_MENU_BUTTON);

            // 
            this.#makeLevelObjects();

            //
            // pointerdown
            
            /*selfIt.addPointerEvent('down', (pointer)=>{
                selfIt.addGold(1);
            }); */
            
        } catch(e) {
            var errMsg = this.getKey() + ".onCompleteSerialLoadAllAssets.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onCompleteSerialLoadAllAssetsAfter() {
        // nothing. 구현하여 게임 접근 체크를 하지 않도록 한다.
    }

    // game start
    onGameStart() {
        try {
            //this.useGold(2000);
            //_gameData.LastLevel = 0;
            //_gameData.save();
            //this.addGold(3);
        } catch(e) {
            var errMsg = this.getKey() + ".onGameStart.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // make level objects
    #makeLevelObjects() {
        try {
            let selfIt = this;
            const contentRc = this.ContentRc;

            // 영역 100 단위
            let lv100Rc = new Rect(contentRc.Left, contentRc.Top, contentRc.Width / 5, contentRc.Height);

            // 영역 10 단위
            let lv10Rc = lv100Rc.copyFromThis();
            lv10Rc.Left = lv100Rc.Right + 1;

            // 영역 1 단위
            let lv1Rc = new Rect(lv10Rc.Right + 1, lv10Rc.Top, contentRc.Width - (lv100Rc.Width + lv10Rc.Width), contentRc.Height);

            lv100Rc.deflate(3, 3);
            lv10Rc.deflate(3, 3);
            lv1Rc.deflate(3, 3);

            // test rect
            { // 
                /* var g = this.addDestroyableObject( this.add.graphics() );
                g.fillStyle(0xFE8730, 1);
                g.fillRect(lv100Rc.Left, lv100Rc.Top, lv100Rc.Width, lv100Rc.Height);

                g.fillStyle(0xFE0730, 1);
                g.fillRect(lv10Rc.Left, lv10Rc.Top, lv10Rc.Width, lv10Rc.Height);

                g.fillStyle(0x6E8770, 1);
                g.fillRect(lv1Rc.Left, lv1Rc.Top, lv1Rc.Width, lv1Rc.Height); */
            }

            // block 정보 메모리 초기화
            this.#_SPV.block100 = [];
            this.#_SPV.block10 = [];

            // block 최대 
            const block_max = 10;
            const blockSize = { cx: lv100Rc.Width, cy: parseInt(lv100Rc.Height / block_max) };
            const blockEdge = 5;
            const edgeForGuider = 25;

            let makeBlocks = function(max, rc, baseLevelName, levelBlockType, baseLevelBlockGroup) {
                let arrow = undefined;
                for (var i = 1; i <= max; i++)
                {
                    var tmpRc = new Rect(rc.X, rc.Bottom - (blockSize.cy * i), blockSize.cx, blockSize.cy);
                    tmpRc.setLTRB(tmpRc.Left + edgeForGuider, tmpRc.Top + blockEdge, tmpRc.Right - blockEdge, tmpRc.Bottom - blockEdge);
    
                    // 화살표
                    if (i == 1) {
                        var width = (tmpRc.X - rc.X) - 8;
                        arrow = new LevelArrow("levelarrow_" + baseLevelName, selfIt, (width / 2) + rc.Left, tmpRc.CenterY, width);
                    }

                    var block = new LevelBlock("lb_" + baseLevelName + "_" + i, selfIt, tmpRc, levelBlockType, baseLevelBlockGroup * (i - 1), (targetBlock) => {
                        //console.log( stringFormat("group: {0}", targetBlock.LevelGroup) );
                        arrow.setTargetBlock(targetBlock, (b)=>selfIt.onLevelBlockChanged(b));
                    } );

                    // block 정보 메모리 담기
                    if (levelBlockType.value === LevelBlockType.BLOCK100.value) {
                        selfIt.#_SPV.block100.push(block);
                    } else if (levelBlockType.value === LevelBlockType.BLOCK10.value) {
                        selfIt.#_SPV.block10.push(block);
                    }
                }

                return arrow;
            };

            // 영역 100 그리기
            this.#_SPV.arrow100 = makeBlocks(2, lv100Rc, "100", LevelBlockType.BLOCK100, 100);

            // 영역 10 그리기
            this.#_SPV.arrow10 = makeBlocks(10, lv10Rc, "10", LevelBlockType.BLOCK10, 10);

            // entry level 그리기
            // entry level 영역 구하기
            const entryLevelSize = {
                cx: parseInt(lv1Rc.Width / 2),
                cy: parseInt(lv1Rc.Height / 5)
            };
            const entryBlockEdge = 5;
            const entryBlockSize = {
                cx: entryLevelSize.cx - (entryBlockEdge * 2),
                cy: entryLevelSize.cy - (entryBlockEdge * 2)
            };
            
            const ebBeginX = lv1Rc.Left;
            let ebY = lv1Rc.Bottom - entryLevelSize.cy;
            let ebX = 0;
            this.#_SPV.entryBlocks = [];

            if (this.#_SPV.representationImage == undefined) {
                this.#_SPV.representationImage = new RepresentationImage("representation_image", this);
            }

            for (var i = 0; i < 5; i++) {
                ebX = ebBeginX;
                for (var j = 0; j < 2; j++) {
                    var rc = new Rect(ebX + entryBlockEdge, ebY + entryBlockEdge, entryBlockSize.cx, entryBlockSize.cy);
                    this.#_SPV.entryBlocks.push( new LevelEntryBlock("leb_" + i + "_" + j, this, this.#_SPV.representationImage, rc, (entryBlock)=>{
                        this._timerPool.setTimeout(()=>this.onEntryTry(entryBlock), 200)
                    }) );

                    ebX += entryLevelSize.cx;
                }
                ebY -= entryLevelSize.cy;
            }

            // 기존 Level 화면 만들기
            let curLevel = _gameData.CurrentLevel;
            this.#_SPV.settingCurLevel = curLevel; //현재 Level 설정 중
            let targetBlock = (curLevel > 0) ? this.#_SPV.block100[ Math.floor( (curLevel / 100) ) ] : this.#_SPV.block100[0];
            if (this.#_SPV.arrow100.setTargetBlock(targetBlock, (b)=>selfIt.onLevelBlockChanged(b)) === false) {
                this.displayLevelBlock10(targetBlock);
            }

        } catch(e) {
            var errMsg = this.getKey() + ".makeLevelObjects.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // level block 선택 이벤트
    onLevelBlockChanged(block) {
        try {
            //console.log("finished group: " + block.LevelGroup);
            if (block.LevelBlock.value == LevelBlockType.BLOCK100.value) {
                this.displayLevelBlock10(block);
            } else if (block.LevelBlock.value == LevelBlockType.BLOCK10.value) {
                this.displayEntryLevel(block);
            }
        } catch(e) {
            var errMsg = this.getKey() + ".onLevelBlockChanged.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 선택 100~ 블럭에 의한 정보 설정
    displayLevelBlock10(block) {
        try 
        {
            let targetBlock = this.#_SPV.block10[0];

            for (var i = 0; i < this.#_SPV.block10.length; i++) {
                var target = this.#_SPV.block10[i];
                var levelGroup = block.LevelGroup + (i * 10);
                target.setLevelGroup( levelGroup );

                if (this.#_SPV.settingCurLevel != undefined) {
                    if ( Math.abs(this.#_SPV.settingCurLevel - levelGroup) < 10 ) {
                        targetBlock = target;
                        this.#_SPV.settingCurLevel = undefined;
                    }
                }
            }

            if (this.#_SPV.arrow10.setTargetBlock(targetBlock, (b)=>this.onLevelBlockChanged(b)) === false) {
                this.displayEntryLevel(targetBlock);
            }
        } catch(e) {
            var errMsg = this.getKey() + ".displayLevelBlock10.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 선택 10~ 블럭에 의한 정보 설정
    displayEntryLevel(block) {
        try 
        {
            //console.log("entry levels: " + block.LevelBlock.name + ", group: " + block.LevelGroup);
            let currentLevel = block.LevelGroup + 1;
            _gameData.CurrentLevel = currentLevel;

            let entryBlocks = this.#_SPV.entryBlocks;
            for (var i = 0; i < entryBlocks.length; i++) {
                entryBlocks[i].Level = currentLevel + i;
            }
            
        } catch(e) {
            var errMsg = this.getKey() + ".displayEntryLevel.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 게임 진입 클릭
    onEntryTry(entryBlock) {
        try {
            let v = this.#_SPV;
            if (v.entryTryLock === true) { return; }

            let selfIt = this;
            this.playSound('twink');
            let levelInfo = entryBlock.LevelInfo;

            if (_gameData.Gold < levelInfo.needgold) {
                var entryFee = stringFormat("{0}G", levelInfo.needgold);
                this.msgboxOk(_gameOption.selectText("알림", "Notice"),
                    _gameOption.selectText( stringFormat("입장료({0})가 부족합니다.", entryFee), 
                        stringFormat("Insufficient entrance fee ({0})", entryFee)));
                return;
            } else if (_gameData.Gold >= levelInfo.limitgold && levelInfo.limitgold != 0) {
                var limitFee = stringFormat("{0}G", levelInfo.limitgold);
                this.msgboxOk(_gameOption.selectText("알림", "Notice"),
                    _gameOption.selectText( stringFormat("입장 제한 ({0})", limitFee), 
                        stringFormat("Entry limit ({0})", limitFee)));
                return;
            }

            // 게임 진입
            let entryGame = function(li) {
                _gameData.EntryGameLevelInfo = li;
                _gameHost.switchScene(li.arg.sceneKey);
            };

            if (levelInfo.needgold > 0) {
                v.entryTryLock = true;
                var entryFee = stringFormat("{0}G", levelInfo.needgold);
                var kor = stringFormat("입장료: {0}\r\n지불하시겠습니까?", entryFee);
                var eng = stringFormat("Admission: {0}\r\nWould you like to pay?", entryFee);
                this.msgboxYesNo(_gameOption.selectText("입장료", "Admission"), _gameOption.selectText(kor, eng),
                    () => { 
                        selfIt.useGold(levelInfo.needgold);
                        _gameData.save();
                        v.entryTryLock = false;
                        entryGame(levelInfo);
                    },
                    () => {
                        v.entryTryLock = false;
                    }
                );
            } else {
                entryGame(levelInfo);
            }
            
        } catch(e) {
            var errMsg = this.getKey() + ".onEntryTry.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // test
    test() {
        {
        /* this._timerPool.setTimeout(()=> {
            console.log('t')
        }, 100); */
        }
        
        {
         /* if (this._intervalId == undefined) {
                this._intervalId = this._timerPool.setInterval(()=>{
                    console.log('test timer tick: ' + this._gameHost.Time);
                }, 500);
            } else {
                this._timerPool.remove(this._intervalId);
                this._intervalId = undefined;
            } */   
        }

        // pause test
        {
            /* if (this.#_SPV.flag != true) {
                this.pause();
                this.#_SPV.flag = true;
            } else {
                this.resume();
                this.#_SPV.flag = false;
            } */
        }

        // msgbox test
        {
            //this.msgboxOk('OK', 'are  you ready?\r\n나의 이름은....', ()=>{alert('ok')});
            //this.msgboxYesNo('Yes or No', 'are  you ready?\r\n나의 이름은....', ()=>alert('yes'), ()=>alert('no'));
        }

        // gold sound test
        {
            //this.playCoinSound();
        }

        // gold test
        {
            this.addGold(3);
            /*if (this.#_SPV.isGoldTest === true) {
                this.addGold(100);
                this.#_SPV.isGoldTest = false;
            } else {
                this.useGold(100);
                this.#_SPV.isGoldTest = true;
            }*/
        }

        // timer-pool
        {
            /*let v = this.#_SPV;
            let timerPool = this.getTimerPool();

            if (v.timerId == undefined) {
                v.timerId = timerPool.setTimeout(()=>{
                    //console.log("timer-id: " + v.timerId + ", tick: " + _gameHost.Time);
                    console.log("tick: " + _gameHost.Time);

                    //timerPool.remove(v.timerId);
                    v.timerId = undefined;
                }, 500);
            } 
            //else {
               // timerPool.remove(v.timerId);
              //  v.timerId = undefined;
            //}
            */
        }

        // atlas json
        {
            //console.log(_resourcePool.getJsonObject('level_entry_characters'));
            /*let frameMap = _resourcePool.getJsonFrameMap('level_entry_characters');
            console.log( frameMap );*/
        }

        // progressbar test
        {
            /*
            let timerPool = this.getTimerPool();
            const contentRc = this.ContentRc;
            let pb = new ProgressBar('progressbar_test', this, contentRc.Left + 10, contentRc.Top + 10, contentRc.Width - 20, 8,
                0, 25, 0xff0000, 0xffffff, 0, 0.2, 0.5);
            let timer = timerPool.setInterval(()=>{
                pb.increase();
                if (pb.IsMax === true)                 {
                    timerPool.remove(timer);
                    timerPool.asyncCall(()=>{
                        pb.destroy();
                    }, 1500);
                }
            }, 100);
            */
        }

        // gold changed notify
        {
            /*
            let v = this.#_SPV;
            if (v.gcn == undefined) {
                this.registerGoldNotify((gold)=>{
                    console.log('current gold: ' + gold);
                });
                v.gcn = true;
            }
            */
        }
        
    }

     // get msgbox x, y (상속하여 반환 필요)
     getMsgBoxXY() {
         const contentRc = this.ContentRc;
         return { x: contentRc.CenterX, y: contentRc.CenterY };
    }
}