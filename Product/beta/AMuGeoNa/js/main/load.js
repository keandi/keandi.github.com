
window.onload = function() {
    try {
        
        let loader = new Loader("loader");

    } catch (e) {
        var errMsg = "window.onload.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}