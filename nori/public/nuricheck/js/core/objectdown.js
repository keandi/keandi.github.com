class ObjectDown extends ClsObject {
    #_PV = {}

    // ctor
    constructor(name, scene, gameObject, callback) {
        try {
            super(name);

            let gameObjectY = gameObject.y;
            let selfIt = this;

            gameObject.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
                gameObject.y = gameObjectY + 5;

                function menuUp() {
                    gameObject.y = gameObjectY;
                    callback();
                };

                if (selfIt.#_PV.timeout == undefined) {
                    selfIt.#_PV.timeout = new GameTimeout(name + "_gametimeout", scene, 100, ()=>menuUp(), true);
                } else {
                    selfIt.#_PV.timeout.reset(true);
                }
            });
            
            this.#_PV.scene = scene;
            this.#_PV.gameobject = gameObject;
            //
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        try {
            destroyObjects( this.#_PV.timeout );
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}