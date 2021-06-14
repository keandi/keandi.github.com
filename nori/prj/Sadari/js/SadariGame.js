///////////////////////////////////////////////////////////////////////
/// SadariGame
///////////////////////////////////////////////////////////////////////

var SadariGame = function(name, inputData) {
    GameHost.apply(this, arguments);

    this._inputData = inputData;

    this.initCaptureState();
}

SadariGame.prototype = Object.create(GameHost.prototype);
SadariGame.prototype.constructor = SadariGame;

//////////////////////////////////////////////////////////////
// global access
let _innerSadariGame = undefined;

SadariGame.prototype.setGlobal = function() {
    _innerSadariGame = this;
}

//////////////////////////////////////////////////////////////
// create line
SadariGame.prototype.createLine = function(x, index) {
    try {
        
        this._lines[index] = this.O.add.graphics();
        this._lines[index].lineStyle(SADARI_LINE_DEPTH, SADARI_LINE_COLOR);
        this._lines[index].beginPath();
        this._lines[index].moveTo(x, this._sadariLineTop);
        this._lines[index].lineTo(x, this._sadariLineBottom);
        this._lines[index].closePath();
        this._lines[index].strokePath();

        this._lines[index].index = index;

    } catch (e) {
        var errMsg = this._name + ".createLine.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

// create row points
SadariGame.prototype.createRowPoints = function(line, x1, y1, x2, y2) {
    try {
        
        var distance = parseInt((this._sadariLineBottom - this._sadariLineTop) / (SADARI_ROW_MAX + 1));

        function createRowPoint(owner, idx, x, y) {
            line.rows[idx] = owner.add.circle(x, y, ROW_POINT_RADIUS, ROW_POINT_COLOR);
            line.rows[idx].parent = line;
            line.rows[idx].index = idx;
            line.rows[idx].rect = new Rect("L" + line.index + "RP[" + idx + "]", x - ROW_POINT_RADIUS, y - ROW_POINT_RADIUS, x + ROW_POINT_RADIUS, y + ROW_POINT_RADIUS);
            //console.log(idx + ". x: " + line.rows[idx].x + ", y: " + line.rows[idx].y);
            console.log(line.rows[idx].rect.ToString());
        }

        let index = 0;
        line.rows = new Array();

        // top
        createRowPoint(this.O, index, x1, y1);
        index++;

        // loop
        let y = y1;
        for (; index <= SADARI_ROW_MAX; index++) {
            y += distance;
            createRowPoint(this.O, index, x1, y);
        }

        // bottom
        createRowPoint(this.O, index, x2, y2);

        for (var i = 0; i < index; i++) {
            console.log(i + ". " + line.rows[i]);
            console.log((i + 1) + ". " + line.rows[i + 1]);
        }

        // row 연결 정보 생성
        for (var i = 0; i <= index; i++) {
            line.rows[i].nextRowPt = (i != index) ? line.rows[i + 1] : undefined;
            line.rows[i].nextConnectionLine = undefined;
            /*console.log((i + 1) + ". " + line.rows[i + 1]);
            console.log((i + 1) + ". " + line.rows[i].nextRowPt);
            console.log(i + " - " + index + " row: " + line.rows[i].nextRowPt + ", rect: " + line.rows[i].rect.ToString()); */
        }

    } catch (e) {
        var errMsg = this._name + ".createRowPoint.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

// reset connect line (graphics)
SadariGame.prototype.resetConnectedRowPtLine = function(rowPt) {
    try {
        if (rowPt.nextConnectionLine != undefined)
        {
            rowPt.nextConnectionLine.destroy();
            rowPt.nextConnectionLine = undefined;
        }

        // 그래픽 연결 대상 처리
        if (rowPt.index == SADARI_ROW_MAX + 1)
        {
            rowPt.nextRowPt = undefined;
        }
        else
        {
            rowPt.nextRowPt = rowPt.parent.rows[rowPt.index + 1];
        }

    } catch (e) {
        var errMsg = this._name + ".createConnectedRowPtLine.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

// create connect line (graphics)
SadariGame.prototype.createConnectedRowPtLine = function(rowPt) {
    try {
        if (rowPt.nextConnectionLine != undefined)
        {
            rowPt.nextConnectionLine.destroy();
            rowPt.nextConnectionLine = undefined;
        }

        // 그래픽 연결 없음 처리
        if (rowPt.index == SADARI_ROW_MAX + 1
            || rowPt.index == 0
            || rowPt.parent == rowPt.nextRowPt.parent) { return; }

        //
        rowPt.nextConnectionLine = this.O.add.graphics();
        rowPt.nextConnectionLine.lineStyle(SADARI_LINE_DEPTH, SADARI_LINE_COLOR);
        rowPt.nextConnectionLine.beginPath();
        rowPt.nextConnectionLine.moveTo(rowPt.x, rowPt.y);
        rowPt.nextConnectionLine.lineTo(rowPt.nextRowPt.x, rowPt.nextRowPt.y);
        rowPt.nextConnectionLine.closePath();
        rowPt.nextConnectionLine.strokePath();
        
    } catch (e) {
        var errMsg = this._name + ".createConnectedRowPtLine.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

// make row pt link
SadariGame.prototype.makeRowPtLink = function(rowPt1, rowPt2) {
    try {
        if (rowPt1 == rowPt2)
        {
            alert("Same RowPt !!!");
            return;
        }

        let lineIndexDiff = Math.abs(rowPt1.parent.index - rowPt2.parent.index);
        if (lineIndexDiff != 1)
        {
            alert("Line connection is not possible! [ " + rowPt1.parent.index + " / " + rowPt2.parent.index + " ]");
            return;
        }

        console.log("rowPt2.parent.index : " + rowPt2.parent.index);
        console.log("rows len : " + this._lines[rowPt2.parent.index].rows.length);
        for (var i = 0; i < this._lines[rowPt2.parent.index].rows.length; i++)
        {
            console.log(i + ". " + this._lines[rowPt2.parent.index].rows[i]);
            console.log("222: " + this._lines[rowPt2.parent.index].rows[i].nextRowPt);
        }

        /*alert(rowPt2.index);
        alert(rowPt2.parent.index);
        alert(rowPt2.nextRowPt);*/

        if (rowPt2.nextConnectionLine != undefined
            || rowPt2.nextRowPt.parent.index != rowPt2.parent.index)
        //if (rowPt2.index != rowPt2.nextRowPt.index)
        {
            alert("Already target RowPt has next RowPt !!!");
            return;
        }

        rowPt1.nextRowPt = rowPt2;
        rowPt2.nextRowPt = rowPt1;
        this.createConnectedRowPtLine(rowPt1);
        this.createConnectedRowPtLine(rowPt2);
    } catch (e) {
        var errMsg = this._name + ".makeRowPtLink.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

// get hit point object
SadariGame.prototype.getRowPointByPoint = function(x, y) {
    try {
        for (var i = 0; i < this._lines.length; i++) {
            for (var j = 1; j < this._lines[i].rows.length - 1; j++) {
                if (this._lines[i].rows[j].rect.isIncluded(x, y) == true)
                {
                    return this._lines[i].rows[j];
                }
            }
        }
    } catch (e) {
        var errMsg = this._name + ".getRowPointByPoint.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  

    return undefined;
}

// set last hit row point
SadariGame.prototype.setLastRowPoint = function(x, y) {
    try {
        let rowPt = this.getRowPointByPoint(x, y);
        if (rowPt != this._lastRowPt)
        {
            // out
            if (this._lastRowPt != undefined)
            {
                this.onMouseOut(this._lastRowPt);
            }

            this._lastRowPt = rowPt;

            // in
            if (this._lastRowPt != undefined)
            {
                this.onMouseIn(this._lastRowPt);
            }
        }
    } catch (e) {
        var errMsg = this._name + ".setLastRowPoint.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  

    return undefined;
}

// Row Point Mouse Out Event
SadariGame.prototype.onMouseOut = function(rowPt) {
    try {
        console.log("out - " + rowPt.rect._name);
        rowPt.setFillStyle(ROW_POINT_COLOR);
    } catch (e) {
        var errMsg = this._name + ".onMouseOut.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

// Row Point Mouse In Event
SadariGame.prototype.onMouseIn = function(rowPt) {
    try {
        console.log("in - " + rowPt.rect._name);
        rowPt.setFillStyle(ROW_POINT_OVER_COLOR);
    } catch (e) {
        var errMsg = this._name + ".onMouseIn.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

// mouse left down event
SadariGame.prototype.onLMouseDown = function(x, y) {
    try {
        if (this._lastRowPt == undefined) 
        {
            console.log("no last selected");
            return;
        }

        if (this._lastRowPt.rect.isIncluded(x, y) == true)
        {
            //console.log("down x: " + x + ", y: " + y);
            console.log("down: " + this._lastRowPt.rect._name);

            if (this._lastRowPt.nextRowPt == undefined || this._lastRowPt.nextRowPt.parent.index == this._lastRowPt.parent.index)
            {
                this._lastRowPt.setFillStyle(ROW_POINT_DRAWING_COLOR);
                this.setCapture(this._lastRowPt);
            }
            else
            {
                //console.log("!!! " + this._lastRowPt.parent.index + ", " + this._lastRowPt.nextRowPt.parent.index);
            }
        }
        else
        {
            //console.log("??")
        }
    } catch (e) {
        var errMsg = this._name + ".onLMouseDown.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    } 
}

// mouse left up event
SadariGame.prototype.onLMouseUp = function(x, y) {
    try {
        if (this._capturedState.isCaptured == false) 
        { return; }
        else if (this._lastRowPt == undefined)
        {
            console.log(this._name + "onLMouseUp - No lastRowPt");
            this.resetCaptureState();
            return;
        }

        let rowPt = this.getRowPointByPoint(x, y);
        if (rowPt == undefined)
        {
            this.resetCaptureState();
            return;
        }

        //
        this.makeRowPtLink(this._lastRowPt, rowPt);
        this.resetCaptureState();
        
    } catch (e) {
        var errMsg = this._name + ".onLMouseUp.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    } 
}

// mouse capture initialize
SadariGame.prototype.initCaptureState = function() {
    try {
        this._capturedState = {
            isCaptured: false,
            target: {
                begin: undefined,
                end: undefined
            },
            guider: undefined
        };
        
    } catch (e) {
        var errMsg = this._name + ".initCaptureState.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    } 
}

// mouse capture reset
SadariGame.prototype.resetCaptureState = function() {
    try {
        this._capturedState.isCaptured = false;
        this._capturedState.target.begin = undefined;
        this._capturedState.target.end = undefined;

        if (this._capturedState.guider != undefined)
        {
            this._capturedState.guider.destroy();
            this._capturedState.guider = undefined;
        }
        
    } catch (e) {
        var errMsg = this._name + ".resetCaptureState.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    } 
}

// mouse capture
SadariGame.prototype.setCapture = function(rowPt) {
    try {
        if (rowPt == undefined)
        {
            alert("Capture target is invalid");
            return;
        }

        this.resetCaptureState();

        this._capturedState.isCaptured = true;
        this._capturedState.target.begin = rowPt;

        this._capturedState.guider = this.O.add.graphics();
        
    } catch (e) {
        var errMsg = this._name + ".resetCaptureState.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    } 
}

// mouse release
SadariGame.prototype.releaseCapture = function(x, y) {
    try {
        if (this._capturedState.isCaptured == false)
        {
            return;
        }
        else if (this._capturedState.target.begin == undefined)
        {
            alert("No begin row ")
            this.resetCaptureState();    
            return;
        }

        let endRowPt = this.getRowPointByPoint(x, y);
        if (endRowPt == undefined)
        {
            this.resetCaptureState();    
            return;
        }

        // make row point connection

        this.resetCaptureState();

        
    } catch (e) {
        var errMsg = this._name + ".resetCaptureState.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    } 
}

//////////////////////////////////////////////////////////////
// game start
SadariGame.prototype.onGameStart = function() {
    try {
        // step change
        SetGameStep(GameStep.PLAY);

        // remove input 
        this.O.input.off('pointermove');
        this.O.input.off('pointerdown');
        this.O.input.off('pointerup');
        this.O.input.keyboard.off('keydown');

        // create text
        this._titles = new Array();
        const textStyle = { fontFamily: "Arial" };

        for (var i = 0; i < this._inputData.getCount(); i++) {
            var data = this._inputData.getUnit(i);
            var src = data.GetSource();
            var dst = data.GetTarget();
            var x = this._lines[i].rows[0].x;

            // title - source
            var title = {
                source: src,
                target: dst,
                source_draw: undefined,
                move_source_draw: undefined,
                target_draw: undefined
            };
            title.source_draw = this.O.add.text(x, this._sadariLineTop - 25, title.source).setOrigin(0.5).setStyle(textStyle);
            title.move_source_draw = this.O.add.text(x, this._sadariLineTop - 25, title.source).setOrigin(0.5).setStyle(textStyle);

            // title - target
            title.target_draw = this.O.add.text(x, this._sadariLineBottom + 25, title.target).setOrigin(0.5).setStyle(textStyle);

            this._titles.push(title);
        }

        // set process target 
        this.setNextPlayData();

    } catch (e) {
        var errMsg = this._name + ".onGameStart.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    } 
}

// set process target
SadariGame.prototype.setNextPlayData = function() {
    try {
        if (this._process == undefined) {
            this._process = {
                data: undefined,
                obj: undefined,
                nextPt: undefined,
                toBottom: true,
                playing: false,
                index: -1
            };
        }

        var nextIndex = this._process.index + 1;
        if (nextIndex == this._inputData.getCount()) {
            // 완료
            SetGameStep(GameStep.END);
            alert("Game End");
            return;
        }

        //
        this._process.data = this._inputData.getUnit(nextIndex);
        this._process.obj = this._titles[nextIndex].source_draw;
        this._process.toBottom = true;
        this._process.playing = true;
        this._process.index = nextIndex;

        //
        this._process.obj.x = this._lines[nextIndex].rows[0].x;
        this._process.obj.y = this._lines[nextIndex].rows[0].y;

        //
        this._process.nextPt = this._lines[nextIndex].rows[1];

    } catch (e) {
        var errMsg = this._name + ".setNextPlayData.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

//////////////////////////////////////////////////////////////
// test

// mouse move test
SadariGame.prototype.mouseMoveTest = function() {
    this.O.input.on('pointermove', function(pointer, x, y, event) {
        console.log(_innerSadariGame._name + " - mouse x: " + pointer.x + ", y: " + pointer.y);
    });
}

//////////////////////////////////////////////////////////////
// preload
SadariGame.prototype.preload = function() {
    try {
        console.log(this._name + " - preload");

        this.setGlobal();
        this._sadariRowMax = SADARI_ROW_MAX;
        this._sadariLineTop = GAME_SCENE_SADARI_LINE_TOP;
        this._sadariLineBottom = this._config.scale.height - GAME_SCENE_SADARI_LINE_BOTTOM;
    } catch (e) {
        var errMsg = this._name + ".preload.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

// create
SadariGame.prototype.create = function() {
    try {
        console.log(this._name + " - create");

        // draw sample
        /*this._vars.rect = this.O.add.rectangle(200, 200, 50, 60, 0xFE2525);
        this._vars.moveFinished = false; */

        //////////////////////////////////////////////////////////////
        // get sadari line coordinate
        var lineDistance = parseInt(this._config.scale.width / (this._inputData.getCount() + 1));
        var x = 0;

        this._lines = new Array();

        for (var i = 0; i < this._inputData.getCount(); i++) {
            x += lineDistance;

            this.createLine(x, i);

            // make row points
            this.createRowPoints(this._lines[i], x, this._sadariLineTop, x, this._sadariLineBottom);
        }

        //////////////////////////////////////////////////////////////
        // register mouse over 
        this.O.input.on('pointermove', function(pointer, x, y, event) {
            if (_gameStep == GameStep.MAIN && _innerSadariGame._capturedState.isCaptured == false)
            {
                _innerSadariGame.setLastRowPoint(pointer.x, pointer.y);
            }
        });

        // register mouse down
        this.O.input.on('pointerdown', function(pointer, x, y, event) {
            if (_gameStep == GameStep.MAIN)
            {
                _innerSadariGame.onLMouseDown(pointer.x, pointer.y);
            }
        });

        // register mouse up
        this.O.input.on('pointerup', function(pointer, x, y, event) {
            if (_gameStep == GameStep.MAIN)
            {
                _innerSadariGame.onLMouseUp(pointer.x, pointer.y);
            }
        });

        // register key
        this.O.input.keyboard.on('keydown', function(event) {
            if (_gameStep == GameStep.MAIN) {
                switch (event.key) {
                    case ' ':
                        {
                            _innerSadariGame.onGameStart();
                        }
                        break;
                }
            }
        });
    } catch (e) {
        var errMsg = this._name + ".create.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

// real update event
SadariGame.prototype.onUpdate = function() {
    try {
        //console.log(this._name + " - onUpdate");

        // draw sample
        /*{
            var gotoX = 300;
            var gotoY = 250;
            if (this._vars.moveFinished == false)
            {
                var res = MoveTowards(this._vars.rect.x, this._vars.rect.y, gotoX, gotoY, 3.0);
                this._vars.rect.x = res[0];
                this._vars.rect.y = res[1];
                this._vars.moveFinished = res[2];
            }
            else
            {
                this._vars.rect.destroy();
            }
        }*/

        if (_gameStep == GameStep.MAIN && this._capturedState.isCaptured == true)
        {
            if (this._capturedState.guider != undefined && this._lastRowPt != undefined)
            {
                this._capturedState.guider.clear();
                
                this._capturedState.guider.lineStyle(SADARI_LINE_DEPTH, SADARI_LINE_COLOR);
                this._capturedState.guider.beginPath();
                this._capturedState.guider.moveTo(this._lastRowPt.x, this._lastRowPt.y);
                this._capturedState.guider.lineTo(this._game.input.mousePointer.x, this._game.input.mousePointer.y);
                this._capturedState.guider.closePath();
                this._capturedState.guider.strokePath();
                
            }
            else
            {
                console.log("어?" + this._lastRowPt);
            }
        }
        else if (_gameStep == GameStep.PLAY)
        {
            if (this._process != undefined)
            {
                if (this._process.playing == false)
                {
                    this.setNextPlayData();
                }
                else
                {
                    var res = MoveTowards(this._process.obj.x, this._process.obj.y, this._process.nextPt.x, this._process.nextPt.y, 3.0);
                    this._process.obj.x = res[0];
                    this._process.obj.y = res[1];
                    
                    if (res[2] == true)
                    {
                        if (this._process.nextPt.nextRowPt == undefined)
                        {
                            this.setNextPlayData();
                        }
                        else
                        {
                            if (this._process.nextPt.parent != this._process.nextPt.nextRowPt.parent)
                            {
                                if (this._process.toBottom == false)
                                {
                                    this._process.nextPt = this._process.nextPt.parent.rows[this._process.nextPt.index + 1];
                                    this._process.toBottom = true;
                                }
                                else
                                {
                                    this._process.nextPt = this._process.nextPt.nextRowPt;    
                                    this._process.toBottom = false;
                                }
                            }
                            else
                            {
                                this._process.nextPt = this._process.nextPt.nextRowPt;    
                                this._process.toBottom = true;
                            }
                        }
                    }
                }
            }
        }

    } catch (e) {
        var errMsg = this._name + ".onUpdate.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}