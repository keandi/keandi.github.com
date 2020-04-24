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