class STSEnemyStar extends STSBaseEnemy {
    #_PV = {};

    // ctor
    constructor(name, scene, frameData, gameRect) {
        super(name, scene, frameData, gameRect);

        try {
            let v = this.#_PV;
            
            v.scene = scene;
            v.frameData = frameData;
            
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

        let v = this.#_PV;
        destroyObjects( v.moveTimer );
        v.moveTimer = undefined;
    }

    // get sprite
    getSprite() {
        try {
            let v = this.#_PV;

            if (v.sprite == undefined) {
                v.sprite = v.scene.add.sprite(0, 0, 'shootthestars_sprite', 'ENEMY_STAR_0000');
            }

            return v.sprite;
        } catch (e) {
            var errMsg = this.getExpMsg("getSprite", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // animator 등록
    onRegisterAnimatorManager(animatorManager) {
        try {
            let v = this.#_PV;
            let selfIt = this;
            const fps = 24 / 1000;
 
             animatorManager.add('patrol', {
                     asset: 'shootthestars_sprite',
                     textures: ['ENEMY_STAR_0000','ENEMY_STAR_0001'],
                     duration: fps,
                     repeat: -1,
                     frameCallback: (idx, name)=>selfIt.onFrameChanged(idx, name),
                     endCallback: ()=>selfIt.onAnimationEnd(),
                 })
                 .add('attack', {
                    asset: 'shootthestars_sprite',
                    textures: ['ENEMY_STAR_0000','ENEMY_STAR_0001'],
                    duration: fps,
                    repeat: -1,
                    frameCallback: (idx, name)=>selfIt.onFrameChanged(idx, name),
                    endCallback: ()=>selfIt.onAnimationEnd(),
                });
        } catch (e) {
             var errMsg = this.getExpMsg("onRegisterAnimatorManager", e);
             console.log(errMsg);
             alert(errMsg);
         }
     }

    // HP max
    get MaxHP() {
        try {
            let getMaxHP = function(level) {
                let levelGroup = (level < 10) ? 1 : ((level - (level % 10)) / 10) + 1;
                return levelGroup * 50;
            };

            return getMaxHP(_gameData.EntryGameLevelInfo);

        } catch (e) {
             var errMsg = this.getExpMsg("MaxHP", e);
             console.log(errMsg);
             alert(errMsg);
        }

        return 1;
    }
}