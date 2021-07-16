class LineConnecter extends ClsObject {
    #_PV = {}; // private variables

    constructor(name, scene) {
        try {
            super(name);

            //
            this.#_PV.scene = scene;

            //
            this.#create();

        } catch(e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        try {

            if (this.#_PV.line == undefined) { return; }

            this.#_PV.line.destroy();
            this.#_PV.line = undefined;

        } catch(e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    #create() {
        try {

            this.destroy();

            this.#_PV.line = this.#_PV.scene.add.graphics();
            this.#_PV.line.setDepth(DEPTH_LINE_CONNECTER);

        } catch(e) {
            var errMsg = this.getExpMsg("create", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    redraw(x1, y1, x2, y2, isConnected) {
        try {

            this.#_PV.line.clear();
                
            this.#_PV.line.lineStyle(SADARI_LINE_THIKNESS, (isConnected == true) ? SADARI_LINE_CONNECTED_COLOR : SADARI_LINE_COLOR);
            this.#_PV.line.beginPath();
            this.#_PV.line.moveTo(x1, y1);
            this.#_PV.line.lineTo(x2, y2);
            this.#_PV.line.closePath();
            this.#_PV.line.strokePath();

        } catch(e) {
            var errMsg = this.getExpMsg("redraw", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

}