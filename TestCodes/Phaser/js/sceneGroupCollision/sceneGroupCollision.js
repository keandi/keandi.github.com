class SceneGroupCollision extends SceneMenuBase {
    // ctor
    constructor(fps, gameHost) {
        super(fps, gameHost);
    }

    getKey() {
        return SCENE_KEY_GROUPCOLLISION;
    }

    onStop() {
        try {
            console.log("onStop " + this.getKey());

            super.onStop();

            this._images.forEach(element => {
                element.destroy();
            });
            this._group.destroy();

            this._groupCollider.destroy();
            
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
                this.load.image("groupCollision_BALL", "assets/image/Baseball-icon-16x16.png");
                this.load.image("groupCollision_BLOCK", "assets/image/South-Korea-Flag-icon.png");
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

            this._group = this.physics.add.group();
            this._group.runChildUpdate = false;
            this._images = [];

            let sceneWidth = this.getSceneWidth();
            let sceneHeight = this.getSceneHeight();
            let selfIt = this;

            // block
            let blockImage = new GCBlockImage("block_sample", this, 100, 100);
            let blockSize = {x: blockImage.getWidth(), y: blockImage.getHeight()};
            blockImage.destroy();

            let addBlock = function(x, y) {
                blockImage = new GCBlockImage("block", selfIt, currentX, currentY);
                selfIt._images.push(blockImage);
                selfIt._group.add(blockImage._image);
            }

            let beginY = 135;
            let currentX = blockSize.x / 2;
            let currentY = beginY;
            while (currentX < sceneWidth) {
                addBlock(currentX, currentY);
                currentX += blockSize.x;
            }
            currentX -= blockSize.x;
            currentY += blockSize.y;

            while (currentY < (sceneHeight - (blockSize.y * 2))) {
                addBlock(currentX, currentY);
                currentY += blockSize.y;
            }
            currentX -= blockSize.x;
            currentY -= blockSize.y;

            while (currentX > 0) {
                addBlock(currentX, currentY);
                currentX -= blockSize.x;
            }
            currentX += blockSize.x;
            currentY -= blockSize.y;

            while (currentY > beginY) {
                addBlock(currentX, currentY);
                currentY -= blockSize.y;
            }

            // ball
            this._ball = new GCBallImage("ball", this, this.getSceneCenterX(), this.getSceneCenterY());
            this._images.push(this._ball);

            // collider
            let inRect = function(x, y, rect) {
                return (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) ? true : false;
            }
            let hitTest = function(ballRect, blockRect) {
                let result = { left: false, top: false, right: false, bottom: false };

                /* if (inRect(ballRect.left, ballRect.top, blockRect) && inRect(ballRect.right, ballRect.top, blockRect)) {
                    result.top = true;
                }
                if (inRect(ballRect.right, ballRect.top, blockRect) && inRect(ballRect.right, ballRect.bottom, blockRect)) {
                    result.right = true;
                }
                if (inRect(ballRect.left, ballRect.bottom, blockRect) && inRect(ballRect.right, ballRect.bottom, blockRect)) {
                    result.bottom = true;
                }
                if (inRect(ballRect.left, ballRect.top, blockRect) && inRect(ballRect.left, ballRect.bottom, blockRect)) {
                    result.left = true;
                }

                return result; */

                let b_collision = blockRect.bottom - ballRect.top;
                let t_collision = ballRect.bottom - blockRect.top;
                let l_collision = ballRect.right - blockRect.left;
                let r_collision = blockRect.right - ballRect.left;

                if (t_collision < b_collision && t_collision < l_collision && t_collision < r_collision )
                {                           
                    result.top = true;
                }
                if (b_collision < t_collision && b_collision < l_collision && b_collision < r_collision)                        
                {
                    result.bottom = true;
                }
                if (l_collision < r_collision && l_collision < t_collision && l_collision < b_collision)
                {
                    result.left = true;
                }
                if (r_collision < l_collision && r_collision < t_collision && r_collision < b_collision )
                {
                    result.right = true;
                }

                return result;
            }

            this._groupCollider = this.physics.add.collider(this._ball._image, this._group, function(ball, block){

                /* console.log("[ball collision]")
                console.log(ball.body.touching);
                console.log(ball.body.blocked);

                console.log("[block collision]")
                console.log(block.body.touching);
                console.log(block.body.blocked); */

                let ballRect = {
                    left: ball.x - (ball.width / 2),
                    top: ball.y - (ball.height / 2),
                    right: ball.x + (ball.width / 2),
                    bottom: ball.y + (ball.height / 2)
                };
                let blockRect = {
                    left: block.x - (block.width / 2),
                    top: block.y - (block.height / 2),
                    right: block.x + (block.width / 2),
                    bottom: block.y + (block.height / 2)
                };
                let hitResult = hit_test(ballRect, blockRect);
                //console.log(hitResult);

                if (hitResult.top == true) {
                    selfIt._moveDirection.bottom = false;    
                } else if (hitResult.bottom == true) {
                    selfIt._moveDirection.bottom = true;
                }
                if (hitResult.left == true) {
                    selfIt._moveDirection.right = false;    
                } else if (hitResult.right == true) {
                    selfIt._moveDirection.right = true;
                }

                // direction speed change
                selfIt._moveSpeed.x = Phaser.Math.Between(4, 10);
                selfIt._moveSpeed.y = Phaser.Math.Between(4, 10);
            });

            this._moveSpeed = {x: 5, y: 5};

            this._moveDirection = {
                bottom: true,
                right: true
            };
            
        } catch(e) {
            var errMsg = this.getKey() + ".onLoadAssetsComplete.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }


    onUpdate() {
        if (this._moveDirection == undefined) { return; }

        this._ball.offsetX( (this._moveDirection.right == true) ? this._moveSpeed.x : -this._moveSpeed.x );
        this._ball.offsetY( (this._moveDirection.bottom == true) ? this._moveSpeed.y : -this._moveSpeed.y );

        //this._ball.printXY();
    }
}