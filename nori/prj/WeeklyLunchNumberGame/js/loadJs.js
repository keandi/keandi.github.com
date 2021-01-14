function includeJs(jsFilePath) {
    var js = document.createElement("script");

    js.type = "text/javascript";
    js.src = jsFilePath;

    document.head.appendChild(js);
}

function includeLib(libName) {
    var jsFilePath = libName + ".js";
    includeJs(jsFilePath);
}

includeLib("clsobject");
