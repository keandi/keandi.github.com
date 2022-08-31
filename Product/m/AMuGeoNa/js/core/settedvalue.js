/*
 값을 한번만 설정할 수 있도록 하기 위해 사용
 단 reset 후 재설정 가능
*/

class SettedValue {
    #_PV = {};

    // ctor
    constructor() {
        this.reset();
    }

    // 설정 되었는지 체크
    get IsSetted() {
        return this.#_PV.isSetted;
    }

    // 리셋
    reset() {
        this.#_PV.isSetted = false;
        this.#_PV.value = undefined;
    }

    // 설정된 값 반환. 설정 안됐으면 setCb 호출
    GetValue(getValue) {
        if (this.IsSetted) { return this.#_PV.value; }

        this.#_PV.value = getValue();
        this.#_PV.isSetted = true;
    }
};