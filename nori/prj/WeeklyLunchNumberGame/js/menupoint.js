var MenuPoint = function(name, menuName, color) {
    ClsObject.apply(this, arguments);

    this._menuName = menuName;
    this._point = 0;
    this._color = color;

    //console.log("created - " + name + " / menu: " + menuName);
}

MenuPoint.prototype = Object.create(ClsObject.prototype);
MenuPoint.prototype.constructor = MenuPoint;

MenuPoint.prototype.addPoint = function(point) {
    this._point += point;
}

///////////////////////////////////////////////////////////////////
var MenuPoints = function(name) {
    ClsObject.apply(this, arguments);

    this._points = [];
}

MenuPoints.prototype = Object.create(ClsObject.prototype);
MenuPoints.prototype.constructor = MenuPoints;

MenuPoints.prototype.addMenu = function(menuName, color) {
    try {
        var newMenuPoint = new MenuPoint("MenuPoint[" + menuName + "]", menuName, color);
        this._points.push(newMenuPoint);
    } catch (e) {
        var errMsg = this._name + ".addMenu.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

MenuPoints.prototype.getRandMenuPoint = function() {
    try {
        var rndIdx = GetRandom(0, this._points.length - 1);
        //rndIdx = 0;
        //console.log("getRandMenuPoint rndIdx: " + rndIdx + " / " + this._points.length + ", _point: " + this._points[rndIdx]);
        return this._points[rndIdx];
    } catch (e) {
        var errMsg = this._name + ".getRandMenuPoint.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}