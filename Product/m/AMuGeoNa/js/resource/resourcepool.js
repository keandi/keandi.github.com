// asset serial load 를 관리한다.
class ResourcePool extends ClsObject {
    #_PV = {}

    // ctor
    constructor(name) {
        try {
            super(name);

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // load atlas
    #addAtlas(key, ver) {
        try {
            if (ver == undefined) {
                ver = "";
            } else {
                ver = "?v=" + ver;
            }
            let imgPath = 'assets/image/' + key + '.png' + ver;
            let jsonPath = 'assets/atlas/' + key + '.json';

            this.#_PV.scene.addSerialLoadAsset( key, () => this.#_PV.scene.load.atlas( key, imgPath, jsonPath), 2 );
        } catch (e) {
            var errMsg = this.getExpMsg("addAtlas", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // load image
    #addImage(key, ver) {
        try {
            if (ver == undefined) {
                ver = "";
            } else {
                ver = "?v=" + ver;
            }
            let imagePath = 'assets/image/' + key + '.png' + ver;

            this.#_PV.scene.addSerialLoadAsset( key, () => this.#_PV.scene.load.image(key, imagePath), 1 );
        } catch (e) {
            var errMsg = this.getExpMsg("addAtlas", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // load mp3
    #addMp3(key, ver) {
        try {
            if (ver == undefined) {
                ver = "";
            } else {
                ver = "?v=" + ver;
            }
            let audioPath = 'assets/audio/' + key + '.mp3' + ver;

            this.#_PV.scene.addSerialLoadAsset( key, () => this.#_PV.scene.load.audio(key, audioPath), 1 );
        } catch (e) {
            var errMsg = this.getExpMsg("addAtlas", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // load ogg
    #addOgg(key, ver) {
        try {
            if (ver == undefined) {
                ver = "";
            } else {
                ver = "?v=" + ver;
            }
            let audioPath = 'assets/audio/' + key + '.ogg' + ver;

            this.#_PV.scene.addSerialLoadAsset( key, () => this.#_PV.scene.load.audio(key, audioPath), 1 );
        } catch (e) {
            var errMsg = this.getExpMsg("addAtlas", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // load wav
    #addWav(key, ver) {
        try {
            if (ver == undefined) {
                ver = "";
            } else {
                ver = "?v=" + ver;
            }
            let audioPath = 'assets/audio/' + key + '.wav' + ver;

            this.#_PV.scene.addSerialLoadAsset( key, () => this.#_PV.scene.load.audio(key, audioPath), 1 );
        } catch (e) {
            var errMsg = this.getExpMsg("addAtlas", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // add load
    add(key) {
        try {
            switch (key) {
                case 'coins':
                case 'msgbox_buttons':
                case 'ad_button':
                case 'option_button':
                case 'level_entry_characters':
                case 'dice_sprite':
                case 'exit_button':
                case 'help_button':
                    this.#addAtlas(key, 1);
                    break;

                case 'arrow':
                        this.#addImage(key);
                        break;

                /*case 'coin_drop':
                    this.#addMp3(key);
                    break; */

                case 'twink':
                    this.#addOgg(key);
                    break;

                case 'coin_add':
                case 'coin_use':
                    this.#addOgg(key);
                    break;

                case 'dice-1':
                case 'dice-8':
                case 'dice-18':
                case 'dice-24':
                    this.#addWav(key);
                    break;
            }
        } catch (e) {
            var errMsg = this.getExpMsg("add", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return this;
    }

    // multi add
    addArgs() {
        try {
            for (var i = 0; i < arguments.length; i++) {
                this.add(arguments[i]);
            }
        } catch (e) {
            var errMsg = this.getExpMsg("addArgs", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set scene
    setScene(scene) {
        this.#_PV.scene = scene;
        return this;
    }
}