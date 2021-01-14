//
window.onload = function() {
    //alert('window.onload');
    loadMenus();
}

//
function runGame() {
    //console.log("runGame begin");

    try {
        var menuList = gMenuLogic.getMenuList();
        if (menuList == undefined || menuList.length <= 1) {
            alert("2개 이상의 메뉴를 입력하세요");
            return;
        }

        //
        var checkCount = 0;
        for (var i = 0; i < menuList.length; i++) {
            if (menuList[i]._isChecked == true) {
                checkCount++;
            }
        }
        if (checkCount <= 1) {
            alert("2개 이상의 메뉴를 선택하세요");
            return;
        }

        gMenuLogic.SaveMenus(menuList)

        //
        document.getElementById('intro').style.display = 'none';

        //
        document.getElementById('scene').style.display = 'block';

        //
        onGame(menuList);
    } catch (e) {
        alert("runGame: " + e);
    } finally {

    }
}

//
function autoLoadGame() {
    try {
        
    } catch (e) {
        alert("autoLoadGame: " + e);
    } finally {

    }
}

///// input body //////
function loadMenus() {
    gMenuLogic.LoadMenus();
}

//// NenuLogic
var MenuLogic = function(name) {
    ClsObject.apply(this, arguments);
}

MenuLogic.prototype = Object.create(ClsObject.prototype);
MenuLogic.prototype.constructor = MenuLogic;

MenuLogic.prototype.LoadMenus = function() {
    //alert("Load Menus");
    //this.printName("m-title");

    try {
        var menuItemGroup = this.GetInputElement();
        var items = "";
        for (var i = 0; i <= MENU_INPUT_MAX; i++) {
            items += "<div>"
                        + "<input type='checkbox' id='chk_" + i + "'>" 
                        + "<input type='text' id='menutxt_" + i + "' style='width: 200px;'>"
                        + "</div>";
        }
        menuItemGroup.innerHTML = items;

        // load cookie
        //var cookie = new Cookie("SaveCookie", "wlng.com", 120);
        for (var i = 0; i < MENU_INPUT_MAX; i++) {
            //document.getElementById('menutxt_' + i).value = cookie.getCookie("wlngMenu_" + i);
            var menuText = localStorage["wlngMenu_" + i];
            if (menuText == undefined) { menuText = ""; }
            document.getElementById('menutxt_' + i).value = menuText;
        }
    } catch (e) {
        alert(this._name + ".LoadMenus.catched: " + e);
    } finally {

    }
}

MenuLogic.prototype.getMenuList = function() {
    //alert("Load Menus");
    //this.printName("m-title");

    try {
        return this.HtmlToMenuItem();
        
    } catch (e) {
        alert(this._name + ".getMenuList.catched: " + e);
    } finally {

    }
}

MenuLogic.prototype.SaveMenus = function(menuItemList) {
    //alert("MenuLogic.prototype.SaveMenus");

    try {
        //var cookie = new Cookie("SaveCookie", "wlng.com", 120);
        for (var i = 0; i < menuItemList.length; i++) {
            //cookie.setCookie("wlngMenu_" + i, menuItemList[i]._itemName);
            localStorage["wlngMenu_" + i] = menuItemList[i]._itemName;
        }
        
    } catch (e) {
        alert(this._name + ".SaveMenus.catched: " + e);
    } finally {

    }
}

MenuLogic.prototype.HtmlToMenuItem = function() {
    //alert("MenuLogic.prototype.HtmlToMenuItem");

    var menuItemList = undefined;

    try {
        var menuItemGroup = this.GetInputElement();
        var menuName;
        var isChecked;
        for (var i = 0; i < MENU_INPUT_MAX; i++) {
            menuName = document.getElementById('menutxt_' + i).value.replace(/^\s+|\s+$/g,"");
            if (menuName.length > 0) {
                isChecked = document.getElementById('chk_' + i).checked;
                var menu = new MenuItem("MenuItem_" + i, isChecked, menuName);
                if (menuItemList == undefined) {
                    menuItemList = [];
                }
                menuItemList.push(menu);

                //console.log("HtmlToMenuItem/menu: " + menu._isChecked + ", " + menu._itemName);
            }
        }
        
    } catch (e) {
        alert(this._name + ".HtmlToMenuItem.catched: " + e);
    } finally {
        
    }

    return menuItemList;
}

