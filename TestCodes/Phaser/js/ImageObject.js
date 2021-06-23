var ImageObject = function(scene, texture, x, y) {

    Phaser.GameObjects.Image.call(this, scene);

    this.setTexture(texture);
    this.setPosition(x, y);
    this.setScale(1);
}

ImageObject.prototype = Object.create(Phaser.GameObjects.Image.prototype);
ImageObject.prototype.constructor = ImageObject;

///////////////////////////////////////////////////////////////////////////////////////////