class Coin extends MovableObject {

    height = 100;
    width = 100;

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    IMAGES_BOTTLE_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.loadImages(this.IMAGES_BOTTLE_GROUND);
        this.x = 200 + Math.random() * 2000;
        this.y = 110 + Math.random() * 130;
        this.animate();
        //this.animateBottle();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 300);
      }

      animateBottle() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_GROUND);
        }, 1000)
      }
}