class SerialLoaderProgress extends ClsObject {
    #_PV = {};

    // ctor
    constructor(name, scene, x, y, width, height, total) {
        super(name);

        try {

            // scene
            this.#_PV.scene = scene;

            // rect
            let sceneRect = new Rect(x, y, width, height);
            const backOuterWidth = parseInt(width / 2);
            const backOuterHeight = 45;
            let backOuterRect = new Rect(sceneRect.CenterX - parseInt( backOuterWidth / 2 ), sceneRect.CenterY - ( parseInt(backOuterHeight / 2) ), backOuterWidth, backOuterHeight);

            const rectGap = 4;
            let backInnerRect = new Rect(backOuterRect.X + rectGap, backOuterRect.Y + rectGap, backOuterRect.Width - (rectGap * 2), backOuterRect.Height - (rectGap * 2));

            let progressRect = new Rect(backInnerRect.X, backInnerRect.Y, backInnerRect.Width, backInnerRect.Height);

            this.#_PV.rect = {
                scene: sceneRect,
                backOuter: backOuterRect,
                backInner: backInnerRect,
                progress: progressRect
            };

            // value
            this.#_PV.progress = {
                current: 0,
                min: 0,
                max: total,
                singleWidth: (backInnerRect.Width / total)
            };

            // create
            this.#create();

        } catch (e) {
            var m = this.getExpMsg("ctor", e);
            console.log(m);
            alert(m);
        }
    }

    // create
    #create() {
        try {
            this.destroy();

            //
            var scene = this.#_PV.scene;

            // make rectangle
            let makeRectangle = function(rect, color) {
                let g = scene.add.graphics();

                g.fillStyle(color, 1.0);
                g.fillRect(rect.X, rect.Y, rect.Width, rect.Height);

                return g;
            }

            // create rect
            let outer = makeRectangle(this.#_PV.rect.backOuter, 0xEAEAEA);
            let inner = makeRectangle(this.#_PV.rect.backInner, 0x252525);
            let progress = makeRectangle(this.#_PV.rect.progress, 0xFE4545);

            // create text
            let percent = scene.add.text(this.#_PV.rect.scene.Left + scene.getSceneCenterX(), this.#_PV.rect.scene.Top + scene.getSceneCenterY(), "0 %").setOrigin(0.5);

            //
            this.#_PV.object = {
                outer: outer,
                inner: inner,
                progress: progress,
                percent: percent
            };

            this.#_PV.object.outer.visible = this.#_PV.object.inner.visible = this.#_PV.object.progress.visible = this.#_PV.object.percent.visible = false;

            this.#_PV.stopWatch = new ElapsedTime();

            //
            //progress.x = this.#_PV.rect.backInner.x;
            //progress.y = this.#_PV.rect.backInner.y;
            progress.visible = false;

        } catch (e) {
            var m = this.getExpMsg("create", e);
            console.log(m);
            alert(m);
        }
    }

    // destroy
    destroy() {
        try {
            if (this.#_PV.object == undefined) { return; }

            this.#_PV.object.outer.destroy();
            this.#_PV.object.inner.destroy();
            this.#_PV.object.progress.destroy();
            this.#_PV.object.percent.destroy();

            this.#_PV.object = undefined;

            this.#_PV.stopWatch = undefined;

        } catch (e) {
            var m = this.getExpMsg("destroy", e);
            console.log(m);
            alert(m);
        }
    }

    // update
    update(value) {
        try {
            if (this.#_PV.object == undefined) { return; }

            if (value == undefined) { value = 1; }

            if (this.#_PV.stopWatch != undefined) {
                if (this.#_PV.stopWatch.Elapsed > 500) {
                    this.#_PV.object.outer.visible = this.#_PV.object.inner.visible = this.#_PV.object.progress.visible = this.#_PV.object.percent.visible = true;
                    this.#_PV.stopWatch = undefined;
                } else {
                    console.log("elspsed: " + this.#_PV.stopWatch.Elapsed);
                }
            }

            if (this.#_PV.object.outer.visible == false) { return; }

            var progressRect = this.#_PV.rect.progress;
            /*progressRect.Width += this.#_PV.progress.singleWidth;
            if (progressRect.Width > this.#_PV.rect.backInner.Width) {
                progressRect.Width = this.#_PV.rect.backInner.Width;
            }

            var progress = this.#_PV.object.progress;
            progress.w = progressRect.Width;
            progress.h = this.#_PV.rect.backInner.Height;
            */

            this.#_PV.progress.current += value;

            var progress = this.#_PV.object.progress;
            let current = this.#_PV.progress.current / this.#_PV.progress.max;
            //progress.scaleX = current; 

            //progress.x = (progressRect.Left - ((this.#_PV.progress.singleWidth * this.#_PV.progress.current) / 2) );

            progress.clear();
            progress.fillStyle(0xFE4545, 1.0);
            progress.fillRect(this.#_PV.rect.progress.X, this.#_PV.rect.progress.Y, this.#_PV.progress.current * this.#_PV.progress.singleWidth, this.#_PV.rect.progress.Height);

            //progress.visible = true;

            // percent
            var percentText = parseInt(current * 100) + " %";
            this.#_PV.object.percent.setText(percentText);
            

        } catch (e) {
            var m = this.getExpMsg("update", e);
            console.log(m);
            alert(m);
        }
    }
}