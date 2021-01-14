var Cookie = function(name, domain, exp) {
    ClsObject.apply(this, arguments);

    this._exp = exp;
    this._domain = domain;
}

Cookie.prototype = Object.create(ClsObject.prototype);
Cookie.prototype.constructor = Cookie

Cookie.prototype.setCookie = function(name, value) {
    try {
        var date = new Date();
        date.setTime(date.getTime() + this._exp*24*60*60*1000);
        var cookieValue = name + '=' + escape(value) + ';expires=' + date.toUTCString() + ';path=/' + ';domain=' + this._domain;
        document.cookie = cookieValue;
        console.log("Cookie.prototype.setCookie: " + cookieValue);
    } catch (e) {
        alert(this._name + ".setCookie.catched: " + e);
    }
}

Cookie.prototype.getCookie = function(name) {
    try {
        var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        //alert("Cookie.prototype.getCookie: " + name + ", " + value);
        console.log("Cookie.prototype.getCookie: " + name + ", " + value);
        return value? value[2] : null;
    } catch (e) {
        alert(this._name + ".getCookie.catched: " + e);
    }
}
