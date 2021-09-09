class SceneShootTheStars extends GameScene {
    #_SPV = {};

    // ctor
    constructor(fps, gameHost) {
        try {
            super(fps, gameHost);

        } catch (e) {
            var errMsg = this.getKey() + ".ctor.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // secene key 반환
    getKey() {
        return KEY_GAME_SHOOTTHESTARS;
    }

    onCreate() {
        //alert("create " + this.getKey());

        this._isStopped = false;
    }

    onPreset() {
        this._isUseSerialLoader = true;
    }

    onStop() {
        try {
            //console.log("onStop " + this.getKey());

            super.onStop();

            this._isStopped = true;
            
        } catch(e) {
            var errMsg = this.getKey() + ".onStop.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onSerialLoadAssets() {
        super.onSerialLoadAssets();

        _resourcePool.setScene(this)
            .addArgs('shootthestars_sprite' );
    };    

    // game object pool 이용시 생성 과정을 여기에서 구현
    onRegisterObjectCreateCallback() {
        try {
            super.onRegisterObjectCreateCallback();

            let selfIt = this;
            let v = this.#_SPV;

            const contentRc = this.ContentRc;

            // json data
            v.frameInfo = {
                frames: _resourcePool.getJsonFrameMap('shootthestars_sprite'),
            };

            // menu icon coords
            const menuIconCount = 7;
            const menuIconGapTotal = COORD_SHOOTTHESTARS_MENUICON_GAP * (menuIconCount - 1);
            let menuIconSize = {
                original: v.frameInfo.frames.get('MENU_HP_UP').sourceSize
            };
            let minMenuWidth = (menuIconSize.original.w * menuIconCount) + menuIconGapTotal;
            menuIconSize.w = menuIconSize.original.w;
            menuIconSize.h = menuIconSize.original.h;

            if (contentRc.Width < minMenuWidth) {
                menuIconSize.w = menuIconSize.h = parseInt((contentRc.Width - menuIconGapTotal) / menuIconCount);
                minMenuWidth = (menuIconSize.w * menuIconCount) + menuIconGapTotal;
            }

            // coords - menu
            {
                v.coords = {
                    gameRect: contentRc.copyFromThis(),
                    menuIconBegin: {x: 0, y: 0},
                    menuIconGap: menuIconSize.w + COORD_SHOOTTHESTARS_MENUICON_GAP,
                };
                let c = v.coords;
                c.gameRect.Bottom = contentRc.Bottom - menuIconSize.w;
                c.menuRect = new Rect(v.coords.gameRect.Left, v.coords.gameRect.Bottom + 1, v.coords.gameRect.Width, menuIconSize.h);
                const restGap = c.gameRect.Width - minMenuWidth;
                c.menuIconBegin.x = (restGap > 0) ? (restGap / 2) + (menuIconSize.w / 2) : 0;
                c.menuIconBegin.y = c.menuRect.CenterY;
            }

            // menu pan
            {
                this.registerGameObjectCreateCallback('menuPan', ()=>{
                    let g = selfIt.add.graphics();
                    g.fillStyle(COLOR_SHOOTTHESTARS_MENU_BACKGROUND, 1);
                    g.fillRect(v.coords.menuRect.Left, v.coords.menuRect.Top, v.coords.menuRect.Width, v.coords.menuRect.Height);
                    g.setDepth(DEPTH_GAMEMENU);

                    return g;
                });
            }

            // drag fake image
            {
                let createDragImage = function(texture) {
                    let image = selfIt.add.image(0, 0, 'shootthestars_sprite', texture);
                    image.setDepth(DEPTH_GAMEMENU);
                    image.setOrigin(0.5);
                    image.alpha = 0.4;
                    setPixelScaleXorY(image, menuIconSize.w);
                    return image;
                };

                this.registerGameObjectCreateCallback('dragIcon_base2', ()=>{
                    return createDragImage('CANON2_0000');
                });

                this.registerGameObjectCreateCallback('dragIcon_base3', ()=>{
                    return createDragImage('CANON3_0000');
                });

                this.registerGameObjectCreateCallback('dragIcon_continous_canon', ()=>{
                    return createDragImage('CONTINOUS_CANON_0000');
                });

                this.registerGameObjectCreateCallback('dragIcon_laser_vertical', ()=>{
                    return createDragImage('LASER1_0000');
                });

                this.registerGameObjectCreateCallback('dragIcon_laser_horizontal', ()=>{
                    return createDragImage('LASER2_0000');
                });

                this.registerGameObjectCreateCallback('dragIcon_rocket', ()=>{
                    return createDragImage('ROCKET');
                });

                this.registerGameObjectCreateCallback('dragIcon_hp_up', ()=>{
                    return createDragImage('MENU_HP_UP');
                });
            }

            // menu canon icon - base 2
            {
                let dragFakeImage = undefined;

                let dragFakeImageControl = function(x, y, dragprocess, texture) {
                    if (dragprocess.value === DragProcess.START.value) {
                        dragFakeImage = selfIt.getGameObject(texture);
                    }
                    setPosition(dragFakeImage, x, y);

                    if (dragprocess.value === DragProcess.END.value) {
                        selfIt.releaseGameObject(dragFakeImage);
                        dragFakeImage = undefined;
                    }
                };

                this.registerGameObjectCreateCallback('canonIcon_base2', ()=>{
                    return new CanonMenuIcon('icon_base2', selfIt, ShootTheStarsCanonIconType.BASE_2, menuIconSize.w, (who, x, y, dragprocess)=>{
                        //console.log( stringFormat('drag x: {0}, y: {1}, dragprocess: {2}', x, y, dragprocess.value) );
                        // drag 구현 필요
                        dragFakeImageControl(x, y, dragprocess, 'dragIcon_base2');
                    });
                });

                this.registerGameObjectCreateCallback('canonIcon_base3', ()=>{
                    return new CanonMenuIcon('icon_base3', selfIt, ShootTheStarsCanonIconType.BASE_3, menuIconSize.w, (who, x, y, dragprocess)=>{
                        //console.log( stringFormat('drag x: {0}, y: {1}, dragprocess: {2}', x, y, dragprocess.value) );
                        // drag 구현 필요
                        dragFakeImageControl(x, y, dragprocess, 'dragIcon_base3');
                    });
                });

                this.registerGameObjectCreateCallback('canonIcon_coutinouse_canon', ()=>{
                    return new CanonMenuIcon('icon_continouse_canon', selfIt, ShootTheStarsCanonIconType.CONTINOUSE_CANON, menuIconSize.w, (who, x, y, dragprocess)=>{
                        //console.log( stringFormat('drag x: {0}, y: {1}, dragprocess: {2}', x, y, dragprocess.value) );
                        // drag 구현 필요
                        dragFakeImageControl(x, y, dragprocess, 'dragIcon_continous_canon');
                    });
                });

                this.registerGameObjectCreateCallback('canonIcon_laser_vertical', ()=>{
                    return new CanonMenuIcon('icon_laser_vertical', selfIt, ShootTheStarsCanonIconType.LASER_VERTICAL, menuIconSize.w, (who, x, y, dragprocess)=>{
                        //console.log( stringFormat('drag x: {0}, y: {1}, dragprocess: {2}', x, y, dragprocess.value) );
                        // drag 구현 필요
                        dragFakeImageControl(x, y, dragprocess, 'dragIcon_laser_vertical');
                    });
                });

                this.registerGameObjectCreateCallback('canonIcon_laser_horizontal', ()=>{
                    return new CanonMenuIcon('icon_laser_horizontal', selfIt, ShootTheStarsCanonIconType.LASER_HORIZONTAL, menuIconSize.w, (who, x, y, dragprocess)=>{
                        //console.log( stringFormat('drag x: {0}, y: {1}, dragprocess: {2}', x, y, dragprocess.value) );
                        // drag 구현 필요
                        dragFakeImageControl(x, y, dragprocess, 'dragIcon_laser_horizontal');
                    });
                });

                this.registerGameObjectCreateCallback('canonIcon_rocket', ()=>{
                    return new CanonMenuIcon('icon_rocket', selfIt, ShootTheStarsCanonIconType.ROCKET, menuIconSize.w, (who, x, y, dragprocess)=>{
                        console.log( stringFormat('drag x: {0}, y: {1}, dragprocess: {2}', x, y, dragprocess.value) );
                        // drag 구현 필요
                        dragFakeImageControl(x, y, dragprocess, 'dragIcon_rocket');
                    });
                });

                this.registerGameObjectCreateCallback('canonIcon_hp_up', ()=>{
                    return new CanonMenuIcon('icon_hp_up', selfIt, ShootTheStarsCanonIconType.HP_UP, menuIconSize.w, (who, x, y, dragprocess)=>{
                        console.log( stringFormat('drag x: {0}, y: {1}, dragprocess: {2}', x, y, dragprocess.value) );
                        // drag 구현 필요
                        dragFakeImageControl(x, y, dragprocess, 'dragIcon_hp_up');
                    }, (who)=>{
                        console.log( stringFormat('touch who: {0}', who.Name) );
                        selfIt.useGold(5);
                    });
                });
            }

            // canon 
            {
                this.registerGameObjectCreateCallback('canon_1', ()=>{
                    return new STSCanon1('canon1', selfIt, v.frameInfo);
                });
            }

        } catch(e) {
            var errMsg = this.getKey() + ".onRegisterObjectCreateCallback.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

     // game start
     onGameStart() {
        try {
            // 메뉴 설정
            {
                // title
                this.printTitle(_gameOption.selectText('별을 쏘다', 'ShootTheStars'));

                // icon
                this.createTopIcon('shootthestars_sprite', 'STAR');

                // help button
                {
                    /*let kor = "- 주사위 - \r\n맞추면? +6G\r\n틀리면? -1G";
                    let eng = "- Dice - \r\nif it fits? +6G\r\nwrong? -1G";
                    this.createHelpButton(_gameOption.selectText(kor, eng), 32 + 16 + 5); */
                }
            }            

            let selfIt = this;
            let v = this.#_SPV;

            // background
            this.setBackgroundColor( COLOR_SHOOTTHESTARS_BACKGROUND );

            // menu 
            {
                v.menus = {
                    pan: this.getGameObject('menuPan'),
                    base2: this.getGameObject('canonIcon_base2'),
                    base3: this.getGameObject('canonIcon_base3'),
                    continousCanon: this.getGameObject('canonIcon_coutinouse_canon'),
                    laser_vertical: this.getGameObject('canonIcon_laser_vertical'),
                    laser_horizontal: this.getGameObject('canonIcon_laser_horizontal'),
                    rocket: this.getGameObject('canonIcon_rocket'),
                    hp_up: this.getGameObject('canonIcon_hp_up'),
                };
                
                let c = v.coords;
                let beginX = c.menuIconBegin.x;
                v.menus.base2.setPosition(beginX, c.menuIconBegin.y); beginX += c.menuIconGap;
                v.menus.base3.setPosition(beginX, c.menuIconBegin.y); beginX += c.menuIconGap;
                v.menus.continousCanon.setPosition(beginX, c.menuIconBegin.y); beginX += c.menuIconGap;
                v.menus.laser_vertical.setPosition(beginX, c.menuIconBegin.y); beginX += c.menuIconGap;
                v.menus.laser_horizontal.setPosition(beginX, c.menuIconBegin.y); beginX += c.menuIconGap;
                v.menus.rocket.setPosition(beginX, c.menuIconBegin.y); beginX += c.menuIconGap;
                v.menus.hp_up.setPosition(beginX, c.menuIconBegin.y); 
            }

            // canon
            {
                var canon = this.getGameObject('canon_1');
                canon.reset();
                canon.setPosition(100, 200);
                canon.alpha = 1;
            }

        } catch(e) {
            var errMsg = this.getKey() + ".onGameStart.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }


     // get msgbox x, y (상속하여 반환 필요)
     getMsgBoxXY() {
         const contentRc = this.ContentRc;
         return { x: contentRc.CenterX, y: contentRc.CenterY };
    }

    // 게임 강제종료 처리 (반드시 상속 구현 필요)
    gameUserExit() {
        this.gameEnd(true);
    }

    // 게임 정상종료 처리
    gameFinished() {
        this.gameEnd(false);
    }
}