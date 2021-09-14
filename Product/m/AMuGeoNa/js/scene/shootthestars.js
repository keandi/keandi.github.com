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
                    //setPixelScaleXorY(image, menuIconSize.w);
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

                let isCanonArea = function(x, y) {
                    for (var i = 0; i < v.canonData.canon.length; i++) {
                        if (v.canonData.canon[i].enable === false) { continue; }
                        if (v.canonData.canon[i].rect.ptInRect(x, y) === true) { return v.canonData.canon[i].rect; }
                    }
                    return undefined;
                };

                let dragFakeImageControl = function(x, y, dragprocess, texture, canonType) {
                    if (dragprocess.value === DragProcess.START.value) {
                        dragFakeImage = selfIt.getGameObject(texture);
                    }

                    var canonRect = isCanonArea(x, y);
                    if (canonRect == undefined) {
                        dragFakeImage.alpha = 0.4;
                        setPosition(dragFakeImage, x, y);
                    } else {
                        dragFakeImage.alpha = 1;    
                        setPosition(dragFakeImage, canonRect.CenterX, canonRect.CenterY);
                    }

                    if (dragprocess.value === DragProcess.END.value) {
                        if (canonRect != undefined && canonType != undefined) {
                            var newCanon = undefined;
                            var objectKind = undefined;
                            if (canonType.value === ShootTheStarsCanonIconType.BASE_2.value) {
                                objectKind = 'canon_2';
                            } else if (canonType.value === ShootTheStarsCanonIconType.BASE_3.value) {
                                objectKind = 'canon_3';
                            } else if (canonType.value === ShootTheStarsCanonIconType.CONTINOUS_CANON.value) {
                                objectKind = 'continous_canon';
                            } else if (canonType.value === ShootTheStarsCanonIconType.LASER_VERTICAL.value) {
                                objectKind = 'laser_v';
                            }

                            if (objectKind != undefined) {
                                let oldCanonInfo = selfIt.getCanonOfArea(canonRect.CenterX, canonRect.CenterY);
                                if (oldCanonInfo != undefined) {
                                    oldCanonInfo.object.remove();
                                    selfIt.releaseGameObject(oldCanonInfo.object);
                                }                          
                                
                                var newCanon = selfIt.getGameObject(objectKind);
                                newCanon.setPosition(canonRect.CenterX, canonRect.CenterY);
                                newCanon.reset();

                                oldCanonInfo.object = newCanon;
                            }

                            //console.log("change canon - " + canonType.name);
                        }
                        selfIt.releaseGameObject(dragFakeImage);
                        dragFakeImage = undefined;
                    }
                };

                this.registerGameObjectCreateCallback('canonIcon_base2', ()=>{
                    return new CanonMenuIcon('icon_base2', selfIt, ShootTheStarsCanonIconType.BASE_2, menuIconSize.w, (who, x, y, dragprocess)=>{
                        //console.log( stringFormat('drag x: {0}, y: {1}, dragprocess: {2}', x, y, dragprocess.value) );
                        // drag 구현 필요
                        dragFakeImageControl(x, y, dragprocess, 'dragIcon_base2', who.IconType);
                    });
                });

                this.registerGameObjectCreateCallback('canonIcon_base3', ()=>{
                    return new CanonMenuIcon('icon_base3', selfIt, ShootTheStarsCanonIconType.BASE_3, menuIconSize.w, (who, x, y, dragprocess)=>{
                        //console.log( stringFormat('drag x: {0}, y: {1}, dragprocess: {2}', x, y, dragprocess.value) );
                        // drag 구현 필요
                        dragFakeImageControl(x, y, dragprocess, 'dragIcon_base3', who.IconType);
                    });
                });

                this.registerGameObjectCreateCallback('canonIcon_coutinouse_canon', ()=>{
                    return new CanonMenuIcon('icon_continouse_canon', selfIt, ShootTheStarsCanonIconType.CONTINOUS_CANON, menuIconSize.w, (who, x, y, dragprocess)=>{
                        //console.log( stringFormat('drag x: {0}, y: {1}, dragprocess: {2}', x, y, dragprocess.value) );
                        // drag 구현 필요
                        dragFakeImageControl(x, y, dragprocess, 'dragIcon_continous_canon', who.IconType);
                    });
                });

                this.registerGameObjectCreateCallback('canonIcon_laser_vertical', ()=>{
                    return new CanonMenuIcon('icon_laser_vertical', selfIt, ShootTheStarsCanonIconType.LASER_VERTICAL, menuIconSize.w, (who, x, y, dragprocess)=>{
                        //console.log( stringFormat('drag x: {0}, y: {1}, dragprocess: {2}', x, y, dragprocess.value) );
                        // drag 구현 필요
                        dragFakeImageControl(x, y, dragprocess, 'dragIcon_laser_vertical', who.IconType);
                    });
                });

                this.registerGameObjectCreateCallback('canonIcon_laser_horizontal', ()=>{
                    return new CanonMenuIcon('icon_laser_horizontal', selfIt, ShootTheStarsCanonIconType.LASER_HORIZONTAL, menuIconSize.w, (who, x, y, dragprocess)=>{
                        //console.log( stringFormat('drag x: {0}, y: {1}, dragprocess: {2}', x, y, dragprocess.value) );
                        // drag 구현 필요
                        dragFakeImageControl(x, y, dragprocess, 'dragIcon_laser_horizontal', who.IconType);
                    });
                });

                this.registerGameObjectCreateCallback('canonIcon_rocket', ()=>{
                    return new CanonMenuIcon('icon_rocket', selfIt, ShootTheStarsCanonIconType.ROCKET, menuIconSize.w, (who, x, y, dragprocess)=>{
                        console.log( stringFormat('drag x: {0}, y: {1}, dragprocess: {2}', x, y, dragprocess.value) );
                        // drag 구현 필요
                        dragFakeImageControl(x, y, dragprocess, 'dragIcon_rocket', who.IconType);
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

            // coords - canon
            {
                let c = v.coords;
                const canonMaxCX = v.frameInfo.frames.get('ROCKET').sourceSize.w; // 가장 큰 canon
                const canonMaxCY = v.frameInfo.frames.get('ROCKET').sourceSize.h;

                c.canonBottom = c.menuRect.Top - 1;
                const canonMax = parseInt(c.gameRect.Width / (canonMaxCX + 10));
                let canonRect = new Rect(0, 0, canonMaxCX, canonMaxCY);
                canonRect.Top = c.canonBottom - canonMaxCY;
                canonRect.Bottom = c.canonBottom;
                canonRect.Left = (c.gameRect.Width - (canonMax * canonRect.Width) - ((canonMax - 1) * 10)) / 2;
                v.canonData = {
                    canon: []
                };
                
                for (var i = 0; i < canonMax; i++) {
                    v.canonData.canon.push({
                        object: undefined,
                        enable: true,
                        rect: canonRect.copyFromThis()
                    });

                    canonRect.X += (canonMaxCX + 10);
                }

                /* let g = this.add.graphics();
                v.canonData.canon.forEach(canon => {
                    g.fillStyle(0x9F2576, 1);
                    g.fillRect(canon.rect.X, canon.rect.Y, canon.rect.Width, canon.rect.Height);
                }); */
            }

            // canon 
            {
                this.registerGameObjectCreateCallback('canon_1', ()=>{
                    return new STSCanon1('canon1', selfIt, v.frameInfo, (x, y)=>selfIt.fireBulletNormal(x, y));
                });

                this.registerGameObjectCreateCallback('canon_2', ()=>{
                    return new STSCanon2('canon2', selfIt, v.frameInfo, (x, y)=>selfIt.fireBulletNormal(x, y), (who)=>selfIt.exhaustedCanon(who));
                });

                this.registerGameObjectCreateCallback('canon_3', ()=>{
                    return new STSCanon3('canon3', selfIt, v.frameInfo, (x, y)=>selfIt.fireBulletNormal(x, y), (who)=>selfIt.exhaustedCanon(who));
                });

                this.registerGameObjectCreateCallback('continous_canon', ()=>{
                    return new STSContinousCanon('continousCanon', selfIt, v.frameInfo, (x, y)=>selfIt.fireBulletNormal(x, y), (who)=>selfIt.exhaustedCanon(who));
                });

                this.registerGameObjectCreateCallback('laser_v', ()=>{
                    return new STSLaserV('laserV', selfIt, v.frameInfo, (x, y)=>selfIt.fireVerticalLaser(x, y), (who)=>selfIt.exhaustedCanon(who));
                });
            }

            // bullet
            {
                this.registerGameObjectCreateCallback('bullet_normal', ()=>{
                    return new STSBulletNormal('bullet_normal', selfIt, v.frameInfo, selfIt.ContentRc);
                });

                this.registerGameObjectCreateCallback('bullet_laser_v', ()=>{
                    return new STSBulletLaserV('bulletLaserV', selfIt, v.frameInfo, selfIt.ContentRc);
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
                v.canonData.canon.forEach(element => {
                    var canon = this.getGameObject('canon_1');
                    canon.reset();
                    canon.setPosition(element.rect.CenterX, element.rect.CenterY);
                    canon.alpha = 1;
                    element.object = canon;
                });
            }

        } catch(e) {
            var errMsg = this.getKey() + ".onGameStart.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // fire normal bullet
    fireBulletNormal(x,  y) {
        try {
            let bullet = this.getGameObject('bullet_normal');
            bullet.reset();
            bullet.run(x, y);

            //this.reserveSleep(100);
        } catch(e) {
            var errMsg = this.getKey() + ".fireBulletNormal.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // fire normal bullet
    fireVerticalLaser(x,  y) {
        try {
            console.log('fire laser v');
            let selfIt = this;
            let laser = this.getGameObject('bullet_laser_v');
            laser.reset();
            laser.run(x, y);
            return ()=> {
                console.log('fire laser v - ended');
                laser.remove();
                selfIt.releaseGameObject(laser);
            };
        } catch(e) {
            var errMsg = this.getKey() + ".fireBulletNormal.catched: " + e;
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

    //
    getCanonOfArea(x, y) {
        try {
            let v = this.#_SPV;

            for (var i = 0; i < v.canonData.canon.length; i++) {
                if (v.canonData.canon[i].rect.ptInRect(x, y) === true) {
                    return v.canonData.canon[i];
                }
            }
        } catch(e) {
            var errMsg = this.getKey() + ".fireBulletNormal.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }

        return undefined;
    }

    // 탄을 모두 소진함
    exhaustedCanon(who) {
        try {
            let canonData = this.getCanonOfArea(who.X, who.Y);

            if (canonData == undefined) {
                throw 'exhaustedCanon - unknown canon data';
            }

            // remove
            who.remove();
            this.releaseGameObject(who);

            // new
            canonData.object = this.getGameObject('canon_1');
            canonData.object.reset();
            canonData.object.setPosition(canonData.rect.CenterX, canonData.rect.CenterY);
            canonData.object.alpha = 1;
        } catch(e) {
            var errMsg = this.getKey() + ".exhaustedCanon.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }
}