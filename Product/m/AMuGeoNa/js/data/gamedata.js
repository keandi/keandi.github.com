class GameData extends ClsObject {
    #_PV = {};

    // ctor
    constructor(name) {
        try {
            super(name);

            this.#_PV.data = {};
            this.read();

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // read
    read() {
        try {
            var data = _browserComm.getObject(DATANAME_GAME);
            if (data == undefined) {
                this.#_PV.data.gold = 0;
                this.#_PV.data.lastLevel = 0;
            } else {
                if (data.gold == undefined || data.gold <= 0) {
                    this.#_PV.data.gold = 0;
                } else {
                    this.#_PV.data.gold = data.gold;
                }

                if (data.lastLevel == undefined || data.lastLevel < 0) {
                    this.#_PV.data.lastLevel = 0;
                } else {
                    this.#_PV.data.lastLevel = data.lastLevel;
                }
            }

        } catch (e) {
            var errMsg = this.getExpMsg("read", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // save
    save() {
        try {
            _browserComm.setObject(DATANAME_GAME, this.#_PV.data)
        } catch (e) {
            var errMsg = this.getExpMsg("read", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get gold
    get Gold() {
        return this.#_PV.data.gold;
    }

    // get last level
    get LastLevel() {
        return this.#_PV.data.lastLevel;
    }

    // use gold
    useGold(v) {
        try {
            if (v <= 0) { return; }
            return this.#goldApply(-v);
        } catch (e) {
            var errMsg = this.getExpMsg("useGold", e);
            console.log(errMsg);
            alert(errMsg);
        }
        return false;
    }

    // add gold
    addGold(v) {
        try {
            if (v <= 0) { return; }
            return this.#goldApply(v);
        } catch (e) {
            var errMsg = this.getExpMsg("addGold", e);
            console.log(errMsg);
            alert(errMsg);
        }
        return false;
    }

    // gold 적용. true: 골드 변경됨
    #goldApply(v) {
        try {
            const oldGold = this.#_PV.data.gold;
            this.#_PV.data.gold += v;
            if (this.#_PV.data.gold < 0) {
                this.#_PV.data.gold = 0;
            }

            return (oldGold != this.#_PV.data.gold) ? true : false;
        } catch (e) {
            var errMsg = this.getExpMsg("goldApply", e);
            console.log(errMsg);
            alert(errMsg);
        }
        return false;
    }

    ////////////////////////////////
    //// <!-- last level

    // get
    get LastLevel() {
        if (this.#_PV.data.lastLevel == undefined) {
            this.#_PV.data.lastLevel = 0;
        }
        return this.#_PV.data.lastLevel;
    }

    // set
    set LastLevel(value) {
        this.#_PV.data.lastLevel = value;
    }

    //max last level
    setLastLevel(value) {
        if (this.#_PV.data.lastLevel == undefined) {
            this.#_PV.data.lastLevel = 0;
        }

        if (value > this.#_PV.data.lastLevel) {
            this.#_PV.data.lastLevel = value;
            //console.log("set last level: " + this.#_PV.data.lastLevel);
        }
    }

    //// last level -->
    ////////////////////////////////

    ////////////////////////////////
    /// <!-- current level

    // get
    get CurrentLevel() {
        let v = this.#_PV;

        if (v.currentLevel == undefined) {
            v.currentLevel = (v.lastLevel == undefined) ? 1 : v.lastLevel;
        }
        return v.currentLevel;
    }

    // set
    set CurrentLevel(value) {
        if (value == undefined) {
            this.#_PV.currentLevel = 1;
        } else {
            this.#_PV.currentLevel = value;
        }
    }

    /// current level -->
    ////////////////////////////////

    // 플레이 가능한 게임인가?
    IsEnableLevel(level) {
        return (level <= this.LastLevel + 1) ? true : false;
    }

    ///////////////////////////////
    ////// <!-- 진행 게임 레벨 정보

    get EntryGameLevelInfo() {
        return this.#_PV.entryGameLevelInfo;
    }

    set EntryGameLevelInfo(levelInfo) {
        this.#_PV.entryGameLevelInfo = levelInfo;
    }

    ////// 진행 게임 레벨 정보 -->
    ///////////////////////////////

}