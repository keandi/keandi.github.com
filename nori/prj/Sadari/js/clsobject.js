var ClsObject = function(name) {
    this._name = name;
}

ClsObject.prototype.printName = function(preText) {
    if (preText != undefined) {
        if (preText.length > 0) {
            console.log(preText + ": " + this._name);
            return;
        }
    }
    console.log(this._name);
}