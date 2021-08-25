class GameHost extends ClsObject {
    #_PV = {};

    constructor(name, gameWidth, gameHeight, gameBackgroundStr, gameGravity) {
        super(name);

        //this.printName();

        this._preSetData = {
            width: gameWidth,
            height: gameHeight,
            gravity: gameGravity,
            background: gameBackgroundStr
        };

        this.initTime();
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
                //backgroundColor: '#252525',\
                loader: {
                    maxParallelDownloads: 32
                }
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

    //get game
    get Game() {
        return this._game;
    }

    // set active scene
    set ActiveScene(scene) {
        this.#_PV.activeScene = scene;
    }

    // get active scene
    get ActiveScene() {
        return this.#_PV.activeScene;
    }

    // scene pause
    scenePause() {
        //console.log("pause try");
        //this._game.scene.pause();
        //this.#_PV.activeScene.scene.pause();

        this.#_PV.activeScene.pause();
    }

    // secene resume
    sceneResume() {
        //var key = this.#_PV.activeScene.getKey();
        //console.log("resume try. key=" + key);
        //this._game.scene.resume( key );
        //this.#_PV.activeScene.scene.resume( key );

        this.#_PV.activeScene.resume();
    }

    // <!-- time info
    // init
    initTime() {
        this.#_PV.time = 0;
    }

    // set
    set Time(value) {
        this.#_PV.time = value;
    }

    // get
    get Time() {
        return this.#_PV.time;
    }
    // time info -->
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