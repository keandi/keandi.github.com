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
            .addArgs('dice_sprite', 'exit_button');
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
}