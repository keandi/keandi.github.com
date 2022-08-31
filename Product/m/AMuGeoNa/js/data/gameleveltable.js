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

    #getEnableInfo(level, gamelevel, needgold, limitgold, compensation, gamekind) {
        try {
            if (gamekind.value === GameKind.UNKNOWN.value || _gameData.IsEnableLevel(level) === false) {
                return {
                    level: level,
                    gamekind: gamekind,
                    gamelevel: gamelevel,
                    needgold: 0,
                    limitgold: 0,
                    compensation: 0,
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
                compensation: compensation,
                enable: true,
                arg: {
                    1: {texture: 'STAR', sceneKey: KEY_GAME_SHOOTTHESTARS}, // GameKind.SHOOTTHESTARS.value == 1
                    2: {texture: 'DICE', sceneKey: KEY_GAME_ROLLDICE}, // GameKind.ROLLDICE.value == 2
                    3: {texture: 'MOLE', sceneKey: KEY_GAME_MOLE}, // GameKind.ROLLDICE.value == 3
                    4: {texture: 'NUMBERS', sceneKey: KEY_GAME_NUMBERS}, // GameKind.NUMBERS.value == 4
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
                    return this.#getEnableInfo(level, 1, 0, 20, 3, GameKind.ROLLDICE);

                case 2:
                    return this.#getEnableInfo(level, 1, 3, 0, 12, GameKind.SHOOTTHESTARS);

                case 3:
                    return this.#getEnableInfo(level, 1, 6, 0, 20, GameKind.MOLE);

                case 4:
                    return this.#getEnableInfo(level, 1, 9, 0, 25, GameKind.NUMBERS);

                default:
                    return this.#getEnableInfo(level, 0, 0, 0, 0, GameKind.UNKNOWN);
            }
        } catch (e) {
            var errMsg = this.getExpMsg("level", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}