class BrokenImg extends GOWImage {
    // ctor
    constructor(name, scene, x, y) {
        try {
            super(name);
            //this.printName();

            this.setImgInfo(x, y, "brokenGlass").loadByScene(scene);
            //this.setScale(3.0);
            //this.setInteractive(true);
            //this.registerPointerDown();
        } catch(e) {
            logAlert(this._name + "ctor.catched: " + e);
        }
    }

    action(x, y) {
        try {

            var selfIt = this;            
            let alpha = 1.0;

            function action() {
                alpha -= 0.25;
                if (alpha <= 0.0)
                {
                    clearInterval(timerId);
                    selfIt.destroy();
                }
                else
                {
                    selfIt.setAlpha(alpha);
                }
            };

            let timerId = setInterval(() => action(), 80);
        } catch(e) {
            logAlert(this._name + "action.catched: " + e);
        }
    }
}