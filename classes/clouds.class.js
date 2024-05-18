class Cloud extends MovableObject {
    y = 20;
    width = 720;
    height = 250;



    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/full.png')
        this.x = 30 + Math.random() * 500;
    }
}