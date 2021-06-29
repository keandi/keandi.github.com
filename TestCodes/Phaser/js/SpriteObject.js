var SpriteObject = function(scene, x, y, texture, frame) {

    Phaser.GameObjects.Sprite.call(this, scene, x, y, texture, frame);

}

SpriteObject.prototype = Object.create(Phaser.GameObjects.Sprite.prototype);
SpriteObject.prototype.constructor = SpriteObject;

///////////////////////////////////////////////////////////////////////////////////////////