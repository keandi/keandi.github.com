class MsgBox extends ClsObject {
    #_PV = {};

    //ctor
    constructor(name, scene) {
        try {
            super(name);

            this.#_PV.scene = scene;

            
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
    destroy() {
        try {
            let v = this.#_PV;

            if (v.objects != undefined)
            {
                destroyObjects( v.objects.graphics, v.objects.ok, v.objects.yes, v.objects.no, v.objects.title, v.objects.content );
                v.objects = undefined;
            }
            
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // create box
    #createBox(x, y) {
        try {
            let v = this.#_PV;
            const contentRc = v.scene.ContentRc;
            const boxSize = {
                cx: Math.min(SIZE_MSGBOX_MAX_WIDTH , contentRc.Width - 20),
                cy: Math.min(SIZE_MSGBOX_MAX_HEIGHT , contentRc.Height - 20)
            };

            // box rect
            v.rect.box = new Rect(contentRc.Left + parseInt((contentRc.Width - boxSize.cx) / 2), 
                contentRc.Top + ((contentRc.Height - boxSize.cy) / 2), 
                boxSize.cx, boxSize.cy);

            // title rect
            v.rect.title = v.rect.box.copyFromThis();
            v.rect.title.deflate(SIZE_MSGBOX_BORDER, SIZE_MSGBOX_BORDER);
            v.rect.title.Height = SIZE_MSGBOX_TITLE_HEIGHT;

            // buttons rect
            v.rect.buttons = v.rect.title.copyFromThis();
            v.rect.buttons.Top = v.rect.box.Bottom - (SIZE_MSGBOX_BUTTON_HEIGHT + SIZE_MSGBOX_BORDER);;
            v.rect.buttons.Height = SIZE_MSGBOX_BUTTON_HEIGHT;

            // ok button rect
            v.rect.ok = new Rect(v.rect.buttons.Right - v.rect.buttons.Height, v.rect.buttons.Top, v.rect.buttons.Height, v.rect.buttons.Height);

            // yes button rect
            v.rect.yes = v.rect.ok.copyFromThis();
            v.rect.yes.offset(- v.rect.yes.Width, 0);

            // no button rect
            v.rect.no = v.rect.ok.copyFromThis();
        
            // content rect
            v.rect.content = new Rect(v.rect.title.Left, v.rect.title.Bottom + 1, v.rect.title.Width, 0);
            v.rect.content.Bottom = v.rect.buttons.Top - 1;

            // draw 
            v.objects.graphics = v.scene.add.graphics();
            var g = v.objects.graphics;

            // draw background
            g.fillStyle(COLOR_MSGBOX_BACKGROUND, 1);
            g.fillRect(v.rect.box.Left, v.rect.box.Top, v.rect.box.Width, v.rect.box.Height);

            // draw title area
            g.fillStyle(COLOR_MSGBOX_TITLE, 1);
            g.fillRect(v.rect.title.Left, v.rect.title.Top, v.rect.title.Width, v.rect.title.Height);

            // draw buttons area
            g.fillStyle(COLOR_MSGBOX_BUTTONS, 1);
            g.fillRect(v.rect.buttons.Left, v.rect.buttons.Top, v.rect.buttons.Width, v.rect.buttons.Height);

            // draw border
            g.lineStyle(SIZE_MSGBOX_BORDER, COLOR_MSGBOX_BORDER, 1);
            g.strokeRect(v.rect.box.Left, v.rect.box.Top, v.rect.box.Width, v.rect.box.Height);
            
            g.setDepth( DEPTH_MSGBOX );
            
            
        } catch (e) {
            var errMsg = this.getExpMsg("create", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // show msgbox
    show(title, message, msgboxtype, x, y, cbOk, cbYes, cbNo) {
        try {
            this.destroy();

            let v = this.#_PV;
            v.objects = {};
            v.rect = {};
            v.cb = { ok: cbOk, yes: cbYes, no: cbNo };

            this.#createBox(x, y);

            // button create
            {
                if (msgboxtype.value === MsgBoxType.OK.value) {
                    v.objects.ok = new GOImageButton('msgbox_ok', v.scene, 
                        v.rect.ok.CenterX, v.rect.ok.CenterY,
                        'msgbox_buttons', 'OK_UP',
                        'msgbox_buttons', 'OK_DOWN',
                        ()=>this.#onOk(), true);
                    v.objects.ok.setDepth( DEPTH_MSGBOX );
                } else if (msgboxtype.value === MsgBoxType.YESNO.value) {
                    v.objects.yes = new GOImageButton('msgbox_yes', v.scene, 
                        v.rect.yes.CenterX, v.rect.yes.CenterY,
                        'msgbox_buttons', 'YES_UP',
                        'msgbox_buttons', 'YES_DOWN',
                        ()=>this.#onYes(), true);
                    v.objects.yes.setDepth( DEPTH_MSGBOX );
                    v.objects.no = new GOImageButton('msgbox_no', v.scene, 
                        v.rect.no.CenterX, v.rect.no.CenterY,
                        'msgbox_buttons', 'NO_UP',
                        'msgbox_buttons', 'NO_DOWN',
                        ()=>this.#onNo(), true);
                    v.objects.no.setDepth( DEPTH_MSGBOX );
                }
            }

            // text create
            {
                // title
                v.objects.title = addText(v.scene, v.rect.title.CenterX, v.rect.title.CenterY, title, SIZE_MSGBOX_TITLE_FONTSIZE, COLOR_MSGBOX_TITLE_TEXT);
                v.objects.title.setDepth( DEPTH_MSGBOX );

                // content
                v.objects.content = addText(v.scene, v.rect.content.CenterX, v.rect.content.CenterY, message, SIZE_MSGBOX_CONTENT_FONTSIZE, COLOR_MSGBOX_CONTENT_TEXT);
                v.objects.content.setDepth( DEPTH_MSGBOX );
            }
            
        } catch (e) {
            var errMsg = this.getExpMsg("show", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // show msgbox Ok
    showOk(title, message, x, y, cb) {
        try {
            this.show(title, message, MsgBoxType.OK, x, y, cb, undefined, undefined);
        } catch (e) {
            var errMsg = this.getExpMsg("showOk", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // show msgbox Ok
    showYesNo(title, message, x, y, cbYes, cbNo) {
        try {
            this.show(title, message, MsgBoxType.YESNO, x, y, undefined, cbYes, cbNo);
        } catch (e) {
            var errMsg = this.getExpMsg("showOk", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // click ok
    #onOk() {
        try {
            this.destroy();

            let v = this.#_PV;
            if (v.cb == undefined) { return; }
            if (v.cb.ok == undefined) { return; }

            v.cb.ok();
            v.cb.ok = undefined;
        } catch (e) {
            var errMsg = this.getExpMsg("onOk", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // click yes
    #onYes() {
        try {
            this.destroy();

            let v = this.#_PV;
            if (v.cb == undefined) { return; }
            if (v.cb.yes == undefined) { return; }

            v.cb.yes();
            v.cb.yes = undefined;
        } catch (e) {
            var errMsg = this.getExpMsg("onYes", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // clickk no
    #onNo() {
        try {
            this.destroy();

            let v = this.#_PV;
            if (v.cb == undefined) { return; }
            if (v.cb.no == undefined) { return; }

            v.cb.no();
            v.cb.no = undefined;
        } catch (e) {
            var errMsg = this.getExpMsg("onNo", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}