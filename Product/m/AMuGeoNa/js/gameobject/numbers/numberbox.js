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
            v.boxSize = boxSize;
            const halfSize = (boxSize / 2);
            v.rect = new Rect(x - halfSize, y - halfSize, boxSize, boxSize);
            v.number = Math.floor(Math.random() * 2) + 1;
            v.textSize = Math.floor(boxSize / 6) + 1;
            v.g = v.scene.add.graphics();
            v.text = undefined;

            this.#draw();
            this.setDepthAsGeneral();

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

            if (v.text == undefined) {
                v.text = addText(v.scene, v.rect.CenterX, v.rect.CenterY, "" + v.number, 20, COLOR_NUMBERS_BASECOLOR );
            } else {
                v.text.x = v.rect.CenterX;
                v.text.y = v.rect.CenterY;
                //v.text.setText(v.number);
            }

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
            var errMsg = this.getExpMsg("redraw", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // draw
    refresh() {
        try {
            this.#draw();
        } catch (e) {
            var errMsg = this.getExpMsg("refresh", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // return center x
    get X() {
        return this.#_PV.rect.CenterX;
    }

    // return center y
    get Y() {
        return this.#_PV.rect.CenterY;
    }

    // return number
    get Number() {
        return this.#_PV.number;
    }

    // compare box number value
    isEqualNumber(box) {
        try {
            return (box.Number === this.Number) ? true : false;
        } catch (e) {
            var errMsg = this.getExpMsg("isEqualNumber", e);
            console.log(errMsg);
            alert(errMsg);
        }
        return false;
    }

    // box number fusion
    fusion(box) {
        try {
            if (this.isEqualNumber(box) === true) {
                let v = this.#_PV;

                v.number *= 2;
                if (v.text != undefined) {
                    v.text.setText("" + v.number);
                }
                //destroyObject(this.#_PV.text);
                //this.#_PV.text = undefined;
                this.refresh();

                return true;
            } else {
                return false;
            }
        } catch (e) {
            var errMsg = this.getExpMsg("fusion", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // move
    moveTo(x, y) {
        try {
            let v = this.#_PV;

            //let computed = MoveTowards(v.rect.CenterX, v.rect.CenterY, x, y, VELOCITY_NUMBERBOX_MOVE);
            let computed = MoveTowards(v.rect.CenterX, v.rect.CenterY, x, y, v.boxSize / 5);
            this.redraw(computed[0], computed[1]);
            return computed[2];
        } catch (e) {
            var errMsg = this.getExpMsg("moveTo", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // debug number text
    increaseNumber() {
        try {
            let v = this.#_PV;
            v.number++;
            v.text.setText("" + v.number);
            this.refresh();
        } catch (e) {
            var errMsg = this.getExpMsg("increaseNumber", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set box depth
    #setBoxDepth(depth) {
        try {
            let v = this.#_PV;

            if (v.g != undefined) {
                v.g.setDepth(depth);
            }

            if (v.text != undefined) {
                v.text.setDepth(depth);
            }
        } catch (e) {
            var errMsg = this.getExpMsg("depth", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set box depth - general
    setDepthAsGeneral() {
        this.#setBoxDepth(DEPTH_NUMBERS_GENERAL);
    }

    // set box depth - moving
    setDepthAsMoving() {
        this.#setBoxDepth(DEPTH_NUMBERS_MOVING);
    }

}