class ProgressBar extends ClsObject {
    #_PV = {};

    // ctor
    constructor(name, scene, x, y, width, height, min, max, backColor, foreColor, borderDepth, backAlpha, foreAlpha, maxCallback) {
        try {
            super(name);

            //
            let v = this.#_PV;

            v.scene = scene;

            v.rect = {
                background: new Rect(x, y, width, height),
                foreground: undefined
            };
            v.rect.foreground = v.rect.background.copyFromThis();
            v.rect.foreground.deflate(borderDepth, borderDepth);

            v.color = {
                background: backColor,
                foreground: foreColor
            };

            v.progress = {
                min: Math.min(min, max),
                max: Math.max(min, max),
                value: 0
            };

            v.alpha = {
                background: (backAlpha == undefined) ? 1 : backAlpha,
                foreground: (foreAlpha == undefined) ? 1 : foreAlpha
            };

            v.object = {
                foreground: undefined,
                background: undefined
            };

            v.maxCallback = maxCallback;


            //
            this.#create();

            // register self destroy
            scene.addDestroyableObject(this);

            //
            this.Value = v.progress.min;
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
    destroy() {
        try {
            this.#clear();
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // clear
    #clear() {
        try {
            let v = this.#_PV;

            destroyObjects( v.object.foreground, v.object.background );
            v.object.foreground = v.object.background = undefined;
        } catch (e) {
            var errMsg = this.getExpMsg("clear", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // create
    #create() {
        try {
            this.#clear();

            //
            let v = this.#_PV;

            // background
            {
                let back = v.scene.add.graphics();
                back.setDepth(DEPTH_GAMEINFO_UI);

                back.fillStyle(v.color.background, v.alpha.background);
                back.fillRect(v.rect.background.X, v.rect.background.Y, v.rect.background.Width, v.rect.background.Height);

                v.object.background = back;
            }

            // foreground
            {
                v.object.foreground = v.scene.add.graphics();
                v.object.foreground.setDepth(DEPTH_GAMEINFO_UI);
            }

            // data

        } catch (e) {
            var errMsg = this.getExpMsg("create", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set value
    set Value(value) {
        try {
            let v = this.#_PV;

            // min max 교정
            let max = v.progress.max;
            const gap = (v.progress.min === 0) ? 0 : v.progress.min;
            if (gap != 0) {
                value -= gap;
                max -= gap;
            }

            if (value > max) { value = max; }

            v.progress.value = value;

            v.object.foreground.clear();
            if (value === 0) { return; }

            const anyValue = value / max;
            let progressWidth = anyValue * v.rect.foreground.Width;

            if (progressWidth > v.rect.foreground.Width) {
                progressWidth = v.rect.foreground.Width;
            }

            v.object.foreground.fillStyle(v.color.foreground, v.alpha.foreground);
            v.object.foreground.fillRect(v.rect.foreground.X, v.rect.foreground.Y, progressWidth, v.rect.foreground.Height);
            v.object.foreground.setDepth(DEPTH_GAMEINFO_UI);

            if (v.maxCallback != undefined && this.IsMax === true) {
                v.maxCallback();
            }

        } catch (e) {
            var errMsg = this.getExpMsg("Value", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get value
    get Value() {
        return this.#_PV.progress.value;
    }

    // is max?
    get IsMax() {
        return (this.#_PV.progress.value >= this.#_PV.progress.max) ? true : false;
    }

    // increase
    increase() {
        try {
            this.Value = this.#_PV.progress.value + 1;
        } catch (e) {
            var errMsg = this.getExpMsg("increase", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

}