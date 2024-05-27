class Cloud extends MovableObject {
  y = 20;
  width = 720;
  height = 250;
  speed = 0.5;

  constructor(index) {
    super().loadImage("img/5_background/layers/4_clouds/full.png");
    if (index == 0) {
      this.x = Math.random();
    } else if (index == 1) {
      this.x = this.x + this.width;
    } else if (index == 2) {
      this.x = this.x + (this.width * 2);
    } else if (index == 3) {
      this.x = this.x + (this.width * 3);
    }
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 100);
  }
}
