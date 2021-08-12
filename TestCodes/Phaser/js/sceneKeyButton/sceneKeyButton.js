class SceneKeyButton extends SceneMenuBase {
    #_PV = {};

    // ctor
    constructor(fps, gameHost) {
        super(fps, gameHost);
    }

    onPreset() {
        this._isUseSerialLoader = true;
    }

    onCreate() {
        //alert("create " + this.getKey());
    }

    getKey() {
        return SCENE_KEY_KEYBUTTON;
    }   

    onStop() {
        try {
            console.log("onStop " + this.getKey());

            super.onStop();

            if (this.#_PV.goButton != undefined) {
                this.#_PV.goButton.destroy();
                this.#_PV.goButton = undefined;
            }
            
        } catch(e) {
            var errMsg = this.getKey() + ".onStop.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
    
    onSerialLoadAssets() {
        // texture-atlas
        this.addSerialLoadAsset( 'key_button',
            () => {
                this.load.atlas(
                    'key_button',
                    'assets/image/key_button.png',
                    'assets/atlas/key_press.json'
                );
            }, 2
        ); 
        
        /*this.addSerialLoadAsset( 'key_button_img',
            () => {
                this.load.image(
                    'key_button_img',
                    'assets/image/key_button.png'
                );
            }, 1
        ); */
    };

    onCompleteSerialLoadAllAssets() {
        try {
            console.log(this.getKey() + " asset load completed !!!");

            let selfIt = this;

            const sceneCenter = {
                x: this.getSceneCenterX(),
                y: this.getSceneCenterY()
            };

            // button
            var button = this.addDestroyableObject( this.add.image(sceneCenter.x, sceneCenter.y, "key_button", "KEY_UP") );
            button.setOrigin(0.5);

            button.setInteractive();

            this.#_PV.button = button;

            // button area
            let buttonArea = new Rect(button.x - (button.width / 2), button.y - (button.height / 2), button.width, button.height);

            // key press flag
            let isKeyPressed = false;

            let downEvent = function() {
                if (isKeyPressed == false) {
                    isKeyPressed = true;
                    selfIt.onKeyDown();
                }
            }

            let upEvent = function() {
                if (isKeyPressed == true) {
                    isKeyPressed = false;
                    selfIt.onKeyUp(false);
                }
            }

            // down
            button.on('pointerdown', (pointer, x, y, event) => {
                downEvent();
            });
            this.addDestroyCB( () => { 
                button.off('pointerdown'); 
            } );

            // up
            button.on('pointerup', (pointer, x, y, event) => {
                upEvent();
            });
            this.addDestroyCB( () => { 
                button.off('pointerup'); 
            } );

            // up
            this.input.on('pointermove', (pointer, x, y, event) => {
                //console.log( stringFormat( "move pointer - x: {0}, y: {1}", pointer.x, pointer.y) );
                if (buttonArea.ptInRect(pointer.x, pointer.y) == false) {
                    if (isKeyPressed == true) {
                        isKeyPressed = false;
                        selfIt.onKeyUp(true);
                    }
                }
            });
            this.addDestroyCB( () => { 
                this.input.off('pointermove'); 
            } );

            // key-space down
            let keyObj = this.input.keyboard.addKey('SPACE');
            keyObj.on('down', function(event) {
                //console.log("space down");
                downEvent();
            });
            keyObj.on('up', function(event) {
                //console.log("space up");
                upEvent();
            });
            this.addDestroyCB( () => { 
                keyObj.off('down');
                keyObj.off('on');
                selfIt.input.keyboard.removeKey('SPACE');
            } );

            //
            this.goButtonTest();

        } catch(e) {
            var errMsg = this.getKey() + ".onCompleteSerialLoadAllAssets.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onKeyDown() {
        try {
            //console.log("onKeyDown");

            var button = this.#_PV.button;
            button.setTexture("key_button", "KEY_DOWN");
        } catch(e) {
            var errMsg = this.getKey() + ".onKeyDown.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onKeyUp(isCancel) {
        try {
            //console.log("onKeyUp");

            var button = this.#_PV.button;
            button.setTexture("key_button", "KEY_UP");

            if (isCancel == false) {
                setTimeout(()=> console.log('onkey'), 100);
            }
        } catch(e) {
            var errMsg = this.getKey() + ".onKeyUp.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    goButtonTest() {
        try {
            let button = this.#_PV.button;
            this.#_PV.goButton = new GOImageButton("GOImgaeButton_TEST", this, button.x, button.y + button.height, "key_button", "KEY_UP", "key_button", "KEY_DOWN",
                ()=>{
                    alert('me?');
                });

        } catch(e) {
            var errMsg = this.getKey() + ".goButtonTest.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
}