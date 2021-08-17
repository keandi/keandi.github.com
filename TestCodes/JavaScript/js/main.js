window.onload = function() {
    let url = window.location.href;
    let pos = url.indexOf("#main");
    if (pos > 0) {
        alert("it's main");
    } else {
        alert("normal");
    }
}