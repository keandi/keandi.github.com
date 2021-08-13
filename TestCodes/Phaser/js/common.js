// get browser info
function getBrowserDetail() {
    try {
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browserName  = navigator.appName;
        var fullVersion  = ''+parseFloat(navigator.appVersion); 
        var majorVersion = parseInt(navigator.appVersion,10);
        var nameOffset,verOffset,ix;

        // In Opera, the true version is after "Opera" or after "Version"
        if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
            browserName = "Opera";
            fullVersion = nAgt.substring(verOffset+6);
            if ((verOffset=nAgt.indexOf("Version"))!=-1) 
                fullVersion = nAgt.substring(verOffset+8);
        }
        // In MSIE, the true version is after "MSIE" in userAgent
        else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
            browserName = "Microsoft Internet Explorer";
            fullVersion = nAgt.substring(verOffset+5);
        }
        // In Chrome, the true version is after "Chrome" 
        else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
            browserName = "Chrome";
            fullVersion = nAgt.substring(verOffset+7);
        }
        // In Safari, the true version is after "Safari" or after "Version" 
        else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
            browserName = "Safari";
            fullVersion = nAgt.substring(verOffset+7);
            if ((verOffset=nAgt.indexOf("Version"))!=-1) 
                fullVersion = nAgt.substring(verOffset+8);
        }
        // In Firefox, the true version is after "Firefox" 
        else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
            browserName = "Firefox";
            fullVersion = nAgt.substring(verOffset+8);
        }
        // In most other browsers, "name/version" is at the end of userAgent 
        else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
                (verOffset=nAgt.lastIndexOf('/')) ) 
        {
            browserName = nAgt.substring(nameOffset,verOffset);
            fullVersion = nAgt.substring(verOffset+1);
            if (browserName.toLowerCase()==browserName.toUpperCase()) {
                browserName = navigator.appName;
            }
        }
        // trim the fullVersion string at semicolon/space if present
        if ((ix=fullVersion.indexOf(";"))!=-1)
            fullVersion=fullVersion.substring(0,ix);
        if ((ix=fullVersion.indexOf(" "))!=-1)
            fullVersion=fullVersion.substring(0,ix);

        majorVersion = parseInt(''+fullVersion,10);
        if (isNaN(majorVersion)) {
            fullVersion  = ''+parseFloat(navigator.appVersion); 
            majorVersion = parseInt(navigator.appVersion,10);
        }

        return ''
            +'Browser name  = '+browserName+'\r\n'
            +'Full version  = '+fullVersion+'\r\n'
            +'Major version = '+majorVersion+'\r\n'
            +'navigator.appName = '+navigator.appName+'\r\n'
            +'navigator.userAgent = '+navigator.userAgent;

    } catch (e) {
        var errMsg = "getBrowserDetail.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  

    return "";
}

// os type define
const OSType = {
    UNKNOWN: {value: 0, name: "UNKNOWN"},
    WINDOWS: {value: 1, name: "WINDOWS"},
    ANDROID: {value: 2, name: "ANDROID"}
};

// get os 
function getOSType() {
    try {
        var userAgent = navigator.userAgent.toUpperCase();

        if (userAgent.indexOf(OSType.WINDOWS.name) >= 0) return OSType.WINDOWS;
        else if (userAgent.indexOf(OSType.ANDROID.name) >= 0) return OSType.ANDROID;

        return OSType.UNKNOWN;

    } catch (e) {
        var errMsg = "getOSType.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

// load css file
function loadCSS(cssId, cssUrl) {
    try {

        if (!document.getElementById(cssId))
        {
            var head  = document.getElementsByTagName('head')[0];
            var link  = document.createElement('link');
            link.id   = cssId;
            link.rel  = 'stylesheet';
            link.type = 'text/css';
            link.href = cssUrl;
            link.media = 'all';
            head.appendChild(link);
        }
        
        return true;

    } catch (e) {
        var errMsg = "loadCSS.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  

    return false;
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

// get degree
function getDegree(x1, y1, x2, y2) {
    // angle in radians
    var angleRadians = Math.atan2(y2 - y1, x2 - x1);

    // angle in degrees
    var angleDeg = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    if (angleDeg < 0) {
        angleDeg = 360 + angleDeg;
    }

    return angleDeg;
}

// number in ?
function inAny(any, from, to) {
    return (any >= from && any <= to) ? true : false;
}

// log + alert
function logAlert(msg) {
    console.log(msg);
    alert(msg);
}

// get distance
function getDistance(x1, y1, x2, y2) {
    return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
}

// get point by point distance
function getPointByPointDistance(x1, y1, x2, y2, dis) {
    let rad = Math.atan2(y2 - y1, x2 - x1);
    
    let point = {
        x: x1 + (dis * Math.cos(rad)),
        y: y1 + (dis * Math.sin(rad))
    };
    return point;
}

// string format
function stringFormat() {
	let args = arguments;

	return args[0].replace(/{(\d+)}/g, function(match, num) {
		num = Number(num) + 1;
		return typeof(args[num]) != undefined ? args[num] : match;
    });
}

// get point by radian + distance
function getPointByRadianDistance(x, y, radian, distance) {
    return {
        x: x + (distance * Math.cos(radian)),
        y: y + (distance * Math.sin(radian))
    };
}

// get point by angle + distance
function getPointByAngleDistance(x, y, angle, distance) {
    return {
        x: (distance * Math.cos(angle)) + x,
        y: (distance * Math.sin(angle)) + y
    };
}

// get degree by radian
function radians_to_degrees(radians) {
  return radians * (180/Math.PI);
}

// hit test (when collision) // 리턴값은 블럭의 어느 쪽을 나타냄
function hit_test(player, block) {
    let result = { left: false, top: false, right: false, bottom: false };

    let b_collision = block.bottom - player.top;
    let t_collision = player.bottom - block.top;
    let l_collision = player.right - block.left;
    let r_collision = block.right - player.left;

    if (t_collision < b_collision && t_collision < l_collision && t_collision < r_collision )
    {                           
        result.top = true;
    }
    if (b_collision < t_collision && b_collision < l_collision && b_collision < r_collision)                        
    {
        result.bottom = true;
    }
    if (l_collision < r_collision && l_collision < t_collision && l_collision < b_collision)
    {
        result.left = true;
    }
    if (r_collision < l_collision && r_collision < t_collision && r_collision < b_collision )
    {
        result.right = true;
    }

    return result;
}

// add text (for font)
function addText(scene, x, y, text, fontSize) {
    if (fontSize == undefined) { fontSize = 16; }
    var text = scene.add.text(x, y, text, {
        fontFamily: 'consolas',
        fontSize: fontSize
    }).setOrigin(0.5);
    text.setFontSize(fontSize);
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