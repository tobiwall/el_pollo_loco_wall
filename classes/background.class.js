class BackgroundObjekt extends MovableObject {

    x;
    y;
    width = 720;
    height = 420

    constructor(path, x) {
        super().loadImage(path);
        this.x = x;
        this.y = 480 - this.height;
    }

}