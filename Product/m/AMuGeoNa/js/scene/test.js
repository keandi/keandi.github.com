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
                compensation: 25,
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

        _resourcePool.setScene(this).addArgs('test_sprite');
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

    // game object pool 이용시 생성 과정을 여기에서 구현
    onRegisterObjectCreateCallback() {
        try {
            super.onRegisterObjectCreateCallback();

            let selfIt = this;
            let v = this.#_SPV;

            const contentRc = this.ContentRc;

            // json data
            v.frameInfo = {
                frames: _resourcePool.getJsonFrameMap('test_sprite'),
            };

            // sprite
            {
                const wallThickness = 80;
                this.registerGameObjectCreateCallback('bullet_attacker', ()=>{
                    return new TestBullet('bullet_attacker', selfIt, v.frameInfo, 'attacker', ['BULLET_ATTACKER']);
                });

                this.registerGameObjectCreateCallback('bullet_defender', ()=>{
                    return new TestBullet('bullet_defender', selfIt, v.frameInfo, 'defender', ['BULLET_DEFENDER']);
                });

                this.registerGameObjectCreateCallback('collision_defender', ()=>{
                    return new CollisionObject('collision_defender', selfIt, 'defender', false, 100, 100);
                });

                this.registerGameObjectCreateCallback('wall_lr', ()=>{
                    return new CollisionObject('wall_lr', selfIt, 'defender', false, wallThickness, contentRc.Height);
                });

                this.registerGameObjectCreateCallback('wall_tb', ()=>{
                    return new CollisionObject('wall_tb', selfIt, 'defender', false, contentRc.Width, wallThickness);
                });
            }

            // create
            {
                v.spriteObjects = {
                    attacker: this.getGameObject('bullet_attacker'),
                    defender: this.getGameObject('bullet_defender'),
                    collision_defender: this.getGameObject('collision_defender'),
                    collision_defender2: this.getGameObject('collision_defender'),
                    collision_defender3: this.getGameObject('collision_defender'),
                    wall_left: this.getGameObject('wall_lr'),
                    wall_top: this.getGameObject('wall_tb'),
                    wall_right: this.getGameObject('wall_lr'),
                    wall_bottom: this.getGameObject('wall_tb'),
                };

                const brickPos = {x: 100, y: 100 };

                //v.spriteObjects.defender.setPosition(100, 100);
                v.spriteObjects.collision_defender.setPosition(brickPos.x, brickPos.y);

                const bulletPos = getPointByAngleDistance(brickPos.x, brickPos.y, 45, 200);
                v.spriteObjects.attacker.setPosition(bulletPos.x, bulletPos.y);

                v.spriteObjects.collision_defender2.setPosition(brickPos.x + 50, bulletPos.y + 185);
                v.spriteObjects.collision_defender3.setPosition(brickPos.x + 160, bulletPos.y + 235);

                v.spriteObjects.wall_left.setPosition(contentRc.Left, contentRc.CenterY);
                v.spriteObjects.wall_right.setPosition(contentRc.Right, contentRc.CenterY);
                v.spriteObjects.wall_top.setPosition(contentRc.CenterX, contentRc.Top);
                v.spriteObjects.wall_bottom.setPosition(contentRc.CenterX, contentRc.Bottom);

                //console.log("top x: " + v.spriteObjects.wall_top.X);
            }

            // key
            {
                var sprite = v.spriteObjects.attacker;
                //
                const register = function(key, state) {
                    selfIt.addKeyboardEvent(key, 'down', ()=>{
                        if (state === 'up') {
                            sprite.forcedMove(Direction.UP);
                        } else if (state === 'left') {
                            sprite.forcedMove(Direction.LEFT);                            
                        } else if (state === 'down') {
                            sprite.forcedMove(Direction.DOWN);                            
                        } else if (state === 'right') {
                            sprite.forcedMove(Direction.RIGHT);                            
                        }
                    });
                };

                // 
                const registerRunKey = function(key) {
                    selfIt.addKeyboardEvent(key, 'down', ()=>{
                        //v.spriteObjects.attacker.run(225, 3.5, 2000);
                        v.spriteObjects.attacker.run(225, 20, 2000);
                    });
                };

                //register('W', 'up');
                //register('A', 'left');
                //register('S', 'down');
                //register('D', 'right');

                registerRunKey('Q');
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
                this.printTitle(_gameOption.selectText('Test', 'Test'));
            }            

            let selfIt = this;
            let v = this.#_SPV;

            /*
            this.addPointerEvent('down', (pointer)=>{
                var distance = getDistance(v.spriteObjects.attacker.X, v.spriteObjects.attacker.Y, pointer.x, pointer.y);
                var degree = getDegree(v.spriteObjects.attacker.X, v.spriteObjects.attacker.Y, pointer.x, pointer.y);
                console.log(stringFormat("attacker[{0}, {1}], pointer[{2}, {3}]], degree[{4}], distance[{5}]"
                    , v.spriteObjects.attacker.X, v.spriteObjects.attacker.Y
                    , pointer.x, pointer.y
                    , degree, distance
                    )
                );

                var target = getPointByAngleDistance(v.spriteObjects.attacker.X, v.spriteObjects.attacker.Y, degree, distance);
                console.log( stringFormat("target [x: {0}, y: {1}], degree: {2}"
                    , target.x, target.y
                    , getDegree(v.spriteObjects.attacker.X, v.spriteObjects.attacker.Y, target.x, target.y)
                ) );
            });
            */

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
            collisionGroup.addGroups('attacker', 'defender')
                .setTargetGroups('attacker', 'defender');
        } catch(e) {
            var errMsg = this.getKey() + ".onCreateCollisionGroup.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // group collision event - attacker X body
    onCollisionAttackerXBody(attacker, body) {
        try {
            let v = this.#_SPV;
            const collisionRect = attacker.CollisionRect;
            if (v.debugG == undefined) {
                v.debugG = this.add.graphics();
                v.debugG.setDepth(900);
            } else {
                v.debugG.clear();
            }

            drawRect(v.debugG, 0xFF0000, collisionRect);
            console.log( stringFormat("collision [{0}] vs [{1}] >> {2}", attacker.Name, body.Name, collisionRect.toString()) );

            // 
            let compareX = compareType(Math.floor(attacker.X), Math.floor(body.X));
            let compareY = compareType(Math.floor(attacker.Y), Math.floor(body.Y));

            //
            const collisionWH = {w: Math.floor(collisionRect.Width), h: Math.floor(collisionRect.Height) };
            if (collisionWH.w > collisionWH.h) {
                attacker.updateDirection(ReversalType.HORIZONTALREVERSAL, compareX, compareY);
            } else if (collisionWH.w < collisionWH.h) {
                attacker.updateDirection(ReversalType.VERTICALREVERSAL, compareX, compareY);
            } else {
                attacker.updateDirection(ReversalType.REVERSAL, compareX, compareY);
            }
        } catch(e) {
            var errMsg = this.getKey() + ".onCollisionAttackerXBody.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        } 
    }

    // 게임 목표
    get Goal() {
        return 199999999;
    }
}