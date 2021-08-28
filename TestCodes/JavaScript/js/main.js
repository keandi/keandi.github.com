import { ClassB } from "./classB.js"

window.onload = function() {
    let url = window.location.href;
    let pos = url.indexOf("#main");
    if (pos > 0) {
        console.log("it's main");
    } else {
        console.log("normal");
    }

    var b = new ClassB();
}