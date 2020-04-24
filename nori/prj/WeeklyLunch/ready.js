window.onload = function() {
    this.OnReady();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

/// [전역 변수 지정]
var _menuCount = 0;

// html 이 사용할 준비가 되었다.
function OnReady()
{
    this.SetTitle("메뉴 혹은 업체명을 입력하세요.");
    CreateInputForm();

    for (var idx = 1; idx <= 5; idx++)
    {
        AppendInputForm(idx);
        _menuCount++;
    }
}

// 개별 메뉴 입력 폼 추가
function AppendInputForm(idx)
{
    try
    {
        var inputAreaObj = GetInputAreaObj();

        // menu html 생성
        var html = inputAreaObj.innerHTML + "<div>menu_0" + idx + ": <input type='text' id='menu0" + idx + "' value='' maxlength='3'></input></div>";   
        
        // html 생성
        inputAreaObj.innerHTML = html;
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

        // menu html 생성
        var html = "<div id='inputArea'></div><br/>";


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

function AddNewInputForm()
{
    var idx = _menuCount + 1;
    if (AppendInputForm(idx) == true)
    {
        _menuCount = idx;
    }
}

// inputArea 가져오기
function GetInputAreaObj()
{
     return document.getElementById("inputArea");
}

//
function GoNextPage()
{
    alert("go next");
}