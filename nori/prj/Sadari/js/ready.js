// variant
let unitManager = new InputUnitManager("InputUnitManager", SCENE_WIDTH, SCENE_HEIGHT - 32, INPUT_UNIT_WIDTH);


// ' + ' click
function onAdd() {
    var result = unitManager.CreateUnit();
    if (result[0] == false)
    {
        alert(result[1]);
    }
}


// ' - ' click
function onRemove() {
    
    let res = unitManager.RemoveLast();
    if (res[0] == false)
    {
        alert(res[1]);
    }
}


// ' run ' click
function onRun() {
    try {

        let unitTextManager = unitManager.MakeUnitTextManager(true);
        if (unitTextManager == undefined)
        {
            alert("입력값을 획득하지 못했습니다.\r\n빈 값이 있는지 확인하세요.");
        }
        else
        {
            document.getElementById('intro').style.display = 'none';
            document.getElementById('scene').style.display = 'block';

            onGameBegin(unitTextManager);
        }
        
    } catch (e) {
        var errMsg = "onRun.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// window.run
window.onload = function() {
    try {
        
        for (var i = 0; i < 2; i++) {
            var result = unitManager.CreateUnit();
            if (result[0] == false) {
                alert("Unit 생성 실패");
                return;
            }
        }

    } catch (e) {
        var errMsg = "window.onload.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }   
}

// 새로운 입력 object 추가
//let 