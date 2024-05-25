class ChickenSmall extends MovableObject {


    width = 70;
    height = 70;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.y = 380;
        this.x = 450 + Math.random() * 2200;
        this.speed = 0.15 + Math.random() * 5;
        this.animate(this.IMAGES_WALKING);
    }

    animate(image) {
        setInterval(() => {
            this.moveLeft();
            this.playAnimation(image);
        }, 100);
      }
}