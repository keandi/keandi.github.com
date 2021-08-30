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

    #getEnableInfo(level, gamelevel, needgold, limitgold, gamekind) {
        try {
            if (gamekind.value === GameKind.UNKNOWN.value || _gameData.IsEnableLevel(level) === false) {
                return {
                    level: level,
                    gamekind: gamekind,
                    gamelevel: gamelevel,
                    needgold: 0,
                    limitgold: 0,
                    enable: false,
                    arg: {texture: 'QUESTION', sceneKey: ''}
                    //texture: 'QUESTION'
                };
            }
            
            return {
                level: level,
                gamekind: gamekind,
                gamelevel: gamelevel,
                needgold: needgold,
                limitgold: limitgold,
                enable: true,
                arg: {
                    1: {texture: 'STAR', sceneKey: KEY_GAME_SHOOTTHESTARS}, // GameKind.SHOOTTHESTARS.value == 1
                    2: {texture: 'DICE', sceneKey: KEY_GAME_ROLLDICE}, // GameKind.ROLLDICE.value == 1
                }[gamekind.value],
                /*texture: {
                    1: 'STAR',       // GameKind.SHOOTTHESTARS.value == 1
                    2: 'DICE',       // GameKind.ROLLDICE.value == 2
                }[gamekind.value],
                sceneKey: {
                    1: KEY_GAME_SHOOTTHESTARS,       // GameKind.SHOOTTHESTARS.value == 1
                    2: KEY_GAME_ROLLDICE,       // GameKind.ROLLDICE.value == 2
                }[gamekind.value], */
            };
            
        } catch (e) {
            var errMsg = this.getExpMsg("level", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return {
            level: 0,
            gamekind: GameKind.UNKNOWN,
            gamelevel: gamelevel,
            needgold: 0,
            limitgold: 0,
            enable: false,
            arg: {texture: 'QUESTION', sceneKey: ''}
            //texture: 'QUESTION'
        };
    }

    // get game level info
    getInfo(level) {
        try {
            switch (level) {
                case 1:
                    return this.#getEnableInfo(level, 1, 0, 20, GameKind.ROLLDICE);

                case 2:
                    return this.#getEnableInfo(level, 1, 3, 35, GameKind.SHOOTTHESTARS);

                case 3:
                    return this.#getEnableInfo(level, 1, 6, 50, GameKind.SHOOTTHESTARS);

                default:
                    return this.#getEnableInfo(level, 0, 0, 0, GameKind.UNKNOWN);
            }
        } catch (e) {
            var errMsg = this.getExpMsg("level", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}