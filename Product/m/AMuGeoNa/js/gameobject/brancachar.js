class BrancaChar extends DestroyableObject {
    #_PV = {}

    // ctor
    constructor(name, scene, limitSize) {
        try {
            super(name, scene);

            let v = this.#_PV;

            v.scene = scene;
            v.char = undefined;
            v.limitSize = limitSize; // { cx:, cy: }
            v.position = {
                x: 0,
                y: 0
            };

            // char table
            v.charTable = new Map();
            let addCharTable = function() {
                for (var i = 0; i < arguments.length; i++) {
                    v.charTable.set(arguments[i], { key: arguments[i], name: arguments[i], sprite: undefined} );
                }
            };
            addCharTable('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 
                'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
            v.charTable.set(',', { key: ',', name: 'COMMA', sprite: undefined} );
            v.charTable.set('/', { key: '/', name: 'SLASH', sprite: undefined} );


        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        try {

            let v = this.#_PV;

            v.charTable.forEach(element => {
                destroyObjects(element.sprite); 
            });

            v.char = undefined;
            v.charTable.clear();
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    setPosition(x, y) {
        try {

            let v = this.#_PV;
            v.position.x = x;
            v.position.y = y;

            if (v.char == undefined) { return this; }

            v.char.sprite.x = x;
            v.char.sprite.y = y;
        } catch (e) {
            var errMsg = this.getExpMsg("setPosition", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return this;
    }

    setChar(c) {
        try {
            let v = this.#_PV;

            if (v.char != undefined) {
                if (v.char.key == c) { return; }
                
                v.char.sprite.visible = false;
                v.char = undefined;
            }

            if (v.charTable.has(c) === false) { 
                if (v.char != undefined && v.char.sprite != undefined) {
                    v.char.sprite.visible = false;
                }
                return;
            }

            let element = v.charTable.get(c);
            if (element.sprite == undefined) {
                element.sprite = v.scene.add.sprite(0, 0, 'text_branca', element.name);
                setLimitPixelScale(element.sprite, v.limitSize.cx, v.limitSize.cy);
                element.sprite.setOrigin(0.5);
            }

            element.sprite.x = v.position.x;
            element.sprite.y = v.position.y;
            element.sprite.visible = true;

            v.char = element;

        } catch (e) {
            var errMsg = this.getExpMsg("setChar", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return this;
    }

    set Visible(value) {
        try {
            let v = this.#_PV;
            if (v.char == undefined || v.char.sprite == undefined) { return; }
            
            v.char.sprite.visible = (value === true) ? true : false;
        } catch (e) {
            var errMsg = this.getExpMsg("Visible", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set Depth
    set Depth(value) {
        try {
            let v = this.#_PV;
            if (v.char == undefined || v.char.sprite == undefined) { return; }
            
            v.char.sprite.setDepth(value);
        } catch (e) {
            var errMsg = this.getExpMsg("Depth", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

}