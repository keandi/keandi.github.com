class CollisionObject extends GameSprite {
    #_PV = {};

    // ctor
    constructor(name, scene, groupName, isAttacker, w, h) {
       
        const frameDataObject = {
            frames: [
                {
                    filename: name,
                    frame: {
                        x: 0,
                        y: 0,
                        w: w,
                        h: h
                    },
                    rotated: false,
                    trimmed: true,
                    spriteSourceSize: {
                        x: 0,
                        y: 0,
                        w: w,
                        h: h
                    },
                    sourceSize: {
                        w: w,
                        h: h
                    },
                    hitframes: [
                        {
                            rect: {
                                x: 0,
                                y: 0,
                                w: w,
                                h: h
                            },
                            isAttacker: isAttacker,
                            isSuperAttacker: false,
                            hitType: 1,
                            AGLevel: 0
                        }
                    ]
                }
            ]
        };
        //const frameDataJson = JSON.stringify(frameDataObject);
        let map = new Map();
        map.set(name, frameDataObject.frames[0]);            
        let frameData = {
            frames: map,
        };
        
        super(name, scene, frameData, true);

        try {
            let v = this.#_PV;

            v.collisionGroup = this.CollisionGroup;
            v.frameData = frameData;
            v.rect = new Rect(0, 0, w, h);

            this.registerOnGroup(groupName);
            this.ActiveFrameName = name;
            //this.setPosition(v.rect.CenterX, v.rect.CenterY)
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        super.destroy();

        this.#destroyCollisionData();
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // <!-- begin collision data

    // crate collision data
    createNewCollisionData(ifExistIgnore) {
        try {
            if (ifExistIgnore === true && this.#_PV.collisionData != undefined) {
                return; // already exist
            }
            this.#destroyCollisionData();

            let v = this.#_PV;
            v.collisionData = new CollisionData('CollisionObject_cd_' + this.Name, this.Scene, v.frameData, [ this.Name ] , this);
            return v.collisionData;
        } catch (e) {
            var errMsg = this.getExpMsg("createNewCollisionData", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get/create collision data
    get CollisionData() {
        try {
            this.createNewCollisionData(true);
            return this.#_PV.collisionData;
        } catch (e) {
            var errMsg = this.getExpMsg("CollisionData", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get collision rect
    get CollisionRect() {
        try {
            this.createNewCollisionData(true);
            return this.#_PV.collisionData.CollisionRect;
        } catch (e) {
            var errMsg = this.getExpMsg("CollisionRect", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy collision data
    #destroyCollisionData() {
        try {
            let v = this.#_PV;

            destroyObjects( v.collisionData );
            v.collisionData = undefined;
        } catch (e) {
            var errMsg = this.getExpMsg("#destroyCollisionData", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // end collision data-->
    ////////////////////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////
    //// <!-- need collision rect recompute

    // set need collision rect recompute
    set IsNeedCollisionRect(value) {
        try {
            this.#_PV.isNeedCollisionRectRecompute = value;
        } catch (e) {
            var errMsg = this.getExpMsg("set_IsNeedCollisionRect", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get need collision rect recompute
    get IsNeedCollisionRect() {
        try {
            return (this.#_PV.isNeedCollisionRectRecompute === false) ? false : true;
        } catch (e) {
            var errMsg = this.getExpMsg("get_IsNeedCollisionRect", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    //// collision rect -->
    ///////////////////////////////

    //////////////////////////////////
    //// <!-- visible (상속 구현 필요. 구현시 super 를 통해 skip 구현 후 상세 내용 구현 필요)
    set Skip(value) {
        try {
            this.createNewCollisionData(true);
            this.#_PV.collisionData.IsSkip = !value;
        } catch (e) {
            var errMsg = this.getExpMsg("set_Skip", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    get Skip() {
        try {
            this.createNewCollisionData(true);
            return this.#_PV.collisionData.IsSkip;
        } catch (e) {
            var errMsg = this.getExpMsg("get_Skip", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
    //// visible -->
    //////////////////////////////////

    /////////////////////////////
    //// <!-- get object rectangle

    // get x
    get X() {
        try {
            return this.#_PV.rect.x;
        } catch (e) {
            var errMsg = this.getExpMsg("get_X", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get y
    get Y() {
        try {
            return this.#_PV.rect.y;
        } catch (e) {
            var errMsg = this.getExpMsg("get_Y", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set position event
    onSetPosition(x, y) {
        try {
            let v = this.#_PV;
            
            v.rect.x = x;
            v.rect.y = y;
        } catch (e) {
            var errMsg = this.getExpMsg("onSetPosition", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    //// get object rectangle -->
    ////////////////////////////

    // recompute collision rect
    recomputeSpriteRect() {
        // nothing
    }

    // set active collision frame
    set ActiveFrameName(value) {
        try {
            this.createNewCollisionData(true);
            this.#_PV.collisionData.ActiveFrameName = value;
        } catch (e) {
            var errMsg = this.getExpMsg("ActiveFrameName", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // attack X group(attack, body) 충돌 체크
    onCheckCollisionAttackerXGroup() {
        try {
            this.createNewCollisionData(true);

            let v = this.#_PV;
            if (v.collisionData.ActiveAttackers == undefined) { return; }

            v.collisionData.setRecomputeFlag();
            //v.collisionData.forcedRecomputeActiveFrame();
            v.collisionGroup.checkCollisionAttackerXBody(this);
        } catch (e) {
            var errMsg = this.getExpMsg("onCheckCollisionAttackerXGroup", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}