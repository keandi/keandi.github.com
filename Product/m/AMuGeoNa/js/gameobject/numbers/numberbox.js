/*
 숫자를 가지고 있는 Box 그래픽
*/

class NumberBox extends ClsObject {
    #_PV = {};

    constructor(name, scene, x, y, boxSize) {
        try {
            super(name);

            let v = this.#_PV;
            v.scene = scene;
            const halfSize = (boxSize / 2);
            v.rect = new Rect(x - halfSize, y - halfSize, boxSize, boxSize);
            v.number = Math.floor(Math.random() * 1) + 1;
            v.g = v.scene.add.graphics();
            v.text = undefined;

            this.#draw();

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        try {
            let v = this.#_PV;

            destroyObjects( v.text, v.g );

        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // draw box
    #draw() {
        try {
            let v = this.#_PV;
            v.g.clear();

            let copyDrawRc = function(val, color) {
                var rc = v.rect.copyFromThis();
                rc.deflate(val, val);
                drawRect(v.g, color, rc);    
            };

            copyDrawRc(1, COLOR_NUMBERS_BASECOLOR);
            copyDrawRc(5, COLOR_BACKGROUND_PHASER);

            destroyObject(v.text);
            v.text = addText(v.scene, v.rect.CenterX, v.rect.CenterY, v.number, 14, COLOR_NUMBERS_BASECOLOR );

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    //re pos + re draw
    redraw(x, y) {
        try {
            let v = this.#_PV;
            v.rect.CenterX = x;
            v.rect.CenterY = y;

            this.#draw();
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    get X() {
        return this.#_PV.rect.CenterX;
    }

    get Y() {
        return this.#_PV.rect.CenterY;
    }
}