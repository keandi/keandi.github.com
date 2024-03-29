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

// point move towards x, y
function MoveTowards2(srcX, srcY, dstX, dstY, velocity) {
    var res = MoveTowards(srcX, srcY, dstX, dstY, velocity);
    return {
        x: res[0],
        y: res[1],
        isFinished: res[2]
    };
}

// object move towards
function objectMoveTowards(object, x, y, velocity) {
    var res = MoveTowards(object.x, object.y, x, y, velocity);
    object.x = res[0];
    object.y = res[1];
    return res[2];
}

// point move towards y
function objectMoveTowardsY(object, dstY, velocity) {

    let moveFinishedCount = 0;

    try {

        let dy = dstY - object.y;

        let angle = Math.atan2(dy, 0);
        let velY = Math.sin(angle) * velocity;

        let toY = object.y + velY;

        if (Math.abs(toY - dstY) < velocity)
        {
            toY = dstY;
            moveFinishedCount++;
        }

        object.y = toY;

        return (moveFinishedCount == 1) ? true : false;

    } catch (e) {
        var errMsg = "objectMoveTowardsY.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }

    return false;
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
function setPixelScaleX(obj, pixel, autoYScale) {
    if (pixel == 0 || obj.width == 0) { return; }
    obj.scaleX = pixel / obj.width;

    if (autoYScale === true) {
        obj.scaleY = obj.scaleX;
    }
}

// image scale height control by pixel
function setPixelScaleY(obj, pixel, autoXScale) {
    if (pixel == 0 || obj.height == 0) { return; }
    obj.scaleY = pixel / obj.height;

    if (autoXScale === true) {
        obj.scaleX = obj.scaleY;
    }
}

// set x, y scale
function setScale(obj, scale) {
    obj.scaleX = scale;
    obj.scaleY = scale;
}

// set x, y scale
function setScaleXY(obj, scaleX, scaleY) {
    obj.scaleX = scaleX;
    obj.scaleY = scaleY;
}

// width, height 중 큰 쪽을 사이즈를 우선 맞추고 그 비율에 맞게 나머지 하나를 맞추기
function setPixelScaleXorY(obj, pixel) {
    if (obj.width > obj.height) {
        setPixelScaleX(obj, pixel, true);
    } else {
        setPixelScaleY(obj, pixel, true);
    }
}

// image scale control by pixel
function setPixelScale(obj, pixelX, pixelY) {
    setPixelScaleX(obj, pixelX);
    setPixelScaleY(obj, pixelY);
}

// image scale limit
function setLimitPixelScale(obj, limitPixelX, limitPixelY) {
    let scaleX = 1, scaleY = 1;

    if (obj.width > limitPixelX) {
        scaleX = equation(obj.width, limitPixelX, 1);
    }

    if (obj.height > limitPixelY) {
        scaleY = equation(obj.height, limitPixelY, 1);
        setPixelScaleY(obj, limitPixelY, true);
    }

    if (scaleX >= 1 && scaleY >= 1) { return; } // no change

    setScale(obj, (scaleX < scaleY) ? scaleX : scaleY);
}

// game object set position
function setPosition(obj, x, y) {
    obj.x = x;
    obj.y = y;
}

// gameobject button
function setClick(gameObject, callback) {
    try {
        let gameObjectY = gameObject.y;
        gameObject.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
            gameObject.y = gameObjectY + 5;

            function menuUp() {
                gameObject.y = gameObjectY;
                callback();
            };
            setTimeout(() => menuUp(), 100);
        });
    } catch (e) {
        var errMsg = "setClick.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

// destroy object
function destroyObject(obj) {
    try {
        if (obj == undefined || obj == null) { return; }
        obj.destroy();
    } catch (e) {
        var errMsg = "destroyObject.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

// destroy objects
function destroyObjects() {
    try {
        for (var i = 0; i < arguments.length; i++) {
            destroyObject(arguments[i]);
        }
    } catch (e) {
        var errMsg = "destroyObject.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

//Rect 클래스를 이용한 rectangle drawing
function drawRect(g, color, rc)
{
    g.fillStyle(color, 1);
    g.fillRect(rc.Left, rc.Top, rc.Width, rc.Height);
}

// suffle array
function suffleArray(arr)
{
    if (arr == undefined || arr.length <= 0) { return; }

    for (var i = 0; i < arr.length; i++) {
        var t = Phaser.Math.Between(0, arr.length - 1);
        if (i == t) { continue; }

        var temp = arr[t];
        arr[t] = arr[i];
        arr[i] = temp;
    }
}