MenuLogic.prototype.GetInputElement = function() {
    return document.getElementById('menuItems');
}

var gMenuLogic = new MenuLogic("Global Menu Logic");

//// MenuItem
var MenuItem = function(name, isChecked, itemName) {
    ClsObject.apply(this, arguments);

    this._isChecked = isChecked;
    this._itemName = itemName;
}

MenuItem.prototype = Object.create(ClsObject.prototype);
MenuItem.prototype.constructor = MenuItem;

////// game body //////////
// declare
var game;

// function
function onGame(menuList) {
    var config = {
        type: Phaser.AUTO,
        scale: {
            parent: 'scene',
            width: SCENE_WIDTH,
            height: SCENE_HEIGHT
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 200}
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        },
        backgroundColor: BACKGROUND_COLOR_STR
    };

    InitGlobalData();

    game = new Phaser.Game(config);
    game._name = "game-main";

    GD._menuList = menuList;
}

function preload() {
    //this.game.scale.width
    //alert(this.game._name);

    GD._owner = this;
    GD._gameState = GameState.Running;

    createBackgroundObjects();
    GD._cellManager = new CellManager("CellManager");
    GD._menuPoints = new MenuPoints("MenuPoints");
    GD._pointSettle = new PointSettle("PointSettle");

    var suffleColors = GD._colorTable.getSuffleColorTable();
    
    for (var i = 0; i < GD._menuList.length; i++) {
        if (GD._menuList[i]._isChecked == false) { continue; }
        GD._menuPoints.addMenu(GD._menuList[i]._itemName, suffleColors._colors[i]);
    }

    /*for (var i = 0; i < GD._menuPoints._points.length; i++) {
        console.log("point: " + i + ". " + GD._menuPoints._points[i]._menuName);
    }*/
}

function create() {
    //
    activateCell();

    //
    this.input.keyboard.on('keydown', function(event) {
        if (GD._gameState === GameState.Finished) {
            console.log('Game is over');
            return;
        }

        switch (event.key)
        {
            case 'w':
            case 'W':
                {
                    if (GD._cellManager.moveCells(KeyArrow.Up) > 0) {
                        activateCell();
                    }
                }
                break;

            case 's':
            case 'S':
                {
                    if (GD._cellManager.moveCells(KeyArrow.Down) > 0) {
                        activateCell();
                    }
                }
                break;
                    
            case 'a':
            case 'A':
                {
                    if (GD._cellManager.moveCells(KeyArrow.Left) > 0) {
                        activateCell();
                    }
                }
                break;

            case 'd':
            case 'D':
                {
                    if (GD._cellManager.moveCells(KeyArrow.Right) > 0) {
                        activateCell();
                    }
                }
                break;

            case ' ':
                {
                    //alert("정산");
                    GD._cellManager.settle(false);
                }
                break;

            case 'Enter':
                {
                    alert("종료");
                    GD._cellManager.settle(true);
                    GD._gameState = GameState.Finished;
                }
                break;

            default:
                {
                    console.log("key down: " + event.key);
                }
                break;
        }
    }, this);

    //
    GD._cellManager.settle(false);
}

function update() {

}

