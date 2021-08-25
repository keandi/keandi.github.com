class OptionMenu extends ClsObject {
    #_PV = {}

    // ctor
    constructor(name, menu_name, scene) {
        try {
            super(name);

            this.#_PV.menuName = menu_name;
            this.#_PV.scene = scene;
            this.#_PV.options = [];

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // append option
    appendMenuOption(name, selected, callback) {
        try {
            this.#_PV.options.push(
                {
                    name: name,
                    selected: selected,
                    callback: callback,
                    object: undefined,
                    others: []
                }
            );
        } catch (e) {
            var errMsg = this.getExpMsg("appendMenuOption", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return this;
    }

    // make object
    makeObjects(top_position) {
        let selfIt = this;
        let bottom_position = top_position;

        try {
            let v = this.#_PV;
            if (v.options.length <= 0) { return; }

            // title
            {
                let title = v.scene.addDestroyableObject( addText(v.scene, 0, 0, "[ " + v.menuName + " ]", 32, COLOR_OPTION_MENUTITLE) );
                title.x = v.scene.getSceneCenterX();
                title.y = top_position + (title.height / 2);
                top_position += (title.height + COORD_OPTIONMENU_YGAP);
            }           

            // option menu
            let selectedMenu = undefined;
            v.options.forEach(element => {
                element.object = v.scene.addDestroyableObject( addText(v.scene, 0, 0, element.name, 22, COLOR_OPTION_MENU) );
                for (var i = 0; i < v.options.length; i++) {
                    if (v.options[i] === element) { continue; }
                    element.others.push( v.options[i] );
                }

                if (element.selected === true) {
                    selectedMenu = element;
                }
            });

            // option menu 위치 교정
            let getBeginX = function() {
                let cx = (v.options.length - 1) * COORD_OPTIONMENU_XGAP;
                v.options.forEach(element => {
                    cx += element.object.width;
                });

                return (v.scene.getSceneWidth() - cx) / 2;
            };
            let beginX = getBeginX();
            let y = -1;

            v.options.forEach(element => {
                if (y <= 0) {
                    y = (element.object.height / 2) + top_position;
                    top_position = y + (element.object.height / 2);
                }

                element.object.y = y;
                element.object.x = beginX + (element.object.width / 2);
                beginX += (element.object.width + COORD_OPTIONMENU_XGAP);
            });

            this.#redrawMenuActive(selectedMenu);

            // set click
            v.options.forEach(element => {
                v.scene.addDestroyableObject( new ObjectDown("om_" + selfIt.Name, v.scene, element.object, ()=>{
                    selfIt.#redrawMenuActive(element);
                    element.callback();
                }) );
                /*this.#_PV.timeout = new GameTimeout("optionmenu_gametimeout", this.#_PV.scene, 200, ()=>{
                    this.#redrawMenuActive(element);
                    element.callback();
                });*/
                /*
                setClick(element.object, ()=>{
                    this.#redrawMenuActive(element);
                    element.callback();
                });*/
            });

            //
            bottom_position = top_position + COORD_OPTION_YGAP;

        } catch (e) {
            var errMsg = this.getExpMsg("makeObjects", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return bottom_position;
    }

    // internal select drawing
    #redrawMenuActive(selectedOption) {
        try {
            if (selectedOption == undefined) { return; }

            //
            selectedOption.object.alpha = 1;
            selectedOption.others.forEach(element => {
                element.object.alpha = OPACITY_UNSELECTED_OPTIONMENU;
            });
            
        } catch (e) {
            var errMsg = this.getExpMsg("redrawMenuActive", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
    destroy() {
        try {
            this.#_PV.options = [];
            destroyObjects( this.#_PV.timeout )
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}