class SceneNumbers extends GameScene {
    #_SPV = {};

    // ctor
    constructor(fps, gameHost) {
        try {
            super(fps, gameHost);

            this.#createStateMachine();

            let v = this.#_SPV;
            v.boxCount = 5; // 박스 행렬 개수

        } catch (e) {
            var errMsg = this.getKey() + ".ctor.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // secene key 반환
    getKey() {
        return KEY_GAME_NUMBERS;
    }

    onCreate() {
        //alert("create " + this.getKey());

        /* this.addPointerEvent('down', ()=>{
            if (this.box == undefined) {
                this.box = new NumberBox("debug_box", this, 200,200, 100);
            } else {
                this.box.increaseNumber();
            }
        }); */

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
            destroyObjects( v.goalProgress, v.numberGrid );
            v.goalProgress = undefined;

        } catch(e) {
            var errMsg = this.getKey() + ".onStop.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onSerialLoadAssets() {
        super.onSerialLoadAssets();

        _resourcePool.setScene(this)
            .addArgs('numbers_sprite');
    };    

    // game object pool 이용시 생성 과정을 여기에서 구현
    onRegisterObjectCreateCallback() {
        try {
            super.onRegisterObjectCreateCallback();

            let selfIt = this;
            let v = this.#_SPV;

            const contentRc = this.ContentRc;

            // 박스 위치
            v.allBoxRc = new Rect();
            v.boxSize = parseInt(contentRc.Width / (v.boxCount + 2));
            {
                const allBoxSize = v.boxSize * v.boxCount;
                const xEdge = (contentRc.Height - allBoxSize) / 2;
                v.allBoxRc.setLTRB(
                    contentRc.Left + v.boxSize,
                    contentRc.Top + xEdge,
                    contentRc.Right - v.boxSize,
                    contentRc.Bottom - xEdge
                );

                // draw for debug
                {
                    /* var g = this.add.graphics();
                    drawRect(g, COLOR_LEVEL_TEXT, v.allBoxRc); */
                }
            }

            // 상하 좌우 버튼 등록
            {
                let makeButton = function(buttonName, x, y, spriteName, textureName, onClick) {
                    let button = selfIt.addDestroyableObject( new GOImageButton(buttonName, selfIt, x, y, 
                        spriteName, textureName + '_UP', spriteName, textureName + '_DOWN',
                            ()=>{ onClick(); }                            
                        )
                    );
                    button.setDepth(DEPTH_MENU_BUTTON);
                }

                //
                const buttonTmpSize = 24;
                const boxButtonGap = 5;

                // Up
                {
                    const buttonX = contentRc.CenterX;
                    const buttonY = v.allBoxRc.Top  - buttonTmpSize - boxButtonGap;
                    makeButton("up_button", buttonX, buttonY, 'numbers_sprite', 'BTN_UP', ()=>{
                        //console.log("up_button clicked");
                        v.stateMachine.enter('up');
                    });
                }

                // Down
                {
                    const buttonX = contentRc.CenterX;
                    const buttonY = v.allBoxRc.Bottom + buttonTmpSize + boxButtonGap;
                    makeButton("down_button", buttonX, buttonY, 'numbers_sprite', 'BTN_DOWN', ()=>{
                        //console.log("down_button clicked");
                        v.stateMachine.enter('down');
                    });
                }

                // Left
                {
                    const buttonX = v.allBoxRc.Left - buttonTmpSize - boxButtonGap;
                    const buttonY = v.allBoxRc.CenterY;
                    makeButton("left_button", buttonX, buttonY, 'numbers_sprite', 'BTN_LEFT', ()=>{
                        //console.log("left_button clicked");
                        v.stateMachine.enter('left');
                    });
                }

                // Right
                {
                    const buttonX = v.allBoxRc.Right + buttonTmpSize + boxButtonGap;
                    const buttonY = v.allBoxRc.CenterY;
                    makeButton("right_button", buttonX, buttonY, 'numbers_sprite', 'BTN_RIGHT', ()=>{
                        //console.log("right_button clicked");
                        v.stateMachine.enter('right');
                    });
                }
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
                this.printTitle(_gameOption.selectText('Numbers', 'Numbers'));

                // icon
                this.createTopIcon('numbers_sprite', 'ICON');

                // help button
                {
                    /*let kor = "- 주사위 - \r\n맞추면? +6G\r\n틀리면? -1G";
                    let eng = "- Dice - \r\nif it fits? +6G\r\nwrong? -1G";
                    this.createHelpButton(_gameOption.selectText(kor, eng), 32 + 16 + 5); */
                }
            }            

            let selfIt = this;
            let v = this.#_SPV;

            // progressbar
            {
                const contentRc = this.ContentRc;
                let pb = new ProgressBar('progressbar_goal', this, contentRc.Left + 10, contentRc.Top + 10, contentRc.Width - 20, 8,
                        0, this.Goal, 0xff0000, 0xffffff, 0, 0.2, 0.5, ()=>{
                            //console.log("ok~~~~~~~~~~~~~~~~~~~~~~~~~!!!!");
                            selfIt.gameFinished(false);
                        });
                v.goalProgress = pb;
            }

            // number grid 생성
            v.numberGrid = new NumberGrid("numberGrid", this, v.boxCount, v.boxSize, v.allBoxRc.CenterX, v.allBoxRc.CenterY );

            // 강제 생성 시작
            this.#appearNumber();

        } catch(e) {
            var errMsg = this.getKey() + ".onGameStart.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // state machine 생성
    #createStateMachine() {
        try {
            let v = this.#_SPV;

            v.stateMachine = new StateMachine("stateMachine_" + this.getKey());

            v.stateMachine.add('none')
                .addEntry('up', ()=>this.#up())
                .addEntry('down', ()=>this.#down())
                .addEntry('left', ()=>this.#left())
                .addEntry('right', ()=>this.#right());

            v.stateMachine.add('appearNumber', true)
                .addEntry('none', ()=>this.#none())
                .addEntry('gameover', ()=>this.#gameover());
            
            v.stateMachine.add('up')
                .addEntry('none', ()=>this.#none())
                .addEntry('appearNumber', ()=>this.#appearNumber());

            v.stateMachine.add('down')
                .addEntry('none', ()=>this.#none())
                .addEntry('appearNumber', ()=>this.#appearNumber());

            v.stateMachine.add('left')
                .addEntry('none', ()=>this.#none())
                .addEntry('appearNumber', ()=>this.#appearNumber());

            v.stateMachine.add('right')
                .addEntry('none', ()=>this.#none())
                .addEntry('appearNumber', ()=>this.#appearNumber());

            v.stateMachine.add('gameover');

        } catch(e) {
            var errMsg = this.getKey() + ".createStateMachine.catched: " + e;
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
        } catch(e) {
            var errMsg = this.getKey() + ".onCreateCollisionGroup.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // group collision event - attacker X body
    onCollisionAttackerXBody(attacker, body) {
        try {
            
        } catch(e) {
            var errMsg = this.getKey() + ".onCollisionAttackerXBody.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        } 
    }

    // 게임 목표
    get Goal() {
        let v = this.#_SPV;
        if (v.goal == undefined || v.goal == NaN)
        {
            this.#_SPV.goal = 120 + (_gameData.EntryGameLevelInfo.gamelevel * 16);
        }

        return this.#_SPV.goal;
    }

    #none() {
        try {
            //console.log("state is none");

            //this.#_SPV.numberGrid.printActiveBoxs();
        } catch(e) {
            var errMsg = this.getKey() + ".none.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }         
    }

    #appearNumber() {
        try {
            let v = this.#_SPV;
            //console.log("state is appearNumber");

            if (v.numberGrid.createBox() === false) {
                console.log("box create failed");
            }

            v.stateMachine.enter('none');
        } catch(e) {
            var errMsg = this.getKey() + ".appearNumber.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }         
    }

    #up() {
        try {
            let v = this.#_SPV;

            // test
            {
                /*
                if (v.box == undefined) {
                    v.box = new NumberBox("testbox", this, 100, 100, v.boxSize);
                } else {
                    v.box.redraw(v.box.X, v.box.Y - 2);
                }
                */

                /*if (v.numberGrid.createBox() === false) {
                    console.log("box create failed");
                }*/
            }

            //console.log("state is up");
            v.goalProgress.Value = Math.floor(Math.random() * 120) + 1;
            //v.stateMachine.enter('appearNumber');
            v.numberGrid.moveToUp((moved)=>{
                v.stateMachine.enter('appearNumber');
            });

        } catch(e) {
            var errMsg = this.getKey() + ".up.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }         
    }

    #down() {
        try {
            let v = this.#_SPV;
            //console.log("state is down");
            //v.stateMachine.enter('appearNumber');
            v.numberGrid.moveToDown((moved)=>{
                v.stateMachine.enter('appearNumber');
            });
        } catch(e) {
            var errMsg = this.getKey() + ".down.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }         
    }

    #left() {
        try {
            let v = this.#_SPV;
            //console.log("state is left");
            v.numberGrid.moveToLeft((moved)=>{
                v.stateMachine.enter('appearNumber');
            });
        } catch(e) {
            var errMsg = this.getKey() + ".left.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }         
    }

    #right() {
        try {
            let v = this.#_SPV;
            //console.log("state is right");
            //v.stateMachine.enter('moving');
            v.numberGrid.moveToRight((moved)=>{
                v.stateMachine.enter('appearNumber');
            });
        } catch(e) {
            var errMsg = this.getKey() + ".right.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }         
    }

    #gameover() {
        try {
            
        } catch(e) {
            var errMsg = this.getKey() + ".gameover.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }         
    }

}