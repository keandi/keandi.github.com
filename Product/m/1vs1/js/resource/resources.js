class Resources extends ResourcePool{
    #_PV = {};

    // ctor
    constructor(name) {
        try {
            super(name);
            this.setAssetsPath("assets");

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // add load - 반드시 구현해야 함
    add(key) {
        try {
            switch (key) {
                case 'enemy_test':
                    this.addAtlas(key, 1);
                    this.addJson(key, 1); // atlas json 도 같이 load
                    break;

                case 'arrow':
                        this.addImage(key);
                        break;

                /*case 'coin_drop':
                    this.addMp3(key);
                    break; */

                case 'twink':
                    this.addOgg(key);
                    break;

                case 'coin_add':
                case 'coin_use':
                case 'gun_bullet':
                case 'laser1':
                    this.addOgg(key);
                    break;

                case 'scream_1':
                case 'impactsplat01':
                case 'impactsplat02':
                case 'impactsplat03':
                case 'impactsplat04':
                case 'impactsplat05':
                case 'impactsplat06':
                case 'impactsplat07':
                case 'impactsplat08':
                    this.addMp3(key);
                    break;

                case 'dice-1':
                case 'dice-8':
                case 'dice-18':
                case 'dice-24':
                case 'explosion_low':
                case 'explosion_middle':
                case 'explosion_loud':
                case 'missile':
                    this.addWav(key);
                    break;
            }
        } catch (e) {
            var errMsg = this.getExpMsg("add", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return this;
    }
}