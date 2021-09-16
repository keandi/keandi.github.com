class STSContinousCanon extends STSBaseCanon {
    #_PV = {};

    // ctor
    constructor(name, scene, frameData, fireCallback, exhaustedCallback) {
        super(name, scene, frameData, exhaustedCallback);

        try {
            let v = this.#_PV;            
            v.scene = scene;
            v.frameData = frameData;
            v.fireCallback = fireCallback;
            
            //
            super.initialize(); // 구현의 가장 하층에서 호출되어야 된다.
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        super.destroy();
    }

    // onInitialize
    onInitialize() {
        try {
            super.onInitialize();
        } catch (e) {
            var errMsg = this.getExpMsg("onInitialize", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get sprite
    getSprite() {
        try {
            let v = this.#_PV;
            return v.scene.add.sprite(0, 0, 'shootthestars_sprite', 'CONTINOUS_CANON_0000');
        } catch (e) {
            var errMsg = this.getExpMsg("getSprite", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return undefined;
    }

    // animator 등록
    onRegisterAnimatorManager(animatorManager) {
       try {
           let v = this.#_PV;
           let selfIt = this;
           const fps = 1000 / 24;

            animatorManager.add('ready', {
                    asset: 'shootthestars_sprite',
                    textures: ['CONTINOUS_CANON_0000'],
                    duration: fps,
                    repeat: 1,
                    endCallback: ()=>selfIt.onAnimationEnd(),
                })
                .add('fire', {
                    asset: 'shootthestars_sprite',
                    textures: ['CONTINOUS_CANON_0000','CONTINOUS_CANON_0001','CONTINOUS_CANON_0002','CONTINOUS_CANON_0003','CONTINOUS_CANON_0000',],
                    duration: fps,
                    repeat: 1,
                    frameCallback: (idx, name)=>selfIt.onFrameChanged(idx, name),
                    endCallback: ()=>selfIt.onAnimationEnd()
                })
                .add('wait', {
                    asset: 'shootthestars_sprite',
                    textures: ['CONTINOUS_CANON_0000'],
                    duration: fps,
                    repeat: 1,
                    endCallback: ()=>selfIt.onAnimationEnd(),
                });
       } catch (e) {
            var errMsg = this.getExpMsg("onRegisterAnimatorManager", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 대기 시간 설정. 상속 구현하여 canon 별로 처리
    get WaitTime() {
        return 1500;
    }

    // frame changed event
    onFrameChanged(frameIndex, frameName) {
        try {

            if (frameIndex === 1) {
                let sprite = this.Sprite;
                let v = this.#_PV;

                v.fireCallback(sprite.x, sprite.y - (sprite.width / 2));
                //console.log("fire~~~");
                this.increaseFireCount();
                return;
            }
        } catch (e) {
            var errMsg = this.getExpMsg("onFrameChanged", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // bullet limit
    get BulletLimit() {
        return 30;
    }

    // wait 처리를 sub class 에서 시도
    waitProcess() {
        try {
            this.getStateMachine().enter('ready');
        } catch (e) {
            var errMsg = this.getExpMsg("waitProcess", e);
            console.log(errMsg);
            alert(errMsg);
        }

        return true;
    }
}