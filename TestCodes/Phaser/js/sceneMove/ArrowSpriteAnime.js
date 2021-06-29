class ArrowSpriteAnime extends AnimeSprite {
    constructor(name, scene, x, y) {
        super(name, scene, x, y, "ArrowSpriteSheet");

        //
        this.createAnimation("toR", 0);
        this.createAnimation("toRB", 5);
        this.createAnimation("toB", 10);
        this.createAnimation("toLB", 15);
        this.createAnimation("toL", 20);
        this.createAnimation("toLT", 25);
        this.createAnimation("toT", 30);
        this.createAnimation("toRT", 35);

        //
        this.play("toR");
    }

    createAnimation(key, start) {
        try {
            var config = {
                key: key,
                frameRate: 7,
                duration: null,
                frames: this._scene.anims.generateFrameNumbers("ArrowSpriteSheet", { start: start, end: start + 4 }),
                repeat: -1
            };

            this.createAnim(config);
        } catch(e) {
            var errMsg = this._name + ".createAnimation.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    playDegree(degree) {
        try {
            let beginDegree = 22.5;
            let selfIt = this;

            function setPlay(targetKey) {
                if (inAny(degree, beginDegree, beginDegree + 45)) {
                    //console.log("play key: " + targetKey + ", degree: " + degree);
                    selfIt.play(targetKey);
                    return true;
                }

                return false;
            }

            //
            if (this._animKeys == undefined) {
                this._animKeys = ["toRB", "toB", "toLB", "toL", "toLT", "toT", "toRT"];
            }

            let isPlayed = false;
            for (var i = 0; i < this._animKeys.length; i++) {
                if (setPlay(this._animKeys[i]) == true) {
                    isPlayed = true;
                    break;
                }
                beginDegree += 45.0;
            }

            if (isPlayed == false) {
                this.play("toR");
            }

        } catch(e) {
            var errMsg = this._name + ".createAnimation.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
}
