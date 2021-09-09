class Animator extends DestroyableObject {
    #_PV = {}

    // ctor
    constructor(name, scene, sprite, config) {
        try {
            super(name, scene);

            //
            let v = this.#_PV;

            v.sprite = sprite; // 외부 sprite
            v.config = config; /* {asset, textures[], duration, repeat, frameCallback, endCallback} */
            v.scene = scene;

            //
            this.#create();
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
    destroy() {
        try {
            super.destroy();
            this.reset(); //gameobject  재사용시 나머지 정보를 그대로 사용하기 위해 reset만 실행
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // create
    #create() {
        try {
            //
            let v = this.#_PV;
            let c = v.config;

            //
            if (c.prefix != undefined && c.prefix.length > 0) {
                v.textures = [];
                for (var i = c.start; i <= c.end; i++) {
                    v.textures.push(c.prefix + '_' + String(i).padStart(4, '0'));
                }
            } else if (c.textures != undefined && c.textures.length > 0) {
                v.textures = c.textures;
            } else {
                throw 'empty frame info!!!';
            }

            //
            this.reset();

        } catch (e) {
            var errMsg = this.getExpMsg("create", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // timer clear
    #clearTimer() {
        try {
            let v = this.#_PV;
            if (v.timerId != undefined) {
                let timerPool = v.scene.getTimerPool();
                timerPool.remove(v.timerId);
                v.timerId = undefined;
            }
        } catch (e) {
            var errMsg = this.getExpMsg("clearTimer", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // reset
    reset() {
        try {
            //
            let v = this.#_PV;
            
            v.textureIndex = 0;
            v.repeatCount = 0;

            this.#clearTimer();

        } catch (e) {
            var errMsg = this.getExpMsg("reset", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // play
    play() {
        try {
            this.reset();

            let v = this.#_PV;
            let c = v.config;

            let playing = function() {
                v.sprite.setTexture(v.textures[v.textureIndex]);
            }

            playing();
            let timerPool = v.scene.getTimerPool();
            v.timerId = timerPool.setInterval(()=>playing(), v.config.duration);
        } catch (e) {
            var errMsg = this.getExpMsg("play", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // stop
    stop() {
        try {
            this.reset();
        } catch (e) {
            var errMsg = this.getExpMsg("stop", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // pause
    pause() {
        try {
            this.#clearTimer();
        } catch (e) {
            var errMsg = this.getExpMsg("pause", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // resume
    resume() {
        try {
            let v = this.#_PV;
            let c = v.config;
            let selfIt = this;

            let playing = function(isNext) {
                if (isNext === true) {
                    v.textureIndex++;
                    if (v.textureIndex === v.textures.length) {
                        if (c.repeat > 0) {
                            v.repeatCount++; 
                            if (v.repeatCount >= c.repeat) {
                                selfIt.stop();
                                if (c.endCallback != undefined) { c.endCallback(); }
                                return;
                            }
                        }
                        v.textureIndex = 0;
                    }
                }

                v.sprite.setTexture(v.textures[v.textureIndex]);

                //
                if (c.frameCallback != undefined) { c.frameCallback(v.textureIndex, v.textures[v.textureIndex]); }
            }

            playing(false);
            let timerPool = v.scene.getTimerPool();
            this.#clearTimer();
            v.timerId = timerPool.setInterval(()=>playing(true), v.config.duration);
        } catch (e) {
            var errMsg = this.getExpMsg("resume", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}