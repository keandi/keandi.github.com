class SadariLineInfo extends ClsObject {

    #_private = {};

    constructor(name, scene, index, lineArea, relativeYGap) {
        super(name);

        try {

            //
            this.#_private.scene = scene;
            this.#_private.index = index;
            this.#_private.lineArea = lineArea;
            this.#_private.relativeYGap = relativeYGap;
            this.#_private.destroyMap = new DestroyMap();

            // create
            this.#create(); 

        } catch(e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        try {

            this.#_private.destroyMap.destroy();

        } catch(e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    #create() {
        try {

            // this
            let selfIt = this;

            // main line
            this.#_private.base = this.#_private.destroyMap.add( drawLine(this.#_private.scene, 
                this.#_private.lineArea.CenterX, 
                this.#_private.lineArea.Top, 
                this.#_private.lineArea.CenterX, 
                this.#_private.lineArea.Bottom, 
                SADARI_LINE_THIKNESS, SADARI_LINE_COLOR) );

            // line points
            const lineCY = this.#_private.lineArea.Height;
            const heightCount = parseInt(lineCY / SADARI_LINE_MIN_YGAP);
            const pointsCount = heightCount + 1;
            const pointYGap = (lineCY / heightCount) 

            this.#_private.points = [];
            let relativeY = 0;
            for (var i = 0; i < pointsCount; i++) {
                if (i <= 0) {
                    relativeY = this.#_private.relativeYGap;
                } else if (i >= pointsCount - 1) {
                    relativeY = this.#_private.relativeYGap + lineCY;
                } else {
                    relativeY += pointYGap;
                }

                this.#_private.points.push(
                    this.#_private.destroyMap.add(
                        new SadariLinePoint( stringFormat("{0}_point_{1}", this._name, this.#_private.index)
                            , this.#_private.scene
                            , this
                            , i
                            , pointsCount 
                            , relativeY
                            )
                    )
                );
            }

        } catch(e) {
            var errMsg = this.getExpMsg("create", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    setPosition(x, y) {
        try {

            // base line
            this.#_private.base.x = x;
            this.#_private.base.y = this.#_private.lineArea.Top + this.#_private.relativeYGap;

            // line points
            this.#_private.points.forEach(element => {
                element.setPosition(x + this.#_private.lineArea.HalfWidth, y);
            });

        } catch(e) {
            var errMsg = this.getExpMsg("setPosition", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

     // get sadari point
     getSadariPoint(index) {
        try {
            return this.#_private.points[index];
        } catch(e) {
            var errMsg = this.getExpMsg("getSadariPoint", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get index
    get Index() {
        return this.#_private.index;
    }
}