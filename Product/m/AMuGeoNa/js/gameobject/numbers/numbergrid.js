/*
 box grid 정보 
*/

class NumberGrid extends ClsObject {
    #_PV = {};

    constructor(name, scene, boxRowCount, boxSize, centerX, centerY) {
        try {
            super(name);

            let v = this.#_PV;

            v.scene = scene;
            v.boxRowCount = boxRowCount;
            v.boxSize = boxSize;
            v.centerX = centerX;
            v.centerY = centerY;
            v.movingInfo = undefined;

            // box 배열 생성 및 위치 지정
            v.boxs = new Array(boxRowCount);
            {
                const isOdd = (boxRowCount % 2) === 1 ? true : false;
                let beginX = 0, beginY = 0;

                if (isOdd === true)
                {
                    let halfBoxHalfCount = (boxRowCount - 1) / 2;
                    let diffBeginPos = halfBoxHalfCount * boxSize;

                    beginX = centerX - diffBeginPos;
                    beginY = centerY - diffBeginPos;
                }
                else
                {
                    let halfBoxHalfCount = (boxRowCount) / 2;
                    let diffBeginPos = halfBoxHalfCount * boxSize;
                    let halfBoxSize = boxSize / 2;

                    beginX = centerX - diffBeginPos + halfBoxSize;
                    beginY = centerY - diffBeginPos + halfBoxSize;
                }
                
                let setX = beginX, setY = beginY;
                for (var i = 0; i < boxRowCount; i++) {
                    v.boxs[i] = new Array(boxRowCount);

                    setX = beginX;
                    for (var j = 0; j < boxRowCount; j++) {
                        v.boxs[i][j] = {
                            x: setX,
                            y: setY,
                            box: undefined,
                        };

                        setX += boxSize;
                    }

                    setY += boxSize;
                }
            }

            // update 이벤트 등록
            scene.subscribeUpdate(this);

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        try {
            let v = this.#_PV;

            for (var i = 0; i < v.boxRowCount; i++) {
                for (var j = 0; j < v.boxRowCount; j++) {
                    destroyObject(v.boxs[i][j].box);
                }
            }

            v.scene.unsubscribeUpdate(this);

        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // update event
    update() {
        if (this.#_PV.movingInfo == undefined) { return; }
        if (this.#_PV.movingInfo.moveToCell == undefined) { return; }
        //console.log(this.#_PV.movingInfo);

        this.moveUpdate();
    }

    // random box 생성
    createBox() {
        try {

            let v = this.#_PV;
            let targets = new Array();

            for (var i = 0; i < v.boxRowCount; i++) {
                for (var j = 0; j < v.boxRowCount; j++) {
                    if (v.boxs[i][j].box == undefined) {
                        targets.push({row: i, col: j});
                    }
                }
            }

            //
            if (targets.length <= 0) {
                console.log("no more empty target");
                return false;
            }

            //
            const targetIndex = getRandomNumber(0, targets.length - 1);
            const row = targets[targetIndex].row;
            const col = targets[targetIndex].col;
            //if (v.boxs[row][col].box != undefined) { return true; }
            v.boxs[row][col].box = new NumberBox("box_" + row + "_" + col, v.scene, v.boxs[row][col].x, v.boxs[row][col].y, v.boxSize);

            return true;

        } catch (e) {
            var errMsg = this.getExpMsg("createBox", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return false;
    }

    moveToLeft(onFinished) {
        try {

            let v = this.#_PV;

            /*var bbb = v.boxs[0][4].box;
            bbb.fusion(bbb);
            onFinished(true);
            return; */

            v.movingInfo = {
                onFinished: onFinished,
                direction: Direction.LEFT,
                targets: new Queue(),
            };

            // 이동 대상 순서 생성
            let targets = v.movingInfo.targets;
            {
                for (var i = 0; i < v.boxRowCount; i++) 
                {
                    for (var j = 1; j < v.boxRowCount; j++)
                    {
                        if (v.boxs[i][j].box == undefined) { continue; }
                        targets.enque({
                            row: i,
                            col: j,
                            obj: v.boxs[i][j],
                        });
                    }
                }
            }

            /*console.log(targets.Data);
            v.movingInfo.onFinished(true);
            v.movingInfo = undefined; */   
            
            this.moveNext();

        } catch (e) {
            var errMsg = this.getExpMsg("moveToLeft", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    moveToRight(onFinished) {
        try {

            let v = this.#_PV;
            
            v.movingInfo = {
                onFinished: onFinished,
                direction: Direction.RIGHT,
                targets: new Queue(),
            };

            // 이동 대상 순서 생성
            let targets = v.movingInfo.targets;
            {
                for (var i = 0; i < v.boxRowCount; i++) 
                {
                    for (var j = v.boxRowCount - 2; j >= 0; j--)
                    {
                        if (v.boxs[i][j].box == undefined) { continue; }
                        targets.enque({
                            row: i,
                            col: j,
                            obj: v.boxs[i][j],
                        });
                    }
                }
            } 
            
            this.moveNext();

        } catch (e) {
            var errMsg = this.getExpMsg("moveToRight", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    moveToUp(onFinished) {
        try {

            let v = this.#_PV;
            
            v.movingInfo = {
                onFinished: onFinished,
                direction: Direction.UP,
                targets: new Queue(),
            };

            // 이동 대상 순서 생성
            let targets = v.movingInfo.targets;
            {
                for (var i = 0; i < v.boxRowCount; i++) 
                {
                    for (var j = 1; j < v.boxRowCount; j++)
                    {
                        if (v.boxs[j][i].box == undefined) { continue; }
                        targets.enque({
                            row: j,
                            col: i,
                            obj: v.boxs[j][i],
                        });
                    }
                }
            }
            
            this.moveNext();

        } catch (e) {
            var errMsg = this.getExpMsg("moveToUp", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    moveToDown(onFinished) {
        try {

            let v = this.#_PV;
            
            v.movingInfo = {
                onFinished: onFinished,
                direction: Direction.DOWN,
                targets: new Queue(),
            };

            // 이동 대상 순서 생성
            let targets = v.movingInfo.targets;
            {
                for (var i = 0; i < v.boxRowCount; i++) 
                {
                    for (var j = v.boxRowCount - 2; j >= 0; j--)
                    {
                        if (v.boxs[j][i].box == undefined) { continue; }
                        targets.enque({
                            row: j,
                            col: i,
                            obj: v.boxs[j][i],
                        });
                    }
                }
            } 

            this.moveNext();

        } catch (e) {
            var errMsg = this.getExpMsg("moveToDown", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // move next
    moveNext() {
        try {
            let v = this.#_PV;
            let mi = v.movingInfo;

            // 이전 대상이 존재한다면 끝났으므로 depth reset
            if (mi.target != undefined) {
                mi.target.obj.box.setDepthAsGeneral();
            }            

            // 이동 대상이 없는지 확인
            if (mi.targets.count <= 0)
            {
                console.log("move ended");
                mi.onFinished(true);
                v.movingInfo = undefined;
                return;
            }

            // 다음 대상 확보
            mi.target = mi.targets.deque();
            mi.target.obj.box.setDepthAsMoving();

            this.moveTo();

        } catch (e) {
            var errMsg = this.getExpMsg("moveNext", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // move to 
    moveTo() {
        try {
            let v = this.#_PV;
            let mi = v.movingInfo;
            let target = mi.target;

            //
            if (target == undefined) {
                this.moveNext();
                return;
            }

            // 이동 위치 설정
            mi.moveToCell = {col: -1, row: -1, setted: false,
                set: function(r, c, o) { 
                    this.col = c;
                    this.row = r;
                    this.obj = o;
                    this.setted = true;
                    //console.log(this);
                }
            };
            switch (mi.direction)
            {
                case Direction.LEFT:
                    {
                        var nextCol = target.col - 1;
                        if (nextCol < 0) { // no more
                            mi.moveToCell = undefined;
                            this.moveNext();
                            return;
                        }
                        else if (v.boxs[target.row][nextCol].box == undefined) {
                            mi.moveToCell.set(target.row, nextCol, v.boxs[target.row][nextCol]);
                        } else if (v.boxs[target.row][nextCol].box.isEqualNumber(v.boxs[target.row][target.col].box) == true) {
                            mi.moveToCell.set(target.row, nextCol, v.boxs[target.row][nextCol]);
                        } else { // 이동 불가
                            mi.moveToCell = undefined;
                            this.moveNext();
                            return;
                        }
                    }
                    break;

                case Direction.RIGHT:
                    {
                        var nextCol = target.col + 1;
                        if (nextCol >= v.boxRowCount) { // no more
                            mi.moveToCell = undefined;
                            this.moveNext();
                            return;
                        }
                        else if (v.boxs[target.row][nextCol].box == undefined) {
                            mi.moveToCell.set(target.row, nextCol, v.boxs[target.row][nextCol]);
                        } else if (v.boxs[target.row][nextCol].box.isEqualNumber(v.boxs[target.row][target.col].box) == true) {
                            mi.moveToCell.set(target.row, nextCol, v.boxs[target.row][nextCol]);
                        } else { // 이동 불가
                            mi.moveToCell = undefined;
                            this.moveNext();
                            return;
                        }
                    }
                    break;

                case Direction.UP:
                    {
                        var nextRow = target.row - 1;
                        if (nextRow < 0) { // no more
                            mi.moveToCell = undefined;
                            this.moveNext();
                            return;
                        }
                        else if (v.boxs[nextRow][target.col].box == undefined) {
                            mi.moveToCell.set(nextRow, target.col, v.boxs[nextRow][target.col]);
                        } else if (v.boxs[nextRow][target.col].box.isEqualNumber(v.boxs[target.row][target.col].box) == true) {
                            mi.moveToCell.set(nextRow, target.col, v.boxs[nextRow][target.col]);
                        } else { // 이동 불가
                            mi.moveToCell = undefined;
                            this.moveNext();
                            return;
                        }
                    }
                    break;

                case Direction.DOWN:
                    {
                        var nextRow = target.row + 1;
                        if (nextRow >= v.boxRowCount) { // no more
                            mi.moveToCell = undefined;
                            this.moveNext();
                            return;
                        }
                        else if (v.boxs[nextRow][target.col].box == undefined) {
                            mi.moveToCell.set(nextRow, target.col, v.boxs[nextRow][target.col]);
                        } else if (v.boxs[nextRow][target.col].box.isEqualNumber(v.boxs[target.row][target.col].box) == true) {
                            mi.moveToCell.set(nextRow, target.col, v.boxs[nextRow][target.col]);
                        } else { // 이동 불가
                            mi.moveToCell = undefined;
                            this.moveNext();
                            return;
                        }
                    }
                    break;
            }

        } catch (e) {
            var errMsg = this.getExpMsg("moveTo", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // move update
    moveUpdate() {
        try {
            let v = this.#_PV;
            let mi = v.movingInfo;
            let box = mi.target.obj.box;

            if (box.moveTo(mi.moveToCell.obj.x, mi.moveToCell.obj.y) === true) { // 이동 완료
                
                // clear box
                //this.printActiveBoxs();
                v.boxs[mi.target.row][mi.target.col].box = undefined;
                //this.printActiveBoxs();

                if (mi.moveToCell.obj.box == undefined) {
                    mi.target.row = mi.moveToCell.row;
                    mi.target.col = mi.moveToCell.col;
                    mi.moveToCell = undefined;

                    // set box 
                    //this.printActiveBoxs();
                    v.boxs[mi.target.row][mi.target.col].box = box;
                    //this.printActiveBoxs();
                    mi.target.obj = v.boxs[mi.target.row][mi.target.col];
                    //this.printActiveBoxs();

                    this.moveTo();
                } else {
                    let orgBox = v.boxs[mi.moveToCell.row][mi.moveToCell.col].box;
                    if (orgBox.fusion(box) === false) { throw "other number fusion-try !!!"; }

                    box.destroy();
                    mi.target = undefined;
                    mi.moveToCell = undefined;

                    this.moveNext();
                }
            }

        } catch (e) {
            var errMsg = this.getExpMsg("moveUpdate", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // console log - active boxs
    printActiveBoxs() {
        try {
            let v = this.#_PV;
            console.log("==== print active boxs ====");
            for (var i = 0; i < v.boxRowCount; i++) 
            {
                for (var j = 0; j < v.boxRowCount; j++)
                {
                    if (v.boxs[i][j].box == undefined) { continue; }
                    console.log("active box: [" + i + "][" + j + "] = " + v.boxs[i][j].box.Number);
                }
            }
        } catch (e) {
            var errMsg = this.getExpMsg("printActiveBoxs", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // box count
    get BoxCount() {
        try {
            let v = this.#_PV;
            let count = 0;
            for (var i = 0; i < v.boxRowCount; i++) 
            {
                for (var j = 0; j < v.boxRowCount; j++)
                {
                    if (v.boxs[i][j].box == undefined) { continue; }
                    count++;
                }
            }

            return count;
        } catch (e) {
            var errMsg = this.getExpMsg("BoxCount", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return -1;
    }
}