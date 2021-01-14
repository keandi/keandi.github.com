var ColorTable = function(name) {
    ClsObject.apply(this, arguments);

    // init
    {
        this._colors = [];
        this._colors.push(0x007043);
        this._colors.push(0x118051);
        this._colors.push(0x229055);
        this._colors.push(0x339a59);
        this._colors.push(0x40a161);
        this._colors.push(0x50b269);
        this._colors.push(0x54c372);
        this._colors.push(0x58d477);
        this._colors.push(0x600082);
        this._colors.push(0x701288);
        this._colors.push(0x752190);
        this._colors.push(0x8028a6);
        this._colors.push(0x8731a9);
        this._colors.push(0x8839aa);
        this._colors.push(0x9040ae);
        this._colors.push(0x9455bc);
        this._colors.push(0x9a59cd);
        this._colors.push(0xaa6125);
        this._colors.push(0xbb6629);
        this._colors.push(0xcc6938);

        if (this._colors.length < MENU_INPUT_MAX) {
            alert("WARNING - colors need " + MENU_INPUT_MAX + ".(" + this._colors.length + ")");
        }
    }
}

ColorTable.prototype = Object.create(ClsObject.prototype);
ColorTable.prototype.constructor = ColorTable;

ColorTable.prototype.getColor = function(column, row) {
    try {
        var idx = (row * CELL_MAX) + column;
        return this._colors[idx];
    } catch (e) {
        var errMsg = this._name + ".getColor.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    } 

    return this._colors[0];
}

////////////////////////////////////////////
ColorTable.prototype.getSuffleColorTable = function() {
    var newTable = new ColorTable("suffle color table");

    try {
        var idx;
        var tmp;
        for (var i = 0; i < newTable._colors.length; i++) {
            idx = GetRandom(0, newTable._colors.length - 1);
            if (idx == i) { continue; }

            tmp = newTable._colors[i];
            newTable._colors[i] = newTable._colors[idx];
            newTable._colors[idx] = tmp;
        }
    } catch (e) {
        var errMsg = this._name + ".getSuffleColorTable.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    } 

    return newTable;
}