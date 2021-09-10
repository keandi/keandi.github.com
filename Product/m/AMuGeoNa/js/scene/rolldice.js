class SceneRollDice extends GameScene {
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
        return KEY_GAME_ROLLDICE;
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

        /* this.addSerialLoadAsset( 'brozone_canon',
        () => {
            this.load.atlas(
                'brozone_canon',
                'assets/image/brozone_canon.png',
                'assets/atlas/brozone_canon.json'
            );
        }, 2 ); */

        _resourcePool.setScene(this)
            .addArgs('dice_sprite', 'dice-1', 'dice-8', 'dice-18', 'dice-24');
    };    
    
    onCompleteSerialLoadAllAssets() {
        try {
            super.onCompleteSerialLoadAllAssets();

            //
            this.printTitle(_gameOption.selectText('주사위', 'Dice'));

            //
            let selfIt = this;

            //
            this.#createTopMenuControl();
            
        } catch(e) {
            var errMsg = this.getKey() + ".onCompleteSerialLoadAllAssets.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }


     // get msgbox x, y (상속하여 반환 필요)
     getMsgBoxXY() {
         const contentRc = this.ContentRc;
         return { x: contentRc.CenterX, y: contentRc.CenterY };
    }

    // 상단 메뉴 생성
    #createTopMenuControl() {
        try {
            let topMenuRc = this.TopMenuRc;

            let diceImg = this.addDestroyableObject( this.add.image(32, topMenuRc.CenterY, 'dice_sprite', 'DICE_6') ).setDepth(DEPTH_MENU_BUTTON);
            setPixelScaleXorY(diceImg, 32);
        } catch(e) {
            var errMsg = this.getKey() + ".createTopMenuControl.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // game object pool 이용시 생성 과정을 여기에서 구현
    onRegisterObjectCreateCallback() {
        try {
            super.onRegisterObjectCreateCallback();
        } catch(e) {
            var errMsg = this.getKey() + ".onRegisterObjectCreateCallback.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

     // game start
     onGameStart() {
        try {
            // help button
            {
                let kor = "- 주사위 - \r\n맞추면? +6G\r\n틀리면? -1G";
                let eng = "- Dice - \r\nif it fits? +6G\r\nwrong? -1G";
                this.createHelpButton(_gameOption.selectText(kor, eng), 32 + 16 + 5);
            }

            let selfIt = this;
            let v = this.#_SPV;

            // area predefine
            const contentRc = this.ContentRc;

            // area predefine - dice selector
            const selectDiceSize = parseInt(contentRc.Width / 8);
            const selectDiceRealSize = selectDiceSize - 8;
            const selectDiceX = parseInt(selectDiceSize + (selectDiceSize / 2));
            const selectDiceY = parseInt(contentRc.Bottom - (selectDiceSize / 2));

            // area predefine - button
            const buttonCenterX = contentRc.CenterX;
            const buttonHeight = 69; // 실제 버튼 이미지 높이
            const buttonBottom = parseInt(contentRc.Bottom - selectDiceSize) - 5;
            const buttonCenterY = parseInt( buttonBottom - (buttonHeight / 2) );

            // area predefine - dice
            const diceCenterX = buttonCenterX;
            const diceSize = parseInt(contentRc.Width / 5);
            const diceCenterY = buttonCenterY - buttonHeight - diceSize;

            // area predefine - dice cup
            const diceCupCenterX = diceCenterX;
            const diceCupSize = parseInt(contentRc.Height / 2);
            const diceCupBottomY = diceCenterY + diceSize + 5;

            // dice
            v.dice = new Dice("dice", this, diceCenterX, diceCenterY, diceCenterX, COORD_ROLLDICE_ROLL_TOP, diceSize, (diceNumber)=>{
                //console.log("end: " + diceNumber);

                v.diceCup.forcedMoveToBottom(); 

                let rd = Phaser.Math.Between(1, 4);
                if (rd === 1) { selfIt.playSound('dice-1'); }
                else if (rd === 2) { selfIt.playSound('dice-8'); }
                else if (rd === 3) { selfIt.playSound('dice-18'); }
                else if (rd === 4) { selfIt.playSound('dice-24'); }
                
                v.diceSelector.unselectAll();
                selfIt.getTimerPool().setTimeout(()=>{ 
                    v.diceSelector.visible = true
                } , 1500);
            });

            // cup
            v.diceCup = new DiceCup("dicecup", this, diceCupCenterX, diceCupBottomY, COORD_ROLLDICE_CUP_HIDEBOTTOM, diceCupSize);

            // roll button
            v.rollButton = new GOImageButton("rollbutton", this, buttonCenterX, buttonCenterY, 'dice_sprite', 'ROLL_UP', 
                'dice_sprite', 'ROLL_DOWN', 
                ()=>{
                    //console.log('roll click');
                    v.rollButton.visible = false;
                    v.diceSelector.unselectAll();
                    v.diceSelector.visible = false;
                    v.diceCup.moveToTop(()=>v.dice.roll( ()=>v.diceCup.moveToDown() ));
                }
            );
            v.rollButton.setDepth(DEPTH_ROLLDICE_BUTTON);

            // open button
            v.openButton = new GOImageButton("openbutton", this, buttonCenterX, buttonCenterY, 'dice_sprite', 'OPEN_UP', 
                'dice_sprite', 'OPEN_DOWN', 
                ()=>{
                    //console.log('open click=> ' + v.diceSelector.SelectedValue + ", dice: " + v.dice.Number);

                    v.openButton.visible = false;

                    v.diceCup.moveToTop(()=>{
                        selfIt.#coinCheck();
                        if (v.tryCount.decrease() <= 0) { 
                            v.diceSelector.unselectAll();
                            v.diceSelector.visible = false;
                            selfIt.#displayTryCount();
                            return; 
                        }
    
                        v.rollButton.visible = true;
                        selfIt.#displayTryCount();
                    });
                }
            );
            v.rollButton.setDepth(DEPTH_ROLLDICE_BUTTON);
            v.openButton.visible = false;

            // select dices
            v.diceSelector = new DiceSelector("diceselector", this, selectDiceX, selectDiceY, selectDiceRealSize, selectDiceSize, (number)=>{
                //console.log("selected: " + number);
                v.openButton.visible = true;
            });

            // 남은 횟수
            v.tryCountText = this.addDestroyableObject( addText(this, this.ContentRc.Right, this.ContentRc.Top + 5, "횟수를 계산 중...") ); 
            v.tryCountText.setOrigin(1.1, 0);
            v.tryCountText.setDepth(DEPTH_ROLLDICE_BUTTON);
            v.tryCount = new CountZero("rolldice_zerocount", COUNTLIMIT_ROLLDICE_TRY, ()=>{
                selfIt.gameFinished();
            });
            this.#displayTryCount();
        } catch(e) {
            var errMsg = this.getKey() + ".onGameStart.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // coin check
    #coinCheck() {
        try {
            let v = this.#_SPV;

            if (v.diceSelector.SelectedValue === v.dice.Number) {
                this.addGold(6);
            } else {
                this.useGold(1);
            }
        } catch(e) {
            var errMsg = this.getKey() + ".coinCheck.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // display try count
    #displayTryCount() {
        try {
            let v = this.#_SPV;

            v.tryCountText.setText( _gameOption.selectText("남은 횟수: ", "Remaining number: ") + v.tryCount.Count );
        } catch(e) {
            var errMsg = this.getKey() + ".displayTryCount.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 게임 강제종료 처리
    gameUserExit() {
        try {
            this.gameEnd(true);
        } catch(e) {
            var errMsg = this.getKey() + ".gameUserExit.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 게임 정상종료 처리
    gameFinished() {
        try {
            let gold = numberWithCommas(3);
            let kor = stringFormat("- 게임 완료 -\r\n보상: {0}G", gold);
            let eng = stringFormat("- Complete the game -\r\nReward: {0}G", gold);

            this.addGold(3);

            let selfIt = this;
            this.getTimerPool().setTimeout(()=>{
                selfIt.msgboxOk(_gameOption.selectText("완료", "Finish"), _gameOption.selectText(kor, eng), ()=>selfIt.gameEnd(false));
            }, 1500);
            
        } catch(e) {
            var errMsg = this.getKey() + ".onGameFinished.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
}