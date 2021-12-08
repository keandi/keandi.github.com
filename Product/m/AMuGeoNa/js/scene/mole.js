class SceneMole extends GameScene {
    #_SPV = {};

    // ctor
    constructor(fps, gameHost) {
        try {
            super(fps, gameHost);

        } catch (e) {
            var errMsg = this.getKey() + ".ctor.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // secene key 반환
    getKey() {
        return KEY_GAME_MOLE;
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

            this._isStopped = true;

            let v = this.#_SPV;

            destroyObjects( v.watchTimer );
            v.watchTimer = undefined;
            
        } catch(e) {
            var errMsg = this.getKey() + ".onStop.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onSerialLoadAssets() {
        super.onSerialLoadAssets();

        _resourcePool.setScene(this)
            .addArgs('mole_sprite', 'text_branca', 'scream_1', 'impactsplat02');
    };    

    // game object pool 이용시 생성 과정을 여기에서 구현
    onRegisterObjectCreateCallback() {
        try {
            super.onRegisterObjectCreateCallback();

            let selfIt = this;
            let v = this.#_SPV;

            const contentRc = this.ContentRc;

            // json data
            v.moleFrameInfo = {
                frames: _resourcePool.getJsonFrameMap('mole_sprite'),
            };

            v.brancaFrameInfo = {
                frames: _resourcePool.getJsonFrameMap('text_branca'),
            };

            // mole
            {
                for (var i = INDEX_MOLE_COLOR_BLUE; i <= INDEX_MOLE_COLOR_YELLOW; i++) {
                    let moleName = 'mole_' + i;
                    let moleIndex = i;
                    this.registerGameObjectCreateCallback(moleName, ()=>{
                        return new MoleTarget(moleName, selfIt, v.moleFrameInfo, moleIndex, selfIt.ContentRc, (obj)=>{
                            selfIt.#onMoleDisappear(obj);
                        });
                    });
                }
            }

            // hit flash effect
            {
                // valid hit effect
                this.registerGameObjectCreateCallback('ValidHitEffect', ()=>{
                    return new FlashSprite('ValidHitEffect', selfIt, v.moleFrameInfo, 'mole_sprite', 'HITEFFECT_VALID', (obj)=>{
                        selfIt.releaseGameObject(obj);
                    });
                });

                // invalid hit effect
                this.registerGameObjectCreateCallback('InvalidHitEffect', ()=>{
                    return new FlashSprite('InvalidHitEffect', selfIt, v.moleFrameInfo, 'mole_sprite', 'HITEFFECT_INVALID', (obj)=>{
                        selfIt.releaseGameObject(obj);
                    });
                });
            }

        } catch(e) {
            var errMsg = this.getKey() + ".onRegisterObjectCreateCallback.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

     // game start
     onGameStart() {
        try {
            // 메뉴 설정
            {
                // title
                this.printTitle(_gameOption.selectText('두더지', 'Mole'));

                // icon
                this.createTopIcon('mole_sprite', 'ICON');

                // help button
                {
                    /*let kor = "- 주사위 - \r\n맞추면? +6G\r\n틀리면? -1G";
                    let eng = "- Dice - \r\nif it fits? +6G\r\nwrong? -1G";
                    this.createHelpButton(_gameOption.selectText(kor, eng), 32 + 16 + 5); */
                }
            }            

            let selfIt = this;
            let v = this.#_SPV;

            // background
            this.setBackgroundColor( COLOR_MOLE_BACKGROUND );

            // 대상 색상 결정
            v.targetColor = Phaser.Math.Between(INDEX_MOLE_COLOR_BLUE, INDEX_MOLE_COLOR_YELLOW);

            //
            v.pointManager = new MolePointManager('mole_point_manager', this, v.brancaFrameInfo, v.targetColor);

            // draw ground + mole spawn position
            {
                const contentRc = this.ContentRc;
                const pointRc = v.pointManager.Area;
                const groundPartHeight = parseInt((contentRc.Height - pointRc.Height) / 4);

                let groundPartRc = new Rect(contentRc.Left, pointRc.Bottom, contentRc.Width, groundPartHeight);
                let groundDepth = DEPTH_MOLE_GROUND_BASE;

                var tmpClr = [0xff894a, 0x449582, 0xfbe700, 0x23a091];

                // draw ground
                for (var i = 0; i < 4; i++) {
                    var g = this.addDestroyableObject( this.add.graphics() );
                    g.setDepth(groundDepth);

                    //g.fillStyle(COLOR_MOLE_BACKGROUND, 1);
                    g.fillStyle(tmpClr[i], 1);
                    g.fillRect(groundPartRc.Left, groundPartRc.Top, groundPartRc.Width, groundPartRc.Height);

                    // 
                    groundDepth += 4;
                    groundPartRc.Top = groundPartRc.Bottom;
                }

                // compute mole spawn positon
                v.spawnPosition = Array.from(Array(3), () => new Array(3));
                const spawnGap = parseInt(groundPartRc.Width / 4);
                let x = 0;
                let y = pointRc.Bottom + groundPartRc.Height;
                let spawnDepth = DEPTH_MOLE_GROUND_BASE + 2;
                for (var r = 0; r < 3; r++) {
                    x = spawnGap;
                    for (var c = 0; c < 3; c++) {
                        v.spawnPosition[c][r] = { x: x, y: y, depth: spawnDepth };
                        x += spawnGap;
                        
                        //console.log( stringFormat("col: {0}, row: {1}, x: {2}, y: {3}", c, r, v.spawnPosition[c][r].x, v.spawnPosition[c][r].y) );
                        /*var btext = new BrancaChar('temp_braca', this, {cx: 12, cy: 12, border: 2});
                        btext.setPosition(v.spawnPosition[c][r].x, v.spawnPosition[c][r].y)
                            .setChar('X');
                        btext.Depth = groundDepth + 10; */
                    }
                    y += groundPartRc.Height;
                    spawnDepth += 4;
                }
            }

            // create edges
            {
                for (var r = 0; r < 3; r++) {
                    for (var c = 0; c < 3; c++) {
                        var edge_back = this.addDestroyableObject( this.add.sprite(v.spawnPosition[c][r].x, v.spawnPosition[c][r].y, 'mole_sprite', 'EDGE_BACK') );
                        edge_back.setOrigin(0.5, 0.58);
                        edge_back.setDepth(v.spawnPosition[c][r].depth - 1);

                        var edge_fore = this.addDestroyableObject( this.add.sprite(v.spawnPosition[c][r].x, v.spawnPosition[c][r].y, 'mole_sprite', 'EDGE_FORE') );
                        edge_fore.setOrigin(0.5, 0.42);
                        edge_fore.setDepth(v.spawnPosition[c][r].depth + 3);

                        /*var edge_fore = this.addDestroyableObject( this.add.sprite(v.spawnPosition[c][r].x, v.spawnPosition[c][r].y, 'mole_sprite', 'MOLE_BLUE') );
                        edge_fore.setOrigin(0.5, 0.5);
                        edge_fore.setDepth(v.spawnPosition[c][r].depth);
                        console.log( stringFormat("c: {0}, r: {1}, depth: {2}", c, r, v.spawnPosition[c][r].depth) );
                        */
                    }
                }
            }

            // game watch timer
            {
                v.watchTimer = new TimerOnPool('timeronpool_watchtimer_' + this.Name, this.getTimerPool());
                v.watchTimer.startInterval(()=>{
                    if (v.mole != undefined) { return; }

                    if (v.pointManager.IsFinished === true) {
                        v.watchTimer.stop();
                        selfIt.removePointerEvent( v.hammerCallback );

                        if (v.pointManager.IsMissionSuccess == true) {
                            if (v.pointManager.IsMissionPerfectSuccess === true) {
                                // perfect notice
                                let gold = 10;
                                let kor = stringFormat("보상: {0}G", gold);
                                let eng = stringFormat("Reward: {0}G", gold);
                                selfIt.addGold(gold);
                                this.getTimerPool().setTimeout(()=>{
                                    selfIt.msgboxOk(_gameOption.selectText("Perfect", "Perfect"), _gameOption.selectText(kor, eng), ()=>{
                                        selfIt.gameFinished(false);        
                                    });
                                }, 500);
                                return;
                            }
                            selfIt.gameFinished(false);
                        } else {
                            selfIt.gameFinished(true);
                        }
                        
                    } else {
                        //console.log("게임 진행 중");
                        selfIt.#appearMole();
                    }
                }, 500);
            }

            // hammer 준비
            {
                v.hammer = new MoleHammer('MoleHammer', this, v.moleFrameInfo, this.ContentRc);
            }

            // mole 준비
            {
                v.moles = new Array();
                for (var i = INDEX_MOLE_COLOR_BLUE; i <= INDEX_MOLE_COLOR_YELLOW; i++) {
                    v.moles[i] = this.getGameObject('mole_' + i);
                    v.moles[i].setPosition(-100, -1000);
                }
            }

            // mole index random table 준비
            {
                const level = _gameData.EntryGameLevelInfo.gamelevel;
                let rate = parseInt(level / 10) * 10;
                if (rate > 45) { rate = 45; }
                else if (rate < 10) { rate = 10; }
                v.moleAppearTable = new PercentTable(rate);
            }

            // screen down event
            {
                const contentRc = this.ContentRc;
                v.hammerCallback = this.addPointerEvent('down', (pointer)=>{
                    if (contentRc.ptInRect(pointer.x, pointer.y) != true
                        || selfIt.isPause() == true) { 
                        return; 
                    }
                    //console.log( stringFormat("x: {0}, y: {1}", pointer.x, pointer.y));

                    v.hammer.run(pointer.x, pointer.y);
                });
            }

            // mole test
            {
                /*
                v.moles = new Array();
                for (var i = INDEX_MOLE_COLOR_BLUE; i <= INDEX_MOLE_COLOR_YELLOW; i++) {
                    v.moles[i] = this.getGameObject('mole_' + i);
                    v.moles[i].setPosition(-100, -1000);
                }

                v.mole = v.moles[Phaser.Math.Between(INDEX_MOLE_COLOR_BLUE, INDEX_MOLE_COLOR_YELLOW)];

                var c = Phaser.Math.Between(0, 2);
                var r = Phaser.Math.Between(0, 2);
                v.mole.run(v.spawnPosition[c][r].x, v.spawnPosition[c][r].y, v.spawnPosition[c][r].depth);
                */
            }

        } catch(e) {
            var errMsg = this.getKey() + ".onGameStart.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

     // get msgbox x, y (상속하여 반환 필요)
     getMsgBoxXY() {
         const contentRc = this.ContentRc;
         return { x: contentRc.CenterX, y: contentRc.CenterY };
    }

    // 게임 강제종료 처리 (반드시 상속 구현 필요)
    gameUserExit() {
        this.gameEnd(true);
    }

    // create collision group event
    onCreateCollisionGroup(collisionGroup) {
        try {
            collisionGroup.addGroups('hammer', 'mole')
                .setTargetGroups('hammer', 'mole');
        } catch(e) {
            var errMsg = this.getKey() + ".onCreateCollisionGroup.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // group collision event - attacker X body
    onCollisionAttackerXBody(attacker, body) {
        try {
            console.log(stringFormat("[충돌] attacker: {0}/{1}, body: {2}/{3}", attacker.GroupTag, attacker.Name, body.GroupTag, body.Name));

            body.setCollisionSkip();

            let v = this.#_SPV;
            const collisionRect = attacker.LastCollisionRect;
            let effectX = body.X;
            let effectY = body.Y;
            const isValidHit = (body.MoleIndex === v.targetColor) ? true : false;

            if (collisionRect != undefined) {
                effectX = collisionRect.CenterX;
                effectY = collisionRect.CenterY;
            }

            this.getGameObject( (isValidHit == true) ? 'ValidHitEffect' : 'InvalidHitEffect').flash(effectX, effectY);
            apiVibration( (isValidHit == true) ? 1 : 3 );

            // point control
            if (isValidHit === true) {
                this.playSound('scream_1');
                v.pointManager.increaseHitPoint();
            } else {
                this.playSound('impactsplat02');
                this.useGold(3, false);
            }

            this.#_SPV.mole.enter('down');
           
        } catch(e) {
            var errMsg = this.getKey() + ".onCollisionAttackerXBody.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        } 
    }

    // object remove
    removeObject(object) {
        try {
            object.remove();
            this.releaseGameObject(object);
        } catch(e) {
            var errMsg = this.getKey() + ".onCollisionAttackerXBody.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        } 
    }

    // mole disappear callback
    #onMoleDisappear(obj) {
        try {
            let v = this.#_SPV;

            obj.visible = false;
            v.mole = undefined;
        } catch(e) {
            var errMsg = this.getKey() + ".onMoleDisappear.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        } 
    }

    // mole appear try
    #appearMole() {
        try {
            let v = this.#_SPV;
            if (v.mole != undefined) { return; }

            let moleIndex = v.targetColor;

            if (v.moleAppearTable.Rand === true) {
                moleIndex = Phaser.Math.Between(INDEX_MOLE_COLOR_BLUE, INDEX_MOLE_COLOR_YELLOW);
            } else {
                moleIndex = v.targetColor;
            }

            v.mole = v.moles[moleIndex];

            var c = Phaser.Math.Between(0, 2);
            var r = Phaser.Math.Between(0, 2);
            v.mole.run(v.spawnPosition[c][r].x, v.spawnPosition[c][r].y, v.spawnPosition[c][r].depth);

            if (v.targetColor === moleIndex) {
                v.pointManager.increaseCurrentPoint();
            }
        } catch(e) {
            var errMsg = this.getKey() + ".appearMole.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        } 
    }
}