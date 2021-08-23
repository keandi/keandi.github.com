class LevelBlock extends ClsObject {
    #_PV = {};

    //ctor
    constructor(name, scene, rect, levelBlock, levelGroup, downCallback) {
        try {
            super(name);

            this.#_PV.scene = scene;
            this.#_PV.rect = rect;
            this.#_PV.levelBlock = levelBlock;
            this.#_PV.levelGroup = levelGroup;
            this.#_PV.downCallback = downCallback;

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
            
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // create
    #create() {
        try {
            let v = this.#_PV;

            //
            var g = v.scene.add.graphics();
            g.fillStyle(0xf08787, 1);
            g.fillRect(v.rect.Left, v.rect.Top, v.rect.Width, v.rect.Height);
            this.#_PV.g = g;

            //
            v.scene.addDestroyableObject( this );

            //
            v.scene.addPointerEvent('down', (pointer) => {
                if (v.rect.ptInRect(pointer.x, pointer.y) === true) {
                    v.downCallback(v.levelBlock, v.levelGroup);
                }
            });
        } catch (e) {
            var errMsg = this.getExpMsg("create", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

}
