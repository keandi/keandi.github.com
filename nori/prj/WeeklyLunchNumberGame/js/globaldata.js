var GlobalData = function(name) {
    ClsObject.apply(this, arguments);
}

GlobalData.prototype = Object.create(ClsObject.prototype);
GlobalData.prototype.constructor = GlobalData;

////



//////////////////////////////////////
var GD = undefined;
function InitGlobalData() {
    GD = new GlobalData("Global-DATA");

    GD._colorTable = new ColorTable("Colors");
    GD._menuPoints = [];
}
