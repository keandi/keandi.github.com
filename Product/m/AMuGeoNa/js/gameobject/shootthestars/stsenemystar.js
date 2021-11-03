class STSEnemyStar extends STSBaseEnemy {
    #_PV = {};

    // ctor
    constructor(name, scene, frameData, gameRect, callbacks) {
        super(name, scene, frameData, gameRect, callbacks);

        try {
            let v = this.#_PV;
            
            v.scene = scene;
            v.frameData = frameData;
            v.velocity = {
                patrol: 0,
                attack: 0
            };
            
            //
            super.initialize(); // 구현의 가장 하층에서 호출되어야 된다.

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
        return ['ENEMY_STAR_0000', 'ENEMY_STAR_0001'];
    }

    // get sprite
    getSprite() {
        try {
            let v = this.#_PV;

            if (v.sprite == undefined) {
                v.sprite = v.scene.add.sprite(0, 0, 'shootthestars_sprite', 'ENEMY_STAR_0000');
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
            const fps = 500;//1000 / 7;
 
             animatorManager.add('patrol', {
                     asset: 'shootthestars_sprite',
                     textures: ['ENEMY_STAR_0000','ENEMY_STAR_0001'],
                     duration: fps,
                     repeat: -1,
                     frameCallback: (idx, name)=>selfIt.onFrameChanged(idx, name),
                     endCallback: ()=>selfIt.onAnimationEnd(),
                 })
                 .add('attack', {
                    asset: 'shootthestars_sprite',
                    textures: ['ENEMY_STAR_0000','ENEMY_STAR_0001'],
                    duration: fps,
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
            let hp = this.HPInfo;
            
            v.sprite.setTint(this.getTint(hp.Max, hp.Current));
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
            let getMaxHP = function(level) {
                let levelGroup = (level < 10) ? 1 : ((level - (level % 10)) / 10) + 1;
                return levelGroup * 20;
            };

            return getMaxHP(_gameData.EntryGameLevelInfo.gamelevel);

        } catch (e) {
             var errMsg = this.getExpMsg("MaxHP", e);
             console.log(errMsg);
             alert(errMsg);
        }

        return 1;
    }

    //Star Tint
    getTint(maxHP, curHP) {
        try {
            const tintSize = COLOR_STAR_TINTS.length;
            const step = Math.floor(maxHP / tintSize);
            let idx = Math.ceil(curHP / step);
            if (idx > 0) { idx--; }
            if (idx >= tintSize) { idx = tintSize - 1; }
            return COLOR_STAR_TINTS[idx];
        } catch (e) {
             var errMsg = this.getExpMsg("getTint", e);
             console.log(errMsg);
             alert(errMsg);
        }

        return 0xffffff;
    };

 
    // reset
    reset() {
        try {
            super.reset();

            let selfIt = this;
            let v = this.#_PV;
            if (v.moveTimer == undefined) {
                v.moveTimer = new TimerOnPool('timeronpool_' + this.Name, v.scene.getTimerPool());
            }

            v.moveTarget = undefined; // 이동 좌표를 새롭게

            v.moveTimer.startInterval(()=>{
                if (selfIt.move() === false) {
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

    // patrol direction
    get #IsPatrolToLeft() { //true: left, else: right
        try {
            let v = this.#_PV;

            if (v.isPatrolToLeft === undefined) {
                v.isPatrolToLeft = true;
            }

            return v.isPatrolToLeft;
        } catch (e) {
            var errMsg = this.getExpMsg("PatrolDirection", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get new target x, y
    #getNewTargetXY() {
        try {
            const velocity = this.#MoveVelocity;
            const min = velocity + 10;
            const max = min + 7;

            const state = this.getStateMachine().Current;

            if (state === 'patrol') {
                let v = this.#_PV;
                return {
                    x: v.sprite.x + ( (this.#IsPatrolToLeft === true) ? Phaser.Math.Between(-max, -min) : Phaser.Math.Between(min, max) ),
                    y: v.sprite.y + Phaser.Math.Between(-2, 20)
                };
            } else if (state === 'attack') {
                console.log("need logic!");
            }
        } catch (e) {
            var errMsg = this.getExpMsg("getNewTargetXY", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // move
    move() {
        try {
            if (this.visible === false) { return false; } // 죽었음
            let v = this.#_PV;
            const gameRect = this.GameRect;

            if (v.moveTarget == undefined) {
                const newXY = this.#getNewTargetXY();
                v.moveTarget = new Point(newXY.x, newXY.y);
            }

            let res = MoveTowards2(v.sprite.x, v.sprite.y, v.moveTarget.X, v.moveTarget.Y, this.#MoveVelocity);
            //console.log('velocity: ' + this.#MoveVelocity);
            if (res.isFinished === true) {
                if (v.sprite.x < gameRect.Left) {
                    v.isPatrolToLeft = false;
                } else if (v.sprite.x > gameRect.Right) {
                    v.isPatrolToLeft = true;
                }

                const newXY = this.#getNewTargetXY();
                v.moveTarget.set(newXY.x, newXY.y);
            } else {
                this.setPosition(res.x, res.y);
            }

            if (v.sprite.y > gameRect.Bottom) {
                return false; // 화면 밖 사라짐
            }

        } catch (e) {
            var errMsg = this.getExpMsg("move", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return true;
    }

    // get move velocity
    get #MoveVelocity() {
        try {
            let state = this.getStateMachine().Current;
            let v = this.#_PV;

            let patrolSpeed = function(gamelevel, state) {
                return Math.floor((gamelevel / 8) + Phaser.Math.Between(2, 4));
            };

            //
            if (v.velocity.patrol === 0) {
                v.velocity.patrol = patrolSpeed(_gameData.EntryGameLevelInfo.gamelevel, 'patrol');
                //v.velocity.patrol = 15;
                v.velocity.attack = v.velocity.patrol * 2;
            }

            //
            return (state === 'attack') ? v.velocity.attack : v.velocity.patrol;

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