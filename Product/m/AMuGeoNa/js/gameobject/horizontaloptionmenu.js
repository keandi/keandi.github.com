class HorizontalOptionMenu extends DestroyableObject {
    #_PV = {}

    // ctor
    constructor(name, scene) {
        try {
            super(name, scene);

            this.#_PV.scene = scene;
            this.#_PV.optionMenus = [];

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // add menu
    addMenu(name) {
        try {
            let menu = new OptionMenu("optionmenu_" + name, name, this.#_PV.scene);
            this.#_PV.optionMenus.push(menu);
            return menu;
        } catch (e) {
            var errMsg = this.getExpMsg("addMenu", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return undefined;
    }

    // make object
    makeObjects(top_position) {
        try {
            let menus = this.#_PV.optionMenus;
            if (menus.length <= 0) { return; }

            menus.forEach(element => {
                var bottom_position = element.makeObjects(top_position);
                if (bottom_position !== top_position) {
                    top_position = bottom_position + COORD_OPTION_YGAP;
                }
            });

        } catch (e) {
            var errMsg = this.getExpMsg("makeObjects", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        try {
            this.#_PV.optionMenus.forEach(element => {
                element.destroy();
            });
            this.#_PV.optionMenus = undefined;

        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}