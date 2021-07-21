class SadariLinePoint extends ClsObject {
    #_PV = {}; // private variables

    constructor(name, scene, parent, index, pointMaxCount, relativeY) {
        try {
            super(name);

            //
            this.#_PV.scene = scene;
            this.#_PV.parent = parent;
            this.#_PV.index = index;
            this.#_PV.pointMaxCount = pointMaxCount;
            this.#_PV.relativeY = relativeY;

            //
            this.#create();

        } catch(e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    #create() {
        try {

            this.#_PV.point = this.#_PV.scene.add.circle(0, 0, SADARI_POINT_RADIUS, SADARI_LINE_COLOR);
            this.#_PV.point.setDepth(DEPTH_POINT);
            if (this.#_PV.index > 0 && this.#_PV.index < this.#_PV.pointMaxCount - 1) {
                // guider 생성
                this.#_PV.pointGuider = this.#_PV.scene.add.image(0, 0, 'point_guider');
                this.#_PV.pointGuider.setDepth( DEPTH_POINT_GUIDER );

                // register at scene
                this.#_PV.scene.addDragGuiders(this);
                //sthis.#_PV.pointGuider.setInteractive({ draggable: true })
                //this.#_PV.scene.input.setDraggable(this.#_PV.pointGuider);
            }

        } catch(e) {
            var errMsg = this.getExpMsg("create", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        try {

            this.#_PV.point.destroy();
            this.destroyGuider();
        } catch(e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroyGuider() {
        try {
            if (this.#_PV.pointGuider == undefined) { return; }
            this.#_PV.pointGuider.destroy();
            this.#_PV.pointGuider = undefined;
        } catch(e) {
            var errMsg = this.getExpMsg("destroyGuider", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // reset prev/next info
    resetLinkInfo() {
        try {

            if (this.#_PV.index <= 0) {
                this.#_PV.prev = undefined;
                this.#_PV.next = this.#_PV.parent.getSadariPoint(this.#_PV.index + 1);
            } else if (this.#_PV.index >= this.#_PV.pointMaxCount - 1) {
                this.#_PV.prev = this.#_PV.parent.getSadariPoint(this.#_PV.index - 1);
                this.#_PV.next = undefined;
            } else {
                this.#_PV.prev = this.#_PV.parent.getSadariPoint(this.#_PV.index - 1);
                this.#_PV.next = this.#_PV.parent.getSadariPoint(this.#_PV.index + 1);
            }

        } catch(e) {
            var errMsg = this.getExpMsg("resetLinkInfo", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    setPosition(x, y) {
        try {

            y += this.#_PV.relativeY;

            this.#_PV.point.x = x;
            this.#_PV.point.y = y;

            if (this.#_PV.pointGuider != undefined) {
                this.setGuiderPosition(x, y);
            }

            if (this.#_PV.pointGuiderPt == undefined) {
                this.#_PV.pointGuiderPt = new Point(x, y);
            } else {
                this.#_PV.pointGuiderPt.set(x, y);
            }
        } catch(e) {
            var errMsg = this.getExpMsg("setPosition", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    setGuiderPosition(x, y) {
        try {

            this.#_PV.pointGuider.x = x;
            this.#_PV.pointGuider.y = y;

        } catch(e) {
            var errMsg = this.getExpMsg("setGuiderPosition", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    resetGuiderPosition() {
        try {

            this.setGuiderPosition(this.#_PV.pointGuiderPt.X, this.#_PV.pointGuiderPt.Y);

            this.#_PV.pointGuider.alpha = 1.0;
            this.#_PV.pointGuider.scale = 1;
            this.#_PV.pointGuider.setDepth(DEPTH_POINT_GUIDER);

        } catch(e) {
            var errMsg = this.getExpMsg("resetGuiderPosition", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // guider expression
    setGuiderExpand() {
        try {

            this.#_PV.pointGuider.alpha = 0.8;
            this.#_PV.pointGuider.scale = 1.2;
            this.#_PV.pointGuider.setDepth(DEPTH_POINT_DRAG_GUIDER);

        } catch(e) {
            var errMsg = this.getExpMsg("setGuiderExpand", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    get Guider() {
        return this.#_PV.pointGuider;
    }

    get Parent() {
        return this.#_PV.parent;
    }

    get Index() {
        return this.#_PV.index;
    }

    get SadariIndex() {
        return this.Parent.Index;
    }

    get GuiderPointer() {
        return this.#_PV.pointGuiderPt;
    }

    get Prev() {
        return this.#_PV.prev;
    }

    get Next() {
        return this.#_PV.next;
    }

    get OrgNext() {
        return this.#_PV.parent.getSadariPoint(this.#_PV.index + 1);
    }

    // in point
    isIn(x, y) {
        try {

            if (this.#_PV.pointGuiderRect == undefined) {
                this.#_PV.pointGuiderRect = new Rect();
            }
            this.#_PV.pointGuiderRect.makeFromCenterPointer(this.#_PV.pointGuiderPt.X, this.#_PV.pointGuiderPt.Y, this.#_PV.pointGuider.width, this.#_PV.pointGuider.height);

            let res = this.#_PV.pointGuiderRect.ptInRect(x, y);
            /*console.log(
                stringFormat(
                    "isIn:: l:{0}, t:{1}, r:{2}, b:{3}, x:{4}, y{5}, isIn? {6} "
                    , this.#_PV.pointGuiderRect.Left
                    , this.#_PV.pointGuiderRect.Top
                    , this.#_PV.pointGuiderRect.Right
                    , this.#_PV.pointGuiderRect.Bottom
                    , x
                    , y
                    , res
                )
            );*/

            return res;

        } catch(e) {
            var errMsg = this.getExpMsg("isIn", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return false;
    }

    // set next
    setNext(point) {
        try {
            this.#_PV.next = point;
        } catch(e) {
            var errMsg = this.getExpMsg("setNext", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}