class BrancaChar extends DestroyableObject {
    #_PV = {}

    // ctor
    constructor(name, scene) {
        try {
            super(name, scene);

            let v = this.#_PV;

            v.scene = scene;
            v.char = undefined;
            v.position = {
                x: 0,
                y: 0
            };

            // char table
            v.charTable = new Map();
            v.charTable.set('0', { key: '0', name: '0', sprite: undefined} );
            v.charTable.set('1', { key: '1', name: '1', sprite: undefined} );
            v.charTable.set('2', { key: '2', name: '2', sprite: undefined} );
            v.charTable.set('3', { key: '3', name: '3', sprite: undefined} );
            v.charTable.set('4', { key: '4', name: '4', sprite: undefined} );
            v.charTable.set('5', { key: '5', name: '5', sprite: undefined} );
            v.charTable.set('6', { key: '6', name: '6', sprite: undefined} );
            v.charTable.set('7', { key: '7', name: '7', sprite: undefined} );
            v.charTable.set('8', { key: '8', name: '8', sprite: undefined} );
            v.charTable.set('9', { key: '9', name: '9', sprite: undefined} );
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

            if (v.charTable.has(c) === false) { throw "unknown char: " + c; }

            let element = v.charTable.get(c);
            if (element.sprite == undefined) {
                element.sprite = v.scene.add.sprite(0, 0, 'text_branca', element.name);
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

}