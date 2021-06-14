///////////////////////////////////////////////////////////////////////
/// InputUnit
///////////////////////////////////////////////////////////////////////

var InputUnit = function(name, index) {
    ClsObject.apply(this, arguments);

    this._index = index;

    this.printName(this._index + "");
}

InputUnit.prototype = Object.create(ClsObject.prototype);
InputUnit.prototype.constructor = InputUnit;

// get div id
InputUnit.prototype.GetBorderId = function() {
    return "inputUnit_" + this._index;
}

// get source text id
InputUnit.prototype.GetSourceId = function() {
    return "inputUnit_" + this._index + "_source";
}

// get target text id
InputUnit.prototype.GetTargetId = function() {
    return "inputUnit_" + this._index + "_target";
}

// unit ui 생성
InputUnit.prototype.MakeUI = function(unitWidth, unitHeight) {
    try {
        let inputBorder = GetReadyInputBorder();
        /*let html = "<div id='" + this.GetBorderId() + "' class='inputUnitBorder' style='width: " + unitWidth + "px; height: " + unitHeight + "px;'>";

        // input name
        html += "<div>"
        html += "<input type='text' id='' style='width: " + (unitWidth - 10) + "px;'>"
        html += "</div>"
        //html += " div_" + this._index + " ";

        // input result

        html += "</div>";
        
        inputBorder.innerHTML += html;*/

        // outer
        var div = document.createElement("div");
        div.id = this.GetBorderId();
        div.className = "inputUnitBorder";
        div.style.width = (unitWidth + "px");
        div.style.height = (unitHeight + "px");
        
        // source name
        var srcText = document.createElement("input");
        srcText.id = this.GetSourceId();
        srcText.style.width = ((unitWidth - 10) + "px");
        srcText.style.position = "absolute";
        srcText.style.top = "5px";
        srcText.style.left = "1px";
        srcText.style.textAlign = "center";
        srcText.value = this._index;
        div.appendChild(srcText);

        // target name
        var dstText = document.createElement("input");
        dstText.id = this.GetTargetId();
        dstText.style.width = ((unitWidth - 10) + "px");
        dstText.style.position = "absolute";
        dstText.style.top = (unitHeight - 30) + "px";
        dstText.style.left = "1px";
        dstText.style.textAlign = "center";
        dstText.value = this._index * 100;
        div.appendChild(dstText);

        inputBorder.appendChild(div);

        return true;
    } catch (e) {
        var errMsg = this._name + ".MakeUI.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }

    return false;
}

// remove ui
InputUnit.prototype.RemoveUI = function() {
    try {
        this.GetObject().remove();

        return true;
    } catch (e) {
        var errMsg = this._name + ".RemoveUI.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }

    return false;
}

// get unit object
InputUnit.prototype.GetObject = function() {
    try {
        return document.getElementById(this.GetBorderId());
    } catch (e) {
        var errMsg = this._name + ".GetObject.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// get source text
InputUnit.prototype.GetSourceText = function() {
    try {
        return document.getElementById(this.GetSourceId()).value;
    } catch (e) {
        var errMsg = this._name + ".RemoveUI.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }

    return "";
}

// get target text
InputUnit.prototype.GetTargetText = function() {
    try {
        return document.getElementById(this.GetTargetId()).value;
    } catch (e) {
        var errMsg = this._name + ".RemoveUI.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }

    return "";
}


///////////////////////////////////////////////////////////////////////
/// InputUnitManager
///////////////////////////////////////////////////////////////////////
var InputUnitManager = function(name, sceneWidth, sceneHeight, unitWidth) {
    ClsObject.apply(this, arguments);

    this._units = new Array();
    this._sceneWidth = sceneWidth;
    this._sceneHeight = sceneHeight;
    this._unitWidth = unitWidth;
}

InputUnitManager.prototype = Object.create(ClsObject.prototype);
InputUnitManager.prototype.constructor = InputUnitManager;

// 현재 unit count 반환
InputUnitManager.prototype.GetCount = function() {
    try {
        return this._units.length;
    } catch (e) {
        var errMsg = this._name + ".GetCount.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }

    return 0;
}

// 신규 unit 생성
InputUnitManager.prototype.CreateUnit = function() {

    try {

        var unitCount = this.GetCount();

        /*if ((unitCount + 1) * this._unitWidth > this._sceneWidth)
        {
            return [false, "더 이상 생성할 없습니다."];
        }*/

        if (this.IsAppendEnable() == false)
        {
            return [false, "더 이상 생성할 없습니다."];
        }
        
        var unit = new InputUnit("InputUnit", unitCount);
        if (unit.MakeUI(this._unitWidth, this._sceneHeight) == true)
        {
            this._units.push(unit);
        }

        this.ReposUnits();

    } catch (e) {
        var errMsg = this._name + ".CreateUnit.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
        return [false, errMsg];
    }    

    return [true, ""];
}

// unit 삭제
InputUnitManager.prototype.RemoveLast = function() {

    try {

        let lastIndex = this.GetCount() - 1;

        if (lastIndex <= 1)
        {
            return [false, "더 이상 삭제할 없습니다."];
        }

        this._units[lastIndex].RemoveUI();
        this._units.splice(lastIndex, 1);

        this.ReposUnits();

    } catch (e) {
        var errMsg = this._name + ".RemoveLast.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
        return [false, errMsg];
    }    

    return [true, ""];
}


// unit 위치 조절
InputUnitManager.prototype.ReposUnits = function() {
    try {
        if (this._units.length <= 0) { return; }

        //
        let divLineDistance = this.GetDivLineDistance(false);
        let unitHalfWidth = parseInt(this._unitWidth / 2);
        let currentPos = 0;

        //
        this._units.forEach( function(item, index, arr) {
            currentPos += divLineDistance;

            var unit = item.GetObject();
            unit.style.left = (currentPos - unitHalfWidth) + "px";
        });
    } catch (e) {
        var errMsg = this._name + ".ReposUnits.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

// get repos unit div line width
InputUnitManager.prototype.GetDivLineDistance = function(isIfAdd) {
    return (!isIfAdd) ? 
    parseInt(this._sceneWidth / (this._units.length + 1))
    : parseInt(this._sceneWidth / (this._units.length + 2));
}

// div line 계산으로 더 생성 가능한지 계산
InputUnitManager.prototype.IsAppendEnable = function() {
    let distance = this.GetDivLineDistance(true);

    if (distance < this._unitWidth) { return false;}

    return true;
}

// unitTextManager 반환
InputUnitManager.prototype.MakeUnitTextManager = function(failIfEmpty) {

    let unitTextManager = undefined;

    try {
        unitTextManager = new UnitTextManager("UnitTextManager");

        for (var i = 0; i < this._units.length; i++) {
            if (unitTextManager.Append(this._units[i].GetSourceText(), this._units[i].GetTargetText(), failIfEmpty) == false)
            {
                return undefined;
            }
        }
    } catch (e) {
        var errMsg = this._name + ".MakeUnitTextManager.catched: " + e;
        console.log(errMsg);
        unitTextManager = undefined;
        alert(errMsg);
    }  

    return unitTextManager;
}