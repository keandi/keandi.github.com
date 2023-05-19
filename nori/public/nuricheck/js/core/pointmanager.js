class PointManager extends ClsObject {
    #_PV = {};

    // ctor
    constructor(name, maxPoint, exhaustedCallback) {
        super(name);

        try {
            let v = this.#_PV;
            
            v.maxPoint = maxPoint;
            v.exhaustedCallback = exhaustedCallback;

            //
            this.reset();
            
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 모두 소진 알림
    #fireExhaust() {
        try {
            let v = this.#_PV;
            if (v.exhaustedCallback == undefined) { return; }            
            v.exhaustedCallback();
        } catch (e) {
            var errMsg = this.getExpMsg("fireExhaust", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // reset
    reset() {
        try {
            this.#_PV.curPoint = this.#_PV.maxPoint;
        } catch (e) {
            var errMsg = this.getExpMsg("reset", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // reset max
    resetMax(max) {
        try {
            this.#_PV.maxPoint = max;
            this.reset();
        } catch (e) {
            var errMsg = this.getExpMsg("reset", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // decrease
    decrease(value) {
        try {
            if (value == undefined || value <= 0) { return; }

            let v = this.#_PV;

            v.curPoint -= value;
            if (v.curPoint <= 0) {
                v.curPoint = 0;
                this.#fireExhaust();
            }

            //console.log('point: ' + v.curPoint);
        } catch (e) {
            var errMsg = this.getExpMsg("decrease", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // increase
    increase(value) {
        try {
            if (value == undefined || value <= 0) { return; }

            let v = this.#_PV;

            v.curPoint += value;
            if (v.curPoint > v.maxPoint) {
                v.curPoint = v.maxPoint;
            }
        } catch (e) {
            var errMsg = this.getExpMsg("increase", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // max
    get Max() {
        return this.#_PV.maxPoint;
    }

    // current
    get Current() {
        return this.#_PV.curPoint;
    }
}