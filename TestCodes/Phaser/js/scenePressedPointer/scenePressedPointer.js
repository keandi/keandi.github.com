class ScenePressedPointer extends SceneMenuBase {

    #_PV = {};

    // ctor
    constructor(fps, gameHost) {
        super(fps, gameHost);
    }

    onCreate() {
        //alert("create " + this.getKey());
    }

    getKey() {
        return SCENE_KEY_PRESSEDPOINTER;
    }   

    onStop() {
        try {
            console.log("onStop " + this.getKey());

            super.onStop();

            if (this.#_PV.pressChkTmr != undefined) {
                clearInterval(this.#_PV.pressChkTmr);
                this.#_PV.pressChkTmr = undefined;
            }

            if (this.#_PV.ballGroup != undefined) {
                this.#_PV.ballGroup.destroy();
                this.#_PV.ballGroup = undefined;
            }

            if (this.#_PV.groupCollider != undefined) {
                this.#_PV.groupCollider.destroy();
                this.#_PV.groupCollider = undefined;
            }

            if (this.#_PV.balls != undefined) {
                this.#_PV.balls = [];
                this.#_PV.balls = undefined;
            }
            
        } catch(e) {
            var errMsg = this.getKey() + ".onStop.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
    
    onLoadAssets() {
        try {   
            if (this._assetLoadCompleted == true)
            {
                this.onLoadAssetsComplete();
            }
            else
            {
                this.load.image("pp_north_korea", "assets/image/North-Korea-Flag-icon.png");
                this.load.image("pp_south_korea", "assets/image/South-Korea-Flag-icon.png");
                this.load.image("pp_ball", "assets/image/Baseball-icon-16x16.png");
                this.load.start();
            }
        } catch(e) {
            var errMsg = this.getKey() + ".onLoadAssets.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
    
    onLoadingAssets(value) {
        try {
            console.log(this.getKey() + " loadinig... " + value);
        } catch(e) {
            var errMsg = this.getKey() + ".onLoadingAssets.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
    
    onLoadAssetsComplete() {
        try {
            console.log(this.getKey() + " asset load completed !!!");

            let selfIt = this;

            // register image
            var registerImage = function(x, y, key) {
                var img = selfIt.physics.add.image(x, y, key).setImmovable(true);
                img.body.setAllowGravity(false);
                img.body.debugShowBody = false;    
                img.setBounce(0.2);
                img.setCollideWorldBounds(true);

                return selfIt.addDestroyableObject(img);
            };

            // coordinate
            let screenCenterX = this.getSceneCenterX();
            let screenHeight = this.getSceneHeight();
            let meY = screenHeight - 64;
            let enemyY = 120;

            // me
            this.#_PV.me = registerImage(screenCenterX, meY, "pp_south_korea");

            // enemy
            this.#_PV.enemy = registerImage(screenCenterX, enemyY, "pp_north_korea");

            // ball group
            this.#_PV.ballGroup = this.physics.add.group();
            this.#_PV.ballGroup.runChildUpdate = false;

            // enemy tint timer
            let tintTimer = undefined;

            // group collider
            this.#_PV.groupCollider = this.physics.add.collider(this.#_PV.enemy, this.#_PV.ballGroup, function(enemy, collidedBall){

                if (tintTimer != undefined) {
                    clearTimeout(tintTimer);
                    tintTimer = undefined;
                }

                enemy.setTint(0xcc2424);
                tintTimer = setTimeout(
                    ()=>{ 
                        clearTimeout(tintTimer);
                        tintTimer = undefined;
                        enemy.setTint(0xffffff);
                    }
                    , 200
                );

                //
                for (var i = 0; i < selfIt.#_PV.balls.length; i++) {
                    var ball = selfIt.#_PV.balls[i];
                    if (collidedBall == ball.ball) {
                        clearInterval(ball.timer);
                        ball.timer = undefined;
                        ball.ball.visible = false;
                        ball.enable = true;
                        ball.ball.x = ball.orgX;
                        ball.ball.y = ball.orgY;
                        return;
                    }
                }

                alert("unknown ball");
            });

            //
            this.#_PV.pressChkTmr = setInterval(() => this.onPressCheck(), 150);

        } catch(e) {
            var errMsg = this.getKey() + ".onLoadAssetsComplete.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 터치 체크
    onPressCheck() {
        try {
            if (this._assetLoadCompleted != true) { return; }

            let selfIt = this;
            let pointer = this.input.activePointer;
            if (pointer.isDown) {
                //console.log("is down");

                //if (this.#_PV.balls != undefined) { return; }

                let ball = this.getBall();
                let ballMove = function() {
                    var isFinished = objectMoveTowards(ball.ball, selfIt.#_PV.enemy.x, selfIt.#_PV.enemy.y, 15);
                    if (isFinished) {
                        clearInterval(ball.timer);
                    }
                    //console.log( stringFormat("ball[{0}] x: {1}, y: {2}", ball.ball.index, ball.ball.x, ball.ball.y) );
                }
                ball.timer = setInterval(()=>ballMove(), 25);

            } else {
                //console.log("is up");
            } 

        } catch(e) {
            var errMsg = this.getKey() + ".onPressCheck.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 볼 가져오기
    getBall() {
        try {
            // this
            let selfIt = this;

            // new ball
            let makeBall = function(ballArray) {
                var x = selfIt.#_PV.me.x;
                var y = selfIt.#_PV.me.y - (selfIt.#_PV.me.height / 2);
                var img = selfIt.physics.add.image(x, y, "pp_ball").setImmovable(true);
                img.body.setAllowGravity(false);
                img.body.debugShowBody = false;    
                img.setBounce(0.2);
                img.setCollideWorldBounds(true);
                img.visible = false;

                selfIt.#_PV.ballGroup.add(img);

                selfIt.addDestroyableObject(img);
                img.index = ballArray.length;
                var ball = {
                    ball: img,
                    enable: true,
                    timer: undefined,
                    orgX: x,
                    orgY: y
                };
                ballArray.push(ball);

                return ball;
            }

            // ball reset
            let resetBall = function(ball) {
                ball.ball.x = ball.orgX;
                ball.ball.y = ball.orgY;
                ball.enable = false;
                ball.ball.visible = true;
            }

            // undefined
            if (this.#_PV.balls == undefined) {
                this.#_PV.balls = new Array();
                var ball = makeBall( this.#_PV.balls );
                resetBall(ball);
                return ball;
            }

            // find
            for (var i = 0; i < this.#_PV.balls.length; i++) {
                var ball = this.#_PV.balls[i];
                if (ball.enable == true) { 
                    resetBall(ball);
                    return ball; 
                }
            }

            // new
            var ball = makeBall( this.#_PV.balls );
            resetBall(ball);
            return ball;

        } catch(e) {
            var errMsg = this.getKey() + ".getBall.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
    
}
