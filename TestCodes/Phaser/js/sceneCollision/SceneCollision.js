var SceneCollision = function(fps, gameHost) {
    MielScene.apply(this, arguments);
}

SceneCollision.prototype = Object.create(MielScene.prototype);
SceneCollision.prototype.constructor = SceneCollision;

SceneCollision.prototype.onInit = function() {
    //alert("init " + this.getKey());
}

SceneCollision.prototype.onPreload = function() {
    //alert("preload " + this.getKey());
}

SceneCollision.prototype.onCreate = function() {
    //alert("create " + this.getKey());
    this.cameras.main.setBackgroundColor('#326572');
    this.registerMenus();
    //this.loadAudio();
}

SceneCollision.prototype.onUpdate = function() {
    //console.log("update " + this.getKey());

    if (this._assetLoadCompleted != true) { return; }

    this.moveSouthKorea();
}

SceneCollision.prototype.getKey = function() {
    return SCENE_KEY_COLLISION;
}

SceneCollision.prototype.registerMenus = function() {
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


SceneCollision.prototype.onStop = function() {
    try {
        //alert("onStop " + this.getKey());
        
    } catch(e) {
        var errMsg = this.getKey() + ".onStop.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneCollision.prototype.onLoadAssets = function() {
    try {
        this.load.image("northKorea", "assets/image/North-Korea-Flag-icon.png");
        this.load.image("southKorea", "assets/image/South-Korea-Flag-icon.png");
        this.load.start();
    } catch(e) {
        var errMsg = this.getKey() + ".onLoadAssets.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneCollision.prototype.onLoadingAssets = function(value) {
    try {
        console.log(this.getKey() + " loadinig... " + value);
    } catch(e) {
        var errMsg = this.getKey() + ".onLoadingAssets.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneCollision.prototype.onLoadAssetsComplete = function() {
    try {
        console.log(this.getKey() + " asset load completed !!!");

        const screenWidth = this._gameHost._config.scale.width;
        const screenHeight = this._gameHost._config.scale.height;

        const xCenter = parseInt(screenWidth / 2);
        const yTop = 110;
        const yBottom = screenHeight - 110;
        const yCenter = parseInt(((yBottom - yTop) / 2) + yTop);

        //alert(this.physics);

        var selfIt = this;
        var registerImage = function(x, y, key) {
            var img = selfIt.physics.add.image(x, y, key).setImmovable(true);
            img.body.setAllowGravity(false);
            img.body.debugShowBody = false;    
            img.setBounce(0.2);
            img.setCollideWorldBounds(true);

            return img;
        };

        this._nk0 = registerImage(xCenter, yTop, 'northKorea');
        this._nk1 = registerImage(xCenter, yBottom, 'northKorea');
        this._sk0 = registerImage(xCenter, yCenter, 'southKorea');

        // 이동 기초값 초기화
        this._moveInfo = {
            speed: 2,
            moveToTarget: this._nk1
        };

        this.physics.add.collider(this._sk0, this._nk0, function(sk, nk){
            //alert("nk0");
            selfIt._moveInfo.moveToTarget = selfIt._nk1;
        });
        this.physics.add.collider(this._sk0, this._nk1, function(sk, nk){
            //alert("nk1");
            selfIt._moveInfo.moveToTarget = selfIt._nk0;
        });

    } catch(e) {
        var errMsg = this.getKey() + ".onLoadAssetsComplete.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

SceneCollision.prototype.moveSouthKorea = function() {
    try {
        if (this._moveInfo.moveToTarget != undefined) {
            var res = MoveTowards(this._sk0.x, this._sk0.y, this._moveInfo.moveToTarget.x, this._moveInfo.moveToTarget.y, 5.0);

            this._sk0.x = res[0];
            this._sk0.y = res[1];
        }
    } catch(e) {
        var errMsg = this.getKey() + ".moveSouthKorea.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}