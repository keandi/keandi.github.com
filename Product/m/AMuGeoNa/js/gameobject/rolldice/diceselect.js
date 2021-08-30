class DiceSelect extends ClsObject {
    #_PV = {}

    // ctor
    constructor(name, scene, x, y, maxSize, diceNumber, selectCb) {
        try {
            super(name);

            this.#_PV.scene = scene;
            this.#_PV.diceNumber = diceNumber;
            this.#_PV.selectCb = selectCb; // cb(diceNumber)
            this.#_PV.coords = {x: x, y: y, maxSize: maxSize};

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

            v.diceSelect = new GOSelectImageButton("imgbtn_" + this.Name, v.scene, v.coords.x, v.coords.y, v.coords.maxSize, "dice_sprite", 'DICE_' + v.diceNumber,
                v.diceNumber, v.selectCb );
            v.diceSelect.setDepth( DEPTH_ROLLDICE_BUTTON );

        } catch (e) {
            var errMsg = this.getExpMsg("create", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get value
    get Value() {
        return this.#_PV.diceSelect.Value;
    }

    // unselect
    unselect() {
        try {
            
            this.#_PV.diceSelect.select(false);

        } catch (e) {
            var errMsg = this.getExpMsg("unselect", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // visible
    set Visible(value) {
        this.#_PV.diceSelect.Visible = value;
    }
}