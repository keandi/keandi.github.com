window.onload = function() {
    try
    {
        //alert(navigator.userAgent);

        let sceneDiv = document.getElementById("scene");
        sceneDiv.style.width = window.innerWidth + 'px';
        sceneDiv.style.height = window.innerHeight + 'px';

        //
        let bd = document.getElementById("browserDetail");
        let os = getOSType();
        let app = getAppType();
        bd.innerText = getBrowserDetail() + "\r\n" + "os: " + os.name + "\r\napp: " + app.name; 

        /*var a = {a: 1, b: "hello", c: true};
        var j = JSON.stringify(a);
        alert(j);
        var o = JSON.parse(j);
        alert(o.b);*/

    } catch (e) {
        var errMsg = "window.onload.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

function onSetData() {
    try {

        let text = document.getElementById("input_text").value;
        let storage = new Storage("storage");
        storage.set("save", text);

    } catch (e) {
        var errMsg = "onSetData.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

function onGetData() {
    try {
        let outputObj = document.getElementById("output_text");
        let storage = new Storage("storage");
        outputObj.innerText = storage.get("save");

    } catch (e) {
        var errMsg = "onSetData.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

// test command
function onCommand() {
    try {
        var json = {
            id: "heroine0",
            level: 45,
            map: 77,
            isDied: true
        };
        var res = _webapp_api.command("0x00", JSON.stringify(json));
        alert("result: " + res);

    } catch (e) {
        var errMsg = "onSetData.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

// app to web
function getAnyData() {
    var res = {
        word: "hello",
        name: "박영",
        class: 99,
        city: "seoul",
        isLive: true
    };

    return JSON.stringify(res);
}

// vib command
function onVibCmd() {
    try {
        _webapp_api.cmdVib();
    } catch (e) {
        var errMsg = "onVibCmd.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

// ad command
function onAd() {
    try {
        _webapp_api.cmdAd();
    } catch (e) {
        var errMsg = "onAd.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

// call by App
function onCalledbyApp(type, value) {
    if (type === "DxA0") {
        alert("Finishd A.D.");
    }
}