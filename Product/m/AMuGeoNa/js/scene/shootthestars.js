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

            let v = this.#_SPV;
            destroyObjects( v.goalProgress );
            v.goalProgress = undefined;
            
        } catch(e) {
            var errMsg = this.getKey() + ".onStop.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onSerialLoadAssets() {
        super.onSerialLoadAssets();

        _resourcePool.setScene(this)
            .addArgs('shootthestars_sprite', 'explosion_sprite_01', 'explosion_sprite_02', 'rock_1_sprite',
                'explosion_low', 'explosion_middle', 'explosion_loud', 'gun_bullet', 'laser1', 'missile');
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
            v.bulletExplosionframeInfo = {
                frames: _resourcePool.getJsonFrameMap('explosion_sprite_02'),
            };
            v.rock1frameInfo = {
                frames: _resourcePool.getJsonFrameMap('rock_1_sprite'),
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
                        dragFakeImage.visible = true;
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
                            } else if (canonType.value === ShootTheStarsCanonIconType.LASER_HORIZONTAL.value) {
                                objectKind = 'laser_v2';
                            } else if (canonType.value === ShootTheStarsCanonIconType.ROCKET.value) {
                                objectKind = 'rocket';
                            }

                            if (objectKind != undefined) {
                                let oldCanonInfo = selfIt.getCanonOfArea(canonRect.CenterX, canonRect.CenterY);
                                if (oldCanonInfo != undefined) {
                                    //console.log("object state: " + oldCanonInfo.object.CurrentState);
                                    if (oldCanonInfo.object.CurrentState !== 'fire' && oldCanonInfo.object.CurrentState !== 'explosion') 
                                    {
                                        oldCanonInfo.object.remove();
                                        selfIt.releaseGameObject(oldCanonInfo.object);

                                        var newCanon = selfIt.getGameObject(objectKind);
                                        newCanon.setPosition(canonRect.CenterX, canonRect.CenterY);
                                        newCanon.visible = true;
                                        newCanon.reset();

                                        oldCanonInfo.object = newCanon;

                                        // use gold
                                        //console.log("use gold: " + canonType.needgold);
                                        selfIt.useGold(canonType.needgold);
                                    }                                    
                                }                          
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
                        //console.log( stringFormat('drag x: {0}, y: {1}, dragprocess: {2}', x, y, dragprocess.value) );
                        // drag 구현 필요
                        dragFakeImageControl(x, y, dragprocess, 'dragIcon_rocket', who.IconType);
                    });
                });

                this.registerGameObjectCreateCallback('canonIcon_hp_up', ()=>{
                    return new CanonMenuIcon('icon_hp_up', selfIt, ShootTheStarsCanonIconType.HP_UP, menuIconSize.w, (who, x, y, dragprocess)=>{
                        //console.log( stringFormat('drag x: {0}, y: {1}, dragprocess: {2}', x, y, dragprocess.value) );
                        // drag 구현 필요
                        dragFakeImageControl(x, y, dragprocess, 'dragIcon_hp_up');
                    }, (who)=>{
                        //console.log( stringFormat('touch who: {0} + hp_up', who.Name) );
                        selfIt.reviveCanon();
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

                this.registerGameObjectCreateCallback('laser_v2', ()=>{
                    return new STSLaserV2('laserV2', selfIt, v.frameInfo, (x, y)=>selfIt.fireVerticalLaser2(x, y), (who)=>selfIt.exhaustedCanon(who));
                });

                this.registerGameObjectCreateCallback('rocket', ()=>{
                    return new STSRocket('rocket', selfIt, v.frameInfo, (x, y)=>selfIt.fireMissile(x, y), (who)=>selfIt.exhaustedCanon(who));
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

                this.registerGameObjectCreateCallback('bullet_laser_v2', ()=>{
                    return new STSBulletLaserV2('bulletLaserV2', selfIt, v.frameInfo, selfIt.ContentRc);
                });

                this.registerGameObjectCreateCallback('bullet_missile', ()=>{
                    return new STSMissile('bulletMissile', selfIt, v.frameInfo, selfIt.ContentRc);
                });

                this.registerGameObjectCreateCallback('bullet_explosion', ()=>{
                    return new STSBulletExplosion('bulletExplosion', selfIt, v.bulletExplosionframeInfo, selfIt.ContentRc, (who)=>selfIt.removeObject(who));
                });
            }

            // enemy
            {
                // star
                this.registerGameObjectCreateCallback('enemy_star', ()=>{
                    return new STSEnemyStar('enemyStar_' + _gameHost.Time, selfIt, v.frameInfo, selfIt.ContentRc, {
                        die: (who)=>selfIt.die(who),
                        getout: (who)=>selfIt.getOut(who)
                    });
                });

                // rock_1
                this.registerGameObjectCreateCallback('enemy_rock_1', ()=>{
                    return new STSEnemyRock1('enemyRock1_' + _gameHost.Time, selfIt, v.rock1frameInfo, selfIt.ContentRc, {
                        die: (who)=>selfIt.die(who),
                        getout: (who)=>selfIt.getOut(who)
                    });
                });
            }

            // explosion effect
            {
                this.registerGameObjectCreateCallback('explosion_01', ()=>{
                    return new ExplosionSprite('explosion_01_' + _gameHost.Time, selfIt, v.frameInfo, 'explosion_sprite_01', 'EXP_01_01', (who)=>{
                        selfIt.removeObject(who);
                    });
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

            // progressbar
            {
                const contentRc = this.ContentRc;
                let pb = new ProgressBar('progressbar_goal', this, contentRc.Left + 10, contentRc.Top + 10, contentRc.Width - 20, 8,
                        0, this.Goal, 0xff0000, 0xffffff, 0, 0.2, 0.5, ()=>{
                            //console.log("ok~~~~~~~~~~~~~~~~~~~~~~~~~!!!!");
                            selfIt.gameFinished(false);
                        });
                v.goalProgress = pb;
            }

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

                v.menus.hp_up.Enable = false; // 처음 시작 시 모든 캐논이 살아있으므로 사용 불가
            }

            // canon
            {
                v.canonData.canon.forEach(element => {
                    selfIt.createBaseCanon(element);
                    /*var canon = this.getGameObject('canon_1');
                    canon.reset();
                    canon.setPosition(element.rect.CenterX, element.rect.CenterY);
                    canon.visible = true;
                    canon.alpha = 1;
                    element.object = canon;
                    */
                });
            }

            // test star
            {
                /*
                var x = 0;
                var y = 0;
                var idx = 0;
                var tints = [0xffffff, 0xffff55, 0xff55ff, 0x8888ff, 
                    0x15b59c, 0x48ec87, 0x901568, 0x6c5589, 
                    0xf95555, 0xff0000, 0xbb0000, 0x990000];
                for (var i = 0; i < 3; i++)
                {
                    y += 100;
                    x = 35;
                    for (var j = 0; j < 4; j++)
                    {
                        var star = this.add.sprite(x, y, 'shootthestars_sprite', 'STAR');
                        star.setOrigin(0.5);
                        star.setTint(tints[idx]);

                        x += 80;
                        idx++;
                    }
                }
                */
            }

            // enemy
            {
                const contentRc = this.ContentRc;
                const gameLevel = _gameData.EntryGameLevelInfo.gamelevel;

                let createEnemy = function(x, y, name) {
                    var enemy = selfIt.getGameObject(name);
                    enemy.reset();
                    enemy.setPosition(x, y);
                    enemy.visible = true;
                };

                let createStar = function(x, y) {
                    createEnemy(x, y, 'enemy_star');
                };

                let createRock1 = function(x, y) {
                    var enemy = selfIt.getGameObject('enemy_rock_1');
                    enemy.setPosition(x, y);
                    enemy.reset();
                    enemy.visible = true;
                };

                // enemy spawn
                {
                    let getEnemyMax = function() {
                        if (gameLevel > 80) { return 9; }
                        else if (gameLevel > 55) { return 8; }
                        else if (gameLevel > 40) { return 7; }
                        else if (gameLevel > 25) { return 6; }

                        return 5;
                    };

                    let getEnemyCallback = function() {

                        let getConfigStar = function(count) {
                            return { cb: (x, y)=>createStar(x, y), count: count};
                        }
                        let getConfigRock1 = function(count) {
                            return { cb: (x, y)=>createRock1(x, y), count: count};
                        }
                        let config = new Array();

                        // enemy 추가하면서 점점 늘려야
                        if (gameLevel >= 4) {
                            config.push(getConfigStar(2));
                            config.push(getConfigRock1(1));
                        } else {
                            config.push(getConfigStar(1));
                        }

                        return config;
                    };

                    v.enemySpawn = new SpawnManager('enemy_spawn', this, 
                        [
                            { x: contentRc.X, y: contentRc.Top - 50 },
                            { x: contentRc.X + contentRc.HalfWidth, y: contentRc.Top - 50 },
                            { x: contentRc.CenterX, y: contentRc.Top - 50 },
                            { x: contentRc.CenterX + contentRc.HalfWidth, y: contentRc.Top - 50 },
                            { x: contentRc.Right, y: contentRc.Top - 50 },
                        ], 
                        getEnemyCallback(), getEnemyMax(), 3000);
                }
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
            this.playSound('gun_bullet');
        } catch(e) {
            var errMsg = this.getKey() + ".fireBulletNormal.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // fire vertical laser
    fireVerticalLaser(x,  y) {
        try {
            //console.log('fire laser v');
            let selfIt = this;
            let laser = this.getGameObject('bullet_laser_v');
            laser.reset();
            laser.run(x, y);

            this.playSound('laser1');

            return ()=> {
                //console.log('fire laser v - ended');
                laser.remove();
                selfIt.releaseGameObject(laser);
            };
        } catch(e) {
            var errMsg = this.getKey() + ".fireVerticalLaser.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // fire vertical laser2
    fireVerticalLaser2(x,  y) {
        try {
            //console.log('fire laser v2');
            
            let selfIt = this;
            let laser = this.getGameObject('bullet_laser_v2');
            laser.reset();
            laser.run(x, y);

            this.playSound('laser1');

            return ()=> {
                //console.log('fire laser v2 - ended');
                laser.remove();
                selfIt.releaseGameObject(laser);
            };
        } catch(e) {
            var errMsg = this.getKey() + ".fireVerticalLaser2.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // fire missile
    fireMissile(x,  y) {
        try {
            //console.log('fire missile');
            
            let bullet = this.getGameObject('bullet_missile');
            bullet.reset();
            bullet.run(x, y);

            this.playSound('missile');

        } catch(e) {
            var errMsg = this.getKey() + ".fireVerticfireMissilealLaser2.catched: " + e;
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
    /*gameFinished() {
        this.gameEnd(false);
    } */

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
            canonData.object.visible = true;
            canonData.object.alpha = 1;
        } catch(e) {
            var errMsg = this.getKey() + ".exhaustedCanon.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 화면 밖으로 나갔음
    getOut(who) {
        try {

            if (who.GroupTag == 'star') {
                this.#_SPV.enemySpawn.decrease(1);
            }

            // 일단 화면밖으로 이동
            who.setY(-1000);

            // remove
            who.remove();
            this.releaseGameObject(who);

        } catch(e) {
            var errMsg = this.getKey() + ".getOut.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // die
    die(who) {
        try {

            this.removeObject(who);

            let selfIt = this;

            if (who.GroupTag == 'star') {
                let v = this.#_SPV;

                //v.enemySpawn.decrease(1); // 죽으면 화면 밖으로 이동되면서 감소 되므로 여기에선 X.
                v.goalProgress.increase();

                //explosion
                /*if (v.diecount == undefined) { v.diecount = 0; }
                v.diecount++;
                if (v.diecount === 2)
                {
                    var a = 1;
                }*/
                /*if (v.lastDieName === who.Name) {
                    console.log('die: ' + who.Name);
                    this.getCollisionGroup().displayGroupElementName('star');
                }
                v.lastDieName = who.Name;*/
                //console.log("i'm die");

                let explosionTimer = new TimerOnPool('timeronpool_explosion_effect' + this.Name, this.getTimerPool());
                let whoRect = who.SpriteRect;
                let explosionCount = 0;
                explosionTimer.startInterval(()=>{
                    explosionCount++;
                    if (explosionCount > 4) {
                        explosionTimer.destroy();
                        return;
                    }

                    selfIt.explosionEffect01(
                        Phaser.Math.Between(whoRect.Left, whoRect.Right),
                        Phaser.Math.Between(whoRect.Top, whoRect.Bottom)
                    );
                }, 60, true);
            }

        } catch(e) {
            var errMsg = this.getKey() + ".die.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 게임 목표
    get Goal() {
        return (_gameData.EntryGameLevelInfo.gamelevel * 3) + 25;
    }

    // create collision group event
    onCreateCollisionGroup(collisionGroup) {
        try {
            collisionGroup.addGroups('canon', 'star', 'bullet')
                .setTargetGroups('bullet', 'star')
                .setTargetGroups('star', 'canon');

        } catch(e) {
            var errMsg = this.getKey() + ".onCreateCollisionGroup.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // group collision event - attacker X body
    onCollisionAttackerXBody(attacker, body) {
        try {
            //console.log(stringFormat("[충돌] attacker: {0}/{1}, body: {2}/{3}", attacker.GroupTag, attacker.Name, body.GroupTag, body.Name));

            if (attacker.GroupTag === 'star' && body.GroupTag === 'canon')
            {
                this.reserveSleep(200);
                body.enter('explosion');   // 폭발시켜버림
                attacker.getOut();  // 사라짐

                // effect
                for (var i = 0; i < 7; i++) {
                    this.explosionEffect01(Phaser.Math.Between(body.SpriteRect.Left, body.SpriteRect.Right), Phaser.Math.Between(body.SpriteRect.Top, body.SpriteRect.Bottom));
                }
                this.playSound('explosion_middle');
                apiVibration(2);

                if (this.#LiveCanonCount <= 0) {
                    // 실패
                    //console.log("mission failed !!!");

                    this.#_SPV.menus.hp_up.Enable = false; // 파괴된 캐논이 있으면 사용할 수 없다.

                    this.gameFinished(true);
                } else if (this.#DestroyedCanonCount > 0) {
                    this.#_SPV.menus.hp_up.Enable = true; // 파괴된 캐논이 있으면 사용할 수 있다.
                }

                return;
            }
            else 
            {
                if (body.GroupTag === 'star') {
                    this.reserveSleep(200);
                    apiVibration(1);
                    body.decreaseHP(attacker.Strength);
                    if (body.visible === true) { // 죽었나?
                        body.setSuperArmor();
                    }
                }
            }

            // explosion effect
            {
                if (attacker.ObjectKind === 'bullet') {
                    this.explosionEffect01(attacker.X, attacker.Y);
                }
                else { // body explosion effect
                    this.explosionEffect01(Phaser.Math.Between(body.SpriteRect.Left, body.SpriteRect.Right), Phaser.Math.Between(body.SpriteRect.Top, body.SpriteRect.Bottom));
                }
            }
            
            if (attacker.ObjectKind === 'bullet') {
                this.removeObject(attacker);
            } else if (attacker.ObjectKind === 'missile') {
                this.removeObject(attacker);

                // explosion attack
                {
                    var explosion = this.getGameObject('bullet_explosion');
                    explosion.reset();
                    explosion.run(attacker.X, attacker.Y);

                    this.playSound('explosion_loud');
                    apiVibration(4);
                }
            }
        } catch(e) {
            var errMsg = this.getKey() + ".onCollisionAttackerXBody.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        } 
    }

    // explosion effect
    explosionEffect01(x, y) {
        try {
            var explosion = this.getGameObject('explosion_01');
            explosion.setPosition(x, y);
            explosion.visible = true;
            explosion.reset();

            this.playSound('explosion_low');
        } catch(e) {
            var errMsg = this.getKey() + ".explosionEffect01.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        } 
    }

    // object remove
    removeObject(object) {
        try {
            object.remove();
            this.releaseGameObject(object);
        } catch(e) {
            var errMsg = this.getKey() + ".removeObject.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        } 
    }

    // 현재 살아있는 canon 개수 구하기
    get #LiveCanonCount() {
        try {
            let count = 0;
            this.#_SPV.canonData.canon.forEach(element => {
                if (element.object.IsExploded === false) {
                    count++;
                }
            });

            return count;
        } catch(e) {
            var errMsg = this.getKey() + ".#LiveCanonCount.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        } 
    }

    // 파괴된 canon 개수 구하기
    get #DestroyedCanonCount() {
        try {
            let count = 0;
            this.#_SPV.canonData.canon.forEach(element => {
                if (element.object.IsExploded === true) {
                    count++;
                }
            });

            return count;
        } catch(e) {
            var errMsg = this.getKey() + ".#LiveCanonCount.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        } 
    }

    // 기본 canon 생성
    createBaseCanon(element) {
        try {
            var canon = this.getGameObject('canon_1');
            canon.reset();
            canon.setPosition(element.rect.CenterX, element.rect.CenterY);
            canon.visible = true;
            canon.alpha = 1;
            element.object = canon;

            return true;
        } catch(e) {
            var errMsg = this.getKey() + ".createBaseCanon.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        } 

        return false;
    }

    // 파괴된 임의의 canon 되살리기
    reviveCanon() {
        try {
            let destroyedCanons = [];
            this.#_SPV.canonData.canon.forEach(element => {
                if (element.object.IsExploded === true) {
                    destroyedCanons.push(element);
                }
            });

            if (destroyedCanons.length <= 0) { throw "no destroyed canon"; }

            let index = Phaser.Math.Between(0, destroyedCanons.length - 1);

            // 파괴된 canon 제거
            destroyedCanons[index].object.remove();
            this.releaseGameObject(destroyedCanons[index].object);

            if (this.createBaseCanon(destroyedCanons[index]) === true) {
                this.useGold(ShootTheStarsCanonIconType.HP_UP.needgold);
            }

            if (this.#DestroyedCanonCount <= 0) {
                this.#_SPV.menus.hp_up.Enable = false; // 파괴된 캐논이 없으면 사용할 수 없다.
            }
        } catch(e) {
            var errMsg = this.getKey() + ".reviveCanon.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        } 
    }
}