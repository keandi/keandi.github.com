let _os = undefined;

let _gameHost = undefined;

let _sceneMain = undefined;
let _sceneSwitch = undefined;
let _sceneSound = undefined;
let _sceneCollision = undefined;
let _sceneMove = undefined;
let _sceneZOrder = undefined;
let _sceneSceneEffect = undefined;
let _sceneDrag = undefined;
let _sceneDelayEffect = undefined;
let _sceneHtml = undefined;
let _sceneRotate = undefined;
let _sceneGroupCollision = undefined;
let _sceneTile = undefined;
let _sceneSwipe = undefined;
let _sceneSpriteChange = undefined;

let _scenes = {};

let _serialLoadHistory = new SerialLoadHistory("global_serial_asset_load_history");

let _sceneData = [
    {
        key: SCENE_KEY_ROTATE,
        menu: "회전",
        getScene: function() {
            if (_sceneRotate == undefined) {
                _sceneRotate = new SceneRotate(60, _gameHost);
            }
            return _sceneRotate;
        }
    },
    {
        key: SCENE_KEY_GROUPCOLLISION,
        menu: "그룹충돌",
        getScene: function() {
            if (_sceneGroupCollision == undefined) {
                _sceneGroupCollision = new SceneGroupCollision(60, _gameHost);
            }
            return _sceneGroupCollision;
        }
    },
    {
        key: SCENE_KEY_TILE,
        menu: "Tile",
        getScene: function() {
            if (_sceneTile == undefined) {
                _sceneTile = new SceneTile(60, _gameHost);
            }
            return _sceneTile;
        }
    },
    {
        key: SCENE_KEY_SWIPE,
        menu: "Swipe",
        getScene: function() {
            if (_sceneSwipe == undefined) {
                _sceneSwipe = new SceneSwipe(60, _gameHost);
            }
            return _sceneSwipe;
        }
    },
    {
        key: SCENE_KEY_SPRITECHANGE,
        menu: "Sprite Change",
        getScene: function() {
            if (_sceneSpriteChange == undefined) {
                _sceneSpriteChange = new SceneSpriteChange(20, _gameHost);
            }
            return _sceneSpriteChange;
        }
    },
    {
        key: SCENE_KEY_CAMERAMOVE,
        menu: "Camera Move",
        getScene: function() {
            if (_scenes.cameraMove == undefined) {
                _scenes.cameraMove = new SceneCameraMove(60, _gameHost);
            }
            return _scenes.cameraMove;
        }
    },
    {
        key: SCENE_KEY_TILEMAPCAMERAMOVE,
        menu: "TMap Cam-Move",
        getScene: function() {
            if (_scenes.tileMapCameraMove == undefined) {
                _scenes.tileMapCameraMove = new SceneTileMapCameraMove(60, _gameHost);
            }
            return _scenes.tileMapCameraMove;
        }
    },
    {
        key: SCENE_KEY_COOLTIME,
        menu: "쿨타임",
        getScene: function() {
            if (_scenes.coolTime == undefined) {
                _scenes.coolTime = new SceneCoolTime(60, _gameHost);
            }
            return _scenes.coolTime;
        }
    },
    {
        key: SCENE_KEY_MULTICAMERA,
        menu: "멀티카메라",
        getScene: function() {
            if (_scenes.multiCamera == undefined) {
                _scenes.multiCamera = new SceneMultiCamera(60, _gameHost);
            }
            return _scenes.multiCamera;
        }
    },
    {
        key: SCENE_KEY_PRESSEDPOINTER,
        menu: "터치눌림",
        getScene: function() {
            if (_scenes.pressedPointer == undefined) {
                _scenes.pressedPointer = new ScenePressedPointer(60, _gameHost);
            }
            return _scenes.pressedPointer;
        }
    },
    {
        key: SCENE_KEY_SERIALLOAD,
        menu: "Serial-Load",
        getScene: function() {
            if (_scenes.serialLoad == undefined) {
                _scenes.serialLoad = new SceneSerialLoad(60, _gameHost);
            }
            return _scenes.serialLoad;
        }
    },
    {
        key: SCENE_KEY_TEXTUREATLAS,
        menu: "Tex-Atlas",
        getScene: function() {
            if (_scenes.textureAtlas == undefined) {
                _scenes.textureAtlas = new SceneTextureAtlas(60, _gameHost);
            }
            return _scenes.textureAtlas;
        }
    },
    {
        key: SCENE_KEY_PIXELSCALE,
        menu: "PixelScale",
        getScene: function() {
            if (_scenes.pixelScale == undefined) {
                _scenes.pixelScale = new ScenePixelScale(60, _gameHost);
            }
            return _scenes.pixelScale;
        }
    },
    {
        key: SCENE_KEY_KEYBUTTON,
        menu: "KeyButton",
        getScene: function() {
            if (_scenes.keyButton == undefined) {
                _scenes.keyButton = new SceneKeyButton(60, _gameHost);
            }
            return _scenes.keyButton;
        }
    }
];

