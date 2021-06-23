var Thunder = function(scene, x, y) {

    ImageObject.call(this, scene, 'Thunder', x, y);
}

Thunder.prototype = Object.create(ImageObject.prototype);
Thunder.prototype.constructor = Thunder;

///////////////////////////////////////////////////////////////////////////////////////////
// click action
Thunder.prototype.action = function(x, y) {
    try {

        var scene = this.scene;
        scene.children.add(this);
        var selfIt = this;

        let scale = 0.2;
        this.setScale(scale);
        
        let alpha = 1.0;

        function action() {
            if (scale >= 1)
            {
                clearInterval(timerId);
                scene.children.remove(selfIt);
                selfIt.destroy();
            }
            else
            {
                scale += 0.2;
                selfIt.setScale(scale);

                alpha -= 0.25;
                selfIt.alpha = alpha;
            }
        };

        let timerId = setInterval(() => action(), 40);

    } catch(e) {
        var errMsg = "Thunder.action.catched: " + e;
        console.log(errMsg);
        alert(errMsg);
    }
}