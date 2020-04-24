window.onload = function() {
    this.OnReady();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

/// [전역 변수 지정]
var _menuCount = 0;

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

        var inputObj = GetInputDiv(idx);

        // 기존 메뉴값 읽어오기
        var menuValue = ReadMenu(idx);

        // menu html 생성
        var zeroFlag = (idx >= 10) ? "" : "0";
        var html = "<div>menu_" + zeroFlag + idx + ": <input type='text' id='menu" + idx + "' value='" + menuValue + "' maxlength='3'></input></div>";   
        
        // html 생성
        inputObj.innerHTML = html;
        return true;
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
        html += "<div><input type='button' value='+' style='width: 50px' onclick='AddNewInputForm();'> <input type='button' value='Go' style='width: 50px' onclick='GoNextPage();'></div>"

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

// 다음 페이지로 이동
function GoNextPage()
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

        if (menuArray.length < 5)
        {
            alert("메뉴는 5개 이상 추가해야 합니다.")
            return;
        }

        OnRun(menuArray);
    }
    catch (e)
    {
        alert("GoNextPage error: " + e);
    }
    finally
    {

    }
}