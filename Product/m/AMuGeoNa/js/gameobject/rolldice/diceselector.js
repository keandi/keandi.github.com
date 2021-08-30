class DiceSelector extends ClsObject {
    #_PV = {}

    // ctor
    constructor(name, scene, x, y, maxSize, xGap, selectCb) {
        try {
            super(name);

            this.#_PV.scene = scene;
            this.#_PV.coords = {
                x: x,
                y: y,
                maxSize,
                xGap: xGap
            };
            this.#_PV.selectCb = selectCb; // cb(diceNumber)
            this.#_PV.dices = [];
            this.#_PV.selectedValue = 0;

            this.#create();

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

        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    //create
    #create() {
        try {
            
            let v = this.#_PV;

            let x = v.coords.x;
            for (var i = 1; i <= 6; i++) {
                var btn = new DiceSelect("diceselect_" + i, v.scene, x, v.coords.y, v.coords.maxSize, i, (number)=>{
                    v.selectCb(number);
                    v.selectedValue = number;
                    v.dices.forEach(btn => {
                        if (btn.Value !== number) {
                            btn.unselect();
                        }
                    });
                });
                v.dices.push( btn );
                x += v.coords.xGap;
            }

        } catch (e) {
            var errMsg = this.getExpMsg("create", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get selected value
    get SelectedValue() {
        return this.#_PV.selectedValue;
    }

    // unselect all
    unselectAll() {
        try {
            this.#_PV.dices.forEach(element => {
                element.unselect();
            });
        } catch (e) {
            var errMsg = this.getExpMsg("unselectAll", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

}