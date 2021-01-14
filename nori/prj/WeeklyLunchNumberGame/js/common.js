// random 
function GetRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max + 1);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

// random 1/n
function GetRandomEnableN1(n) {
    return (GetRandom(0, n) == 0) ? true : false;
}

// sleep
function Sleep (delay) {
   var start = new Date().getTime();
   while (new Date().getTime() < start + delay);
}

// console.log + alert
function LogAlert(msg) {
    console.log(msg);
    alert(msg);
}