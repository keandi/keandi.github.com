var PointSettle = function(name) {
    ClsObject.apply(this, arguments);
}

PointSettle.prototype = Object.create(ClsObject.prototype);
PointSettle.prototype.constructor = PointSettle;

PointSettle.prototype.settle = function(isGameOver) {
    var me = GD._pointSettle;
    var menuPoints = GD._menuPoints;

    try {
        // destroy all
        {
            if (me._objects != undefined) {
                for (var i = 0; i < me._objects.length; i++) {
                    var obj = me._objects[i];

                    // circle
                    obj.circleGraphic.destroy();

                    // point text
                    obj.pointText.destroy();

                    // menu name
                    if (obj.menuNameText != undefined) {
                        obj.menuNameText.destroy();
                    }
                }
            }
        }

        // create settle
        {
            // sort point
            var copiedArray = menuPoints._points;
            copiedArray.sort((a, b)=>{
                if (a._point < b._point) {
                    return 1;
                } else if (a._point > b._point) {
                    return -1;
                }
                return 0;
            });

            /*for (var i = 0; i < copiedArray.length; i++) {
                console.log("" + i + ". " + copiedArray[i]._point + " / name: " + copiedArray[i]._menuName);
            } */

            // create
            var max = (copiedArray.length > SETTLE_MAX) ? SETTLE_MAX : copiedArray.length;
            me._objects = [];

            var cellSize = CELL_SIZE * CELL_MAX;
            var cellGapSize = CELL_GAP * (CELL_MAX - 1);
            var boxSize = cellSize + cellGapSize;
            var beginX = boxSize + CELL_BEGIN_X + SETTLE_TEXT_GAMEBOX_GAP + CELL_CIRCLE_RADIUS;
            const textStyle = { font: "bold 28px Arial", fill: SETTLE_TEXT_COLOR_STR};
            for (var i = 0; i < max; i++) {
                var beginY = (CELL_BEGIN_Y + CELL_CIRCLE_RADIUS) + (SETTLE_TEXT_RAW_GAP * i);
                var circleCenterY = beginY + CELL_CIRCLE_RADIUS - 2;

                // circle
                var grph = GD._owner.add.graphics({ fillStyle: { color: copiedArray[i]._color }});
                var circle = new Phaser.Geom.Circle(beginX, circleCenterY, CELL_CIRCLE_RADIUS);
                grph.fillCircleShape(circle);

                // point text
                var pttxtX = beginX + CELL_CIRCLE_RADIUS + 5;
                var pttxtY = beginY - CELL_CIRCLE_RADIUS;
                var pttxt = GD._owner.add.text(pttxtX, pttxtY, copiedArray[i]._point, textStyle);

                // menu text
                var menuntxt = undefined;
                if (isGameOver == true) {
                    var menuntxtX = pttxtX + 120;
                    var menuntxtY = pttxtY;
                    menuntxt = GD._owner.add.text(menuntxtX, menuntxtY, copiedArray[i]._menuName, textStyle);
                }

                //
                me._objects.push({
                    circleGraphic: grph,
                    pointText: pttxt,
                    menuNameText: menuntxt
                });
            }
        }
    } catch (e) {
        var errMsg = me._name + ".settle.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}