var ArrowAnime = function(game, scene) {
    try {
        AnimeMgr.call(this, game, scene);
    } catch(e) {
        var errMsg = "ArrowAnime.ctor.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }

    //AnimeMgr.apply(this, arguments);
    //frames: scene.anims.generateFrameNumbers("ArrowSpriteSheet", { start: start, end: start + 4 }),

    //this.createAnimations();
}

ArrowAnime.prototype = Object.create(AnimeMgr.prototype);
ArrowAnime.prototype.constructor = ArrowAnime;

////////////////////////////////////////////////////////////////////////////////
// get config
ArrowAnime.prototype.getConfig = function(key, start) {
    try {
        return {
            key: key,
            frameRate: 7,
            duration: null,
            frames: this._scene.anims.generateFrameNumbers("ArrowSpriteSheet", { start: start, end: start + 4 }),
            repeat: -1
        };
    } catch(e) {
        var errMsg = "ArrowAnime.getConfig.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// create animation
ArrowAnime.prototype.createAnimation = function(key, start) {
    try {
        var config = this.getConfig(key, start);
        
        return this.create(config);

        var anim = false;

        if (key)
        {
            anim = this.get(key);

            if (!anim)
            {
                anim = new Phaser.Animations.Animation(this, key, config);

                this.anims.set(key, anim);

                this.emit(Phaser.Events.ADD_ANIMATION, key, anim);
            }
        }

        return anim;

    } catch(e) {
        var errMsg = "ArrowAnime.createAnimation.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }

    return undefined;
}

// create animations
ArrowAnime.prototype.createAnimations = function() {
    try {
        this.createAnimation("toR", 0);
        /*this.createAnimation("toRB", 5); 
        this.createAnimation("toB", 10); 
        this.createAnimation("toLB", 15);
        this.createAnimation("toL", 20);
        this.createAnimation("toLT", 25);
        this.createAnimation("toT", 30); 
        this.createAnimation("toRT", 35);*/
    } catch(e) {
        var errMsg = "ArrowAnime.createAnimations.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// get anim
/*
ArrowAnime.prototype.getAnim = function(key) {
    try {
        return this.get(key);
    } catch(e) {
        var errMsg = "ArrowAnime.getAnim.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }

    return undefined;
}
*/