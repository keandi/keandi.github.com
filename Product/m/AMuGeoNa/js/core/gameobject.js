class GameObject extends ClsObject {
    #_PV = {};

    // ctor
    constructor(name, scene, isSelfDestroy, useGoldChangeNotify) {
        super(name);

        try {
            this.#_PV.scene = scene;

            // 자동파괴 등록
            if (isSelfDestroy === true) {
                scene.addDestroyableObject( this );
            }

            // 골드 변경 이벤트 등록
            if (useGoldChangeNotify === true) {
                this.#registerGoldEvent();
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
        this.#unregisterGoldEvent();
    }
    
    // update event
    update() {

    }

    // register gold change event
    #registerGoldEvent() {
        try {
            let selfIt = this;
            let v = this.#_PV;

            v.goldChangedNotify = function(gold) {
                selfIt.onGoldChanged(gold);
            };

            v.scene.registerGoldNotify(v.goldChangedNotify);
        } catch (e) {
            var errMsg = this.getExpMsg("registerGoldEvent", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // unregister gold change event
    #unregisterGoldEvent() {
        try {
            let v = this.#_PV;
            if (v.goldChangedNotify == undefined) { return; }
            v.scene.unregisterGoldNotify(v.goldChangedNotify);
            v.goldChangedNotify = undefined;
        } catch (e) {
            var errMsg = this.getExpMsg("unregisterGoldEvent", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // gold change event (상속 구현 필요)
    onGoldChanged(gold) {

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
}