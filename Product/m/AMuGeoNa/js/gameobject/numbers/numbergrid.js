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

                        x += boxSize;
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
        
    }

    // random box 생성
    createBox() {
        try {

            let v = this.#_PV;
            let boxArray = new Array();

            for (var i = 0; i < v.boxRowCount; i++) {
                for (var j = 0; j < v.boxRowCount; j++) {
                    //v.boxs[i][j].box = new NumberBox("box_" + i + "_" + j, scene, setX, setY);
                    //destroyObject(v.boxs[i][j].box);
                }
            }

        } catch (e) {
            var errMsg = this.getExpMsg("createBox", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}