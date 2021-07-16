class InputHtml extends ClsObject {

    #_scene = undefined;
    #_dom = undefined;
    #_cb = undefined;
    #_idx = -1;

    constructor(name, scene) {
        super(name)

        try {

            //
            this.#_scene = scene;

            //
            this.#create();

        } catch(e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
    destroy() {
        try {

            this.#_dom.off('click');
            this.#_dom.destroy();

        } catch(e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    #create() {
        try {
            this.#_dom = this.#_scene.add.dom(0, 0).createFromCache('html_input');
            this.#_dom.setDepth(10);
            this.#_dom.setInteractive();

            this.#_dom.addListener('click');

            let selfIt = this;
            this.#_dom.on('click', function(event) {
                //alert(event.target.id);
                if (event.target.id == 'buttonOk') {
                    let head = selfIt.#_dom.getChildByID('inputHead').value;
                    let tail = selfIt.#_dom.getChildByID('inputTail').value;
                    //alert(head + " / " + tail);

                    setStorageHeadValue(selfIt.#_idx, head);
                    setStorageTailValue(selfIt.#_idx, tail);

                    selfIt.#_cb(true);
                } else if (event.target.id == 'buttonCancel') {
                    selfIt.#_cb(false);
                }
            });
            
        } catch(e) {
            var errMsg = this.getExpMsg("create", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // show
    show(idx, x, y, cb) {
        try {
            this.#_cb = cb;
            this.#_idx = idx;

            this.#_dom.x = x;
            this.#_dom.y = y;
            this.#_dom.visible = true;

            this.#_dom.getChildByID('inputHead').value = getStorageHeadValue(this.#_idx);
            this.#_dom.getChildByID('inputTail').value = getStorageTailValue(this.#_idx);

            _evtLock.IsButtonClickLock = true;
            _evtLock.IsDragLock = true;
        } catch(e) {
            var errMsg = this.getExpMsg("show", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // close
    close() {
        try {
            this.#_dom.visible = false;
            _evtLock.IsButtonClickLock = false;
            _evtLock.IsDragLock = false;
        } catch(e) {
            var errMsg = this.getExpMsg("close", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}