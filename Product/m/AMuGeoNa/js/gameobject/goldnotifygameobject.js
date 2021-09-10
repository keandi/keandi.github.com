class GoldNotifyGameObject extends GameObject {
    #_PV = {};

    // ctor
    constructor(name, scene, isSelfDestroy) {
        super(name, scene, isSelfDestroy);

        try {
            this.#_PV.scene = scene;
            this.#registerGoldEvent();
            
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
    destroy() {
        try {
            super.destroy();
            this.#unregisterGoldEvent();
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
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