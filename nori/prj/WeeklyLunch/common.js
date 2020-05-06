// 함수 호출 테스트
function callCommon() {
    try
    {
        var titleObj = document.getElementById("idTitle");
        alert(titleObj.innerHTML);
    }
    catch (e)
    {
        alert(e);
    }
    finally
    {

    }
}

//타이틀 바꾸기
function SetTitle(titleText)
{
    try
    {
        var titleObj = GetTitleObj();
        titleObj.innerText = titleText;
    }
    catch (e)
    {
        alert("SetTitle failed: " + e);
    }
    finally
    {

    }
}

//타이틀 오브젝트 가져오기
function GetTitleObj()
{
    return document.getElementById("idTitle");
}

//메인 div 가져오기
function GetMainObj()
{
    return document.getElementById("idMain");
}

// 쿠키 저장 //출처: https://thereclub.tistory.com/59 [강남부자]
var setCookie = function(name, value, exp) {
    var date = new Date();
    date.setTime(date.getTime() + exp*24*60*60*1000);
    document.cookie = name + '=' + escape(value) + ';expires=' + date.toUTCString() + ';path=/' + ';domain=example.com';
};

// 쿠키 가져오기 //출처: https://thereclub.tistory.com/59 [강남부자]
var getCookie = function(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    alert("getCookie: " + name + ", " + value);
    return value? value[2] : null;
};

// 공통 180일 기준 쿠키 저장
function SetCookie(name, value)
{
    setCookie(name, value, 5);
    alert("setcookie: " + name + ", " + value);
}
 
// 메뉴 로컬에 저장
function SaveMenu(idx, value)
{
    //SetCookie("menu" + idx, value);
    localStorage["menu" + idx] = value;
}

// 로컬에서 메뉴 읽기
function ReadMenu(idx)
{
    //var menu = getCookie("menu" + idx);
    var menu = localStorage["menu" + idx];
    return (menu == null) ? "" : menu;
}

// select 만들기
function MakeSelectControl(id, ...names)
{
    try
    {
        let options = "";
        let option = "";

        //if (names.length == values.names)
        {
            for (let i = 0; i < names.length; i++)
            {
                option = "<option value='" + names[i] + "'>" + names[i] + "</option>";
                options += option;
            }
        }

        return "<select id='" + id + "'>" + options + "</select>";
    }
    catch (e)
    {
        alert("MakeSelectControl failed: " + e);
    }
    finally
    {

    }

    return "";
}

///
var KeyValue = function(key, value)
{
    this._key = key;
    this._value = value
}

function CreateKeyValue(key, value)
{
    return new KeyValue(key, value);
}

// debug print msg
function DbgPrint(objectName, currentName, content)
{
    console.log("[" + objectName + "." + currentName + "] " + content);
}