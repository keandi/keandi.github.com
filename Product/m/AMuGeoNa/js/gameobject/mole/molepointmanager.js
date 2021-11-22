// MolePointObject
// 정보를 닮고 있고 destroy 를 하기 위한 구조체로 별도의 기능을 갖지 못한다.
class MolePointObject extends ClsObject {
    x = 0;
    y = 0;

    object = undefined;

    // ctor
    constructor(name) {
        try {
            super(name);
            

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
    destroy() {
        try {
            this.x = this.y = 0;
            destroyObject( this.object );
            this.object = undefined;
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}

//
class MolePointNumberObject extends ClsObject {
    one = new MolePointObject('one');
    ten = new MolePointObject('ten');
    hundred = new MolePointObject('hundred');

    // ctor
    constructor(name, scene, charSize, onePosition) {
        try {
            super(name);

            this.scene = scene;
            this.number = {
                one: '',
                ten: '',
                hundred: '',
                
            }
            this.charSize = charSize;

            this.one.x = onePosition.x;
            this.one.y = onePosition.y;
            this.ten.x = this.one.x - charSize.cx - charSize.border;
            this.ten.y = onePosition.y;
            this.hundred.x = this.ten.x - charSize.cx - charSize.border;
            this.hundred.y = onePosition.y;

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // destroy
    destroy() {
        try {
            destroyObjects( this.one, this.hundred, this.ten );
            this.one = this.hundred = this.ten = undefined;
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // set point number
    set Point(value) {
        try {
            let newValue = (value + '').right(3);
            if (value >= 100) {
                this.number.hundred = newValue.substring(0, 1);
                this.number.ten = newValue.substring(1, 2);
                this.number.one = newValue.substring(2, 3);
            } else if (value >= 10) {
                this.number.hundred = '0';
                this.number.ten = newValue.substring(0, 1);
                this.number.one = newValue.substring(1, 2);
            } else {
                this.number.hundred = '0';
                this.number.ten = '0';
                this.number.one = newValue.substring(0, 1);
            }

            // display
            this.#display(this.hundred, this.number.hundred);
            this.#display(this.ten, this.number.ten);
            this.#display(this.one, this.number.one);

        } catch (e) {
            var errMsg = this.getExpMsg("Point", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // draw character
    #display(mob, c) {
        try {
            if (mob.object == undefined) {
                mob.object = new BrancaChar('point_number', this.scene, this.charSize);
                mob.object.setPosition(mob.x, mob.y);
            }
            mob.object.setChar(c);
        } catch (e) {
            var errMsg = this.getExpMsg("display", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }
}

//
class MolePointManager extends DestroyableObject {
    #_PV = {}

    // ctor
    constructor(name, scene, brancaFrameInfo, targetColorIndex) {
        try {
            super(name, scene);

            let v = this.#_PV;

            v.scene = scene;
            v.brancaFrameInfo = brancaFrameInfo;
            v.targetColorIndex = targetColorIndex;
            v.charSize = this.#getFullCharSize();
            v.goal = this.#getGoal();

            //중앙 위치
            let displayCenter = {
                x: v.displayArea.CenterX,
                y: v.displayArea.CenterY
            };

            v.sprites = {
                mole: new MolePointObject('point_sprite_mole'),
                current: new MolePointNumberObject('point_number_current', scene, v.charSize, 
                    {
                        x: displayCenter.x - v.charSize.cx - v.charSize.border,
                        y: displayCenter.y
                    } ),
                slash: new MolePointObject('point_sprite_slash'),
                total: new MolePointNumberObject('point_number_total', scene, v.charSize, 
                    {
                        x: displayCenter.x + ((v.charSize.cx + v.charSize.border) * 3),
                        y: displayCenter.y
                    } ),
            };

            // 위치 지정
            {
                v.sprites.slash.x = displayCenter.x;
                v.sprites.slash.y = displayCenter.y;

                v.sprites.mole.y = displayCenter.y;
                v.sprites.mole.x = v.sprites.current.hundred.x - v.charSize.cx - v.charSize.border;
            }

            // 고정 이미지 출력
            {
                v.sprites.slash.object = new BrancaChar('point_slach', v.scene, v.charSize);
                v.sprites.slash.object.setPosition(v.sprites.slash.x, v.sprites.slash.y).setChar('/');

                v.sprites.mole.sprite = v.scene.add.sprite(v.sprites.mole.x, v.sprites.mole.y, 'mole_sprite', getMoleFrameNameFromColorIndex(v.targetColorIndex));;
                setLimitPixelScale(v.sprites.mole.sprite, v.charSize.cx, v.charSize.cy);

            }

            this.#displayPoint();

            /*let pos = { x: 0, y: (v.charSize.cy / 2) + v.displayArea.Top };
            for (var i = 0; i < 8; i++) {
                pos.x = (v.charSize.cx / 2) + (i * v.charSize.cx);

                var branca = new BrancaChar('branca_' + i, scene, { cx: v.charSize.cx - v.charSize.border, cy: v.charSize.cy - v.charSize.border });
                branca.setPosition(pos.x, pos.y).setChar('X');
            } */

        } catch (e) {
            var errMsg = this.getExpMsg("ctor", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    destroy() {
        try {

            let v = this.#_PV;

            destroyObjects( v.sprites.mole, v.sprites.current, v.sprites.slash, v.sprites.total );
            
        } catch (e) {
            var errMsg = this.getExpMsg("destroy", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 넉넉하게 branca 사이즈 가져오기
    #getFullCharSize() {
        try {

            let v = this.#_PV;

            let frameInfo = v.brancaFrameInfo;
            let size = { cx: 0, cy: 0, border: 0 };
            frameInfo.forEach(element => {
                if (element.sourceSize.w > size.cx) {
                    size.cx = element.sourceSize.w;
                }

                if (element.sourceSize.h > size.cy) {
                    size.cy = element.sourceSize.h;
                }
            });

            const border = 3;
            size.cx += border;
            size.cy += border;

            const contentRc = v.scene.ContentRc;

            // 개발자가 원하는 사이즈로 고정
            if ( size.cx > 32 ) {
                const fixedCX = 32;
                size.cy = parseInt( equation(size.cx, fixedCX, size.cy) );
                size.cx = fixedCX;
            }

            // 가로 사이즈 최대 제한 필요
            if ( contentRc.Width < size.cx * 8) {
                const fixedCX = parseInt(contentRc.Width / 8);
                size.cy = parseInt( equation(size.cx, fixedCX, size.cy) );
                size.cx = fixedCX;
            }

            // point manager 영역
            v.displayArea = new Rect(contentRc.Left, contentRc.Top, contentRc.Width, contentRc.Top + size.cy);

            size.border = border;
            return size;

        } catch (e) {
            var errMsg = this.getExpMsg("getFullCharSize", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 목표 포인트 결정
    #getGoal() {
        try {
            const gameLevel = _gameData.EntryGameLevelInfo.gamelevel;
            const defaultTotal = 16;
            let goal = { mission: 0, total: 0, hit: 0, current: 0 };

            goal.total = (gameLevel * 3) + defaultTotal;

            let percent = 70;
            if (gameLevel > 13) { percent = 95; }
            else if (gameLevel > 10) { percent = 90; }
            else if (gameLevel > 8) { percent = 80; }
            else if (gameLevel > 5) { percent = 75; }

            goal.mission = getRateValue(goal.total, percent);

            return goal;
        } catch (e) {
            var errMsg = this.getExpMsg("getGoal", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 포인트 출력
    #displayPoint() {
        try {

            let v = this.#_PV;
            v.sprites.current.Point = v.goal.hit;
            v.sprites.total.Point = v.goal.total;

        } catch (e) {
            var errMsg = this.getExpMsg("displayPoint", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 현재 진행 증가
    increaseCurrentPoint() {
        try {
            this.#_PV.goal.current++;
            this.#displayPoint();
        } catch (e) {
            var errMsg = this.getExpMsg("increaseCurrent", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 성공 포인트 증가
    increaseHitPoint() {
        try {
            this.#_PV.goal.hit++;
            this.#displayPoint();
        } catch (e) {
            var errMsg = this.getExpMsg("increaseHitPoint", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 진행 가능? 끝?
    get IsFinished() {
        try {
            let v = this.#_PV;

            return (v.goal.current >= v.goal.total) ? true : false;
        } catch (e) {
            var errMsg = this.getExpMsg("IsFinished", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // 미션 성공?
    get IsMissionSuccess() {
        try {
            let v = this.#_PV;

            return (v.goal.hit >= v.goal.mission) ? true : false;
        } catch (e) {
            var errMsg = this.getExpMsg("IsMissionSuccess", e);
            console.log(errMsg);
            alert(errMsg);
        }
    }

    // point manager rect
    get Area() {
        return this.#_PV.displayArea;
    }
}