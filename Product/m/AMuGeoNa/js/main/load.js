
window.onload = function() {
    try {
        
        let loader = new Loader("loader");

    } catch (e) {
        var errMsg = "window.onload.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}

// call by App
function onCalledbyApp(type, value) {
    if (type === ACMD_AD) {
        alert("Finishd A.D.");
    }
}