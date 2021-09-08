class StateMachine extends DestroyableObject {
    #_PV = {}

    // ctor
    constructor(name, scene) {
        try {
            super(name, scene);

            //
            let v = this.#_PV;

            v.states = new Map(); // {state, {state, action()}... }

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
    destroy() {
        try {
            //
            let v = this.#_PV;

            v.states.forEach(element => {
                element.map.clear();
            });
            v.states.clear();

        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // add
    add(state, isDefault) {
        try {
            //
            let v = this.#_PV;

            let entry = undefined;
            if (v.states.has(state) === true) {
                entry = v.states.get(state);
            } else {
                entry = {
                    map: new Map(),
                    addEntry: function(s, c) {
                        this.map.set(s, c);
                        return this;
                    }
                };
                v.states.set(state, entry);
            }

            if (isDefault === true) {
                v.current = state;
            }
            return entry;
        } catch (e) {
            var errMsg = this.getExpMsg("add", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    //enter state
    enter(state) {
        try {
            let v = this.#_PV;

            if (v.states.get(v.current) === false) { throw 'please set current state!!!'; }

            let entry = v.states.get(state);
            if (entry.map.has(state) === false) { return false; }

            v.current = state;
            entry.map.get(state)();
            return true;
        } catch (e) {
            var errMsg = this.getExpMsg("enter", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return false;
    }
}