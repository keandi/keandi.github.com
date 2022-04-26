class GameSoundPool extends ClsObject {
    #_PV = {};

    //ctor
    constructor(name, scene, max) {
        try {
            super(name);

            this.#_PV.scene = scene;
            this.#_PV.spoolers = new Map(); //[name, [spooler]]            
            this.#_PV.soundMax = max;
            
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
    destroy() {
        try {
            //console.log("sound pool destroy - begin " + _gameHost.Time);
            super.destroy();

            this.#_PV.spoolers.forEach(spooler => {
                //console.log("sound pool destroy - inner");
                spooler.destroy();
            });
            this.#_PV.spoolers.clear();
            //console.log("sound pool destroy - end");
            
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // resource
    play(resource) {
        try {
            let s = this.#_PV.spoolers;

            let spooler = undefined;
            if (s.has(resource) === false) {
                spooler = new SoundSpooler("game_soud_spooler", this.#_PV.scene, resource, this.#_PV.max);
                this.#_PV.spoolers.set(resource,  spooler);
            } else {
                spooler = this.#_PV.spoolers.get(resource);
            }

            spooler.play();
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}