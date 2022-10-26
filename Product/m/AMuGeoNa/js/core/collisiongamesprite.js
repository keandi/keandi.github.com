class CollisionGameSprite extends GameSprite {
    #_PV = {};

    // ctor
    constructor(name, scene, frameData, isSelfDestroy, groupName) {
        super(name, scene, frameData, isSelfDestroy);

        try {
            let v = this.#_PV;

            v.collisionGroup = this.CollisionGroup;
            v.frameData = frameData;

            this.registerOnGroup(groupName);
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        super.destroy();

        this.#destroyCollisionData();

        this.destroySprite();
    }
    
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // <!-- begin collision data

    // crate collision data
    createNewCollisionData() {
        try {
            this.#destroyCollisionData();

            let v = this.#_PV;
            v.collisionData = new CollisionData('collisiongamesprite_cd_' + this.Name, this.Scene, v.frameData, this.AllFrameNames, this);
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
            let v = this.#_PV;

            if (v.collisionData == undefined) { 
                this.createNewCollisionData();
            }
            return v.collisionData;
        } catch (e) {
            var errMsg = this.getExpMsg("CollisionData", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get collision rect
    get CollisionRect() {
        try {
            let v = this.#_PV;

            if (v.collisionData == undefined) { return undefined; }
            return v.collisionData.CollisionRect;
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
    set visible(value) {
        try {
            this.#_PV.collisionData.IsSkip = !value;
        } catch (e) {
            var errMsg = this.getExpMsg("set_visible", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    get visible() {
        try {
            return this.#_PV.sprite.visible;
        } catch (e) {
            var errMsg = this.getExpMsg("get_visible", e);
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
            return this.#_PV.sprite.x;
        } catch (e) {
            var errMsg = this.getExpMsg("get_X", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get y
    get Y() {
        try {
            return this.#_PV.sprite.y;
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
            
            v.sprite.x = x;
            v.sprite.y = y;
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
        try {
            let v = this.#_PV;
            if (v.spriteRect == undefined) {
                v.spriteRect = new Rect();
            }

            v.spriteRect.Width = v.sprite.width;
            v.spriteRect.Height = v.sprite.height;
            v.spriteRect.X = v.sprite.x - (v.sprite.width / 2);
            v.spriteRect.Y = v.sprite.y - (v.sprite.height / 2);

        } catch (e) {
            var errMsg = this.getExpMsg("recomputeSpriteRect", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set active collision frame
    set ActiveFrameName(value) {
        try {
            this.#_PV.collisionData.ActiveFrameName = value;
        } catch (e) {
            var errMsg = this.getExpMsg("ActiveFrameName", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
    
    //////////////////////////////////////////////
    // <!-- begin sprite

    // set sprite
    set Sprite(s) {
        try {
            this.destroySprite();
            this.#_PV.sprite = s;
        } catch (e) {
            var errMsg = this.getExpMsg("set_Sprite", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get sprite
    get Sprite() {
        return this.#_PV.sprite;
    }

    // destroy sprite
    destroySprite() {
        try {
            let v = this.#_PV;
            destroyObject( v.sprite );
            v.sprite = undefined;
        } catch (e) {
            var errMsg = this.getExpMsg("destroySprite", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // create sprite
    createSprite(scene) {
        console.log("CollisionGameSprite::createSprite not implement !!!");
    }
    // end sprite -->
    //////////////////////////////////////////////

    // attack X group(attack, body) 충돌 체크
    onCheckCollisionAttackerXGroup() {
        try {
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