class Sadari extends ClsObject {

    #_scene = undefined;
    #_index = -1;
    #_panHeight = -1;
    #_pan = undefined;
    #_headText = undefined;
    #_tailText = undefined;
    #_buttonO = undefined;
    #_buttonX = undefined;
    #_buttonInput = undefined;
    #_rect = undefined;
    #_enable = false;
    #_destroyMap = undefined;
    #_inputCb = undefined;
    #_lineInfo = undefined;

    constructor(name, scene, height, index, inputCb) {
        super(name)

        try {

            //
            this.#_scene = scene;
            this.#_index = index;
            this.#_panHeight = height;
            this.#_inputCb = inputCb;

            //
            this.#_destroyMap = new DestroyMap();

            // print name
            //this.printName();

            // create
            this.#create();

            // enable
            //this.#setEnable(true);
            this.#setEnable( (_gameStatus == GameStatus.INPUT) ? false : true );

        } catch(e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
    destroy() {
        try {

            this.#_destroyMap.destroyAll();

        } catch(e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // create
    #create() {
        try {

            // this
            let selfIt = this;

            // pan
            this.#_pan = this.#_scene.add.graphics();
            this.#_pan.fillStyle(0x901111);
            this.#_pan.fillRect(0, 0, SADARI_PAN_WIDTH, this.#_panHeight);
            this.#_pan.setDepth(DEPTH_SADARI_OBJECT);
            this.#_destroyMap.add(this.#_pan);

            // head text
            this.#_headText = addText(this.#_scene, 0, 0, this._name);//this.#_scene.add.text(0, 0, this._name).setOrigin(0.5);
            this.#_headText.setDepth(DEPTH_SADARI_OBJECT);
            this.#_destroyMap.add(this.#_headText);

            // tail text
            this.#_tailText = addText(this.#_scene, 0, 0, this._name);//this.#_scene.add.text(0, 0, this._name).setOrigin(0.5);
            this.#_tailText.setDepth(DEPTH_SADARI_OBJECT);
            this.#_destroyMap.add(this.#_tailText);

            if (_gameStatus == GameStatus.INPUT) {
                // o button
                this.#_buttonO = new EffectButton("o-button", 0, 0, "button_o", this.#_scene, 0, ()=>{
                    //alert(this._name +  ' - o button');
                    selfIt.#setEnable(true);
                });
                this.#_buttonO.visible = false;
                this.#_buttonO.setDepth(DEPTH_SADARI_OBJECT);
                this.#_destroyMap.add(this.#_buttonO);

                // x button
                this.#_buttonX = new EffectButton("x-button", 0, 0, "button_x", this.#_scene, 0, ()=>{
                    //alert(this._name +  ' - x button');
                    selfIt.#setEnable(false);
                });
                this.#_buttonX.setDepth(DEPTH_SADARI_OBJECT);
                this.#_destroyMap.add(this.#_buttonX);

                // input button
                this.#_buttonInput = new EffectButton("input-button", 0, 0, "button_t", this.#_scene, 0, ()=>{
                    selfIt.#_inputCb(selfIt.#_index);
                });
                this.#_buttonInput.setDepth(DEPTH_SADARI_OBJECT);
                this.#_destroyMap.add(this.#_buttonInput);
            } else if (_gameStatus == GameStatus.MAKE) {
                const edge = this.#_headText.height + (SADARI_TEXT_EDGE * 2);
                let lineArea = new Rect(0, 0, SADARI_PAN_WIDTH, this.#_panHeight - (edge * 2));
                this.#_lineInfo = this.#_destroyMap.add( new SadariLineInfo("lineinfo_" + this.#_index, this.#_scene, this.#_index, lineArea, edge) );
            }
            
            //
            this.#_rect = new Rect();

        } catch(e) {
            var errMsg = this.getExpMsg("create", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // setPosition
    setPosition(x, y) {
        try {
            //
            let panHalfWidth = SADARI_PAN_WIDTH / 2;

            //
            this.#_pan.x = x;
            this.#_pan.y = y;

            if (_gameStatus == GameStatus.INPUT)
            {
                // o button
                this.#_buttonO.setXY(x + SADARI_PAN_WIDTH - (this.#_buttonO.Width / 2), y + (this.#_buttonO.Height / 2));

                // x button
                this.#_buttonX.setXY(x + SADARI_PAN_WIDTH - (this.#_buttonO.Width / 2), y + (this.#_buttonO.Height / 2));

                // head text
                this.#_headText.x = x + panHalfWidth;
                this.#_headText.y = y + this.#_buttonO.Height + (this.#_headText.height / 2) + 5;

                // tail text
                this.#_tailText.x = x + panHalfWidth;
                this.#_tailText.y = y + this.#_buttonO.Height + this.#_tailText.height + (this.#_tailText.height / 2) + 5;

                // input button
                this.#_buttonInput.setXY(this.#_tailText.x, this.#_headText.y + (this.#_buttonInput.Height * 2));
            } else if (_gameStatus == GameStatus.MAKE) {
                // head text
                this.#_headText.x = x + panHalfWidth;
                this.#_headText.y = y + SADARI_TEXT_EDGE;

                // tail text
                this.#_tailText.x = x + panHalfWidth;
                this.#_tailText.y = y + this.#_panHeight - SADARI_TEXT_EDGE;

                // line info
                this.#_lineInfo.setPosition(x, y);
            }

            //
            this.#_rect.set(x, y, SADARI_PAN_WIDTH, this.#_panHeight);
            
        } catch(e) {
            var errMsg = this.getExpMsg("create", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    #setEnable(enable) {
        try {
            this.#_enable = enable;

            if (_gameStatus == GameStatus.INPUT) {
                this.#_buttonO.visible = !enable;
                this.#_buttonX.visible = enable;
                this.#_buttonInput.visible = enable;
            }

            let alpha = (enable === true) ? 1.0 : 0.6;
            this.#_pan.alpha = alpha;
            this.#_headText.alpha = alpha;
            this.#_tailText.alpha = alpha;

            this.loadText();
        } catch(e) {
            var errMsg = this.getExpMsg("setEnable", e);
            console.log(errMsg);
            alert(errMsg);
        }     
    }

    // get is enable
    get IsEnable() {
        return this.#_enable;
    }

    // get index
    get Index() {
        return this.#_index;
    }

    ///// <!-- storage text
    loadText() {
        try {
            if (this.#_enable == true) {
                this.#_headText.setText(getStorageHeadValue(this.#_index));
                this.#_tailText.setText(getStorageTailValue(this.#_index));
            } else {
                this.#_headText.setText(this._name);
                this.#_tailText.setText(this._name);
            }

        } catch(e) {
            var errMsg = this.getExpMsg("loadText", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    #saveText(headText, tailText) {
        try {
            setStorageHeadValue(this.#_index, headText);
            setStorageTailValue(this.#_index, tailText);
        } catch(e) {
            var errMsg = this.getExpMsg("saveText", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
    ///// storage text -->
    
    // 자신의 영역 안에 point 체크
    isInArea(x, y) {
        try {
            return this.#_rect.ptInRect(x, y);
        } catch(e) {
            var errMsg = this.getExpMsg("IsInArea", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get point coordinate point
    getPointerOfPoint(index) {
        try {
            return this.#_lineInfo.getPointerOfPoint(index);
        } catch(e) {
            var errMsg = this.getExpMsg("getPointerOfPoint", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get line point
    getLinePoint(index) {
        try {
            return this.#_lineInfo.getSadariPoint(index);
        } catch(e) {
            var errMsg = this.getExpMsg("getLinePoint", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}