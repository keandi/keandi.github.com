class WebApi extends ClsObject {
    #_PV = {};

    constructor(name) {
        super(name);

        try {


        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }  
    }

    #setLocalStorage(name, value) {
        localStorage[name] = value;
    }
    
    #getLocalStorage(name) {
        var value = localStorage[name];
        return (value == null || value == undefined) ? "" : value;
    }

    //set
    set(name, value) {
        try {
            this.#setLocalStorage(name, value);
            
        } catch (e) {
            var errMsg = this.getExpMsg("set", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    //get
    get(name) {
        try {
            return this.#getLocalStorage(name);
        } catch (e) {
            var errMsg = this.getExpMsg("get", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // vibration
    cmdVib(level) {
        try {
            // vibration
            let onVib = function(marginLeft, marginTop) {
                _sceneDiv.div.style.marginLeft = marginLeft + 'px';
                _sceneDiv.div.style.marginTop = marginTop + 'px';
            };

            // vibration 예약
            let reserveVib = function() {
                let min, max = 0;
                if (level === 1){
                    max = 3;
                } else if (level === 2){
                    max = 5;
                } else if (level === 3){
                    max = 8;
                } else if (level === 4){
                    max = 12;
                } else {
                    throw "unknown level: " + level;
                }

                min = -max;
                const increaseInterval = 60;
                let interval = increaseInterval;

                for (var i = 0; i < 4; i++) {
                    setTimeout(()=>{
                        onVib(_sceneDiv.marginLeft + Phaser.Math.Between(min, max), _sceneDiv.marginTop + Phaser.Math.Between(min, max));
                    }, interval);
                    interval += increaseInterval;
                }

                setTimeout(()=>{
                    onVib(_sceneDiv.marginLeft, _sceneDiv.marginTop);
                }, interval);
            };

            //
            reserveVib();

        } catch (e) {
            var errMsg = this.getExpMsg("cmdVib", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // ad
    cmdAd() {
        setTimeout(() => onCalledbyApp(ACMD_AD, ""), 100);
    }
}
