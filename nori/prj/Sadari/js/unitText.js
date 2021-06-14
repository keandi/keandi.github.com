///////////////////////////////////////////////////////////////////////
/// UnitText
///////////////////////////////////////////////////////////////////////

var UnitText = function(name, src, dst) {
    ClsObject.apply(this, arguments);

    this._source = src;
    this._target = dst;

    this.printName();
}

UnitText.prototype = Object.create(ClsObject.prototype);
UnitText.prototype.constructor = UnitText;

// get source text
UnitText.prototype.GetSource = function() {
    return this._source;
}

// get target text
UnitText.prototype.GetTarget = function() {
    return this._target;
}


///////////////////////////////////////////////////////////////////////
/// UnitTextManager
///////////////////////////////////////////////////////////////////////

var UnitTextManager = function(name) {
    ClsObject.apply(this, arguments);

    this._unitTexts = new Array();

    this.printName();
}

UnitTextManager.prototype = Object.create(ClsObject.prototype);
UnitTextManager.prototype.constructor = UnitTextManager;

// add text
UnitTextManager.prototype.Append = function(src, dst, failIfEmpty) {
    try {

        if (failIfEmpty)
        {
            if (src == undefined || dst == undefined || src.length <= 0 || dst.length <= 0) { return false; }
        }

        this._unitTexts.push(new UnitText("unitText", src, dst));
        
        return true;
    } catch (e) {
        var errMsg = this._name + ".Append.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
    return false;
}

// toString
UnitTextManager.prototype.ToString = function() {
    try {
        let str = "";
        this._unitTexts.forEach (function(item, index, arr) {
            var line = index + ". src: " + item.GetSource() + ", tar: " + item.GetTarget() + "\r\n";
            str += line;
        })

        return str;
    } catch (e) {
        var errMsg = this._name + ".ToString.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }

    return "";
}

// get unit
UnitTextManager.prototype.getUnit = function(index) {
    try {
        if (index < 0 || index >= this._unitTexts.length)
        {
            return undefined;
        }

        return this._unitTexts[index];
    } catch (e) {
        var errMsg = this._name + ".getUnit.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }

    return undefined;
}

// get count
UnitTextManager.prototype.getCount = function() {
    try {
        return this._unitTexts.length;
    } catch (e) {
        var errMsg = this._name + ".getCount.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }

    return 0;
}