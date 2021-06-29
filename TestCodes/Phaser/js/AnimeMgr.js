var AnimeMgr = function(game, scene) {

    try {
        Phaser.Animations.AnimationManager.call(this, game);
        this._game = game;
        this._scene = scene;

        this.boot();

    } catch(e) {
        var errMsg = "AnimeMgr.ctor.catched: " + e;
        console.log('%c ' + errMsg, 'background: #454545; color: #EF0909');
        //alert(errMsg);
    }
    
}

AnimeMgr.prototype = Object.create(Phaser.Animations.AnimationManager.prototype);
AnimeMgr.prototype.constructor = AnimeMgr;

////////////////////////////////////////////////////////////////////////////////