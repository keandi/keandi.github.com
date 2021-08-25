class GameLevelTable extends ClsObject {
    #_PV = {};

    // ctor
    constructor(name) {
        try {
            super(name);

            this.#_PV.data = {};

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    #getEnableInfo(level, gamelevel, needgold, gamekind) {
        try {
            if (gamekind.value === GameKind.UNKNOWN.value || _gameData.IsEnableLevel(level) === false) {
                return {
                    gamekind: gamekind,
                    gamelevel: gamelevel,
                    needgold: 0,
                    enable: false,
                    texture: 'QUESTION'
                };
            }
            
            return {
                gamekind: gamekind,
                gamelevel: gamelevel,
                needgold: needgold,
                enable: true,
                texture: {
                    1: 'STAR'
                }[level]
            };
            
        } catch (e) {
            var errMsg = this.getExpMsg("level", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return {
            gamekind: GameKind.UNKNOWN,
            gamelevel: gamelevel,
            needgold: 0,
            enable: false,
            texture: 'QUESTION'
        };
    }

    // get game level info
    getInfo(level) {
        try {
            switch (level) {
                case 1:
                    return this.#getEnableInfo(level, 1, 100, GameKind.SHOOTTHESTARS);

                default:
                    return this.#getEnableInfo(level, 0, 0, GameKind.UNKNOWN);
            }
        } catch (e) {
            var errMsg = this.getExpMsg("level", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}