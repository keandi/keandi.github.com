class SouthKorea extends GOWImage {
    // ctor
    constructor(name, scene, x, y) {
        try {
            super(name);
            this.printName();

            this.setImgInfo(x, y, "southKorea").loadByScene(scene);
            this.setScale(3.0);
            this.setInteractive(true);
            this.registerPointerDown();
        } catch(e) {
            logAlert(this._name + "ctor.catched: " + e);
        }
    }

    onPointerDown(x, y) {
        try {
            //alert(this._name + " - x: " + x + ", y:" + y);
            this._scene.onImgDown(this);
        } catch(e) {
            logAlert(this._name + "ctor.catched: " + e);
        }
    }
}

/*var SouthKorea = function(scene, x, y) {

    ImageObject.call(this, scene, 'southKorea', x, y);
    this.setScale(4);

    console.log("x: " + x + ", y: " + y);
}

SouthKorea.prototype = Object.create(ImageObject.prototype);
SouthKorea.prototype.constructor = SouthKorea;

///////////////////////////////////////////////////////////////////////////////////////////
// click action
SouthKorea.prototype.action = function(x, y) {
    try {

        // ???

    } catch(e) {
        var errMsg = "SouthKorea.action.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}
*/