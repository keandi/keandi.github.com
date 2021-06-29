var ArrowSprite = function(scene, game) {
    SpriteObject.call(this, scene, 50, 50, "ArrowSpriteSheet");

    this._game = game;
    this._scene = scene;

    this.createAnime();
}

ArrowSprite.prototype = Object.create(SpriteObject.prototype);
ArrowSprite.prototype.constructor = ArrowSprite;

///////////////////////////////////////////////////////////////////////////////////////////
// create animation
ArrowSprite.prototype.createAnime = function() {
    try {
        this._animMgr = new ArrowAnime(this._game, this.scene);
        //this.play(this._animMgr.get("toR"), true);

        //var config = this._animMgr.getConfig("toR", 0);
        //var anim = this.scene.anims.create(config);
        //this.play(anim);
        
        /*var selfIt = this;
        function createArrowAnim(key, start) {
            return selfIt._scene.anims.create({
                key: key,
                frameRate: 7,
                duration: null,
                frames: selfIt.anims.generateFrameNumbers("ArrowSpriteSheet", { start: start, end: start + 4 }),
                repeat: -1
            });
        }

        var toR = createArrowAnim("toR", 0);

        this._sprite = this._scene.add.sprite(50, 50, "ArrowSpriteSheet");
        //this._sprite.play(toR);
        this.play(toR);*/

        /*this._animMgr.createAnimations();
        this._scene.add.existing(this);
        this.play(this._animMgr.get("toR"));*/

    } catch(e) {
        var errMsg = "ArrowSprite.createAnime.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}