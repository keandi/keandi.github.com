class GameObject extends ClsObject {
    #_PV = {};

    // ctor
    constructor(name, scene, isSelfDestroy) {
        super(name);

        try {
            this.#_PV.scene = scene;

            // 자동파괴 등록
            if (isSelfDestroy === true) {
                scene.addDestroyableObject( this );
            }

            // update 이벤트 등록
            scene.subscribeUpdate(this);
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        this.#_PV.scene.unsubscribeUpdate(this);
    }
    
    // update event
    update() {

    }

    //////////////////////////////////
    //// <!-- object drag

    // unregister
    registerDrag(object) {
        try {
            this.unregisterDrag(object);

            this.#_PV.scene.addObjectDrag(object, (pointer, gameObject)=>this.onDragStart(pointer, gameObject), (pointer, gameObject, dragX, dragY)=>this.onDrag(pointer, gameObject, dragX, dragY), (pointer, gameObject)=>this.onDragEnd(pointer, gameObject));            
        } catch (e) {
            var errMsg = this.getExpMsg("registerDrag", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // register
    unregisterDrag(object) {
        try {
            this.#_PV.scene.removeObjectDrag(object);
        } catch (e) {
            var errMsg = this.getExpMsg("unregisterDrag", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // on drag start (상속 사용)
    onDragStart(pointer, gameObject) {
    }

    // on drag (상속 사용)
    onDrag(pointer, gameObject, dragX, dragY) {
    }

    // on drag end (상속 사용)
    onDragEnd(pointer, gameObject) {
    }

    //// object drag -->
    //////////////////////////////////

    //////////////////////////////////
    //// <!-- visible (상속 구현 필요)
    set visible(value) {
        alert("need implement - set visible");
    }

    get visible() {
        alert("need implement - get visible");
    }
    //// visible -->
    //////////////////////////////////
}