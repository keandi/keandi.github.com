class AnimeSprite extends ClsObject {
    constructor(name, scene, x, y, texture) {
        super(name);

        this.printName();

        //
        this._scene = scene;

        // create sprite
        this._sprite = this._scene.add.sprite(x, y, texture);

        // anims
        this._anims = new Map();
    }

    // create anim
    createAnim(config) {
        try {

            var anim = this._scene.anims.create(config);
            if (anim != undefined && anim != null)
            {
                this._anims.set(config.key, anim);
                return anim;
            }

        } catch(e) {
            var errMsg = this._name + ".createAnim.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }

        return undefined;
    }

    // destroy all objects
    destroyAll() {
        try {
            // remove anims
            for (let item of this._anims) {
                item[1].destroy();
                this._scene.anims.remove(item[0]);
            }
            this._anims.clear();
            this._anims = undefined;

            // remove sprite
            this._sprite.destroy();
            this._sprite = undefined;
        } catch(e) {
            var errMsg = this._name + ".destroyAll.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get anim
    getAnim(key) {
        try {
            return this._anims.get(key);
        } catch(e) {
            var errMsg = this._name + ".getAnim.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // play anime
    play(key) {
        try {
            if (this._sprite == undefined) { return; }
            this._sprite.play(key);
        } catch(e) {
            var errMsg = this._name + ".play.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    getX() {
        try {
            if (this._sprite == undefined) { return; }
            return this._sprite.x;
        } catch(e) {
            var errMsg = this._name + ".getX.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        } 
    }

    getY() {
        try {
            if (this._sprite == undefined) { return; }
            return this._sprite.y;
        } catch(e) {
            var errMsg = this._name + ".getY.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        } 
    }

    moveTo(x, y) {
        try {
            if (this._sprite == undefined) { return; }
            this._sprite.x = x;
            this._sprite.y = y;
        } catch(e) {
            var errMsg = this._name + ".getY.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        } 
    }

    // set depth
    setDepth(depth) {
        try {
            this._sprite.setDepth(depth);
        } catch(e) {
            var errMsg = this._name + ".setDepth.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        } 
    }

    // get sprite object
    get Sprite() {
        return this._sprite;
    }
}

