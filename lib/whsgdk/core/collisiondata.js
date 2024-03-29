class CollisionData extends ClsObject {
    #_PV = {};

    // ctor
    constructor(name, scene, frameData, frameNames, gameObject, isFullX, isFullY, originMap) {
        super(name);

        try {
            let v = this.#_PV;
            
            v.scene = scene;
            v.frameData = frameData;
            v.frameNames = frameNames;
            v.gameObject = gameObject;

            v.showDebugDisplay = true;

            v.frameMap = new Map();

            // return sprite origin
            let getOrgin = function(frameName) {
                if (originMap == undefined || originMap.has(frameName) === false ) { return {x: 0.5, y: 0.5 }; }

                return originMap.get(frameName);
            };

            // create collision data
            {
                for (var i = 0; i < frameNames.length; i++) {
                    var curFrameName = frameNames[i];
                    var frame = frameData.frames.get(curFrameName);
                    var hitFrames = frame.hitframes;
                    if (hitFrames == undefined || hitFrames == null) { continue; }

                    var collisions = {
                        attackers: [],
                        bodies: []
                    };
                    v.frameMap.set(curFrameName, collisions)

                    const frameOrigin = getOrgin(curFrameName);
                    var frameArea = frame.frame;
                    var frameX = frameArea.x + (frameArea.w * frameOrigin.x);//(frameArea.w / 2);
                    var frameY = frameArea.y + (frameArea.h * frameOrigin.y);//(frameArea.h / 2);

                    hitFrames.forEach(element => {
                        var target = (element.isAttacker === true) ? collisions.attackers : collisions.bodies;
                        var area = {
                            recompute: true,
                            rect: new Rect(element.rect.x, element.rect.y, element.rect.w, element.rect.h),
                            isAttacker: element.isAttacker,
                            debugRect: undefined,
                            distance: { x: 0, y: 0},
                            debugColor: (element.isAttacker === true) ? 0xff2222 : 0x2222ff,
                            debugGraphic: undefined,
                        };
                        target.push(area);

                        area.distance.x = frameX - (area.rect.Left + (area.rect.Width * frameOrigin.x));//(area.rect.CenterX);
                        area.distance.y = frameY - (area.rect.Top + (area.rect.Height * frameOrigin.y));//(area.rect.CenterY);

                        if (isFullX === true) {
                            area.rect.Width = v.gameObject.W;
                            area.rect.X = v.gameObject.X;
                            area.distance.x = 0;
                        }

                        if (isFullY === true) {
                            area.rect.Height = v.gameObject.H;
                            area.rect.Y = v.gameObject.Y;
                            area.distance.y = 0;
                        }
                    });
                }
            }

            v.isSkip = false;
            
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

            v.frameMap.clear();
            
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get skip
    get IsSkip() {
        return this.#_PV.isSkip;
    }

    // set skip
    set IsSkip(value) {
        let v = this.#_PV;
        v.isSkip = value;
        /*if (v.gameObject.GroupTag === 'star')
        {
            console.log( stringFormat("star collision data object: {0}, skip = {1}", v.gameObject.Name, value));
            if (value === false) {
                var aaa = true;
            }
        }*/
        if (v.showDebugDisplay === true) {
            if (value === true) {
                this.#clearDebugDisplay();
            }
        }
    }

    // get body array
    get Bodies() {
        return this.#_PV.bodies;
    }

    // get attacker array
    get Attackers() {
        return this.#_PV.attackers;
    }

    // get main object
    get gameObject() {
        return this.#_PV.gameObject;
    }

    // set active frame
    set ActiveFrameName(value) {
        if (this.#_PV.showDebugDisplay === true) {
            if (this.#_PV.activeFrameName !== value)
            {
                this.#clearDebugDisplay();
            }
        }
        
        this.#_PV.activeFrameName = value;
    }

    // get active frame
    get ActiveFrameName() {
        return this.#_PV.activeFrameName;
    }

    // get active collision
    get ActiveCollisionData() {
        try {
            let v = this.#_PV;
            if (v.frameMap.has(v.activeFrameName) === false) { return undefined; }

            return v.frameMap.get(v.activeFrameName);
        } catch (e) {
            var errMsg = this.getExpMsg("ActiveCollisionData", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get active bodies
    get ActiveBodies() {
        try {
            let collisions = this.ActiveCollisionData;
            if (collisions == undefined) { return undefined; }

            return collisions.bodies;
        } catch (e) {
            var errMsg = this.getExpMsg("ActiveBodies", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get active attackers
    get ActiveAttackers() {
        try {
            let collisions = this.ActiveCollisionData;
            if (collisions == undefined) { return undefined; }

            return collisions.attackers;
        } catch (e) {
            var errMsg = this.getExpMsg("ActiveAttackers", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set all recompute flag = true
    setRecomputeFlag() {
        try {
            let flagTrue = function(array) {
                array.forEach(element => {
                    element.recompute = true;                    
                });
            }

            let v = this.#_PV;
            v.frameMap.forEach(element => {
                flagTrue(element.attackers);
                flagTrue(element.bodies);
            });

        } catch (e) {
            var errMsg = this.getExpMsg("setRecomputeFlag", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // check collision
    #checkCollision(myArray, targetArray, target) {
        try {
            if (target.IsSkip === true || myArray == undefined || targetArray == undefined || target == undefined) { return false; }

            let v = this.#_PV;
            for (var i = 0; i < myArray.length; i++) {
                if (myArray[i].recompute === true) { this.recomputeArea(myArray[i]); };

                for (var j = 0; j < targetArray.length; j++) {
                    if (targetArray[j].recompute === true) { target.CollisionData.recomputeArea(targetArray[j]); };

                    if (myArray[i].rect.isCollision(targetArray[j].rect) === true) { 
                        //v.lastCollisionRect = myArray[i].rect;
                        v.lastCollisionInfo = myArray[i];
                        return true; 
                    }
                }
            }

        } catch (e) {
            var errMsg = this.getExpMsg("checkCollision", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return false;
    }

    // check collision body x body
    checkCollisionBodyXBody(target) {
        try {
            if (target.IsSkip === true) { return false; }

            return this.#checkCollision(this.ActiveBodies, target.ActiveBodies, target);

        } catch (e) {
            var errMsg = this.getExpMsg("checkCollisionBodyXBody", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return false;
    }

    // check collision attacker x body
    checkCollisionAttackerXBody(target) {
        try {
            if (target.CollisionData.IsSkip === true) { return false; }

            return this.#checkCollision(this.ActiveAttackers, target.CollisionData.ActiveBodies, target);

        } catch (e) {
            var errMsg = this.getExpMsg("checkCollisionAttackerXBody", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return false;
    }

    // 테스트용 강제 재계산
    /*forcedRecomputeAllArea() {
        try {
            let v = this.#_PV;
            let selfIt = this;

            let recompute = function(array) {
                array.forEach(element => {
                    selfIt.recomputeArea(element);
                });
            }

            recompute(v.attackers);
            recompute(v.bodies);

        } catch (e) {
            var errMsg = this.getExpMsg("recomputeArea", e);
            console.log(errMsg);
            alert(errMsg);
        }
    } */

    // 강제 active frame 재계산
    forcedRecomputeActiveFrame() {
        try {

            let collisions = this.ActiveCollisionData;
            if (collisions == undefined) { return; }

            let selfIt = this;

            let recompute = function(array) {
                array.forEach(element => {
                    selfIt.recomputeArea(element);
                });
            }

            recompute(collisions.attackers);
            recompute(collisions.bodies);

        } catch (e) {
            var errMsg = this.getExpMsg("recomputeArea", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // recompute area
    recomputeArea(area) {
        try {
            let gameObject = this.#_PV.gameObject;
            area.rect.CenterX = gameObject.X - area.distance.x;
            area.rect.CenterY = gameObject.Y - area.distance.y;
            area.recompute = false;

            if (this.#_PV.showDebugDisplay === true) {
                this.#debugDisplay(area);
            }
        } catch (e) {
            var errMsg = this.getExpMsg("recomputeArea", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // debug draw area
    #debugDisplay(area) {
        try {
           
            let draw = function(g, r, color) {
                g.clear();

                //g.fillStyle(color, 0.3);
                //g.fillRect(area.rect.X, area.rect.Y, area.rect.Width, area.rect.Height);
                //g.setDepth(9999);

                r.left = area.rect.X;
                r.top = area.rect.Y;
                r.width = area.rect.Width;
                r.height = area.rect.Height;

                g.lineStyle(1, color);
                g.strokeRectShape(r, 1);
                g.setDepth(9999);
            }

            if (area.debugGraphic == undefined) {
                let v = this.#_PV;
                area.debugGraphic = v.scene.add.graphics();
                v.scene.addDestroyableObject( area.debugGraphic );
            }
            if (area.debugRect == undefined) {
                area.debugRect = new Phaser.Geom.Rectangle(0, 0, 0, 0);
            }
            //if (area.isAttacker !== true) { return; }
            draw(area.debugGraphic, area.debugRect, area.debugColor);
        } catch (e) {
            var errMsg = this.getExpMsg("debugDisplay", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // clear debug display
    #clearDebugDisplay() {
        try {
            let collisions = this.ActiveCollisionData;
            if (collisions == undefined) { return; }

            let clearDisplay = function(area) {
                if (area == undefined) { return; }
                area.forEach(element => {
                    if (element.debugGraphic == undefined) { return; }
                    element.debugGraphic.clear();
                });
            };

            clearDisplay(collisions.attackers);
            clearDisplay(collisions.bodies);
        } catch (e) {
            var errMsg = this.getExpMsg("clearDebugDisplay", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get last collision rect
    get LastCollisionRect() {
        return this.#_PV.lastCollisionInfo.rect;
    }

    // get last collision info
    get LastCollisionInfo() {
        return this.#_PV.lastCollisionInfo;
    }
}