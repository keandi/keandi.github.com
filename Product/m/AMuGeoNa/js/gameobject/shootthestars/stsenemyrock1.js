class STSEnemyRock1 extends STSBaseEnemy {
    #_PV = {};

    // ctor
    constructor(name, scene, frameData, gameRect, callbacks) {
        super(name, scene, frameData, gameRect, callbacks);

        try {
            let v = this.#_PV;
            
            v.scene = scene;
            v.frameData = frameData;
            
            //
            super.initialize(); // 구현의 가장 하층에서 호출되어야 된다.

            v.velocity = this.#MoveVelocity;

            //
            this.reset();
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        super.destroy();

        let v = this.#_PV;
        destroyObjects( v.moveTimer );
        v.moveTimer = undefined;
    }

    // get all framenames
    get AllFrameNames() {
        return ['ROCK_0001', 'ROCK_0002', 'ROCK_0003', 'ROCK_0004', 'ROCK_0005', 'ROCK_0006', 'ROCK_0007', 'ROCK_0008', 'ROCK_0009', 'ROCK_0010', 'ROCK_0011'];
    }

    // get sprite
    getSprite() {
        try {
            let v = this.#_PV;

            if (v.sprite == undefined) {
                v.sprite = v.scene.add.sprite(0, 0, 'rock_1_sprite', 'ROCK_0001');
            }

            return v.sprite;
        } catch (e) {
            var errMsg = this.getExpMsg("getSprite", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // animator 등록
    onRegisterAnimatorManager(animatorManager) {
        try {
            let v = this.#_PV;
            let selfIt = this;
            const duration = fps(24);
 
             animatorManager.add('attack', {
                     asset: 'rock_1_sprite',
                     textures: ['ROCK_0001', 'ROCK_0002', 'ROCK_0003', 'ROCK_0004', 'ROCK_0005', 'ROCK_0006', 'ROCK_0007', 'ROCK_0008', 'ROCK_0009', 'ROCK_0010', 'ROCK_0011'],
                     duration: duration,
                     repeat: -1,
                     frameCallback: (idx, name)=>selfIt.onFrameChanged(idx, name),
                     endCallback: ()=>selfIt.onAnimationEnd(),
                 });
        } catch (e) {
             var errMsg = this.getExpMsg("onRegisterAnimatorManager", e);
             console.log(errMsg);
             alert(errMsg);
        }
     }

    // frame changed event
    onFrameChanged(frameIndex, frameName) {
        try {
            let v = this.#_PV;
            this.ActiveFrameName = frameName;
        } catch (e) {
            var errMsg = this.getExpMsg("onFrameChanged", e);
            console.log(errMsg);
            alert(errMsg);
       }
    }

    // HP max
    get MaxHP() {
        try {
            
            return 1;
            /*
            let getMaxHP = function(level) {
                let levelGroup = (level < 10) ? 1 : ((level - (level % 10)) / 10) + 1;
                return levelGroup * 20;
            };

            return getMaxHP(_gameData.EntryGameLevelInfo.gamelevel);
            */

        } catch (e) {
             var errMsg = this.getExpMsg("MaxHP", e);
             console.log(errMsg);
             alert(errMsg);
        }

        return 1;
    }

 
    // reset
    reset() {
        try {
            super.reset();

            if (this.getStateMachine().enter('attack') === false) { throw 'attack 진입 불가'; }

            let selfIt = this;
            let v = this.#_PV;
            v.attackTargetXY = this.#NewTargetXY;

            if (v.moveTimer == undefined) {
                v.moveTimer = new TimerOnPool('timeronpool_' + this.Name, v.scene.getTimerPool());
            }

            v.moveTimer.startInterval(()=>{
                if (selfIt.#move() === false) {
                    v.moveTimer.stop();
                    this.getOut();
                }
            }, fps(60));

        } catch (e) {
            var errMsg = this.getExpMsg("reset", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // move
    #move() {
        try {
            if (this.visible === false) { return false; } // 죽었음
            let v = this.#_PV;

            let res = MoveTowards2(v.sprite.x, v.sprite.y, v.attackTargetXY.x, v.attackTargetXY.y, v.velocity);
            //console.log('velocity: ' + this.#MoveVelocity);

            this.setPosition(res.x, res.y);

            return !res.isFinished;

        } catch (e) {
            var errMsg = this.getExpMsg("#move", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return true;
    }

    // 
    get #MoveVelocity() {
        try {
            const level = _gameData.EntryGameLevelInfo.gamelevel;
            return Math.floor( Phaser.Math.Between(4, 6) + (level / 8) );
        } catch (e) {
            var errMsg = this.getExpMsg("MoveVelocity", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set position event
    onSetPosition(x, y) {
        try {
            this.#_PV.sprite.x = x;
            this.#_PV.sprite.y = y;
        } catch (e) {
            var errMsg = this.getExpMsg("onSetPosition", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get move target
    get #NewTargetXY() {
        try {
            let v = this.#_PV;
            const gameRect = this.GameRect;
            const centerX = gameRect.CenterX;
            let xy = {};

            let getXY = function() {
                return {
                    x: (v.sprite.x < centerX) ? Phaser.Math.Between(centerX, gameRect.Right)
                        : Phaser.Math.Between(gameRect.Left, centerX),
                    y: gameRect.Bottom + 5
                };
            };

            for (var i = 0; i < 20; i++) {
                xy = getXY();
                if (between(xy.x, v.sprite.x - 80, v.sprite.x + 80) === false) {
                    return xy;
                }
                console.log("new target retry !!! " + i);
            }

            // 너무 많이 실패해서 강제 설정
            xy.x = (v.sprite.x < centerX) ? gameRect.Right : gameRect.Left;
            return xy;
        } catch (e) {
            var errMsg = this.getExpMsg("NewTarget", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // recompute collision rect
    /*recomputeSpriteRect() {
        try {
            let v = this.#_PV;
            if (v.spriteRect == undefined) {
                v.spriteRect = new Rect();
            }

            v.spriteRect.Width = v.sprite.width;
            v.spriteRect.Height = v.sprite.height;
            v.spriteRect.X = v.sprite.x - (v.sprite.width / 2);
            v.spriteRect.Y = v.sprite.y - (v.sprite.height / 2);

        } catch (e) {
            var errMsg = this.getExpMsg("recomputeSpriteRect", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }*/
}