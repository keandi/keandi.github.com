var SceneMove = function(fps, gameHost) {
    MielScene.apply(this, arguments);
}

SceneMove.prototype = Object.create(MielScene.prototype);
SceneMove.prototype.constructor = SceneMove;

SceneMove.prototype.onInit = function() {
    //alert("init " + this.getKey());
}

SceneMove.prototype.onPreload = function() {
    //alert("preload " + this.getKey());
}

SceneMove.prototype.onCreate = function() {
    //alert("create " + this.getKey());
    this.cameras.main.setBackgroundColor('#255225');
    this.registerMenus();
    //this.loadAudio();
}

SceneMove.prototype.onUpdate = function() {
    //console.log("update " + this.getKey());

    if (this._assetLoadCompleted != true) { return; }


}

SceneMove.prototype.getKey = function() {
    return SCENE_KEY_MOVE;
}

SceneMove.prototype.registerMenus = function() {
    try {
        // switch scene
        {
            var menu = this.add.text(80, 20, "[Go To Main]").setOrigin(0.5);
            var selfIt = this;
            var menuUp = function() {
                selfIt._gameHost.switchScene(SCENE_KEY_MAIN);
            }
            setClick(menu, menuUp);
            
        }
        
    } catch(e) {
        var errMsg = this._identify + ".registerMenus.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}


SceneMove.prototype.onStop = function() {
    try {
        //alert("onStop " + this.getKey());
        //this.input.off('pointerdown');
        this._arrowSprite.destroyAll();
    } catch(e) {
        var errMsg = this.getKey() + ".onStop.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneMove.prototype.onLoadAssets = function() {
    try {
        if (this._assetLoadCompleted == true)
        {
            this.onLoadAssetsComplete();
        }
        else
        {
            this.load.image("Thunder", "assets/image/Thunder-icon.png");
            this.load.spritesheet("ArrowSpriteSheet", "assets/image/Arrow_test.png", { frameWidth: 48, frameHeight: 48 });
            this.load.start();
        }
    } catch(e) {
        var errMsg = this.getKey() + ".onLoadAssets.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneMove.prototype.onLoadingAssets = function(value) {
    try {
        console.log(this.getKey() + " loadinig... " + value);
    } catch(e) {
        var errMsg = this.getKey() + ".onLoadingAssets.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneMove.prototype.onLoadAssetsComplete = function() {
    try {
        console.log(this.getKey() + " asset load completed !!!");

        var selfIt = this;

        //this._arrowSprite = new ArrowSprite(this, this._gameHost._game);

        // ArrowSpriteSheet
        /*this._anims = {};
        var anims = this._anims;
        function createArrowAnim(key, start) {
            return selfIt.anims.create({
                key: key,
                frameRate: 7,
                duration: null,
                frames: selfIt.anims.generateFrameNumbers("ArrowSpriteSheet", { start: start, end: start + 4 }),
                repeat: -1
            });
        }

        this._anims.toR = createArrowAnim("toR", 0);
        this._anims.toRB = createArrowAnim("toRB", 5);
        this._anims.toB = createArrowAnim("toB", 10);
        this._anims.toLB = createArrowAnim("toLB", 15);
        this._anims.toL = createArrowAnim("toL", 20);
        this._anims.toLT = createArrowAnim("toLT", 25);
        this._anims.toT = createArrowAnim("toT", 30);
        this._anims.toRT = createArrowAnim("toRT", 35);

        this._sprite = this.add.sprite(50, 50, "ArrowSpriteSheet");
        this._sprite.play(this._anims.toR);*/

        //
        this._arrowSprite = new ArrowSpriteAnime("SceneMove-ArrowSpriteAnime", this, 50, 50);
        //var a = new AnimeSprite("aa", this, 1, 1, "ArrowSpriteSheet");

        //
        /*this.input.on('pointerdown', function(pointer, x, y, event) {
            selfIt.pointAction(pointer.x, pointer.y);
        });  */
        this.addPointerEvent('down', (pointer)=>{
            selfIt.pointAction(pointer.x, pointer.y);
        });

    } catch(e) {
        var errMsg = this.getKey() + ".onLoadAssetsComplete.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneMove.prototype.pointAction = function(x, y) {
    try {
        this.clearMoveTimer();

        var thunderObj = new Thunder(this, x, y);
        thunderObj.action(x, y);

        //
        var selfIt = this;
        var sprite = this._arrowSprite;

        //
        let degree = getDegree(sprite.getX(), sprite.getY(), x, y);
        //alert(degree);
        this._arrowSprite.playDegree(degree);

        //
        var moveAction = function() {
            // set anime
            var xGap = Math.abs(x - sprite.getX());
            var yGap = Math.abs(y - sprite.getY());

            //
            var res = MoveTowards(sprite.getX(), sprite.getY(), x, y, 5.0);
            sprite.moveTo(res[0], res[1]);
            if (res[2] == true) {
                selfIt.clearMoveTimer();
            }
        }

        this._moveTimer = setInterval(() => moveAction(), 40);

    } catch(e) {
        var errMsg = this.getKey() + ".pointAction.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneMove.prototype.clearMoveTimer = function() {
    if (this._moveTimer != undefined) {
        clearInterval(this._moveTimer);
        this._moveTimer = undefined;
    }

    this._currentAnime = undefined;
}