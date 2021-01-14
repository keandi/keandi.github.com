var Cell = function(name, column, row) {
    ClsObject.apply(this, arguments);

    this._column = column;
    this._row = row;

    this.setPosition();
    this.createUnits();
    this.clear();
}

Cell.prototype = Object.create(ClsObject.prototype);
Cell.prototype.constructor = Cell;

Cell.prototype.setPosition = function() {
    try {
        var xGap = (this._column * CELL_GAP);
        var yGap = (this._row * CELL_GAP);
        this._x = CELL_BEGIN_X + (this._column * CELL_SIZE) + xGap;
        this._y = CELL_BEGIN_Y + (this._row * CELL_SIZE) + yGap;
        this._centerX = this._x + (CELL_SIZE / 2);
        this._centerY = this._y + (CELL_SIZE / 2);
        
        this._innerRectX = this._x + CELL_INTERNAL_GAP;
        this._innerRectY = this._y + CELL_INTERNAL_GAP;
        this._innerRectWidth = this._innerRectHeight = CELL_SIZE - (CELL_INTERNAL_GAP * 2);

        /*if (this._column === 3 && this._row == 0) {
            console.log("cell column: " + this._column + ", row: " + this._row);
            console.log("center_x: " + this._centerX);
            console.log("center_y: " + this._centerY);
        }*/

    } catch (e) {
        var errMsg = this._name + ".setPosition.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

Cell.prototype.createUnits = function() {
    try {
        this._rectangle = GD._owner.add.rectangle(this._centerX, this._centerY, CELL_SIZE, CELL_SIZE, CELL_BACKCOLOR);
        this._innerRectangle = GD._owner.add.rectangle(this._centerX, this._centerY, this._innerRectWidth, this._innerRectHeight, CELL_INNER_BACKCOLOR);

        //console.log("rect_x: " + this._rectangle.x);
        //console.log("rect_y: " + this._rectangle.y);

        const pointTextStyle = { font: "bold 28px Arial", fill: CELL_POINT_TEXT_COLOR_STR};
        this._pointText = GD._owner.add.text(this._centerX, this._centerY, this._point, pointTextStyle).setOrigin(0.5);
    } catch (e) {
        var errMsg = this._name + ".createUnits.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

Cell.prototype.clear = function() {
    try {
        this._point = 0;
        this._menuPoint = undefined;
        //console.log("clear row: " + this._row + ",col: " + this._column + ", menupoint undefined");

        this._isEmpty = true;

        this.switchVisible();
    } catch (e) {
        var errMsg = this._name + ".clear.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

Cell.prototype.activate = function(menuPoint) {
    //console.log("active row: " + this._row + ",col: " + this._column + ", menuPoint: " + menuPoint)

    try {
        this._point = 2;
        this._menuPoint = menuPoint;
        this._isEmpty = false;

        //console.log("activate menupoint: " + menuPoint);
        this.setCircle();

        this.redrawPointText();

        this.switchVisible();
    } catch (e) {
        var errMsg = this._name + ".activate.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

Cell.prototype.redrawPointText = function() {
    try {
        this._pointText.setText(this._point);
    } catch (e) {
        var errMsg = this._name + ".redrawPointText.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

Cell.prototype.switchVisible = function() {
    try {
        var isShow = (this._isEmpty == true) ? false : true;

        this._rectangle.visible = isShow;
        this._innerRectangle.visible = isShow;
        this._pointText.visible = isShow;

        if (this._circleGraphic != undefined) {
            this._circleGraphic.visible = isShow;
        }

    } catch (e) {
        var errMsg = this._name + ".switchVisible.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

Cell.prototype.setCircle = function() {
    try {
        
        if (this._circleGraphic != undefined) {
            this._circleGraphic.destroy();
            this._circleGraphic = undefined;
        }

        //
        this._circleCenterX = this._innerRectX + CELL_CIRCLE_RADIUS;
        this._circleCenterY = this._innerRectY + CELL_CIRCLE_RADIUS;

        this._circleGraphic = GD._owner.add.graphics({ fillStyle: { color: this._menuPoint._color }});
        var circle = new Phaser.Geom.Circle(this._circleCenterX, this._circleCenterY, CELL_CIRCLE_RADIUS);
        this._circleGraphic.fillCircleShape(circle);

    } catch (e) {
        var errMsg = this._name + ".setCircle.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// merge enable check
Cell.prototype.isMergeEnable = function(fromCell) {

    var result = CellMergeEnableCheck.Unknown;
    try {

        if (this._isEmpty == true) {
            result = CellMergeEnableCheck.Unable_EmptyCell;
        } else if (fromCell._isEmpty == false
            && this._menuPoint != undefined
            && this._menuPoint === fromCell._menuPoint
            && this._point === fromCell._point) {
                result = CellMergeEnableCheck.Enable;
        } else {
            result = CellMergeEnableCheck.Unable_OtherCell;
        }

    } catch (e) {
        var errMsg = this._name + ".isMergeEnable.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }

    return result;
}

// merge
Cell.prototype.Merge = function(fromCell) {
    try {
        
        this._point += fromCell._point;
        this.redrawPointText();

        //console.log("this._menuPoint - " + this._menuPoint);
        //console.log("Merge - clear 시도");
        //console.log("fromCell._menuPoint - " + fromCell._menuPoint);
        fromCell.clear();
        //console.log("fromCell._menuPoint - " + fromCell._menuPoint);
        return true;
    } catch (e) {
        var errMsg = this._name + ".isMergeEnable.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }

    return false;
}

// Cell information move
Cell.prototype.moveInfo = function(fromCell) {
    try {
        
        //console.log("moveInfo menu point - " + fromCell._menuPoint);
        this.activate(fromCell._menuPoint);
        this._point = fromCell._point;
        this._isEmpty = false;
        this.redrawPointText();
        this.switchVisible();

        fromCell.clear();
    } catch (e) {
        var errMsg = this._name + ".isMergeEnable.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

Cell.prototype.settle = function() {
    try {
        if (this._isEmpty == true) { return; }
        else if (this._point > 2) { // 2 이상만 정산
            this._menuPoint._point += this._point;
            this.clear();

            //console.log("cell 정산완료 > r: " + this._row + ",c: " + this._column);
        }
    } catch (e) {
        var errMsg = this._name + ".settle.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}