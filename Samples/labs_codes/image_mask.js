class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('pic', 'assets/pics/rick-and-morty-by-sawuinhaff-da64e7y.png');
    }

    create ()
    {
        const image = this.add.image(400, 300, 'pic');
        const image2 = this.add.image(0, 0, 'pic');
        const shape = this.make.graphics();

        //  Create an arc shape Graphics object
        shape.fillStyle(0xffffff);

        shape.slice(400, 300, 200, Phaser.Math.DegToRad(340), Phaser.Math.DegToRad(30), true);

        shape.fillPath();

        const mask = shape.createGeometryMask();

        // image 마다 마스크가 적용되므로 전체를 다 적용해줘야 한다.
        image.setMask(mask);
        image2.setMask(mask);

        this.input.on('pointermove', function (pointer) {

            shape.x = pointer.x - 400;
            shape.y = pointer.y - 300;

        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 1200,
    backgroundColor: 0xffffff,
    parent: 'phaser-example',
    scene: [ Example ]
};

const game = new Phaser.Game(config);
