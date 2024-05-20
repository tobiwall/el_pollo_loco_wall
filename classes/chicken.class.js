class Chicken extends MovableObject {

    width = 100;
    height = 100;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.y = 350;
        this.x = 200 + Math.random() * 2200;
        this.speed = 0.15 + Math.random() * 5;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);
      }
}