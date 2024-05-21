class Statusbar extends DrawableObject {
  x = 10;
  y = 10;
  height = 50;

  IMAGE_ENERGY = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];
  percent = 100;

  constructor() {
    super().loadImages(this.IMAGE_ENERGY);
    this.setStatusBarPercent(100);
  }

  setStatusBarPercent(percent) {
        this.percent = percent
        let path = this.IMAGE_ENERGY[this.checkPercent()];
        this.img = this.imageCache[path];
  }

  checkPercent() {
    if (this.percent == 100) {
      return 5;
    } else if (this.percent > 80) {
      return 4;
    } else if (this.percent > 60) {
      return 3;
    } else if (this.percent > 40) {
      return 2;
    } else if (this.percent > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
