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

let _sceneData = [
    {
        key: SCENE_KEY_ROTATE,
        menu: "Rotate",
        getScene: function() {
            if (_sceneRotate == undefined) {
                _sceneRotate = new SceneRotate(60, _gameHost);
            }
            return _sceneRotate;
        }
    },
    {
        key: SCENE_KEY_GROUPCOLLISION,
        menu: "Group-collision",
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
    }
];