var CellManager = function(name) {
    ClsObject.apply(this, arguments);

    this.createCells();
}

CellManager.prototype = Object.create(ClsObject.prototype);
CellManager.prototype.constructor = CellManager;

CellManager.prototype.createCells = function() {
    try {

        //this._cell = new Cell("temp cell", 0, 0);
        //alert("cellmanager");
        
        this._cells = Array(Array(), Array(), Array(), Array(), Array());

        for (var row = 0; row < CELL_MAX; row++) {
            for (var col = 0; col < CELL_MAX; col++) {
                //console.log("current: " + row + ", " + col);
                this._cells[row][col] = new Cell("cell_" + row + "_" + col, col, row);
            }
        }
    } catch (e) {
        var errMsg = this._name + ".createCells.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// new active cell
CellManager.prototype.activeAnyCell = function() {
    var result = ActivateCellResult.Failed;
    try {
        var emptyArray = [];
        var emptyArrayMax = 0;

        // 빈 cell 찾기
        for (var row = 0; row < CELL_MAX; row++) {
            for (var col = 0; col < CELL_MAX; col++) {
                if (this._cells[row][col]._isEmpty === true) {
                    emptyArray.push(
                        {
                            column: col,
                            row: row
                        }
                    );
                    emptyArrayMax++;
                }
            }
        }

        //
        /*for (var i = 0; i < emptyArrayMax; i++) {
            console.log("array[" + i + "] col: " + emptyArray[i].column + " row: " + emptyArray[i].row);
        }*/

        //
        if (emptyArrayMax <= 0) {
            return ActivateCellResult.NoMoreEmpty;
        }

        //
        var rndIdx = GetRandom(0, emptyArrayMax - 1);
        //console.log("rndIdx: " + rndIdx);
        var rowCol = emptyArray[rndIdx];
        //rowCol.column = 3;
        //rowCol.row = 0;
        this._cells[rowCol.row][rowCol.column].activate(GD._menuPoints.getRandMenuPoint());
        //console.log("active - " + this._cells[rowCol.row][rowCol.column]._name + this._cells[rowCol.row][rowCol.column]._isEmpty + ", menuPoint: " + this._cells[rowCol.row][rowCol.column]._menuPoints);
        return ActivateCellResult.Success;

    } catch (e) {
        var errMsg = this._name + ".createCells.catched: " + e;
        console.log(errMsg);
        alert(errMsg);

        result = false;
    }

    return result;
}

//key action
CellManager.prototype.moveCells = function(keyArrow) {
    var moveCount = 0;

    try {
        //
        var lastEmptyRowCol = {
            column: -1,
            row: -1
        };

        //
        var clearLastEmptyRowCol = function () {
            lastEmptyRowCol.column = lastEmptyRowCol.row = -1;
        }

        //
        var isRightLastEmpty = function() {
            return (lastEmptyRowCol.column >= 0 && lastEmptyRowCol.row >= 0) ? true : false;
        }

        //
        var mergeAction = function(srcRow, srcCol, dstRow, dstCol) {
            var targetCell = GD._cellManager._cells[dstRow][dstCol];
            var currentCell = GD._cellManager._cells[srcRow][srcCol];

            //console.log("mergeAction " + srcRow + ", " + srcCol + " -> " + dstRow + ", " + dstCol);            

            var mergeEnable = targetCell.isMergeEnable(currentCell);
            switch (mergeEnable) {
                case CellMergeEnableCheck.Enable:
                    {
                        if (targetCell.Merge(currentCell) == false) {
                            LogAlert("Cell 을 합칠 수 없습니다.");
                            targetCell.printName("targetCell");
                            currentCell.printName("currentCell");
                            return CellMergeResult.Failed_LogicError;
                        }
                        moveCount++;
                        return CellMergeResult.Success;
                    }
                    break;

                case CellMergeEnableCheck.Unable_EmptyCell:
                    {
                        lastEmptyRowCol.row = dstRow;
                        lastEmptyRowCol.column = dstCol;
                        //console.log("텅빈 셀");
                        return CellMergeResult.Failed_EmptyCell;
                    }

                case CellMergeEnableCheck.Unable_OtherCell:
                    {
                        //console.log("다른 셀");
                    }
                    return CellMergeResult.Failed_OtherCell;

                default:
                    return CellMergeResult.Unknown;
            }
        }

        //
        switch (keyArrow) {
            case KeyArrow.Left:
                {
                    for (var r = 0; r < CELL_MAX; r++) {
                        for (var c = 1; c < CELL_MAX; c++) {
                            //console.log("moveCells / r: " + r + ", c: " + c);
                            if (GD._cellManager._cells[r][c]._isEmpty == true) { continue; }

                            clearLastEmptyRowCol();
                            //console.log("moveCells / r: " + r + ", c: " + c);
                            
                            var mergeResult;
                            for (var targetColumn = c - 1; targetColumn >= 0; targetColumn--) {
                                mergeResult = mergeAction(r, c, r, targetColumn);
                                if (mergeResult !== CellMergeResult.Failed_EmptyCell) { 
                                    break; 
                                }
                            }

                            if (mergeResult != CellMergeResult.Success && isRightLastEmpty() == true) {
                                //console.log("isRightLastEmpty(" + mergeResult + ") - moveInfo = to>r:" + lastEmptyRowCol.row + ", c: " + lastEmptyRowCol.column + " ,from>r:" + r + ", c" + c);
                                GD._cellManager._cells[lastEmptyRowCol.row][lastEmptyRowCol.column].moveInfo(GD._cellManager._cells[r][c]);
                                moveCount++;
                            }
                        }
                    }
                }
                break;

            case KeyArrow.Up:
                {
                    for (var sc = 0; sc < CELL_MAX; sc++) {
                        for (var sr = 1; sr < CELL_MAX; sr++) {
                            if (GD._cellManager._cells[sr][sc]._isEmpty == true) { continue; }

                            clearLastEmptyRowCol();
                            
                            var mergeResult;
                            var dc = sc;
                            for (var dr = sr - 1; dr >= 0; dr--) {
                                mergeResult = mergeAction(sr, sc, dr, dc);
                                if (mergeResult !== CellMergeResult.Failed_EmptyCell) { 
                                    break; 
                                }
                            }

                            if (mergeResult != CellMergeResult.Success && isRightLastEmpty() == true) {
                                GD._cellManager._cells[lastEmptyRowCol.row][lastEmptyRowCol.column].moveInfo(GD._cellManager._cells[sr][sc]);
                                moveCount++;
                            }
                        }
                    }
                }
                break;

            case KeyArrow.Right:
                {
                    for (var sr = 0; sr < CELL_MAX; sr++) {
                        for (var sc = CELL_MAX - 2; sc >= 0; sc--) {
                            if (GD._cellManager._cells[sr][sc]._isEmpty == true) { continue; }

                            clearLastEmptyRowCol();
                            
                            var mergeResult;
                            var dr = sr;
                            for (var dc = sc + 1; dc < CELL_MAX; dc++) {
                                mergeResult = mergeAction(sr, sc, dr, dc);
                                if (mergeResult !== CellMergeResult.Failed_EmptyCell) { 
                                    break; 
                                }
                            }

                            if (mergeResult != CellMergeResult.Success && isRightLastEmpty() == true) {
                                GD._cellManager._cells[lastEmptyRowCol.row][lastEmptyRowCol.column].moveInfo(GD._cellManager._cells[sr][sc]);
                                moveCount++;
                            }
                        }
                    }
                }
                break;
            
            case KeyArrow.Down:
                {
                    for (var sc = 0; sc < CELL_MAX; sc++) {
                        for (var sr = CELL_MAX - 2; sr >= 0; sr--) {
                            if (GD._cellManager._cells[sr][sc]._isEmpty == true) { continue; }

                            clearLastEmptyRowCol();
                            
                            var mergeResult;
                            var dc = sc;
                            for (var dr = sr + 1; dr < CELL_MAX; dr++) {
                                mergeResult = mergeAction(sr, sc, dr, dc);
                                if (mergeResult !== CellMergeResult.Failed_EmptyCell) { 
                                    break; 
                                }
                            }

                            if (mergeResult != CellMergeResult.Success && isRightLastEmpty() == true) {
                                GD._cellManager._cells[lastEmptyRowCol.row][lastEmptyRowCol.column].moveInfo(GD._cellManager._cells[sr][sc]);
                                moveCount++;
                            }
                        }
                    }
                }
                break;

            default:
                {
                    console.log(GD._cellManager._name + ".moveCells - Unknown KeyArrow");
                    return;
                }
                break;
        }
    } catch (e) {
        var errMsg = this._name + ".moveCells.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }

    return moveCount;
}

CellManager.prototype.loopCells = function(action) {
    for (var row = 0; row < CELL_MAX; row++) {
        for (var col = 0; col < CELL_MAX; col++) {
            action(row, col);
        }
    }
}

CellManager.prototype.loopCellObjects = function(action) {
    var me = GD._cellManager;
    me.loopCells((row, col) => {
        action(me._cells[row][col]);
    });
}

CellManager.prototype.settle = function(isGameOver) {
    var me = GD._cellManager;
    var pointSettle = GD._pointSettle;
    var menuPoints = GD._menuPoints;

    try {
        // 
        me.loopCellObjects((cell) => {
            //console.log("loopCellObjects: r: " + cell._row + ", c: " + cell._column);
            cell.settle();
        });

        // settle - menu point order
        pointSettle.settle(isGameOver);

    } catch (e) {
        var errMsg = me._name + ".settle.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}