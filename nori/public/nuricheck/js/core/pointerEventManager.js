// scene.input 의 pointer down, up, move 관리
class PointerEventManager extends ClsObject {
    #_PV = {};

    //ctor
    constructor(name, scene) {
        try {
            super(name);

            this.#_PV.scene = scene;
            this.#_PV.pointerCb = {
                down: new CallbackMap("down_cbmap"),
                up: new CallbackMap("up_cbmap"),
                move: new CallbackMap("move_cbmap")
            };

            this.#_PV.callbackType = new Map();

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
    destroy() {
        try {
            if (this.#_PV.pointerCb.down.Count > 0) {
                this.#_PV.scene.input.off('pointerdown');
            }
            if (this.#_PV.pointerCb.up.Count > 0) {
                this.#_PV.scene.input.off('pointerup');
            }
            if (this.#_PV.pointerCb.move.Count > 0) {
                this.#_PV.scene.input.off('pointermove');
            }

            this.#_PV.pointerCb.down.destroy();
            this.#_PV.pointerCb.up.destroy();
            this.#_PV.pointerCb.move.destroy();

            this.#_PV.callbackType.clear();

        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // add callback
    add(kind, cb) {
        try {
            let scene = this.#_PV.scene;
            let addEvent = function(cbMap, eventName) {
                if (cbMap.Count <= 0) {
                    scene.input.on(eventName, function(pointer, x, y, event) {
                        if (scene.isPause() === true) { return; }
                        cbMap.forEach((call)=>{
                            call(pointer);
                        });
                    });
                }
                cbMap.add(cb);
            };

            if (kind === "down") {
                addEvent(this.#_PV.pointerCb.down, 'pointerdown');
                this.#_PV.callbackType.set(cb, 'down');
            } else if (kind === "up") {
                addEvent(this.#_PV.pointerCb.up, 'pointerup');
                this.#_PV.callbackType.set(cb, 'up');
            } else if (kind === "move") {
                addEvent(this.#_PV.pointerCb.move, 'pointermove');
                this.#_PV.callbackType.set(cb, 'move');
            }
        } catch (e) {
            var errMsg = this.getExpMsg("add", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // remove callback
    remove(cb) {
        try {
            if (this.#_PV.callbackType.has(cb) == false) { return; }

            //
            let scene = this.#_PV.scene;
            let removeEvent = function(cbMap, eventName) {
                cbMap.remove(cb);
                if (cbMap.Count <= 0) {
                    scene.input.off(eventName);
                }
            };

            //
            let kind = this.#_PV.callbackType.get(cb);

            if (kind === "down") {
                removeEvent(this.#_PV.pointerCb.down, 'pointerdown');
            } else if (kind === "up") {
                removeEvent(this.#_PV.pointerCb.up, 'pointerup');
            } else if (kind === "move") {
                removeEvent(this.#_PV.pointerCb.move, 'pointermove');
            }
        } catch (e) {
            var errMsg = this.getExpMsg("remove", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}