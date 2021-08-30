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
            .addArgs('dice_sprite');
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

    // exit 발생 시 exit 진행 및 후처리를 결정한다. 
    onExitTry(cb) {
        this.msgboxYesNo("h", 'really?', ()=>cb());
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

            let v = this.#_SPV;

            // area predefine
            const contentRc = this.ContentRc;
            const selectDiceSize = parseInt(contentRc.Width / 8);
            const selectDiceRealSize = selectDiceSize - 8;
            const selectDiceX = parseInt(selectDiceSize + (selectDiceSize / 2));
            const selectDiceY = parseInt(contentRc.Bottom - (selectDiceSize / 2));

            // dice

            // cup

            // roll button

            // open button

            // select dices
            v.diceSelector = new DiceSelector("diceselector", this, selectDiceX, selectDiceY, selectDiceRealSize, selectDiceSize, (number)=>{
                console.log("selected: " + number);
                if (number === 1) {
                    v.diceSelector.unselectAll();
                }
            });
        } catch(e) {
            var errMsg = this.getKey() + ".onGameStart.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
}