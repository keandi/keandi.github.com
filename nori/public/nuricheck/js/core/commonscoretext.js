class CommonScoreText extends DestroyableObject {
    #_PV = {};

    //ctor
    constructor(name, scene, x, y, goal, textSize, textColor) {
        try {
            super(name, scene);

            let v = this.#_PV;

            v.scene = scene;
            v.goal = goal;
            v.current = 0;
            v.textSize = textSize;
            v.tgextColor = textColor;
            v.position = {x: x, y: y};
            v.text = undefined;

            this.#createText();
            
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
    destroy() {
        try {
            super.destroy();

            let v = this.#_PV;
            destroyObject(v.text);
            
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // create text
    #createText() {
        try {
            let v = this.#_PV;
            v.text = addText(v.scene, v.position.x, v.position.y, this.#Text, v.textSize, v.textColor).setDepth(DEPTH_SCORE_TEXT);

        } catch (e) {
            var errMsg = this.getExpMsg("#createText", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get display text
    get #Text() {
        try {
            let v = this.#_PV;
            return numberWithCommas(v.current) + " / " + (v.goal);
        } catch (e) {
            var errMsg = this.getExpMsg("#Text", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set current
    setCurrent(value) {
        try {
            let v = this.#_PV;
            v.current = value;
            v.text.setText(this.#Text);
        } catch (e) {
            var errMsg = this.getExpMsg("setCurrent", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}