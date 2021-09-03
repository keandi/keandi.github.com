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
}