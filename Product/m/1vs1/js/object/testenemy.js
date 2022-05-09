class TestEnemy extends VSGameSprite {
    #_PV = {};

    //ctor
    constructor(name, scene, frameData) {
        try {
            super(name, scene, frameData);

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

    // state machine 등록
    onRegisterStateMachine() {
        try {
            let stateMachine = this.StateMachine;

            stateMachine.addRefEntry('stand_front', () => this.onStandFront())
                .addRefEntry('stand_back', () => this.onStandBack())
                .addRefEntry('move_front', () => this.onMoveFront())
                .addRefEntry('move_back', () => this.onMoveBack())
                .addRefEntry('damaged_front', () => this.onDamagedFront())
                .addRefEntry('damaged_back', () => this.onDamagedBack())
                .addRefEntry('guard_begin_front', () => this.onGuardBeginFront())
                .addRefEntry('guard_front', () => this.onGuardFront())
                .addRefEntry('guard_end_front', () => this.onGuardEndFront())
                .addRefEntry('guard_begin_back', () => this.onGuardBeginBack())
                .addRefEntry('guard_back', () => this.onGuardBack())
                .addRefEntry('guard_end_back', () => this.onGuardEndBack())
                .addRefEntry('superguard_front', () => this.onSuperGuardFront())
                .addRefEntry('superguard_back', () => this.onSuperGuardBack())
                .addRefEntry('attack_front', () => this.onAttackFront())
                .addRefEntry('attack_back', () => this.onAttackBack())
                .addRefEntry('superattack_front', () => this.onSuperAttackFront())
                .addRefEntry('superattack_back', () => this.onSuperAttackBack());

            stateMachine.add('stand_front', true)
                .addEntrys('stand_front',
                    'stand_back',
                    'move_front',
                    'move_back',
                    'damaged_front',
                    'damaged_back',
                    'guard_begin_front',
                    'guard_begin_back',
                    'superguard_front',
                    'superguard_back',
                    'attack_front',
                    'attack_back',
                    'superattack_front',
                    'superattack_back');

            stateMachine.add('stand_back')
                .addEntrys('stand_front',
                    'stand_back',
                    'move_front',
                    'move_back',
                    'damaged_front',
                    'damaged_back',
                    'guard_begin_front',
                    'guard_begin_back',
                    'superguard_front',
                    'superguard_back',
                    'attack_front',
                    'attack_back',
                    'superattack_front',
                    'superattack_back');

            stateMachine.add('move_front')
                .addEntrys('stand_front',
                    'stand_back');

            stateMachine.add('move_back')
                .addEntrys('stand_front',
                    'stand_back');

            stateMachine.add('damaged_front')
                .addEntrys('stand_front',
                    'stand_back');

            stateMachine.add('damaged_back')
                .addEntrys('stand_front',
                    'stand_back');

            stateMachine.add('guard_begin_front')
                .addEntrys('guard_front',
                    'damaged_front',
                    'damaged_back');

            stateMachine.add('guard_begin_back')
                .addEntrys('guard_back',
                    'damaged_front',
                    'damaged_back');



        } catch (e) {
            var errMsg = this.getExpMsg("onRegisterStateMachine", e);
            console.log(errMsg);
            alert(errMsg);
        }
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