class Chicken extends MovableObject {

    width = 100;
    height = 100;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.y = 350;
        this.x = 200 + Math.random() * 500;
    }

}