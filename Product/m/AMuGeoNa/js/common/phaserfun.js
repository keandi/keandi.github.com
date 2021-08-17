// point move towards x, y
function MoveTowards(srcX, srcY, dstX, dstY, velocity) {

    let moveFinishedCount = 0;

    try {

        let dx = dstX - srcX;
        let dy = dstY - srcY;

        let angle = Math.atan2(dy, dx);
        let velX = Math.cos(angle) * velocity;
        let velY = Math.sin(angle) * velocity;

        let toX = srcX + velX;
        let toY = srcY + velY;

        if (Math.abs(toX - dstX) < velocity)
        {
            toX = dstX;
            moveFinishedCount++;
        }

        if (Math.abs(toY - dstY) < velocity)
        {
            toY = dstY;
            moveFinishedCount++;
        }

        return [toX, toY, (moveFinishedCount == 2) ? true : false];
    } catch (e) {
        var errMsg = "MoveTowards.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }

    return [srcX, srcY, false];
}

// object move towards
function objectMoveTowards(object, x, y, velocity) {
    var res = MoveTowards(object.x, object.y, x, y, velocity);
    object.x = res[0];
    object.y = res[1];
    return res[2];
}

// add text (for font)
function addText(scene, x, y, text, fontSize, color) {
    if (fontSize == undefined) { fontSize = 16; }
    var text = scene.add.text(x, y, text, {
        fontFamily: 'gameFont',
        fontSize: fontSize
    }).setOrigin(0.5);
    //text.setFontSize(fontSize);
    if (color == undefined) { color = "0xffffff"; }
    text.setTint(color);
    return text;
}

// image scale width control by pixel
function setPixelScaleX(obj, pixel) {
    if (pixel == 0 || obj.width == 0) { return; }
    obj.scaleX = pixel / obj.width;
}

// image scale height control by pixel
function setPixelScaleY(obj, pixel) {
    if (pixel == 0 || obj.height == 0) { return; }
    obj.scaleY = pixel / obj.height;
}

// image scale control by pixel
function setPixelScale(obj, pixelX, pixelY) {
    setPixelScaleX(obj, pixelX);
    setPixelScaleY(obj, pixelY);
}