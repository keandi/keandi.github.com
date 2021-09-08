class STSCanon1 extends STSBaseCanon {
    #_PV = {};

    // ctor
    constructor(name, scene, frameData) {
        super(name, scene);

        try {
            let v = this.#_PV;            
            v.scene = scene;
            v.frameData = frameData;
            
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        super.destroy();
    }
}