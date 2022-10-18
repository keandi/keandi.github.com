// string format
function stringFormat() {
	let args = arguments;

	return args[0].replace(/{(\d+)}/g, function(match, num) {
		num = Number(num) + 1;
		return typeof(args[num]) != undefined ? args[num] : match;
    });
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

// get random bool
function getRandomBool() {
    return ((Math.floor(Math.random() * 2)) == 1) ? true : false;
}

// get suffle number 
function getRandomNumber(min, max) {
    var range = max - min + 1;
    return Math.floor(Math.random() * range) + min;
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

// from: https://www.codegrepper.com/code-examples/javascript/convert+number+to+string+with+commas+javascript
// Convert a number to a string with commas
function numberWithCommas(x) {
    return (x + "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// fps
function fps(value) { 
    return 1000 / value;
}

// 연속된 name 배열로 가져오기
function makePrefixNumNames(prefix, start, end, midChar, maxLength) {
    let array = [];

    if (midChar == undefined || midChar.length != 1) { midChar = ''; }
    if (maxLength == undefined || maxLength < 1) { maxLength = 4; }

    for (var i = start; i <= end; i++) {
        array.push(prefix + midChar + String(i).padStart(maxLength, '0'));
    }

    return array;
}

// max 기준 일정 percent 에 해당되는 값을 integer 형태로 반환
function getRateValue(max, percent) {
    return parseInt((percent / 100) * max);
  };

  // 1차 방정식. 기준값 x가  v 일 때 기준값 y 의 v 에 대응하는 값은?
let equation = function(x, v, y) {
    return (v * y) / x;
}

// 문자열 left
String.prototype.left = function(length) {
    if (this.length <= length) {
       return this;
    }
    else {
       return this.substring(0, length);
    }
}

// 문자열 right
String.prototype.right = function(length) {
    if (this.length <= length) {
       return this;
    }
    else {
       return this.substring(this.length - length, this.length);
    }
}

// v 값이 x와 y 안에 있는지 여부
function between(v, x, y) {
    return (v >= x && v <= y) ? true : false;
}
  
// get timestamp
function getTimestampInSeconds () {
    return Math.floor(Date.now() / 1000)
  }