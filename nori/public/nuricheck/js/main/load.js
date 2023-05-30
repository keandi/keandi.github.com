
window.onload = function() {
    try {
        
        _browser = new Browser("browser"); // 가장 먼저 생성되어져야 함.
        if (_browser.isApp === true)
        {
            alert("Invalid access!!!");
            return;
        }
        else 
        {
            switch (_browser.os.value)
            {
                case OSType.WINDOWS.value:
                    play();
                    break;

                case OSType.ANDROID.value:
                case OSType.IOS.value:
                    //...
                    break;
                default:
                    alert("Invalid access!!!");
                    return;
            }

        }

    } catch (e) {
        var errMsg = "window.onload.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// go play
function play() {
    try {
        removePlayButton();
        let loader = new Loader("loader");
    } catch (e) {
        var errMsg = "play: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// remove play button
function removePlayButton() {
    try {
        const btn = document.getElementById('entryDiv');
        btn.parentNode.removeChild(btn);
    } catch (e) {
        var errMsg = "removePlayButton: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

/*function handleClick(event) {
    const rotatedX = event.clientY;
    const rotatedY = window.innerHeight - event.clientX;
    // 회전된 좌표 사용
    console.log("클릭 위치 (회전된 좌표):", rotatedX, rotatedY);
  } */

  /*
function handleClick(event) {
    event.preventDefault(); // 기본 동작 막기

    const newX = event.clientY;
    const newY = window.innerHeight - event.clientX;

    // 변경된 좌표값 사용
    console.log("변경된 클릭 위치:", newX, newY);

    // 새로운 클릭 이벤트 생성 및 발생시키기
    const newClickEvent = new MouseEvent('click', {
        clientX: newX,
        clientY: newY
    });
    event.target.dispatchEvent(newClickEvent);
}

document.addEventListener('click', handleClick);
*/

