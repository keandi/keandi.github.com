class GameObject extends ClsObject {
    #_PV = {};

    // ctor
    constructor(name, scene, isSelfDestroy) {
        super(name);

        try {
            this.#_PV.scene = scene;

            //
            if (isSelfDestroy === true) {
                scene.addDestroyableObject( this );
            }

            // 
            this.#create();

            //
            scene.subscribeUpdate(this);
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        this.#_PV.scene.unsubscribeUpdate(this);
        super.destroy();
        this.onDestroy();
    }

    // 상속 후 삭제 구현
    onDestroy() {

    }


    //create
    #create() {
        this.#onCreate();
    }

    // 상속 후 생성 구현
    #onCreate() {

    }
    
    // update event
    update() {

    }
}