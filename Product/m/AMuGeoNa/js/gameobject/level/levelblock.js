class LevelBlock extends DestroyableObject {
    #_PV = {};

    //ctor
    constructor(name, scene, rect, levelBlock, levelGroup, downCallback) {
        try {
            super(name, scene);

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
            destroyObjects( this.#_PV.g, this.#_PV.t );
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

            g.fillStyle(COLOR_LEVELBLOCK, OPACITY_LEVELBLOCK_BODY);
            g.fillRoundedRect(v.rect.Left, v.rect.Top, v.rect.Width, v.rect.Height, 5);

            g.lineStyle(3, COLOR_LEVELBLOCK, 1);
            g.strokeRoundedRect(v.rect.Left, v.rect.Top, v.rect.Width, v.rect.Height, 5);
            g.setDepth( DEPTH_LEVEL_BLOCK );

            this.#_PV.g = g;

            //
            var t = addText(v.scene, v.rect.CenterX, v.rect.CenterY, "" + (v.levelGroup + 1) + "~", 12, 0xFFFFFF);
            t.setDepth( DEPTH_LEVEL_BLOCK );
            this.#_PV.t = t;

            //
            v.scene.addDestroyableObject( this );

            //
            v.scene.addPointerEvent('down', (pointer) => {
                if (v.rect.ptInRect(pointer.x, pointer.y) === true) {
                    v.downCallback(this);
                }
            });
        } catch (e) {
            var errMsg = this.getExpMsg("create", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // re set level group
    setLevelGroup(levelGroup) {
        try {
            this.#_PV.levelGroup = levelGroup;
            this.#_PV.t.setText( "" + (this.#_PV.levelGroup + 1) + "~" );
        } catch (e) {
            var errMsg = this.getExpMsg("set", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get level block
    get LevelBlock() {
        return this.#_PV.levelBlock;
    }

    // get level group
    get LevelGroup() {
        return this.#_PV.levelGroup;
    }

    // get center y
    get CenterY() {
        return parseInt(this.#_PV.rect.CenterY);
    }
}
