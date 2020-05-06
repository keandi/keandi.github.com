window.onload = function() {
    this.OnReady();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

/// [전역 변수 지정]
let _menuCount = 0;
let _inputForms = null;

// html 이 사용할 준비가 되었다.
function OnReady()
{
    // test go
    /*var menuArray = new Array;
    for (var i = 1; i <= 20; i++)
    {
        var menu = ReadMenu(i);
        if (menu != null && menu.length > 0)
        {
            menuArray[menuArray.length] = menu;
        }
    }
    OnRun(menuArray);
    return;
    */

    //
    this.SetTitle("메뉴 혹은 업체명을 입력하세요.");
    CreateInputForm();

    for (var idx = 1; idx <= 5; idx++)
    {
        AppendInputForm(idx);
        _menuCount++;
    }

    for (var idx = 6; idx <= 20; idx++)
    {
        if (ReadMenu(idx).length <= 0) { break; }

        AppendInputForm(idx);
        _menuCount++;
    }
}

// 개별 메뉴 입력 폼 추가
function AppendInputForm(idx)
{
    try
    {
        if (idx > 20)
        {
            alert("20개 이상 만들 수 없습니다.");
            return false;
        }

        if (_inputForms == null)
        {
            _inputForms = new Map();
        }

        let inputForm = new InputForm(idx);
        //console.log(idx + " / " + inputForm._isCreated + " / " + inputForm._idx);
        if (inputForm._isCreated == false) { return false; }

        //
        _inputForms.set(idx, inputForm);
        return true;

        /*
        var inputObj = GetInputDiv(idx);

        // 기존 메뉴값 읽어오기
        var menuValue = ReadMenu(idx);

        // menu html 생성
        var zeroFlag = (idx >= 10) ? "" : "0";

        var htmlInputMenu = "menu_" + zeroFlag + idx + ": <input type='text' id='menu" + idx + "' value='" + menuValue + "' maxlength='3'></input> ";

        var htmlSelectDayOfWeek = MakeSelectControl("menuDow_" + idx, "", "월요일", "화요일", "수요일", "목요일", "금요일");
        //var html = "<div>menu_" + zeroFlag + idx + ": <input type='text' id='menu" + idx + "' value='" + menuValue + "' maxlength='3'></input></div>";   

        let html = "<div>" + htmlInputMenu + htmlSelectDayOfWeek + "</div>"
        
        // html 생성
        inputObj.innerHTML = html;
        return true;
        */
    }
    catch (e)
    {
        alert("AppendInputForm error: " + e);
    }
    finally
    {

    }

    return false;
}

// 메뉴 입력 폼 만들기
function CreateInputForm()
{
    try
    {
        var mainObj = GetMainObj();

        // menu div 미리 준비
        var divs = "";
        for (var i = 1; i <= 20; i++)
        {
            divs += "<div id='inputDiv" + i + "'></div>";
        }

        // menu html 생성
        var html = "<div id='inputArea'>" + divs + "</div><br/>";


        // 추가 / 진행 버튼 추가
        let htmlAddButton = "<input type='button' value='+' style='width: 50px' onclick='AddNewInputForm();'> ";
        let htmlRun01Button = "<input type='button' value='주간 메뉴' style='width: 100px' onclick='GoWeeklyMenu();'> ";
        let htmlRun02Button = "<input type='button' value='오늘의 메뉴' style='width: 100px' onclick='GoTodayMenu();'> ";
        html += "<div>" + htmlAddButton + htmlRun01Button + htmlRun02Button + "</div>"

        // html 생성
        mainObj.innerHTML = html;
    }
    catch (e)
    {
        alert("CreateInputForm error: " + e);
    }
    finally
    {

    }
}

// 신규 입력폼 추가
function AddNewInputForm()
{
    var idx = _menuCount + 1;
    if (AppendInputForm(idx) == true)
    {
        _menuCount = idx;
    }
}

// input div object 가져오기
function GetInputDiv(idx)
{
    return document.getElementById("inputDiv" + idx);
}

// inputArea 가져오기
function GetInputAreaObj()
{
     return document.getElementById("inputArea");
}

// menu object 가져오기
function GetMenuObj(idx)
{
    return document.getElementById("menu" + idx);
}

// menu text 가져오기
function GetMenuText(idx)
{
    try
    {
        var menuObj = GetMenuObj(idx);
        return menuObj.value;
    }
    catch (e)
    {
        alert("GetMenuText error: " + e);
    }
    finally
    {

    }
}

// menu dayOfWeek Object 가져오기
function GetMenuDayOfWeekObj(idx)
{
    return document.getElementById("menuDow_" + idx);
}

// menu dayOfWeek 가져오기
function GetMenuDayOfWeekText(idx)
{
    try
    {
        var menuDowObj = GetMenuDayOfWeekObj(idx);

        return menuDowObj.value;
    }
    catch (e)
    {
        alert("GetMenuDayOfWeek error: " + e);
    }
    
    return "";
}

// 다음 페이지로 이동
function GoWeeklyMenu()
{
    try
    {
        for (var i = 1; i <= _menuCount; i++)
        {
            var inputForm = _inputForms.get(i);
            if (inputForm.IsValidDOW() == false)
            {
                alert("제외 메뉴는 요일 선택이 반드시 필요합니다.");
                return;
            }
        }

        let menus = new Map();

        /*for (var i = 1; i <= _menuCount; i++)
        {
            var menu = GetMenuText(i).trim();
            if (menu.length <= 0) { continue; }

            var menuDow = GetMenuDayOfWeekText(i);

            menus.set(menus.size, CreateKeyValue(menu, menuDow));
        }*/

        for (var i = 1; i <= _menuCount; i++)
        {
            var inputForm = _inputForms.get(i);
            
            var menu = inputForm.GetMenuName();
            if (menu.length <= 0) { continue; }

            var menuDow = inputForm.GetDOW();
            menus.set(menus.size, CreateKeyValue(menu, menuDow));
        }

        OnRun01(menus);
        return;

        //
        var menuArray = new Array();
        for (var i = 1; i <= _menuCount; i++)
        {
            var menu = GetMenuText(i).trim();
            if (menu.length <= 0) { continue; }

            menuArray[menuArray.length] = menu;
        }
        
        //
        /*
        var msg = "";
        for (var idx = 0; idx < menuArray.length; idx++)
        {
            msg += "" + idx + ". " + menuArray[idx] + "\r\n";
        }
        alert(msg);
        */

        if (menuArray.length < 5)
        {
            alert("메뉴는 5개 이상 추가해야 합니다.")
            return;
        }

        OnRun01(menuArray);
    }
    catch (e)
    {
        alert("GoNextPage error: " + e);
    }
    finally
    {

    }
}

// 다음 페이지로 이동
function GoTodayMenu()
{
    try
    {
        //
        var menuArray = new Array();
        for (var i = 1; i <= _menuCount; i++)
        {
            var menu = GetMenuText(i).trim();
            if (menu.length <= 0) { continue; }

            menuArray[menuArray.length] = menu;
        }
        
        //
        /*
        var msg = "";
        for (var idx = 0; idx < menuArray.length; idx++)
        {
            msg += "" + idx + ". " + menuArray[idx] + "\r\n";
        }
        alert(msg);
        */

        if (menuArray.length < 2)
        {
            alert("메뉴는 2개 이상 추가해야 합니다.")
            return;
        }

        OnRun02(menuArray);
    }
    catch (e)
    {
        alert("GoNextPage error: " + e);
    }
    finally
    {

    }
}

// 예외 처리
function OnExceptCall(idx)
{
    try
    {
        let inputForm = _inputForms.get(idx);
        inputForm.SwitchExceptState();
    }
    catch (e)
    {
        console.log("OnExceptCall error catched: " + e);
    }
}

// input form class
var InputForm = function(idx)
{
    this._objectName = "InputForm";
    this._idx = idx;
    this._isCreated = false;
    this._isExcepted = false;
    this._backupMenuName = "";

    this.DebugPrint = function(methodName, e)
    {
        DbgPrint(this._objectName, methodName, e);
    };

    // Get except button id
    this.GetExceptButtonId = function()
    {
        return "exbt_" + this._idx;
    };

    // Get except button html
    this.GetExceptButtonHTML = function()
    {
        let buttonId = this.GetExceptButtonId();
        return "<input type='button' id='" + buttonId + "' value='X' onclick='OnExceptCall(" + this._idx + ");'></input>";
    };

    // Get except button object
    this.GetExceptButtonObjct = function()
    {
        try
        {
            let btnObj = document.getElementById(this.GetExceptButtonId());
            return btnObj;
        }
        catch (e)
        {
            this.DebugPrint("GetExceptButtonObjct", e);
        }   

        return null;
    };

    // Get menu input text Id
    this.GetMenuInputTextId = function()
    {
        return "menu" + this._idx;
    };

    // Get menu input text html
    this.GetMenuInputTextHTML = function()
    {
        try
        {
            let inputObj = GetInputDiv(this._idx);

            // 기존 메뉴값 읽어오기
            let menuValue = ReadMenu(this._idx);

            let zeroFlag = (idx >= 10) ? "" : "0";

            return "menu_" + zeroFlag + idx + ": <input type='text' id='" + this.GetMenuInputTextId() + "' value='" + menuValue + "' maxlength='3'></input> ";
        }
        catch (e)
        {
            this.DebugPrint("GetMenuInputTextHTML", e);
        }        

        return "";
    };

    // Get menu input text object
    this.GetMenuInputTextObject = function()
    {
        return document.getElementById(this.GetMenuInputTextId());
    };

    // switch except state
    this.SwitchExceptState = function()
    {
        try
        {
            let exceptButton = this.GetExceptButtonObjct();
            let menuText = this.GetMenuInputTextObject();
            
            if (this._isExcepted == true)
            {
                exceptButton.value = "X";
                menuText.disabled = false;
                menuText.value = this._backupMenuName;
                this._isExcepted = false;
            }
            else
            {
                exceptButton.value = "O";
                menuText.disabled = true;
                this._backupMenuName = menuText.value;
                menuText.value = "아무거나";
                this._isExcepted = true;
            }
        }
        catch (e)
        {
            this.DebugPrint("SwitchExceptState", e);
        }
    };

    // Get DOW select id
    this.GetDOWSelectId = function()
    {
        return "menuDow_" + this._idx;
    };

    // Get DOW select object
    this.GetDOWSelectObject = function()
    {
        return document.getElementById(this.GetDOWSelectId());
    };

    // check day of week
    this.IsValidDOW = function()
    {
        try
        {
            if (this._isExcepted == false) { return true; }

            let dowSelectObj = this.GetDOWSelectObject();
            return (dowSelectObj.value.length > 0) ? true : false;
        }
        catch (e)
        {
            this.DebugPrint("IsValidDOW", e);
        }

        return false;
    }

    // Get menu name
    this.GetMenuName = function()
    {
        try
        {
            if (this._isExcepted == true) { return "아무거나"; }

            let menuText = this.GetMenuInputTextObject();
            return menuText.value.trim()
        }
        catch (e)
        {
            this.DebugPrint("GetMenuName", e);
        }

        return "";
    };

    // Get day of week
    this.GetDOW = function()
    {
        try
        {
            let dowSelectObj = this.GetDOWSelectObject();
            return dowSelectObj.value.trim()
        }
        catch (e)
        {
            this.DebugPrint("GetMenuName", e);
        }

        return "";
    };

    ////
    this.Ctor = function()
    {
        try
        {
            let inputObj = GetInputDiv(this._idx);

            // 기존 메뉴값 읽어오기
            let menuValue = ReadMenu(this._idx);

            // menu html 생성
            let zeroFlag = (this._idx >= 10) ? "" : "0";

            let htmlInputMenu = this.GetMenuInputTextHTML() + " ";

            let htmlSelectDayOfWeek = MakeSelectControl(this.GetDOWSelectId(), "", "월요일", "화요일", "수요일", "목요일", "금요일");

            // 제외 처리
            let htmlExceptButton = " " + this.GetExceptButtonHTML();

            let html = "<div>" + htmlInputMenu + htmlSelectDayOfWeek + htmlExceptButton + "</div>"
            
            // html 생성
            inputObj.innerHTML = html;

            //
            this._isCreated = true;
            return;
        }
        catch (e)
        {
            this.DebugPrint("Ctor", e);
        }

        this._isCreated = false;
    };
    this.Ctor();
};