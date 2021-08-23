class GameScene extends BaseScene {
    #_PV = {};

    // ctor
    constructor(name, gameHost) {
        try {
            super(name, gameHost);

        } catch (e) {
            var errMsg = this.getKey() + ".ctor.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    onSerialLoadAssets() {
        this.addSerialLoadAsset( 'coins',
        () => {
            this.load.atlas(
                'coins',
                'assets/image/coins.png',
                'assets/atlas/coins.json'
            );
        }, 2 );

        this.addSerialLoadAsset( 'coin_drop',
            () => this.load.audio('coin_drop', 'assets/audio/coin_drop.mp3'), 1 );
    };    
    
    onCompleteSerialLoadAllAssets() {
        try {
            //console.log(this.getKey() + " asset load completed !!!");

            this.#createMenus();
        } catch(e) {
            var errMsg = this.getKey() + ".onCompleteSerialLoadAllAssets.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    #createMenus() {
        try {
            const topCY = 40;
            const bottomCY = 32;
            this.#_PV.topMenuRc = new Rect(0, 0, this.getSceneWidth(), topCY);
            this.#_PV.bottomMenuRc = new Rect(0, this.getSceneHeight() - bottomCY, this.getSceneWidth(), bottomCY);
            this.#_PV.contentRc = new Rect(0, this.#_PV.topMenuRc.Bottom + 1, this.getSceneWidth(), 
                this.getSceneHeight() - (this.#_PV.topMenuRc.Height + this.#_PV.bottomMenuRc.Height));

            this.#_PV.graphics = this.addDestroyableObject( this.add.graphics() );
            this.#_PV.graphics.setDepth(DEPTH_MENU);
            
            this.#createTopMenu();
            this.#createBottomMenu();
            this.#addCoinSound();
            this.refreshGold();

        } catch (e) {
            var errMsg = this.getKey() + ".createMenus.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 상단 메뉴 설정
    #createTopMenu() {
        try {
            let menuRc = this.#_PV.topMenuRc;
            let g = this.#_PV.graphics;

            const height = menuRc.Height / 2;

            g.fillStyle(COLOR_MENUCOLOR_1, 1);
            g.fillRect(menuRc.Left, menuRc.Top, menuRc.Width, height);

            g.fillStyle(COLOR_MENUCOLOR_2, 1);
            g.fillRect(menuRc.Left, menuRc.Top + height, menuRc.Width, height);

            /*//
            g.fillGradientStyle(0x252525, 0x7A7A7A, 0x252525, 0x7A7A7A, 1);
            g.fillRect(menuRc.Left, menuRc.Top, menuRc.Width / 2, menuRc.Height);

            g.fillGradientStyle(0x7A7A7A, 0x252525, 0x7A7A7A, 0x252525, 1);
            g.fillRect(menuRc.Left + (menuRc.Width / 2), menuRc.Top, menuRc.Width / 2, menuRc.Height);

            //
            const lineDepth = 2;
            const color1 = 0x1AC1F1;
            const color2 = 0x2DA1C2;
            g.fillStyle(color1, 1);
            g.fillRect(menuRc.Left, menuRc.Top, menuRc.Width, lineDepth);

            g.fillStyle(color2, 1);
            g.fillRect(menuRc.Left, menuRc.Top + lineDepth, menuRc.Width, lineDepth);

            //
            g.fillStyle(color2, 1);
            g.fillRect(menuRc.Left, menuRc.Bottom - (lineDepth * 2), menuRc.Width, lineDepth);

            g.fillStyle(color1, 1);
            g.fillRect(menuRc.Left, menuRc.Bottom - lineDepth, menuRc.Width, lineDepth); */

        } catch(e) {
            var errMsg = this.getKey() + ".createTopMenu.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 하단 메뉴 설정
    #createBottomMenu() {
        try {
            let menuRc = this.#_PV.bottomMenuRc;
            let g = this.#_PV.graphics;

            //
            const height = menuRc.Height / 2;

            g.fillStyle(COLOR_MENUCOLOR_1, 1);
            g.fillRect(menuRc.Left, menuRc.Top, menuRc.Width, height);

            g.fillStyle(COLOR_MENUCOLOR_2, 1);
            g.fillRect(menuRc.Left, menuRc.Top + height, menuRc.Width, height);

            // coin
            let coin = this.addDestroyableObject( this.add.image(0, 0, "coins", "COIN") );
            coin.setDepth(DEPTH_MENU);
            coin.setOrigin(0, 0.5);
            coin.x = menuRc.Left + coin.width;
            coin.y = menuRc.CenterY;

            // coin text
            let coin_txt = this.addDestroyableObject( addText(this, coin.x + coin.width + 5, coin.y, "X 1,000 G", 12, COLOR_GOLD) );
            coin_txt.setOrigin(0, 0.5);
            coin_txt.setDepth(DEPTH_MENU);
            this.#_PV.coinText = coin_txt;

        } catch(e) {
            var errMsg = this.getKey() + ".createBottomMenu.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // refresh gold
    refreshGold() {
        try {
            let coin_txt = this.#_PV.coinText;
            let gold = stringFormat( "X {0} G", numberWithCommas( _gameData.Gold ) );
            coin_txt.text = gold;
            
        } catch(e) {
            var errMsg = this.getKey() + ".refreshGold.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    useGold(v) {
        try {
            _gameData.useGold(v);
            this.playCoinSound();
            this.refreshGold();
        } catch(e) {
            var errMsg = this.getKey() + ".refreshGold.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    addGold(v) {
        try {
            _gameData.addGold(v);
            this.playCoinSound();
            this.refreshGold();
        } catch(e) {
            var errMsg = this.getKey() + ".addGold.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // add coin sound
    #addCoinSound() {
        try {
            var coin_sound = this.addDestroyableObject( new SoundSpooler("coin_sound_spooler", this, 'coin_drop', 5) );
            this.#_PV.coinSound = coin_sound;
        } catch(e) {
            var errMsg = this.getKey() + ".addCoinSound.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    playCoinSound() {
        try {
            this.#_PV.coinSound.play();
        } catch(e) {
            var errMsg = this.getKey() + ".playCoinSound.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // print title
    printTitle() {
        try {
            let menuRc = this.#_PV.topMenuRc;

            this.addDestroyableObject( addText(this, menuRc.CenterX, menuRc.CenterY, 
                _gameOption.selectText("아.무.거.나", "A.Mu.Geo.Na"), 22, COLOR_MENUTITLE) ).setDepth(DEPTH_MENU_GAMETITLE);

        } catch(e) {
            var errMsg = this.getKey() + ".printTitle.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // get top menu area
    get TopMenuRc() {
        return this.#_PV.topMenuRc;
    }

    // get bottom menu area
    get BottomMenuRc() {
        return this.#_PV.bottomMenuRc;
    }

    // get content area
    get ContentRc() {
        return this.#_PV.contentRc;
    }
}