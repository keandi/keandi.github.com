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
            
        } catch(e) {
            var errMsg = this.getKey() + ".onStop.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onSerialLoadAssets() {
        super.onSerialLoadAssets();

        _resourcePool.setScene(this)
            .addArgs('mole_sprite', 'text_branca');
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
                // blue

                // green

                // purple

                // red

                // yellow

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
                /*v.watchTimer = new TimerOnPool('timeronpool_watchtimer_' + this.Name, this.getTimerPool());
                v.watchTimer.startInterval(()=>{
                    if (v.pointManager.IsFinished === true) {
                        console.log( stringFormat("게임끝 - 미션 {0}", v.pointManager.IsMissionSuccess));
                        v.watchTimer.stop();
                    } else {
                        console.log("게임 진행 중");
                    }
                }, 500);*/
            }

            // hammer 준비
            {
                v.hammer = new MoleHammer('MoleHammer', this, v.moleFrameInfo, this.ContentRc);
            }

            // screen down event
            {
                const contentRc = this.ContentRc;
                this.addPointerEvent('down', (pointer)=>{
                    if (contentRc.ptInRect(pointer.x, pointer.y) != true) { return; }
                    //console.log( stringFormat("x: {0}, y: {1}", pointer.x, pointer.y));

                    v.hammer.run(pointer.x, pointer.y);
                });
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

}