class VSGameSprite extends GameSprite {
    #_PV = {};

    //ctor
    constructor(name, scene, frameData) {
        try {
            super(name, scene, frameData, false);

            this.initialize();
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // onInitialize
    onInitialize() {
        this.onRegisterStateMachine();
        //this.onSpriteTest();
    }

    // sprite test
    /*onSpriteTest() {
        try {
            var frameData = this.FrameData;
            var v = this.#_PV;
            v.sprite = this.Scene.add.sprite(200, 200, 'enemy_test', 'ATTACK_SUPER_BACK_0004');

        } catch (e) {
            var errMsg = this.getExpMsg("onSpriteTest", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }*/
}