// create new cell 
function activateCell() {
    if (GD._gameState != GameState.Running) {
        console.log("진행중이 아닐 때는 새로운 셀을 생성할 수 없습니다.")
        return;
    }

    try {
        switch (GD._cellManager.activeAnyCell())
        {
            case ActivateCellResult.NoMoreEmpty:
                {
                    var msg = "게임오버";
                    gameFinish();
                }
                break;

            case ActivateCellResult.Success:
                break;

            case ActivateCellResult.Failed:
                {
                    var msg = this._name + ".activateCell: 신규 셀 활성화 실패";
                    console.log(msg);
                    alert(msg);
                    GD._gameState = GameState.Finished;
                }
                break;
            
            default:
                {
                    var msg = this._name + ".activateCell: 알수없는 에러 발생";
                    console.log(msg);
                    alert(msg);
                    GD._gameState = GameState.Finished;
                }
                break;
        }
    } catch (e) {
        var errMsg = this._name + ".activateCell.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// 게임 마무리
function gameFinish() {
    try {
        GD._gameState = GameState.Finished;

        // 최종 화면 보여주기 
    } catch (e) {
        var errMsg = this._name + ".gameFinish.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// create units background
function createBackgroundObjects() {
    try {
        // box
        var cellSize = CELL_SIZE * CELL_MAX;
        var cellGapSize = CELL_GAP * (CELL_MAX - 1);
        var boxSize = cellSize + cellGapSize;
        var boxCenterX = CELL_BEGIN_X + (boxSize / 2);
        var boxCenterY = CELL_BEGIN_Y + (boxSize / 2);
        this._box = GD._owner.add.rectangle(boxCenterX, boxCenterY, boxSize, boxSize, 0xdfdfdf);

        // box internal line - 수평
        var defalutBoxGap = CELL_SIZE + CELL_GAP;
        var lineEndX = boxSize + CELL_BEGIN_X;
        //console.log("boxSize: " + boxSize);
        //console.log("lineEndX: " + lineEndX);
        //console.log("defalutBoxGap: " + defalutBoxGap);
        var lineY;
        for (var i = 1; i < CELL_MAX; i++) {
            lineY = CELL_BEGIN_Y + (defalutBoxGap * i) - (CELL_GAP / 2);
            //console.log("lineY: " + lineY);
            //GD._owner.add.line(0, 0, 100, lineY, lineEndX, lineY, BACKGROUND_COLOR);
            //GD._owner.add.line(0, 0, this._box.x, this._box.y, lineEndX, lineY, BACKGROUND_COLOR);

            var graphics = GD._owner.add.graphics({ lineStyle: {width: 1, color: BACKGROUND_COLOR } });
            line = new Phaser.Geom.Line(CELL_BEGIN_X, lineY, lineEndX, lineY)
            graphics.strokeLineShape(line)
        }
        //  WebGL only
        //r2.setLineWidth(1, 1);

        // box internal line - 수직
        var lineX;
        var lineEndY = boxSize + CELL_BEGIN_Y;
        for (var i = 1; i < CELL_MAX; i++) {
            lineX = CELL_BEGIN_X + (defalutBoxGap * i) - (CELL_GAP / 2);
            //console.log("lineY: " + lineY);
            //GD._owner.add.line(0, 0, 100, lineY, lineEndX, lineY, BACKGROUND_COLOR);
            //GD._owner.add.line(0, 0, this._box.x, this._box.y, lineEndX, lineY, BACKGROUND_COLOR);

            var graphics = GD._owner.add.graphics({ lineStyle: {width: 1, color: BACKGROUND_COLOR } });
            line = new Phaser.Geom.Line(lineX, CELL_BEGIN_Y, lineX, lineEndY);
            graphics.strokeLineShape(line)
        }
        
        // 키 안내문
        {
            const textStyle = { font: "bold 28px Arial", fill: SETTLE_TEXT_COLOR_STR};
            GD._owner.add.text(CELL_BEGIN_X, lineEndY + 10, "W,A,S,D: 박스 이동\r\nSPACE: 정산\r\nENTER: 게임 종료", textStyle);
        }

    } catch (e) {
        var errMsg = this._name + ".createBackgroundObjects.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}