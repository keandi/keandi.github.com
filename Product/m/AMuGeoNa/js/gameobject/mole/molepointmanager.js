class MolePointManager extends DestroyableObject {
    #_PV = {}

    // ctor
    constructor(name, scene, brancaFrameInfo) {
        try {
            super(name, scene);

            let v = this.#_PV;

            v.scene = scene;
            v.brancaFrameInfo = brancaFrameInfo;
            v.charSize = this.#getFullCharSize();
            v.goal = this.#getGoal();

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        try {

            let v = this.#_PV;

            
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 넉넉하게 branca 사이즈 가져오기
    #getFullCharSize() {
        try {

            let frameInfo = this.#_PV.brancaFrameInfo;
            let size = { cx: 0, cy: 0 };
            frameInfo.forEach(element => {
                if (element.sourceSize.w > size.cx) {
                    size.cx = element.sourceSize.w;
                }

                if (element.sourceSize.h > size.cy) {
                    size.cy = element.sourceSize.h;
                }
            });

            const border = 3;
            size.cx += border;
            size.cy += border;
            return size;

        } catch (e) {
            var errMsg = this.getExpMsg("getFullCharSize", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 목표 포인트 결정
    #getGoal() {
        try {
            const gameLevel = _gameData.EntryGameLevelInfo.gamelevel;
            const defaultTotal = 16;
            let goal = { mission: 0, total: 0 };

            goal.total = (gameLevel * 3) + defaultTotal;

            let percent = 70;
            if (gameLevel > 13) { percent = 95; }
            else if (gameLevel > 10) { percent = 90; }
            else if (gameLevel > 8) { percent = 80; }
            else if (gameLevel > 5) { percent = 75; }

            goal.mission = getRateValue(goal.total, percent);

            return goal;
        } catch (e) {
            var errMsg = this.getExpMsg("getGoal", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}