class CameraDrag extends ClsObject {
    #_PV = {};

    // ctor
    constructor(name, camera, bounds, boundsLimit) {
        try {
            super(name);

            this.#_PV.camera = camera;
            this.#_PV.camera.setBounds(bounds.X, bounds.Y, bounds.Width, bounds.Height);
            this.#_PV.boundsLimit = boundsLimit;
            this.#_PV.center = {x: 0, y: 0};

            this.onSceneDrag(0, 0);
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onSceneDrag(x, y) {
        try {

            let center = this.#_PV.center;
            center.x -= x;
            center.y -= y;

            //
            let limit = this.#_PV.boundsLimit;
            
            if (center.x < limit.X) { center.x = limit.X; }
            else if (center.x > limit.Right) { center.x = limit.Right; }

            if (center.y < limit.Y) { center.y = limit.Y; }
            else if (center.y > limit.Bottom) { center.y = limit.Bottom; }

            //
            this.#_PV.camera.centerOn(center.x, center.y);

        } catch (e) {
            var errMsg = this.getExpMsg("onSceneDrag", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}