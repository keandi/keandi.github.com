class DestroyableObject extends ClsObject {
    //ctor
    constructor(name, scene) {
        try {
            super(name);

            // destroy 등록
            scene.addDestroyableObject( this );
            
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy (상속하여 사용)
    destroy() {
        //...
    }

}