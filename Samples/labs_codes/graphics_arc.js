var config = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scene: {
        create: create
    }
};

var game = new Phaser.Game(config);

function create ()
{
    var graphics = this.add.graphics();
    const centerPoint = { x: 400, y: 300 };
    const radius = 200;

    let drawArc = function(beginDeg, endDeg, color) {
        graphics.fillStyle(color, 1);
        graphics.slice(centerPoint.x, centerPoint.y, radius, Phaser.Math.DegToRad(beginDeg), Phaser.Math.DegToRad(endDeg), false);
        graphics.fillPath();    
    }

    drawArc(0, 45, 0xffff00);
    drawArc(45, 90, 0xff8800);
    drawArc(90, 125, 0xaa8844);
    drawArc(125, 180, 0x7744ee);
    drawArc(180, 360, 0x0022ff);
}
