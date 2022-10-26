class Rect {
    #_x = 0;
    #_y = 0;
    #_width = 0;
    #_height = 0;
    constructor(x, y, width, height) {
        this.set(x, y, width, height);
    }

    set(x, y, width, height) {
        if (x == undefined) x = 0;
        if (y == undefined) y = 0;
        if (width == undefined) width = 0;
        if (height == undefined) height = 0;

        this.#_x = x;
        this.#_y = y;
        this.#_width = width;
        this.#_height = height;
    }

    duplicate() {
        return new Rect(this.X, this.Y, this.Width, this.Height);
    }

    setLTRB(l, t, r, b) {
        this.Left = l;
        this.Top = t;
        this.Right = r;
        this.Bottom = b;
    }

    set X(x) {
        this.#_x = x;
    }

    get X() {
        return this.#_x;
    }

    set Y(y) {
        this.#_y = y;
    }

    get Y() {
        return this.#_y;
    }

    set Width(width) {
        this.#_width = width;
    }

    get Width() {
        return this.#_width;
    }

    set Height(height) {
        this.#_height = height;
    }

    get Height() {
        return this.#_height;
    }

    set Left(left) {
        this.#_x = left;
    }

    get Left() {
        return this.#_x;
    }

    set Right(right) {
        if (this.#_x > right) {
            var tmp = right;
            right = this.#_x;
            this.#_x = tmp;
        }

        this.#_width = right - this.#_x;
    }

    get Right() {
        return this.#_x + this.#_width;
    }

    set Top(top) {
        this.#_y = top;
    }

    get Top() {
        return this.#_y;
    }

    set Bottom(bottom) {
        if (this.#_y > bottom) {
            var tmp = bottom;
            bottom = this.#_y;
            this.#_y = tmp;
        }

        this.#_height = bottom - this.#_y;
    }

    get Bottom() {
        return this.#_y + this.#_height;
    }

    get HalfWidth() {
        return this.#_width / 2;
    }

    get HalfHeight() {
        return this.#_height / 2;
    }

    set CenterX(value) {
        this.#_x = value - this.HalfWidth;
    }

    get CenterX() {
        return this.#_x + this.HalfWidth;
    }

    set CenterY(value) {
        this.#_y = value - this.HalfHeight;
    }

    get CenterY() {
        return this.#_y + this.HalfHeight;
    }

    setCenter(x, y) {
        this.CenterX = x;
        this.CenterY = y;
    }

    // Copy From Rect 
    copyFromRect(rc) {
        try {
            this.set(rc.X, rc.Y, rc.Width, rc.Height);
        } catch (e) {
            var errMsg = "Rect.copyFromRect.catched: " + e;
            console.log(errMsg);
            alert(errMsg);
        }
        return this;
    }

    // Copy From this
    copyFromThis() {
        let rc = new Rect(this.X, this.Y, this.Width, this.Height);
        return rc;
    }

    // is pointer in rect
    ptInRect(x, y) {
        return (x >= this.Left && x <= this.Right &&
            y >= this.Top && y <= this.Bottom)
            ? true : false;
    }

    // rect increase
    inflate(x, y) {
        this.#_x -= x;
        this.#_width += (x * 2);

        this.#_y -= y;
        this.#_height += (y * 2);
    }

    // rect decrease
    deflate(x, y) {
        this.inflate(-x, -y);
    }

    // offset
    offset(x, y) {
        if (x == undefined) { x = 0; }
        if (y == undefined) { y = 0; }

        this.move(this.#_x + x, this.#_y + y);
    }

    // move
    move(x, y) {
        if (x == undefined) { x = 0; }
        if (y == undefined) { y = 0; }

        this.X = x;
        this.Y = y;
    }

    // make from pointer
    makeFromCenterPointer(x, y, width, height) {
        if (x == undefined) x = 0;
        if (y == undefined) y = 0;
        if (width == undefined) width = 0;
        if (height == undefined) height = 0;

        let halfWidth = (width != 0) ? width / 2 :  0;
        let halfHeight = (height != 0) ? height / 2 :  0;

        this.set( x - halfWidth, y - halfHeight, width, height );
    }

    //////////////////////////////////////////
    //// <!-- collision

    isBetweenX(x) {
        return (x >= this.Left && x <= this.Right) ? true : false;
    }

    isBetweenY(y) {
        return (y >= this.Top && y <= this.Bottom) ? true : false;
    }

    collisionCheckFrom(x1, y1, x2, y2) {
        if (this.isBetweenX(x1) === true || this.isBetweenX(x2) === true) {
            return (this.isBetweenY(y1) === true || this.isBetweenY(y2) === true)
                ? true : false;
        }

        return false;
    }

    isCollision(targetRc) {
        if (this.collisionCheckFrom(targetRc.Left, targetRc.Top, targetRc.Right, targetRc.Bottom) === true) { return true; }

        if (targetRc.collisionCheckFrom(this.Left, this.Top, this.Right, this.Bottom) === true) { return true; }

        return false;
    }

    //// collision -->
    //////////////////////////////////////////

    toString() {
        return "l: " + this.Left + ", t: " + this.Top + ", r: " + this.Right + ", b: " + this.Bottom;
    }
}