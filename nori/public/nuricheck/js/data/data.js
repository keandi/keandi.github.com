class CheckData extends ClsObject {
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

    // initialize
    #initialize() {
        try {
            let v = this.#_PV;
            if (data == undefined) {
                v.data.gold = 0;
                v.data.lastLevel = 0;
            } else {
                if (data.gold == undefined || data.gold <= 0) {
                    v.data.gold = 0;
                } else {
                    v.data.gold = data.gold;
                }

                if (data.lastLevel == undefined || data.lastLevel < 0) {
                    v.data.lastLevel = 0;
                } else {
                    v.data.lastLevel = data.lastLevel;
                }

                v.data.passInfo = data.passInfo;
            }

            if (v.data.passInfo == undefined) { v.data.passInfo = []; }
            this.#initializePassInfoMap();

        } catch (e) {
            var errMsg = this.getExpMsg("initialize", e);
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
        return this.#_PV.entryGameLevelInfo.level;
    }

    // set
    set CurrentLevel(value) {
        this.#_PV.entryGameLevelInfo.level = value;
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

    ///////////////////////////////
    // <!--  게임 PASS 정보

    get #CurrentPassGameName() {
        return this.getPassedGameName(this.#_PV.entryGameLevelInfo);
    }

    // get passed game name by level info
    getPassedGameName(gameLevelInfo) {
        try {
            return gameLevelInfo.gamekind.eng_name + '_' + gameLevelInfo.gamelevel;
        } catch (e) {
            var errMsg = this.getExpMsg("getPassedGameName", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // return passed yes/no
    get IsPassedGame() {
        try {
            let v = this.#_PV;
            return v.refPassedMap.has(this.#CurrentPassGameName);
        } catch (e) {
            var errMsg = this.getExpMsg("IsPassedGame", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // return passed yes/no
    isPassedGameInfo(gameLevelInfo) {
        try {
            let v = this.#_PV;
            return v.refPassedMap.has(this.getPassedGameName(gameLevelInfo));
        } catch (e) {
            var errMsg = this.getExpMsg("IsPassedGame", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set pass info
    setPass() {
        try {
            if (this.IsPassedGame === true) { return; }

            let v = this.#_PV;
            const passGameLevelName = this.#CurrentPassGameName;
            v.data.passInfo.push( passGameLevelName );
            v.refPassedMap.set( passGameLevelName, 1 );
        } catch (e) {
            var errMsg = this.getExpMsg("setPass", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // remove pass info
    removePass() {
        try {
            let v = this.#_PV;
            if (v.data.passInfo == undefined) { v.data.passInfo = []; }

            const passGameLevelName = this.#CurrentPassGameName;

            let idx = v.data.passInfo.indexOf(passGameLevelName);
            if (idx > -1) { v.data.passInfo.splice(idx, 1); }
            v.refPassedMap.delete(passGameLevelName);

        } catch (e) {
            var errMsg = this.getExpMsg("removePass", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // remove all pass info
    removeAllPass() {
        try {
            let v = this.#_PV;
            v.data.passInfo = [];
        } catch (e) {
            var errMsg = this.getExpMsg("removeAllPass", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    //
    get IsPassEnable() {
        try {
            return (this.CurrentLevel === this.LastLevel + 1) ? true : false;
        } catch (e) {
            var errMsg = this.getExpMsg("IsPassEnable", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // initialize pass info reference map
    #initializePassInfoMap() {
        try {
            this.#destroyPassInfoMap();
            let v = this.#_PV;
            v.refPassedMap = new Map();

            v.data.passInfo.forEach(name => {
                v.refPassedMap.set(name, 1);
            });
        } catch (e) {
            var errMsg = this.getExpMsg("#initializePassInfoMap", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy pass info reference map
    #destroyPassInfoMap() {
        try {
            let v = this.#_PV;
            if (v.refPassedMap == undefined) { return; }

            v.refPassedMap.clear();
            v.refPassedMap = undefined;
        } catch (e) {
            var errMsg = this.getExpMsg("#initializePassInfoMap", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 게임 PASS 정보-->
    ///////////////////////////////

}