class GameHost extends ClsObject {
    constructor(name, gameWidth, gameHeight, gameBackgroundStr, gameGravity) {
        super(name);

        this.printName();

        this._preSetData = {
            width: gameWidth,
            height: gameHeight,
            gravity: gameGravity,
            background: gameBackgroundStr
        };
    }

    createGame(parentId, scenes) {
        try {
            this._config = {
                type: Phaser.AUTO,
                scale: {
                    parent: parentId,
                    width: this._preSetData.width,
                    height: this._preSetData.height
                },
                physics: {
                    default: 'arcade',
                    arcade: {
                        gravity: {y: this._preSetData.gravity},
                        debug: false
                    },
                    matter: {},
                },
                dom: {
                    createContainer: true
                },
                scene: scenes,
                /*scene: {
                    preload: preload,
                    create: create,
                    update: update
                },*/
                backgroundColor: this._preSetData.background,
                //backgroundColor: '#252525',
            };
    
            this._game = new Phaser.Game(this._config);
            this._currentSceneKey = scenes[0].getKey();

            this._sceneMap = new Map();
            scenes.forEach(element => {
                this._sceneMap.set(element.getKey(), element);
            });
            
            return true;
        } catch (e) {
            var errMsg = this._name + ".createGame.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }

        return false;
    }

    switchScene(nextSceneKey) {
        try {
            if (this._currentSceneKey != undefined) {
                var scene = this._sceneMap.get(this._currentSceneKey);
                scene.stop();
                this._game.scene.stop(this._currentSceneKey);
            }

            this._game.scene.start(nextSceneKey);
            this._currentSceneKey = nextSceneKey;
        } catch (e) {
            var errMsg = this._name + ".switchScene.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
    
}

// test
function preload() {

}

// test create
function create() {
    this.add.text(100, 100, "aaa").setOrigin(0.5);
}

//test update
function update() {
    
}