class GameObjectPool extends DestroyableObject {
    #_PV = {};

    //ctor
    constructor(name, scene) {
        try {
            super(name, scene);

            this.#_PV.scene = scene;
            this.#_PV.gameObjects = new Map(); //[name, {createCb, [object, use]}], name=texture_frame
            this.#_PV.objectRef = new Map(); // [object, [object, use]] 
            
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
    destroy() {
        try {
            //console.log("sound pool destroy - begin " + _gameHost.Time);
            super.destroy();

            this.#_PV.gameObjects.forEach(element => {
                if (element.objects != undefined) {
                    element.objects.forEach(o => {
                        o.object.destroy();
                    });
                }
            });
            this.#_PV.gameObjects.clear();

            this.#_PV.objectRef.clear();
            
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 생성 callback 등록
    registerCreateCallback(name, cb) {
        try {
            let o = this.#_PV.gameObjects;

            if (o.has(name) === true) {
                //기존 콜백 수정
                o.get(name).createCb = cb;
            } else {
                //신규 등록
                o.set(name, {createCb: cb, objects: []});
            }
        } catch (e) {
            var errMsg = this.getExpMsg("registerCreateCallback", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get object
    get(name) {
        try {
            let v = this.#_PV;
            let o = v.gameObjects;

            if (o.has(name) === false) {
                return undefined;
            } 
            
            let objectInfo = o.get(name);
            for (var i = 0; i < objectInfo.objects.length; i++) {
                if (objectInfo.objects[i].use === false) {
                    objectInfo.objects[i].object.visible = true;
                    objectInfo.objects[i].use = true;
                    v.objectRef.set(objectInfo.objects[i].object, objectInfo.objects[i]);
                    return objectInfo.objects[i].object;
                }
            }

            // new
            let obj = objectInfo.createCb();
            if (obj == undefined) { return undefined; }

            var ob = {object: obj, use: true};
            objectInfo.objects.push( ob );
            v.objectRef.set(ob.object, ob);
            return obj;
        } catch (e) {
            var errMsg = this.getExpMsg("get", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 사용 object 반환
    release(object) {
        try {
            let v = this.#_PV;
            if (v.objectRef.has(object) === false) { return; }

            let or = v.objectRef.get(object);
            or.use = false;
            or.object.visible = false;

            //console.log("game object release - object count: " + v.objectRef.size);
        } catch (e) {
            var errMsg = this.getExpMsg("release", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}