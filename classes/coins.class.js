class Coin extends MovableObject {

    height = 100;
    width = 100;

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = 200 + Math.random() * 2000;
        this.y = 110 + Math.random() * 130;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES);
        }, 300);
      }
}