class GameOption extends ClsObject {
    #_PV = {};

    // ctor
    constructor(name) {
        try {
            super(name);

            this.#_PV.option = {};
            this.#readOption();

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    #readOption() {
        try {
            this.setDefault();
            var option = _browserComm.getObject("option");
            if (option != undefined) {
                // vibration
                this.#_PV.option.useVibration = option.useVibration;

                // language
                this.#_PV.option.language = option.language;
            }
        } catch (e) {
            var errMsg = this.getExpMsg("readOption", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 기본값으로 설정하기
    setDefault() {
        this.#_PV.option.language = Language.KOREAN;
        this.#_PV.option.useVibration = false;
    }

    saveOption() {
        try {
            _browserComm.setObject("option", this.#_PV.option);
        } catch (e) {
            var errMsg = this.getExpMsg("saveOption", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // select text (by language)
    selectText(kor, eng) {
        if (this.#_PV.language === Language.ENGLISH) {
            return eng;
        }

        return kor;
    }

    // language set
    set language(lang) {
        this.#_PV.language = lang;
    }

    // language get
    get language() {
        return this.#_PV.language;
    }
}