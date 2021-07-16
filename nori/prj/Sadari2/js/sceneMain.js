class SceneMain extends MielScene {
    #_objClickedPointer = undefined;
    #_gameCamera = {};
    #_sadaris = undefined;
    #_msgbox = undefined;
    #_lineButton = undefined;
    #_playButton = undefined;
    #_htmlInput = undefined;
    #_gameBackground = undefined;
    #_assetsLoadCounter = undefined;
    #_dragGuiders = undefined;

    // ctor
    constructor(fps, gameHost) {
        super(fps, gameHost);
    }
    onCreate() {
        //alert("create " + this.getKey());
    }

    getKey() {
        return SCENE_KEY_MAIN;
    }   

    onStop() {
        try {
            //console.log("onStop " + this.getKey());

            super.onStop();
            
        } catch(e) {
            var errMsg = this.getKey() + ".onStop.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
    
    onLoadAssets() {
        try {   
            if (this._assetLoadCompleted == true)
            {
                this.onLoadAssetsComplete();
            }
            else
            {
                let counter = 0;
                this.load.image("button_reset", "assets/images/button_reset.png"); counter++;
                this.load.image("button_ok", "assets/images/button_ok.png"); counter++;
                this.load.image("button_line", "assets/images/button_line.png"); counter++;
                this.load.image("button_play", "assets/images/button_play.png"); counter++;
                this.load.image("button_o", "assets/images/button_o.png"); counter++;
                this.load.image("button_x", "assets/images/button_x.png"); counter++;
                this.load.image("button_t", "assets/images/button_t.png"); counter++;
                this.load.image("point_guider", "assets/images/point_guider.png"); counter++;

                this.load.html('html_input', 'assets/htmls/inputbox.html'); counter++;

                this.#_assetsLoadCounter = new MaxCounter(counter);

                this.load.start();
            }
        } catch(e) {
            var errMsg = this.getKey() + ".onLoadAssets.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
    
    onLoadingAssets(value) {
        try {
            console.log(this.getKey() + " loadinig... " + value);

            this.#_assetsLoadCounter.Add(value);
        } catch(e) {
            var errMsg = this.getKey() + ".onLoadingAssets.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
    
    onLoadAssetsComplete() {
        try {
            this.#_assetsLoadCounter.print();
            if (this.#_assetsLoadCounter.IsMaxOver != true) {
                console.log(this.getKey() + " asset load completed cancel");
                return;
            }
            console.log(this.getKey() + " asset load completed !!!");
            
            this.makeMenu();

            //
            this.sceneDragOn();
            this.onSceneDrag(0, 0);

            // create sadaris
            this.#createSadaris(SADARI_MAX);

            // test icon
            //this.add.image(this.getSceneWidth() + 1, 0, "button_ok");

        } catch(e) {
            var errMsg = this.getKey() + ".onLoadAssetsComplete.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // menu 생성
    makeMenu() {
        try {
            console.log(this.getKey() + " make menu");

            // this
            let selfIt = this;

            //
            let sceneRect = new Rect(0, 0, this.getSceneWidth(), this.getSceneHeight());
            let menuRect = (new Rect()).copyFromRect(sceneRect);
            menuRect.Height = MENU_HEIGHT;

            // menu background
            let menuBack = this.addDestroyableObject( this.add.graphics() );
            menuBack.fillStyle(BORDER_COLOR);
            menuBack.fillRect(menuRect.X, menuRect.Y, menuRect.Width, menuRect.Height);

            // draw - border
            let drawBorder = function(x, y, w, h) {
                var border = selfIt.addDestroyableObject( selfIt.add.graphics() );
                border.fillStyle(BORDER_COLOR);
                border.fillRect(x, y, w, h);
            }

            // left border
            drawBorder(0, 0, BORDER_DEPTH, sceneRect.Height);

            // right border
            drawBorder(sceneRect.Right - BORDER_DEPTH, 0, BORDER_DEPTH, sceneRect.Height);

            // bottom border
            drawBorder(0, sceneRect.Bottom - BORDER_DEPTH, sceneRect.Width, BORDER_DEPTH);

            // reset button
            let resetButton = this.addDestroyableObject( new EffectButton("reset-button", (113 / 2) + 6, (32 / 2) + 10, "button_reset", this, 0, ()=>{
                location.reload();
                //this.#showMsg('다운로드를 진행할 수 없습니다.\r\n취소합니다.');

                //resetButton.destroy();
                //alert('reset');
            }) );
            resetButton.IsSuperLevel = true;

            /* let nn = new EffectButton("reset-button", (113 / 2) + 6, (32 / 2) + 10, "button_reset", this, 0, ()=>{
                nn.destroy();
                nn = undefined;
            }); */

            /*var image = this.add.image((113 / 2) + 6, (32 / 2) + 10, 'button_reset');
            image.setInteractive();
            image.on('pointerdown', () => {
                image.destroy();
                alert("hello");
            });*/

            // line button
            this.#_lineButton = this.addDestroyableObject( new EffectButton("line-button", (sceneRect.Right - (128/2)) - 16, (32 / 2) + 10, "button_line", this, 0, ()=>{
                //this.#showMsg("GoLine");
                selfIt.goLine();
            }) );

            // play button
            this.#_playButton =this.addDestroyableObject( new EffectButton("play-button", (sceneRect.Right - (128/2)) - 16, (32 / 2) + 10, "button_play", this, 0, ()=>{
                this.#showMsg("GoPlay");
            }) );
            this.#_playButton.visible = false;

            // make camera
            let cameraRect = new Rect(BORDER_DEPTH + 1, menuRect.Bottom + 1, 0, 0);
            cameraRect.Right = sceneRect.Right - BORDER_DEPTH - 1;
            cameraRect.Bottom = sceneRect.Bottom - BORDER_DEPTH - 1;
            this.makeGameCamera(cameraRect);

        } catch(e) {
            var errMsg = this.getKey() + ".makeMenu.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // object pointer-down event. 드래그 방지용
    firedObjectPointerEvt(pointer) {
        try {
            this.#_objClickedPointer = pointer;
        } catch(e) {
            var errMsg = this.getKey() + ".onObjectClicked.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // make second(game) camera
    makeGameCamera(cameraRect) {
        try {
            this.#_gameCamera.rect = cameraRect;
            this.#_gameCamera.camera = this.cameras.add(cameraRect.X, cameraRect.Y, cameraRect.Width, cameraRect.Height);
            this.#computeCameraBound(SADARI_MAX);
            this.#_gameCamera.center = {x: 0, y: 0};
            this.onSceneDrag(0, 0);
        } catch(e) {
            var errMsg = this.getKey() + ".makeGameCamera.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // compute camera bounds
    #computeCameraBound(sadari_count) {
        try {
            let sadari_width = (SADARI_PAN_WIDTH * sadari_count) + (SADARI_PAN_GAP * (sadari_count - 1));
            const sadari_height = this.#_gameCamera.rect.Height;
            const cameraRect = this.#_gameCamera.rect;

            if (sadari_width < this.#_gameCamera.rect.Width) { sadari_width = this.#_gameCamera.rect.Width; }

            let bounds = new Rect(this.getSceneWidth() + 1, 0, sadari_width, sadari_height);
            this.#_gameCamera.fullSize = new Rect(bounds.X, bounds.Y, bounds.Width, bounds.Height);

            // make background
            if (this.#_gameBackground == undefined) { // 최초 1회
                this.#_gameBackground = this.add.graphics();
                this.#_gameBackground.fillStyle(BACK_COLOR);
                this.#_gameBackground.fillRect(bounds.X, bounds.Y, bounds.Width, bounds.Height);
            }

            bounds.deflate(cameraRect.HalfWidth, 0);

            bounds.Y = sadari_height / 2;
            bounds.Height = 0;

            this.#_gameCamera.bounds = bounds;
        } catch(e) {
            var errMsg = this.getKey() + ".computeCameraBound.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // message box
    #createMsgBox() {
        try {
            let rect = new Rect(this.getSceneWidth() + 1, 0, this.#_gameCamera.rect.Width, this.#_gameCamera.rect.Height);
            this.#_msgbox = new MessageBox("messagebox", this, rect);
        } catch(e) {
            var errMsg = this.getKey() + ".createMsgBox.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    #showMsg(message) {
        try {
            if (this.#_msgbox == undefined) {
                this.#createMsgBox();
            }

            this.#_msgbox.show(message, this.#_gameCamera.center.x, this.#_gameCamera.center.y);
        } catch(e) {
            var errMsg = this.getKey() + ".showMsg.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // add sadari
    addSadari() {
        try {

        } catch(e) {
            var errMsg = this.getKey() + ".addSadari.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    isDragEnable(x, y) {
        // check object click event
        if (this.#_objClickedPointer != undefined) {
            if (x == this.#_objClickedPointer.x && y == this.#_objClickedPointer.y) 
            { 
                this.#_objClickedPointer = undefined;
                return false; 
            }
        }

        // check drag lock
        if (this.#IsDragLock == true) { return false; }

        // check game area
        if (this.#_gameCamera.rect.ptInRect(x, y) == true) { return true; }
        
        // menu or border area
        return false;
    }

    onSceneDrag(x, y) {
        try {
            //console.log( stringFormat("{0}::onDragDrag x: {1}, y: {2}", this.getKey(), x, y) );

            this.#_gameCamera.center.x -= x;
            this.#_gameCamera.center.y -= y;
            
            if (this.#_gameCamera.center.x < this.#_gameCamera.bounds.Left) {
                this.#_gameCamera.center.x = this.#_gameCamera.bounds.Left;
            } else if (this.#_gameCamera.center.x > this.#_gameCamera.bounds.Right) {
                this.#_gameCamera.center.x = this.#_gameCamera.bounds.Right;
            }
            if (this.#_gameCamera.center.y < this.#_gameCamera.bounds.Top) {
                this.#_gameCamera.center.y = this.#_gameCamera.bounds.Top;
            } else if (this.#_gameCamera.center.y > this.#_gameCamera.bounds.Bottom) {
                this.#_gameCamera.center.y = this.#_gameCamera.bounds.Bottom;
            }

            console.log( stringFormat("{0}::onDragDrag x: {1}, y: {2}, camera-x: {3}, camera-y: {4}, bound_left: {5}"
                , this.getKey(), x, y
                , this.#_gameCamera.center.x, this.#_gameCamera.center.y
                , this.#_gameCamera.bounds.Left) ); 

            this.#_gameCamera.camera.centerOn(this.#_gameCamera.center.x, this.#_gameCamera.center.y);

        } catch(e) {
            var errMsg = this.getKey() + ".onSceneDrag.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    ///// <!-- drag lock
    get #IsDragLock() {
        return _evtLock.IsDragLock;
    }

    set IsDragLock(value) {
        _evtLock.IsDragLock = value;
    }
    //// drag lock -->

    // create sadari
    #createSadaris(sadari_count) {
        try {
            const sadari_width = (SADARI_PAN_WIDTH * sadari_count) + (SADARI_PAN_GAP * (sadari_count - 1));
            let sadari_xss = undefined;
            if (sadari_width < this.#_gameCamera.rect.Width) {
                const restAllWidth = parseInt(this.#_gameCamera.rect.Width - (SADARI_PAN_WIDTH * sadari_count));
                const restOneWidth = parseInt(restAllWidth / sadari_count);
                const restOneHalf = parseInt(restOneWidth / 2);
                sadari_xss = [];

                for (var i = 0; i < sadari_count; i++) {
                    sadari_xss.push( ((i * restOneWidth) + restOneHalf) + (i * SADARI_PAN_WIDTH) + this.#_gameCamera.fullSize.Left );
                }
            }

            let selfIt = this;
            this.#_sadaris = [];
            for (var i = 0; i < sadari_count;  i++) {
                var sadari = new Sadari("sadari_" + i, this, this.#_gameCamera.rect.Height , i, (idx)=>{selfIt.#openHtmlInpue(idx);});
                this.#_sadaris.push(sadari);

                var x = (sadari_xss == undefined) 
                    ? ((i * SADARI_PAN_WIDTH) + (i * SADARI_PAN_GAP) + this.#_gameCamera.fullSize.Left)
                        : sadari_xss[i];
                sadari.setPosition(x, 0);
            }
        } catch(e) {
            var errMsg = this.getKey() + ".createSadaris.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    ////// <!-- html input
    #openHtmlInpue(idx) {
        try {

            if (this.#_htmlInput == undefined) {
                this.#_htmlInput = new InputHtml("html_input", this);
            }

            let selfIt = this;
            this.#_htmlInput.show(idx, this.#_gameCamera.center.x, this.#_gameCamera.center.y, (isOk) => {
               selfIt.#_htmlInput.close();
               if (isOk == true) {
                   this.#_sadaris[idx].loadText();
               }
            });

            this.IsDragLock = true;
        } catch(e) {
            var errMsg = this.getKey() + ".opneHtmlInpue.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    #closeHtmlInpue() {
        try {

            this.IsDragLock = false;
        } catch(e) {
            var errMsg = this.getKey() + ".closeHtmlInpue.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
    ////// html input -->

    // go line
    goLine() {
        try {
            let inputs = [];
            let enableCount = 0;
            
            this.#_sadaris.forEach(element => {
                if (element.IsEnable != true) return;
                enableCount++;

                var index = element.Index;
                var head = getStorageHeadValue(index);
                var tail = getStorageTailValue(index);
                if (head.length <= 0 || tail.length <= 0) return;

                inputs.push({head: head, tail: tail});
            });

            //
            if (enableCount != inputs.length) {
                this.#showMsg("정보가 입력되지 않은 항목이 존재합니다.");
                return;
            }

            //
            if (inputs.length < 2) {
                this.#showMsg("2개 이상 입력이 필요합니다.");
                return;
            }

            //this.#showMsg("OK: " + inputs.length);
            // set&clear storage data
            for (var i = 0; i < SADARI_MAX; i++) {
                if (i < inputs.length) {
                    var input = inputs[i];
                    setStorageHeadValue(i, input.head);
                    setStorageTailValue(i, input.tail);
                } else {
                    setStorageHeadValue(i, "");
                    setStorageTailValue(i, "");
                }
            }

            // sadaris destroy & reset
            this.#_sadaris.forEach( element => {
                element.destroy();
            } );
            while(this.#_sadaris.length > 0) {
                this.#_sadaris.pop();
            }
            //alert(this.#_sadaris.length);

            // mode change
            this.#_playButton.visible = true;
            this.#_lineButton.visible = false;
            _gameStatus = GameStatus.MAKE;

            // register drag event
            this.#registerDragEvent();

            // create sadari
            this.#createSadaris(inputs.length);
            this.#computeCameraBound(inputs.length);
            this.onSceneDrag(this.#_gameCamera.bounds.Left, this.#_gameCamera.bounds.Top);
        } catch(e) {
            var errMsg = this.getKey() + ".goLine.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    //// <!-- drag guiders

    // add drag objects
    addDragGuiders(linePoint) {
        try {
            if (this.#_dragGuiders == undefined) {
                this.#_dragGuiders = new Map();
            }
            
            let guider = linePoint.Guider;
            this.#_dragGuiders.set(guider, linePoint);
            guider.setInteractive({ draggable: true })
            this.input.setDraggable(guider);

        } catch(e) {
            var errMsg = this.getExpMsg("addDragObject", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // remove drag object
    removeDragGuider(obj) {
        try {
            this.#_dragGuiders.delete(obj);
        } catch(e) {
            var errMsg = this.getExpMsg("removeDragGuider", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // remove all drag guiders
    #removeAllDragGuiders() {
        try {
            if (this.#_dragGuiders == undefined) { return; }
            
            this.#_dragGuiders.clear();

        } catch(e) {
            var errMsg = this.getExpMsg("removeAllDragGuiders", e);
            console.log(errMsg);
            alert(errMsg);
        } 
    }

    #registerDragEvent() {
        try {
            this.#unregisterDragEvent();

            // this
            let selfIt = this;

            // line connector
            let lineConnecter = undefined;

            // fix drag coordinate
            let fixDragCoords = function(pointer, dragX, dragY) {
                if (dragX <= selfIt.getSceneWidth()) {
                    dragX += selfIt.getSceneWidth();
                }
                
                if (dragY > pointer.y) {
                    dragY -= selfIt.#_gameCamera.rect.Top;
                }

                return {x: dragX, y: dragY};
            }

            // find collision point
            let findCollisionPoint = function(srcLinePoint, x, y) {
                let srcSadariIndex = srcLinePoint.Parent.Index;
                let srcSadari = selfIt.#_sadaris[srcSadariIndex];
                if (srcSadari.isInArea(x, y) == true) { return undefined; }

                //


                for (let [k, v] of selfIt.#_dragGuiders) {
                    //console.log( stringFormat("parentIdx: {0}", v.Parent.Index) );

                    let compareSadariIndex = v.Parent.Index;
                    if (compareSadariIndex != srcSadariIndex - 1 && compareSadariIndex != srcSadariIndex + 1) { continue; }

                    //                    
                    if (v.isIn(x, y) == true) {
                        return v;
                    }
                }

                return undefined;
            }

            //
            this.input.on('dragstart', function(pointer, gameObject) {
                if (selfIt.#_dragGuiders.has(gameObject) == false) { return; }
                _evtLock.IsDragLock = true;

                var linePoint = selfIt.#_dragGuiders.get(gameObject);
                linePoint.setGuiderExpand();

                //
                lineConnecter = {
                    x1: linePoint.GuiderPointer.X,
                    y1: linePoint.GuiderPointer.Y,
                    x2: INVALID_COORD,
                    y2: INVALID_COORD,
                    connecter: new LineConnecter( stringFormat( "line_connecter_{0}_{1}",  linePoint.Parent.Index, linePoint.Index ), selfIt )
                };
            });

            this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
                if (selfIt.#_dragGuiders.has(gameObject) == false) { return; }

                //console.log( stringFormat("pointer: [{0} / {1}], drag x: {2}, drag y: {3}", pointer.x, pointer.y, dragX, dragY) );
                var drag = fixDragCoords(pointer, dragX, dragY);
                //console.log( stringFormat("fix after drag x: {0}, drag y: {1}", drag.x, drag.y) );
                var linePoint = selfIt.#_dragGuiders.get(gameObject);
                linePoint.setGuiderPosition(drag.x, drag.y);
                //linePoint.setGuiderPosition(dragX, dragY);

                //
                /* if (lineConnecter.x1 == INVALID_COORD || lineConnecter.y1 == INVALID_COORD) {
                    lineConnecter.x1 = drag.x;
                    lineConnecter.y1 = drag.y;
                } */
                lineConnecter.x2 = drag.x;
                lineConnecter.y2 = drag.y;

                let targetLintPoint = findCollisionPoint(linePoint, drag.x, drag.y);
                let isConnected = (targetLintPoint == undefined) ? false : true;

                lineConnecter.connecter.redraw(lineConnecter.x1, lineConnecter.y1, drag.x, drag.y, isConnected);


            });

            this.input.on('dragend', function(pointer, gameObject) {
                if (selfIt.#_dragGuiders.has(gameObject) == false) { return; }
                _evtLock.IsDragLock = false;

                var linePoint = selfIt.#_dragGuiders.get(gameObject);
                linePoint.resetGuiderPosition();

                //
                lineConnecter.connecter.redraw(lineConnecter.x1, lineConnecter.y1, lineConnecter.x2, lineConnecter.y2);
                lineConnecter.connecter.destroy();
                lineConnecter = undefined;
            });

        } catch(e) {
            var errMsg = this.getExpMsg("registerDragEvent", e);
            console.log(errMsg);
            alert(errMsg);
        } 
    }

    #unregisterDragEvent() {
        try {
            this.input.off('dragstart');
            this.input.off('drag');
            this.input.off('dragend');    
        } catch(e) {
            var errMsg = this.getExpMsg("registerDragEvent", e);
            console.log(errMsg);
            alert(errMsg);
        } 
    }

    //// drag guiders -->
}
