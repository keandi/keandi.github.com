class SceneTest extends GameScene {
    #_SPV = {};

    // ctor
    constructor(fps, gameHost) {
        try {
            super(fps, gameHost);

            let v = this.#_SPV;
            
            _gameData.EntryGameLevelInfo = {
                level: 1,
                gamekind: GameKind.TEST,
                gamelevel: 1,
                needgold: 0,
                limitgold: 0,
                compensation: 0,
                enable: true,
                arg: {texture: 'TEST', sceneKey: 'test'},
            };

        } catch (e) {
            var errMsg = this.getKey() + ".ctor.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // secene key 반환
    getKey() {
        return KEY_SCENE_TEST;
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
 

        } catch(e) {
            var errMsg = this.getKey() + ".onStop.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onSerialLoadAssets() {
        super.onSerialLoadAssets();

        //_resourcePool.setScene(this).addArgs('numbers_sprite', 'explosion_sprite_01', 'explosion_low');
    };    

    // game object pool 이용시 생성 과정을 여기에서 구현
    onRegisterObjectCreateCallback() {
        try {
            super.onRegisterObjectCreateCallback();

            let selfIt = this;
            let v = this.#_SPV;

            const contentRc = this.ContentRc;

        } catch(e) {
            var errMsg = this.getKey() + ".onRegisterObjectCreateCallback.catched: " + e;
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
            var errMsg = this.getKey() + ".removeObject.catched: " + e;
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
                this.printTitle(_gameOption.selectText('Test', 'Test'));
            }            

            let selfIt = this;
            let v = this.#_SPV;

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
}