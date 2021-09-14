class STSLaserV2 extends STSBaseCanon {
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
            return v.scene.add.sprite(0, 0, 'shootthestars_sprite', 'LASER2_0000');
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
           const fps = 16 / 1000;

            animatorManager.add('ready', {
                    asset: 'shootthestars_sprite',
                    textures: ['LASER2_0000'],
                    duration: fps,
                    repeat: 1,
                    endCallback: ()=>selfIt.onAnimationEnd(),
                })
                .add('fire', {
                    asset: 'shootthestars_sprite',
                    textures: ['LASER2_0000','LASER2_0001','LASER2_0002','LASER2_0003','LASER2_0000',],
                    duration: fps,
                    repeat: 8,
                    frameCallback: (idx, name)=>selfIt.onFrameChanged(idx, name),
                    endCallback: ()=>selfIt.onAnimationEnd()
                })
                .add('wait', {
                    asset: 'shootthestars_sprite',
                    textures: ['LASER2_0000'],
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
        return 5000;
    }

    // bullet limit
    get BulletLimit() {
        return 3;
    }

     // frame changed event
     onFrameChanged(frameIndex, frameName) {
        // 상속 구현 필요
        //console.log( stringFormat('not implement - onFrameChanged - idx[{0}], name[{1}]', frameIndex, frameName) );
    }

    // end animation
    onAnimationEnd() {
        try {
            if (this.getStateMachine().Current === 'fire') {
                this.#_PV.fireEndCallback();
                this.increaseFireCount();
            }

            super.onAnimationEnd();

        } catch (e) {
            var errMsg = this.getExpMsg("onAnimationEnd", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // fire
    fire() {
        try {
            this.play('fire');

            let spriteRect = this.SpriteRect;
            let v = this.#_PV;

            v.fireEndCallback = v.fireCallback(spriteRect.CenterX - 1, spriteRect.Top);
            //console.log("fire~~~");
        } catch (e) {
            var errMsg = this.getExpMsg("fire", e);
            console.log(errMsg);
            alert(errMsg);
        }
     }
}