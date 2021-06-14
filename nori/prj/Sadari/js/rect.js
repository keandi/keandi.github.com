///////////////////////////////////////////////////////////////////////
/// Rect
///////////////////////////////////////////////////////////////////////

var Rect = function(name, left, top, right, bottom) {
    ClsObject.apply(this, arguments);

    this.printName();

    //

    this.set(left, top, right, bottom);
}

Rect.prototype = Object.create(ClsObject.prototype);
Rect.prototype.constructor = Rect;

///////////////////////////////////////////////////////////////////////
// set 
Rect.prototype.set = function(left, top, right, bottom) {

    try {

        this._left = left;
        this._top = top;
        this._right = right;
        this._bottom = bottom;

        if (this._left > this._right)
        {
            var tmp = this._left;
            this._left = this._right;
            this._right = this.left;
        }

        if (this._top > this._bottom)
        {
            var tmp = this._top;
            this._top = this._bottom;
            this._bottom = this._top;
        }

    } catch (e) {
        var errMsg = this._name + ".set.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// width
Rect.prototype.width = function () {
    try {

        return this._right - this._left;

    } catch (e) {
        var errMsg = this._name + ".width.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }

    return 0;
}

// height
Rect.prototype.height = function () {
    try {

        return this._bottom - this._top;

    } catch (e) {
        var errMsg = this._name + ".height.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }

    return 0;
}

// to string
Rect.prototype.ToString = function () {
    try {

        return "left: " + this._left + ", top: " + this._top + ", right: " + this._right + ", bottom: " + this._bottom;

    } catch (e) {
        var errMsg = this._name + ".ToString.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }

    return "";
}

// point int rect
Rect.prototype.isIncluded = function(x, y) {
    try {

        return (x >= this._left && x <= this._right
            && y >= this._top && y <= this._bottom) ? true : false;

    } catch (e) {
        var errMsg = this._name + ".isIncluded.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }

    return false;
}