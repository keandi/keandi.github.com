class MsgBox extends DestroyableObject {
    #_PV = {};

    //ctor
    constructor(name, scene) {
        try {
            super(name, scene);

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
            super.destroy();
            
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // show msgbox
    show(title, message, x, y) {
        try {
            let v = this.#_PV;

            // 없으면 생성
            if (v.objects == undefined) {
                const contentRc = v.scene.contentRc;
                const boxSize = {
                    cx: Math.min(SIZE_MSGBOX_MAX_WIDTH , contentRc.Width - 20),
                    cy: Math.min(SIZE_MSGBOX_MAX_HEIGHT , contentRc.Height - 20)
                };
                const boxRc = new Rect(contentRc.Left + parseInt((contentRc.Width - boxSize.cx) / 2), 
                    contentRc.Top + ((contentRc.Height - boxSize.cy) / 2), 
                    boxSize.cx, boxSize.cy);

                //... 여기서 부터 그려요.
            }
            
        } catch (e) {
            var errMsg = this.getExpMsg("show", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}