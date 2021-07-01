class SceneDelayEffect extends SceneMenuBase {
    // ctor
    constructor(fps, gameHost) {
        super(fps, gameHost);
    }

    onCreate() {
        //alert("create " + this.getKey());
    }

    getKey() {
        return SCENE_KEY_DELAYEFFECT;
    }   

    onStop() {
        try {
            console.log("onStop " + this.getKey());

            super.onStop();

            this._block.destroy();
            this._ball.destroy();

            this._ballTarget = undefined;

            this.unregisterDragEvent();
            
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
                this.load.image("ballImage", "assets/image/Baseball-icon-16x16.png");
                this.load.image("blockImage", "assets/image/South-Korea-Flag-icon.png");
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

            this._screenWidth = this._gameHost._config.scale.width;
            this._screenHeight = this._gameHost._config.scale.height;

            let xCenter = parseInt(this._screenWidth / 2);
            let yCenter = parseInt(this._screenHeight / 2);

            this._block = new BlockImage("BlockImage", this, xCenter, yCenter / 2);
            this._ball = new BallImage("BallImage", this, xCenter, this._screenHeight - 16, false);

            this._maxDistance = getDistance(0, 0, this._screenWidth, this._screenHeight);

            this.registerDragEvent();

        } catch(e) {
            var errMsg = this.getKey() + ".onLoadAssetsComplete.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    registerDragEvent() {
        try {
            this.unregisterDragEvent();
            this._ball.setDraggable();

            let selfIt = this;
            let dragBall = undefined;

            this.input.on('dragstart', function(pointer, gameObject) {
                dragBall = new BallImage("TmpBallImage", selfIt, selfIt._ball.getX(), selfIt._ball.getY(), true);
            });

            this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
                if (selfIt._ball.isThat(gameObject) == true) {
                    dragBall.setX(dragX).setY(dragY);
                }
            });

            this.input.on('dragend', function(pointer, gameObject) {
                dragBall.destroy();

                var ballX = selfIt._ball.getX();
                var ballY = selfIt._ball.getY();

                var coord = getPointByPointDistance(ballX, ballY, pointer.x, pointer.y, selfIt._maxDistance);
                var distance = getDistance(ballX, ballY, pointer.x, pointer.y);
                selfIt._ballTarget = {
                    x: parseInt(coord.x),
                    y: parseInt(coord.y),
                    distance: parseInt(distance / 5.0)
                };

                //console.log("_ballTarget x: " + selfIt._ballTarget.x + ", y: " +selfIt._ballTarget.y + ", dis: " + selfIt._ballTarget.distance);
                //console.log("move target x: " + selfIt._ballTarget.x + ", y: " + selfIt._ballTarget.y);
            });

            // collider
            let colliderCoord = { x: 0, y: 0};
            let colliderColor = {
                colors: ['#F0F0F0', '#454545'],
                idx: 0,
                getColor: function() {
                    this.idx++;
                    if (this.idx > 1) { this.idx = 0; }
                    return this.colors[this.idx];
                }
            };
            this._collider = this.physics.add.collider(this._ball._image, this._block._image, function(ball, block){
                //console.log("ball x: " + selfIt._ball.getX() + ", y: " + selfIt._ball.getY());
                //selfIt.flashEffect('#F0F0F0', '#454545', 3, 100, FlashEffect_LaunchOption.RIGHTNOW);

                if (colliderCoord.x != ball.x || colliderCoord.y != ball.y)
                {
                    selfIt._pause = true;
                    setTimeout(()=>{ selfIt._pause = false; }, 500);
                    colliderCoord.x = ball.x;
                    colliderCoord.y = ball.y;
                    selfIt.setBackgroundColor(colliderColor.getColor());
                }

                selfIt._colliding = true;
            });

        } catch(e) {
            var errMsg = this.getKey() + ".registerDragEvent.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    unregisterDragEvent() {
        try {
            this.input.off('dragstart');
            this.input.off('drag');
            this.input.off('dragend');        
        } catch (e) {
            var errMsg = this.getKey() + ".unregisterDragEvent.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onUpdate() {
        if (this._ballTarget != undefined) {
            if (this._pause != true) {
                var x = this._ball.getX();
                var y = this._ball.getY();

                var res = MoveTowards(x, y, this._ballTarget.x, this._ballTarget.y, this._ballTarget.distance);
                this._ball.moveTo(res[0], res[1]);
                if (res[2] == true) {
                    this._ballTarget = undefined;
                    this._ball.resetPosition();
                }
                //console.log(stringFormat("ballX: {0}, ballY: {1}, resX: {2}, resY: {3}, result: {4}", x, y, res[0], res[1], res[2]));
            }

            if (this._colliding == true) {
                if (this.physics.collide(this._ball._image, this._block._image) == false) {
                    console.log("--- collision no");
                    this._colliding = false;
                    this.resetBackgroundColor();
                }
            }
        }
    }
}