class SceneRotate extends SceneMenuBase {
    // ctor
    constructor(fps, gameHost) {
        super(fps, gameHost);
    }

    onCreate() {
        //alert("create " + this.getKey());

        this._isStopped = false;
    }

    getKey() {
        return SCENE_KEY_ROTATE;
    }   

    onStop() {
        try {
            console.log("onStop " + this.getKey());

            super.onStop();

            this._isStopped = true;

            // destroy resource
            this._fireBase.destroy();

            //this.input.off('pointerdown');
            //this.input.off('pointerup'); 
            
        } catch(e) {
            var errMsg = this.getKey() + ".onStop.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
    
    onLoadAssets() {
        try {   
            if (this._assetLoadCompleted == true)
            {
                this.onLoadAssetsComplete();
            }
            else
            {
                this.load.image("FireBase", "assets/image/fire_base.png");
                this.load.image("FireBall", "assets/image/fire_ball.png");
                this.load.start();
            }
        } catch(e) {
            var errMsg = this.getKey() + ".onLoadAssets.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
    
    onLoadingAssets(value) {
        try {
            console.log(this.getKey() + " loadinig... " + value);
        } catch(e) {
            var errMsg = this.getKey() + ".onLoadingAssets.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
    
    onLoadAssetsComplete() {
        try {
            console.log(this.getKey() + " asset load completed !!!");

            let xCenter = this.getSceneCenterX();
            let yCenter = this.getSceneCenterY();

            //
            let selfIt = this;

            // make fire base
            this._fireBase = new FireBase("FireBase", this, xCenter, yCenter);
            //this._fireBase.setScale(2.0);
            //this._fireBase.printSize(true);

            // pointer event
            this.addPointerEvent('down', (pointer)=>{
                let radian = selfIt._fireBase.getRotate() - (Math.PI / 2);
                let ballPos = getPointByRadianDistance(selfIt._fireBase.getX(), selfIt._fireBase.getY(), radian, 35);
                let target = getPointByPointDistance(selfIt._fireBase.getX(), selfIt._fireBase.getY(), ballPos.x, ballPos.y, selfIt.getSceneCenterY() + 20);
                var bollSpwan = new FireBall("firball", selfIt, ballPos.x, ballPos.y, target.x, target.y);

                selfIt._rotationPause = true;
                setTimeout(() => selfIt._rotationPause = false, 200);
            });

        } catch(e) {
            var errMsg = this.getKey() + ".onLoadAssetsComplete.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }


    onUpdate() {
        if (this._fireBase == undefined) { return; }
        else if (this._rotationPause == true) { return; }

        this._fireBase.incRotate(0.11);
        //this.groupTest();
    }

    // group test
    groupTest() {
        /*if (this._group == undefined) {
            let x = this.getSceneCenterX();
            let y = this.getSceneCenterY() + 100;

            let baseImg = this.add.image(x, y, "FireBase");
            let ballImg01 = this.add.image(x - 32, y, "FireBall");
            let ballImg02 = this.add.image(x + 32, y, "FireBall");

            this._group = this.add.group();
            this._group.add(baseImg);
            this._group.add(ballImg01);
            this._group.add(ballImg02);
        } else {
            this._group.rotation += 0.05;
            console.log('heel');
        } */

        /* if (this._cont == undefined) {
            let x = this.getSceneCenterX();
            let y = this.getSceneCenterY() + 100;

            let baseImg = this.add.image(x, y, "FireBase");
            let ballImg01 = this.add.image(x - 32, y, "FireBall");
            let ballImg02 = this.add.image(x + 32, y, "FireBall");

            this._cont = this.add.container();
            this._cont.add(baseImg);
            this._cont.add(ballImg01);

            this._center = {x: x, y: y};
            this._cont.add(ballImg02);

            //Phaser.Actions.RotateAroundDistance(this._cont, this._center, 0.01, 64);
        } else {
            //Phaser.Actions.RotateAroundDistance([this._cont], {x: 0, y: 0}, 0.01, 64);
            //const angleDeg = Math.atan2(this._cont.y - this._center.y, this._cont.x - this._center.x) * 180 / Math.PI;
            //this._cont.angle = angleDeg;//angleDeg+90 // container should face the center point
            this._cont.rotation += 0.05;
            //console.log('heel');
        } */

        if (this._baseImg == undefined) {
            let x = this.getSceneCenterX();
            let y = this.getSceneCenterY() + 100;

            this._baseImg = this.add.image(x, y, "FireBase");
            this._ballImg01 = this.add.image(x, y, "FireBall");
            this._ballImg02 = this.add.image(x, y, "FireBall");

            //this._baseImg.setOrigin(x, y);
            this._ballImg01.setOrigin(2.5, 0);
            this._ballImg02.setOrigin(-1.5, 0);
        } else {
            this._baseImg.rotation += 0.05;
            this._ballImg01.rotation += 0.05;
            this._ballImg02.rotation += 0.05;

            this._baseImg.x += 1.0;
            this._ballImg01.x += 1.0;
            this._ballImg02.x += 1.0;
        }
    }
}