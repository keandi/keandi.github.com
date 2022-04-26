class CollisionGroup extends DestroyableObject {
    #_PV = {};

    // ctor
    constructor(name, scene, callbacks) {
        super(name, scene);

        try {
            let v = this.#_PV;
            v.scene = scene;
            v.callbacks = callbacks; //{attackerXBody: , attackerXAttacker: , bodyXBody: , bodyXAttacker: }

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

            if (v.groups != undefined) {
                v.groups.clear();
            }

        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // add
    addGroup(name) {
        try {
            let v = this.#_PV;

            let group = {
                name: name,
                elements: new Map(), // objects
                targetGroups: []
            };

            if (v.groups == undefined) {
                v.groups = new Map();
            }

            v.groups.set(name, group);
        } catch (e) {
            var errMsg = this.getExpMsg("add", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return this; // for build pattern
    }

    // add multi
    addGroups() {
        try {

            for (var i = 0; i < arguments.length; i++) {
                this.addGroup(arguments[i]);
            }
        } catch (e) {
            var errMsg = this.getExpMsg("add", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return this; // for build pattern
    }

    // add object at group
    addObject(groupName, object) {
        try {
            let group = this.getGroupByName(groupName);
            if (group == undefined) { return; }

            group.elements.set(object, object);

            //console.log('collision group add object: ' + object.Name);
        } catch (e) {
            var errMsg = this.getExpMsg("addObject", e);
            console.log(errMsg);
            alert(errMsg);
        }
        return this;
    }

    // set target groups (source, target, target, target, target, ...)
    setTargetGroups(srcGroupName) {
        try {
            let v = this.#_PV;

            if (v.groups == undefined) { return; }
            else if (v.groups.has(srcGroupName) === false) { return; }

            let srcGroup = v.groups.get(srcGroupName);
            for (var i = 1; i < arguments.length; i++) {
                if (v.groups.has(arguments[i]) === false) { continue; }

                var targetGroup = v.groups.get(arguments[i]);
                srcGroup.targetGroups.push(targetGroup);
            }
        } catch (e) {
            var errMsg = this.getExpMsg("setTargetGroups", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return this; // for build pattern
    }

    // get group by name
    getGroupByName(name) {
        try {

            let v = this.#_PV;
            if (v.groups.has(name) === false) { return undefined; }
            return v.groups.get(name);
            
        } catch (e) {
            var errMsg = this.getExpMsg("getGroupByName", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get group by object
    getGroupByObject(object) {
        try {

            return this.getGroupByName(object.GroupTag);
            
        } catch (e) {
            var errMsg = this.getExpMsg("getGroupByObject", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // check collision - attacker -> body
    checkCollisionAttackerXBody(sourceObject) {
        try {
            let srcGroup = this.getGroupByObject(sourceObject);
            if (srcGroup == undefined) { return; }

            let selfIt = this;
            let v = this.#_PV;
            srcGroup.targetGroups.forEach(target => {
                target.elements.forEach(targetObject => {
                    if (sourceObject.CollisionData.checkCollisionAttackerXBody(targetObject) === true) {
                        //console.log( stringFormat( "collision A x B = {0} x {1} - Iskip: {2}", sourceObject.Name, targetObject.Name, targetObject.CollisionData.IsSkip) )
                        v.callbacks.attackerXBody(sourceObject, targetObject);
                    } 
                });
            });
        } catch (e) {
            var errMsg = this.getExpMsg("checkCollisionAttackerXBody", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // display group elements name
    displayGroupElementName(groupName) {
        try {
            let group = this.getGroupByName(groupName);
            console.log( stringFormat("group: '{0}' display begin", groupName) );
            group.elements.forEach(element => {
                console.log(element.Name);
            });
            console.log( stringFormat("group: '{0}' display end", groupName) );
        } catch (e) {
            var errMsg = this.getExpMsg("displayGroupElementName", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}