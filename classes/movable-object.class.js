class MovableObject {
    x = 120;
    y = 150;
    img;



    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        this.x += 10;
    }

    moveLeft() {
        this.x -= 10;
    }

}