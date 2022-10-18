// scene.input 의 keyboard down, up 관리
class KeyboardEventManager extends ClsObject {
    #_PV = {};

    //ctor
    constructor(name, scene) {
        try {
            super(name);

            let v = this.#_PV;
            v.scene = scene;
            v.events = {
                down: new Map(),    // key map - CallbackMap
                up: new Map(),      // key map - CallbackMap
            };
            v.callbackInfo = new Map();

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // valid check - kind
    isValidKind(kind) {
        try {
            return (kind !== 'down' && kind !== 'up') ? false : true;
        } catch (e) {
            var errMsg = this.getExpMsg("isValidKind", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // valid check - key
    isValidKey(key) {
        try {
            return (key.length <= 0) ? false : true;
        } catch (e) {
            var errMsg = this.getExpMsg("isValidKey", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    isValid(kind, key) {
        return (this.isValidKind(kind) === false || this.isValidKey(key) === false) ? false : true;
    }

    // destroy
    destroy() {
        try {
            let v = this.#_PV;

            //
            v.callbackInfo.forEach((inf) => {
                if (this.isValid(inf.kind, inf.key) === false) { return; }

                let keyEventName = this.#getEventName(inf.kind, inf.key);
                v.scene.input.keyboard.off(keyEventName);
            });

            //
            const destroyMap = function(eventMap) {
                eventMap.forEach(keyMap => {
                    keyMap.forEach(cbMap => {
                        cbMap.destroy();
                    });
                    keyMap.clear();
                });
                eventMap.clear();
            };

            //
            destroyMap(v.events.down);
            destroyMap(v.events.up);

            v.callbackInfo.clear();

        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    #getEventName(kind, key) {
        return ((kind === "down") ? "keydown-" : "keyup-") + key;
    }

    // add callback
    add(key, kind, cb, removeIfExist) {
        try {
            // 검증
            if (key.length <= 0) { throw "invalid key: " + key; }
            else if (kind != "down" && kind != "up") { throw "invalid kind: " + kind; }

            key = key.toUpperCase();

            //
            let v = this.#_PV;

            let scene = v.scene;
            /*let addEvent = function(cbMap, eventName) {
                if (cbMap.Count <= 0) {
                    scene.input.on(eventName, function(event) {
                        if (scene.isPause === true) { return; }
                        cbMap.forEach((call)=>{
                            call();
                        });
                    });
                }
                cbMap.add(cb);
            };*/

            // get event map
            let targetMap = (kind === 'down') ? v.events.down : v.events.up;

            // get key map
            let keyMap = undefined;
            if (targetMap.size === 0 || targetMap.has(key) === false) {
                keyMap = new Map();
                targetMap.set(key, keyMap);
            } else {
                keyMap = targetMap.get(key);
            }

            // get callback map
            let cbMap = undefined;
            if (keyMap.has(key) === false) { 
                cbMap = new CallbackMap("kcbm_" + key + "_" + kind + "_" + getTimestampInSeconds());
                keyMap.set(key, cbMap);

                // 처음이라 이벤트 등록
                let keyEventName = this.#getEventName(kind, key);
                scene.input.keyboard.on(keyEventName, function (event) { 
                    if (scene.isPause === true) { return; }
                    cbMap.forEach((call)=>{
                        call();
                    });
                 });
            } else {
                cbMap = keyMap.get(key);
            }
            cbMap.add(cb);

            v.callbackInfo.set(cb, {
                key: key,
                kind: kind,
                cb: cb,
            });

        } catch (e) {
            var errMsg = this.getExpMsg("add", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // remove callback
    remove(cb) {
        try {
            let v = this.#_PV;
            if (v.callbackInfo.has(cb) == false) { return; }

            //
            let scene = v.scene;
            let removeEvent = function(cbMap, eventName) {
                cbMap.remove(cb);
                if (cbMap.Count <= 0) {
                    scene.input.off(eventName);
                }
            };

            //
            let inf = v.callbackInfo.get(cb);
            if (inf.kind !== 'down' && inf.kind !== 'up') { 
                console.log("비대상 kind: " + inf.kind);
                return; 
            } // 비대상 정보
            else if (inf.key.length <= 0) { 
                console.log("비대상 key: " + inf.key);
                return; 
            } // 비대상 정보

            // get event map
            let targetMap = (inf.kind === 'down') ? v.events.down : v.events.up;

            // get key map
            if (targetMap.size === 0 || targetMap.has(inf.key) === false) {
                return; // 없음
            }
            let keyMap = targetMap.get(inf.key);

            // get callback map
            if (keyMap.has(inf.key) === false) { 
                return; // 없음
            } 
            let cbMap = keyMap.get(inf.key);

            cbMap.remove(cb);

            // count == 0 => 이벤트 등록 해제
            let cbCount = 0;
            keyMap.forEach((element) => {
                cbCount += element.Count;
            });
            if (cbCount <= 0) {
                // 등록된 콜백이 없어서 이벤트 등록 해제
                let keyEventName = this.#getEventName(inf.kind, inf.key);
                scene.input.keyboard.off(keyEventName);
            }

            // 
            v.callbackInfo.delete(cb);

        } catch (e) {
            var errMsg = this.getExpMsg("remove", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}