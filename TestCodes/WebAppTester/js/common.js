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

// app type define
const AppType = {
    UNKNOWN: { value: 0, name: "UNKNOWN" },
    WEBAPPTESTER: { value: 1, name: "WEBAPPTESTER" },
};

// get app type
function getAppType() {
    try {
        var userAgent = navigator.userAgent.toUpperCase();

        if (userAgent.indexOf(AppType.WEBAPPTESTER.name) >= 0) return AppType.WEBAPPTESTER;

        return AppType.UNKNOWN;

    } catch (e) {
        var errMsg = "getAppType.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }  
}

// string format
function stringFormat() {
	let args = arguments;

	return args[0].replace(/{(\d+)}/g, function(match, num) {
		num = Number(num) + 1;
		return typeof(args[num]) != undefined ? args[num] : match;
    });
}
