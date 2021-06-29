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