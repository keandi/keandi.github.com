class MessageBox extends ClsObject {
    #_scene = undefined;
    #_rect = undefined;
    #_basePan = undefined;
    #_msgText = undefined;
    #_okButton = undefined;
    #_visible = false;
    #_uiGap = {};

    constructor(name, scene, rect) {
        super(name);

        try {

            this.#_scene = scene;
            this.#_rect = rect;
            this.#_rect.setCenter(0, 0);

            // UI create
            this.#createUI();
            
            // print name
            this.printName();

        } catch(e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        try {
            this.#_basePan.destroy();
            this.#_msgText.destroy();
            this.#_okButton.destroy();
        } catch(e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    #createUI() {
        try {
            // this
            let selfIt = this;

            // base pan
            this.#_basePan = this.#_scene.add.graphics();
            this.#_basePan.fillStyle(MSGBOX_BACKCOLOR);
            this.#_basePan.fillRect(this.#_rect.X, this.#_rect.Y, this.#_rect.Width, this.#_rect.Height);
            this.#_basePan.alpha = MSGBOX_BACKALPHA;
            this.#_basePan.setDepth(DEPTH_MSGBOX);

            // text
            const textArea = new Rect(this.#_rect.X, this.#_rect.Y, this.#_rect.Width, this.#_rect.Height - MSGBOX_BUTTONAREA_HEIGHT);
            this.#_msgText = this.#_scene.add.text(textArea.CenterX, textArea.CenterY, "  ").setOrigin(0.5);
            this.#_msgText.setDepth(DEPTH_MSGBOX);
            this.#_uiGap.textCenterGap = {
                x: this.#_rect.CenterX - textArea.CenterX,
                y: this.#_rect.CenterY - textArea.CenterY,
            };

            // button
            const buttonArea = new Rect(this.#_rect.X, textArea.Bottom + 1, this.#_rect.Width, MSGBOX_BUTTONAREA_HEIGHT);
            this.#_okButton = new EffectButton("msgbox_okbutton", buttonArea.CenterX, buttonArea.CenterY, "button_ok", this.#_scene, 10, ()=>selfIt.hide());
            this.#_okButton.setDepth(DEPTH_MSGBOX);
            this.#_uiGap.buttonCenterGap = {
                x: this.#_rect.CenterX - buttonArea.CenterX,
                y: this.#_rect.CenterY - buttonArea.CenterY,
            };

            this.hide();
        } catch(e) {
            var errMsg = this.getExpMsg("createUI", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    show(message, x, y) {
        try {

            this.#_rect.setCenter(x, y);

            //
            this.#_basePan.x = x;
            this.#_basePan.y = y;

            this.#_msgText.x = x - this.#_uiGap.textCenterGap.x;
            this.#_msgText.y = y - this.#_uiGap.textCenterGap.y;

            this.#_okButton.setXY(x - this.#_uiGap.buttonCenterGap.x, y - this.#_uiGap.buttonCenterGap.y);

            //
            this.#_msgText.setText(message);

            this.#_basePan.visible = true;
            this.#_msgText.visible = true;
            this.#_okButton.visible = true;

            _evtLock.IsDragLock = true;
        } catch(e) {
            var errMsg = this.getExpMsg("show", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    hide() {
        try {
            this.#_basePan.visible = false;
            this.#_msgText.visible = false;
            this.#_okButton.visible = false;

            _evtLock.IsDragLock = false;
        } catch(e) {
            var errMsg = this.getExpMsg("hide", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    get 
}