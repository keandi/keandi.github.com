class RepresentationImage extends DestroyableObject {
    #_PV = {};

    // ctor
    constructor(name, scene) {
        try {
            super(name, scene);

            this.#_PV.scene = scene;
            this.#_PV.map = new Map();

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
    destroy() {
        try {
             this.#_PV.map.forEach(imgs => {
                imgs.forEach(element => {
                    element.obj.destroy();
                });
                imgs = [];
            });
            this.#_PV.map.clear();

            /* this.#_PV.map.forEach(imgs => {
                imgs.forEach(element => {
                    element.use = false;
                });
            }); */
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // create image
    #getNewImage(texture, use) {
        try {
            let v = this.#_PV;

            var img = v.scene.add.image(0, 0, 'level_entry_characters', texture);
            img.setOrigin(0.5);
            img.setDepth ( DEPTH_LEVEL_REPRESENTATION_IMAGE );

            let imgs = undefined;
            if (v.map.has(texture) === false) {
                imgs = [];
                v.map.set(texture, imgs);
            } else {
                imgs = v.map.get(texture);
            }

            let imgInfo = {obj: img, use: use};
            imgs.push( imgInfo );

            this.#imgVisible( imgInfo );
            //console.log("img-create => " + texture);
            return imgInfo;
            
        } catch (e) {
            var errMsg = this.getExpMsg("getNewImage", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get image
    getImage(texture, oldImagInfo) {
        try {
            if (oldImagInfo != undefined) {
                oldImagInfo.use = false;
                this.#imgVisible( oldImagInfo );
            }

            if (this.#_PV.map.has(texture) === false) {
                // map 에 texture 로 만들어진 배열이 없다. => 신규 생성
                return this.#getNewImage(texture, true);
            }

            let imgs = this.#_PV.map.get(texture);
            for (var i = 0; i < imgs.length; i++) {
                if (imgs[i].use === false) {
                    imgs[i].use = true;
                    this.#imgVisible(imgs[i]);
                    // 사용안하는 이미지를 찾았다. => 찾은 이미지 반환
                    //console.log("찾음 => " + i + ", texture => " + texture);
                    return imgs[i];
                }
            }

            // 모든 이미지가 사용중이다. => 신규 생성
            return this.#getNewImage(texture, true);
        } catch (e) {
            var errMsg = this.getExpMsg("texture", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    //
    #imgVisible(imgInfo) {
        try {
            imgInfo.obj.visible = (imgInfo.use === true) ? true: false;
        } catch (e) {
            var errMsg = this.getExpMsg("imgVisible", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}