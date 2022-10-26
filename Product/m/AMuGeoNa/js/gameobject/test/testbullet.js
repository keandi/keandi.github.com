class TestBullet extends CollisionGameSprite {
    #_PV = {};

    // ctor
    constructor(name, scene, frameData, groupName, frames) {
        super(name, scene, frameData, true, groupName);

        try {
            let v = this.#_PV;
            let selfIt = this;
            
            v.scene = scene;
            v.frameData = frameData;
            v.frames = frames;

            this.Sprite = this.createSprite(scene)
            this.createNewCollisionData();

            this.ActiveFrameName = frames[0];
            
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // create sprite
    createSprite(scene) {
        try {
            let v = this.#_PV;
            return scene.add.sprite(0, 0, 'test_sprite', v.frames[0]);
        } catch (e) {
            var errMsg = this.getExpMsg("getSprite", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get all framenames
    get AllFrameNames() {
        return this.#_PV.frames;
    }

    // forced move
    forcedMove(direction) {
        const moveValue = 3;
        switch (direction) 
        {
            case Direction.LEFT:
                this.setPosition(this.X - moveValue, this.Y);
                break;

            case Direction.RIGHT:
                this.setPosition(this.X + moveValue, this.Y);
                break;

            case Direction.UP:
                this.setPosition(this.X, this.Y - moveValue);
                break;

            case Direction.DOWN:
                this.setPosition(this.X, this.Y + moveValue);
                break;
        }
    }

    // test moving run
    run(angle, velocity, maxDistance) {
        try {
            let v = this.#_PV;
            if (v.testInfo == undefined) {
                v.testInfo = {};
            }

            //
            if (v.testInfo.isTestMoving === true) {
                if (v.testInfo.testMovingTimer != undefined) {
                    v.testInfo.testMovingTimer.stop();
                }
                this.setPosition(v.testInfo.orgPos.x, v.testInfo.orgPos.y);
                v.testInfo = undefined;
                return;
            } else {
                v.testInfo.orgPos = {x: this.X, y: this.Y};
                v.testInfo.targetPos = getPointByAngleDistance(v.testInfo.orgPos.x, v.testInfo.orgPos.y, angle, maxDistance);
                v.testInfo.velocity = velocity;
                v.testInfo.maxDistance = maxDistance;
                v.testInfo.degree = getDegree(v.testInfo.orgPos.x, v.testInfo.orgPos.y, v.testInfo.targetPos.x, v.testInfo.targetPos.y);
                v.testInfo.isTestMoving = true;
            }

            //
            if (v.testInfo.testMovingTimer == undefined) {
                v.testInfo.testMovingTimer = new TimerOnPool('timeronpool_' + this.Name, v.scene.getTimerPool());
            }

            let selfIt = this;
            v.testInfo.testMovingTimer.startInterval(()=>{
                var moveRes = MoveTowards2(this.X, this.Y, v.testInfo.targetPos.x, v.testInfo.targetPos.y, v.testInfo.velocity);
                if (moveRes.isFinished != false) { return; }

                selfIt.setPosition(moveRes.x, moveRes.y);
            }, fps(60));

        } catch (e) {
            var errMsg = this.getExpMsg("run", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // update direction
    updateDirection(reversal, compareX, compareY) {
        try {
            switch (reversal.value)
            {
                case ReversalType.REVERSAL.value:
                case ReversalType.VERTICALREVERSAL.value:
                case ReversalType.HORIZONTALREVERSAL.value:
                    break;

                default:
                    console.log("unknown revarsal: " + reversal);
                    return;
            }

            // fix degree
            /*const fixDegree = (d) => {
                if (d < 0) { return d + 360; }
                while (d >= 360) {
                    d -= 360;
                }

                return d;
            };*/

            // new target x
            const reverseTargetX = ()=>{
                if (compareX.value === CompareType.LESS.value) {
                    ti.targetPos.x = this.X - (ti.targetPos.x - this.X);
                } else if (compareX.value === CompareType.BIGGER.value) { 
                    ti.targetPos.x = this.X + (this.X - ti.targetPos.x);
                } else {
                    console.log ('이동불가 - X Equal');
                    return false;
                }
                return true;
            };

            // new target x
            const reverseTargetY = ()=>{
                if (compareY.value === CompareType.LESS.value) {
                    ti.targetPos.y = this.Y - (ti.targetPos.y - this.Y);
                } else if (compareY.value === CompareType.BIGGER.value) { 
                    ti.targetPos.y = this.Y + (this.Y - ti.targetPos.y);
                } else {
                    console.log ('이동불가 - Y Equal');
                    return false;
                }
                return true;
            };

            //
            let ti = this.#_PV.testInfo;

            switch (reversal.value)
            {
                case ReversalType.REVERSAL.value:
                    {
                        const compareXnY = compareType(Math.floor(Math.abs(ti.targetPos.x - this.X)), Math.floor(Math.abs(ti.targetPos.y - this.Y)));

                        if (compareXnY.value === CompareType.LESS.value) {
                            if (reverseTargetX() === false) { return; }
                        } else if (compareXnY.value === CompareType.BIGGER.value) {
                            if (reverseTargetY() === false) { return; }
                        } else {
                            if (reverseTargetX() === false) { return; }
                            if (reverseTargetY() === false) { return; }
                        }
                    }
                    break;

                case ReversalType.VERTICALREVERSAL.value:
                    {
                        if (reverseTargetX() === false) { return; }
                    }
                    break;

                case ReversalType.HORIZONTALREVERSAL.value:
                    {
                        if (reverseTargetY() === false) { return; }
                    }
                    break;
            }

            ti.degree = getDegree(this.X, this.Y, ti.targetPos.x, ti.targetPos.y);
            ti.targetPos = getPointByAngleDistance(this.X, this.Y, ti.degree, ti.maxDistance);
        } catch (e) {
            var errMsg = this.getExpMsg("updateDirection", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}