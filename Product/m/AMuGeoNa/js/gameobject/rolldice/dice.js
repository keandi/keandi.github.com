class Dice extends DestroyableObject {
    #_PV = {};

    // ctor
    constructor(name, scene, standX, standY, rollTopX, rollTopY, maxSize, rollEndCallback) {
        super(name, scene);

        try {
            this.#_PV.scene = scene;
            this.#_PV.coords = {
                stand: {x: standX, y: standY},
                rollTop: {x: rollTopX, y: rollTopY},
                maxSize: maxSize
            };
            this.#_PV.rollEndCallback = rollEndCallback;
            this.#_PV.object = {
                rollAni: undefined,
                roll: undefined,
                value: undefined
            };

            // 
            this.#create();
        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        super.destroy();

        let v = this.#_PV;
        let o = v.object;
        destroyObjects( o.rollAni, o.roll, o.value );
        this.#_PV.object.rollAni = this.#_PV.object.roll = this.#_PV.object.value = undefined;
        o.rollAni = o.roll = o.value = undefined;
        v.object = undefined;
    }

    // create image
    #create() {
        try {

            let v = this.#_PV;

            v.object.rollAni = v.scene.anims.create({ key: 'dice_roll', frames: v.scene.anims.generateFrameNames('dice_sprite', { prefix: 'ROLL', end: 29, zeroPad: 4 }), duration: 600, repeat: -1 },);
            v.object.roll = v.scene.add.sprite(v.coords.stand.x, v.coords.stand.y, 'dice_roll');
            setPixelScaleXorY(v.object.roll, v.coords.maxSize);
            v.object.roll.setDepth(DEPTH_ROLLDICE_DICE);
            v.object.roll.visible = false;

            v.object.value = v.scene.add.sprite(v.coords.stand.x, v.coords.stand.y, 'dice_sprite', 'DICE_1');
            setPixelScaleXorY(v.object.value, v.coords.maxSize);
            v.object.value.setDepth(DEPTH_ROLLDICE_DICE);
            v.object.value.setOrigin(0.5);
            this.#setNumber(1);

        } catch (e) {
            var errMsg = this.getExpMsg("create", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set number
    #setNumber(number) {
        try {
            let v = this.#_PV;

            v.object.value.setTexture("dice_sprite", "DICE_" + number);
            v.object.value.visible = true;
            v.diceNumber = number;
        } catch (e) {
            var errMsg = this.getExpMsg("setNumber", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get dice number
    get Number() {
        if (this.#_PV.diceNumber == undefined) {
            return 0;
        }
        return this.#_PV.diceNumber;
    }

    //begin roll
    roll() {
        try {

            let selfIt = this;
            let v = this.#_PV;
            let timerPool = v.scene.getTimerPool();

            //
            v.object.value.visible = false;
            v.object.roll.visible = true;
            v.object.roll.play('dice_roll');
            setPixelScaleXorY(v.object.roll, v.coords.maxSize);

            //
            let isToUp = true;
            let rollTop = v.coords.rollTop.y - Phaser.Math.Between(0, 150);
            let upVelocity = 80 + Phaser.Math.Between(0, 80);

            let toUp = function() {
                if (isToUp === false) { return; }
                if (objectMoveTowardsY(v.object.roll, rollTop, 80) === true) {
                    isToUp = false;
                    return false;
                }

                return true;
            }

            let toDown = function() {
                if (isToUp === true) { return; }
                if (objectMoveTowardsY(v.object.roll, v.coords.stand.y, 80) === true) {
                    return false;
                }

                return true;
            }

            v.rollTimerId = timerPool.setInterval(() => {
                if (isToUp === true) {
                    toUp();
                } else {
                    if (toDown() === false) {
                        timerPool.remove(v.rollTimerId);

                        v.object.roll.stop();
                        v.object.roll.visible = false;

                        // 
                        let diceNumber = Phaser.Math.Between(1, 6);
                        selfIt.#setNumber(diceNumber);
                        v.rollEndCallback(diceNumber)
                    }
                }
            }, INTERVAL_ROLLDICE_MOVE);

        } catch (e) {
            var errMsg = this.getExpMsg("roll", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}