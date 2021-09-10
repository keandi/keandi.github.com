class AnimatorManager extends DestroyableObject {
    #_PV = {}

    // ctor
    constructor(name, scene, sprite) {
        try {
            super(name, scene);

            //
            let v = this.#_PV;
            v.scene = scene;
            v.sprite = sprite;
            v.animators = new Map();

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
            
            let v = this.#_PV;
            v.animators.clear();
            v.current = undefined;

        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // add
    add(key, config) {
        try {
            let v = this.#_PV;
            if (v.animators.has(key) === true) { return this; }

            v.animators.set(key, new Animator("animator_" + key, v.scene, v.sprite, config));
        } catch (e) {
            var errMsg = this.getExpMsg("add", e);
            console.log(errMsg);
            alert(errMsg);
        }
        return this;
    }

    // play
    play(key) {
        try {
            this.stop();

            let v = this.#_PV;
            if (v.animators.has(key) === false) { return; }

            v.current = v.animators.get(key);
            v.current.play();
        } catch (e) {
            var errMsg = this.getExpMsg("play", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // stop
    stop() {
        try {
            let v = this.#_PV;
            if (v.current == undefined) { return; }

            v.current.stop();
            v.current = undefined;
        } catch (e) {
            var errMsg = this.getExpMsg("stop", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // pause
    pause() {
        try {
            let v = this.#_PV;
            if (v.current == undefined) { return; }

            v.current.pause();
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
            if (v.current == undefined) { return; }

            v.current.resume();
        } catch (e) {
            var errMsg = this.getExpMsg("resume", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}