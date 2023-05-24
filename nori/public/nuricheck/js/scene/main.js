class SceneMain extends GameScene {
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
        return KEY_MAIN;
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
            destroyObjects( v.goalProgress );
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
            .addArgs('sprite', 'NURI', 'MUNI', 'GGORI', 'DARI', 'MAKNAE', 'GGACHILLI', 'SOSIMI', 'JEUMNAMI', 'EEBBUEI', 'NUNSSEUBI', 'ZZOGGUMI' );
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
                frames: _resourcePool.getJsonFrameMap('sprite'),
            };

        } catch(e) {
            var errMsg = this.getKey() + ".onRegisterObjectCreateCallback.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

     // game start
     onGameStart() {
        try {
            let selfIt = this;
            let v = this.#_SPV;
            v.buttons = [];

            const contentRc = this.ContentRc;

            // 버튼 사이즈 구하기
            let btnSize = 0;
            {
                const frames = v.frameInfo.frames;
                const refresh_up = frames.get('REFRESH_UP');
                const f = refresh_up.frame;

                const btnMinX = contentRc.Width / 3;
                const btnMinY = contentRc.Height / 5;

                btnSize = Math.min(btnMinX, btnMinY);
            }

            // background
            this.setBackgroundColor( COLOR_BACKGROUND_PHASER );

            // create image button
            const makeButton = function(name, x, y, sizeX, sizeY, cb) {
                let button = selfIt.addDestroyableObject( new GOImageButton("sprite", selfIt, x, y, 
                    'sprite', name + '_UP', 'sprite', name + '_DOWN', cb)
                );
                button.setScaleXY(sizeX, sizeY);
                return button;
            };

            // create switch button
            const makeSwitch = function(name, x, y, sizeX, sizeY, cbOn, cbOff) {
                let button = selfIt.addDestroyableObject( new GOImageSwitch("sprite_" + name, selfIt, x, y, 
                    'sprite', name + '_OFF', cbOff, 'sprite', name + '_ON', cbOn)
                );
                button.setScaleXY(sizeX, sizeY);
                v.buttons.push(button);
                return button;
            };

            // 
            let posX = (btnSize / 2) + 1;
            let posY = btnSize + 1 + (btnSize / 2);
            const limitX = btnSize * 3;
            const movePos = function() {
                posX += btnSize;
                if (posX >= limitX) {
                    posX = (btnSize / 2) + 1;
                    posY += btnSize;
                }
            };
            const makeNurisSwitch = function(who, isNoMovePos) {
                if (isNoMovePos !== true) { movePos(); }
                makeSwitch(who.name, posX, posY, btnSize, btnSize, ()=>{
                    selfIt.playSound(who.name);
                    //alert(who.name);
                    selfIt.checkNuris();
                });
            };

            // NURI
            makeNurisSwitch(Nuris.NURI, true);

            // refresh button
            movePos();
            makeButton('REFRESH', posX, posY, btnSize, btnSize, ()=>{
                window.location.reload();
            });

            //
            makeNurisSwitch(Nuris.ZZOGGUMI);
            makeNurisSwitch(Nuris.MUNI);
            makeNurisSwitch(Nuris.EEBBEUI);
            makeNurisSwitch(Nuris.JEOMNAMI);
            makeNurisSwitch(Nuris.GGORI);
            makeNurisSwitch(Nuris.NUNSSEUBI);
            makeNurisSwitch(Nuris.SOSIMI);
            makeNurisSwitch(Nuris.DARI);
            makeNurisSwitch(Nuris.MAKNAE);
            makeNurisSwitch(Nuris.GGACHILLI);

        } catch(e) {
            var errMsg = this.getKey() + ".onGameStart.catched: " + e;
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

    // check
    checkNuris() {
        try {
            let v = this.#_SPV;
            for (var i = 0; i < v.buttons.length; i++) {
                if (v.buttons[i].IsOn !== true) { return; }
            }

            alert('All present.');
        } catch(e) {
            var errMsg = this.getKey() + ".checkNuris.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        } 
    }
}