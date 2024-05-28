class Coin extends MovableObject {

    height = 100;
    width = 100;

    IMAGES = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    /**
     * constructor()loads the images of coins
     * 
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES);
        this.x = 200 + Math.random() * 2000;
        this.y = 30 + Math.random() * 100;
        this.animate();
    }

    /**
     * animate() set the interval to animate zhe coins
     * 
     */
    animate() {
        setInterval(() => this.playAnimation(this.IMAGES), 300);
      }
}