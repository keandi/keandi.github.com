class GameOption extends ClsObject {
    #_PV = {};

    // ctor
    constructor(name) {
        try {
            super(name);

            this.#_PV.language = Language.KOREAN;

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
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