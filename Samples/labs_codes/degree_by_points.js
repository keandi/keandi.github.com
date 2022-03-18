var config = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scene: {
        create: create
    }
};

// get degree
function getDegree(x1, y1, x2, y2) {
    // angle in radians
    var angleRadians = Math.atan2(y2 - y1, x2 - x1);

    // angle in degrees
    var angleDeg = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    if (angleDeg < 0) {
        angleDeg = 360 + angleDeg;
    }

    return angleDeg;
}

var game = new Phaser.Game(config);

function create ()
{
    var graphics = this.add.graphics();

    graphics.lineStyle(2, 0x00ff00, 1);
    graphics.lineBetween(400, 300, 650, 300);

    var text = this.add.text(0, 0, 'hello');

    this.input.on('pointerdown', function (pointer) {

        graphics.clear();

        graphics.lineStyle(2, 0x00ff00, 1);
        graphics.lineBetween(400, 300, pointer.x, pointer.y);

        var degree = getDegree(400, 300, pointer.x, pointer.y);

        text.setText('x: ' + pointer.x + ', y: ' + pointer.y + ", degree: " + degree);

    }, this);

}
