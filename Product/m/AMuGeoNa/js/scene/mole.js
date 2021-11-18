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
            v.frameInfo = {
                mole: _resourcePool.getJsonFrameMap('mole_sprite'),
                branca: _resourcePool.getJsonFrameMap('text_branca'),
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

            //
            /* let ttt = new BrancaChar('test_branca', this);
            let timer = new TimerOnPool('branca_timer', this.getTimerPool());
            let number = 0;
            let setTTT = function(c) {
                ttt.setPosition(100, 100).setChar(number + '');
                number++;
                if (number > 9) { number = 0; }
            }
            setTTT(number);

            timer.startInterval(()=>{
                setTTT(number);
            }, 1000); */

            // 대상 색상 결정
            v.targetColor = Phaser.Math.Between(INDEX_MOLE_COLOR_BLUE, INDEX_MOLE_COLOR_YELLOW);

            //
            v.pointManager = new MolePointManager('mole_point_manager', this, v.frameInfo.branca, v.targetColor);

            this.addPointerEvent('down', (pointer) => {
                v.pointManager.increaseCurrentPoint();
                v.pointManager.increaseHitPoint();
            });

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

        } catch(e) {
            var errMsg = this.getKey() + ".onCreateCollisionGroup.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // group collision event - attacker X body
    onCollisionAttackerXBody(attacker, body) {
        try {
            //console.log(stringFormat("[충돌] attacker: {0}/{1}, body: {2}/{3}", attacker.GroupTag, attacker.Name, body.GroupTag, body.Name));

           
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