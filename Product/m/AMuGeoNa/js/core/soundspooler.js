class SoundSpooler extends ClsObject {
    #_PV = {};

    // ctor
    constructor(name, scene, resource, max) {
        try {
            super(name);

            this.#_PV.scene = scene;
            this.#_PV.resource = resource;
            this.#_PV.current = 0;
            this.#_PV.sounds = [];
            for (var i = 0; i < max; i++) {
                this.#_PV.sounds.push(undefined);
            }

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        try {

            for (var i = 0; i < this.#_PV.sounds.length; i++) {
                if (this.#_PV.sounds[i] != undefined) {
                    this.#_PV.sounds[i].stop();
                    this.#_PV.sounds[i].destroy();
                    this.#_PV.sounds[i] = undefined;
                }
            }

            this.#_PV.sounds = undefined;

        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // play
    play() {
        try {
            let v = this.#_PV;
            if (v.sounds[v.current] == undefined) {
                v.sounds[v.current] = v.scene.addDestroyableObject( v.scene.sound.add(v.resource) );
            }

            v.sounds[v.current].play();
            v.current++;
            if (v.current >= v.sounds.length) {
                v.current = 0;
            }
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}