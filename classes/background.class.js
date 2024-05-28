class BackgroundObjekt extends MovableObject {

    x;
    y;
    width = 720;
    height = 480;

    /**
     * This constructer draws the background in raw
     * 
     * @param {path for the image} path 
     * @param {the x coordinate to draw the background next to the last one} x 
     */
    constructor(path, x) {
        super().loadImage(path);
        this.x = x;
        this.y = 480 - this.height;
    }

}