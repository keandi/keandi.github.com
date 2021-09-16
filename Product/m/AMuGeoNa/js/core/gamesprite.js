class GameSprite extends GameObject {
    #_PV = {};

    // ctor
    constructor(name, scene, frameData, isSelfDestroy) {
        super(name, scene, isSelfDestroy);

        try {
            let v = this.#_PV;
            
            v.scene = scene;
            v.frameData = frameData;
            
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        super.destroy();

        let v = this.#_PV;
        if (v.stateMachine != undefined) {
            v.stateMachine.destroy();            
            v.stateMachine = undefined;
        }
    }

    ////////////////////////////////////
    //// <!--  animator manager

    // get animator manager 
    getAnimatorManager(sprite) {
        try {
            let v = this.#_PV;
            v.sprite = sprite;
            if (v.animatorManager != undefined) {
                v.animatorManager.destroy();
            } else {
                v.animatorManager = new AnimatorManager("animatorManager_" + this.Name, v.scene, v.sprite);
            }

            return v.animatorManager;
        } catch (e) {
            var errMsg = this.getExpMsg("getAnimatorManager", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // play
    play(key) {
        try {
            let v = this.#_PV;
            v.animatorManager.play(key);
        } catch (e) {
            var errMsg = this.getExpMsg("play", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // stop
    stop(key) {
        try {
            let v = this.#_PV;
            v.animatorManager.stop();
        } catch (e) {
            var errMsg = this.getExpMsg("stop", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // pause
    pause() {
        try {
            let v = this.#_PV;
            v.animatorManager.pause();
        } catch (e) {
            var errMsg = this.getExpMsg("pause", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // resume
    resume() {
        try {
            let v = this.#_PV;
            v.animatorManager.resume();
        } catch (e) {
            var errMsg = this.getExpMsg("resume", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // frame changed event
    onFrameChanged(frameIndex, frameName) {
        // 상속 구현 필요
        console.log( stringFormat('not implement - onFrameChanged - idx[{0}], name[{1}]', frameIndex, frameName) );
    }

    // end animation
    onAnimationEnd() {
        // 상속 구현 필요
        console.log( 'not implement - onAnimationEnd' );
    }

    //// animator manager -->
    ////////////////////////////////////

    ////////////////////////////////////
    //// <!--  state machine

    // get state machine
    getStateMachine() {
        try {
            let v = this.#_PV;
            if (v.stateMachine == undefined) {
                v.stateMachine = new StateMachine("stateMachine_" + this.Name);
            }

            return v.stateMachine;
        } catch (e) {
            var errMsg = this.getExpMsg("getStateMachine", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // state enter
    enter(state) {
        try {
            let v = this.#_PV;
            if (v.stateMachine == undefined) { return false; }

            return v.stateMachine.enter(state);
        } catch (e) {
            var errMsg = this.getExpMsg("enter", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return false;
    }

    // rest
    resetState() {
        try {
            let v = this.#_PV;
            if (v.stateMachine == undefined) { return; }

            v.stateMachine.reset();
        } catch (e) {
            var errMsg = this.getExpMsg("resetState", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    //// state machine -->
    ////////////////////////////////////

    // onInitialize
    onInitialize() {
        this.onRegisterStateMachine();
    }

    // state machine 등록
    onRegisterStateMachine() {
       // 상속 사용
    }

    ////////////////////////////
    //// <!-- object group tag

    set GroupTag(value) {
        this.#_PV.groupTag = value;
    }

    get GroupTag() {
        return this.#_PV.groupTag;
    }

    //// object group tag -->
    ////////////////////////////
    
    ////////////////////////////
    //// <!--  position

    setPosition(x, y) {
        if (this.isChangedXY(x, y) !== true) { return; }

        // 1. body X body collision 체크하고 (충돌하면 이동못함)
        if (this.onCheckCollisionBodyXBody() === true) { return; }

        // 2. 이동하고
        this.onSetPosition(x, y);

        // 3. 충돌영역 재계산
        this.recomputeSpriteRect();

        // 4. attacker X group(attack, body) collision 체크하고
        this.onCheckCollisionAttackerXGroup();
    }

    // 좌표가 변경되었는지 여부
    isChangedXY(x, y) {
        //console.log("not implement - isChangedXY - " + this.Name);
        return true;
    }

    // set position event
    onSetPosition(x, y) {
        console.log("not implement - onSetPosition - " + this.Name);
    }

    // body X body 충돌 체크
    onCheckCollisionBodyXBody(bodyRc) {
        //console.log("not implement - onCheckCollisionBodyXBody - " + this.Name);
    }

    // attack X group(attack, body) 충돌 체크
    onCheckCollisionAttackerXGroup() {
        //console.log("not implement - onCheckCollisionAttackerXGroup - " + this.Name);
    }

    // recompute collision rect
    recomputeSpriteRect() {
        //console.log("not implement - recomputeCollisionRect - " + this.Name);
    }

    ////  position -->
    ////////////////////////////
}