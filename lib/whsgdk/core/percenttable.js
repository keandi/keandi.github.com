class PercentTable {
    #_table = new Array();
    constructor(n) {
        if (n < 0) { n = 0; }
        else if (n > 100) { n = 100; }

        for (var i = 0; i < 100; i++) {
            this.#_table[i] = (i < n) ? true : false;
        }
    }

    // get random value (true, false)
    get Rand() {
        return this.#_table[Phaser.Math.Between(0, 99)];
    }
}