class FireBall extends GOWImage {
    // ctor
    constructor(name, scene, x, y, targetX, targetY) {
        try {
            super(name);
            this.printName();

            this.setImgInfo(x, y, "FireBall").loadByScene(scene);

            this.moveAction(targetX, targetY);

        } catch(e) {
            logAlert(this._name + ".ctor.catched: " + e);
        }
    }

    moveAction(targetX, targetY) {
        try {
            let selfIt = this;

            let clearSelf = function() {
                clearInterval(timerId);
                selfIt.destroy();
            }

            let onMove = function() {
                if (selfIt._scene._isStopped == true) {
                    clearSelf();
                    return;
                }

                var res = MoveTowards(selfIt.getX(), selfIt.getY(), targetX, targetY, 8.0);
                selfIt.moveTo(res[0], res[1]);
                if (res[2] == true) {
                    clearSelf();
                    return;
                }
            }
            let timerId = setInterval(()=>onMove(), 10);
        } catch (e) {
            var errMsg = this._name + ".moveAction.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

}
