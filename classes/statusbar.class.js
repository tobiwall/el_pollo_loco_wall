class Statusbar extends DrawableObject {
  height = 55;
  width = 160;
  IMAGE_ENERGY = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];
  IMAGE_COIN = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];
  IMAGE_bottle = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];
  IMAGE_ENDBOSS = [
    "img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
    "img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
  ];
  percent = 100;

  constructor(statusBar) {
    super().loadImages(this.IMAGE_ENERGY);
    this.loadImages(this.IMAGE_COIN);
    this.loadImages(this.IMAGE_bottle);
    this.loadImages(this.IMAGE_ENDBOSS);
    if (statusBar == "energy") {
      this.x = 10;
      this.y = 10;
      this.setStatusBarPercent(100);
    }
    if (statusBar == "coins") {
      this.x = 10;
      this.y = 60;
      this.setStatusBarCoins();
    }
    if (statusBar == "bottle") {
      this.x = 10;
      this.y = 110;
      this.setStatusBarBottle();
    }
    if (statusBar == "endboss") {
      this.x = 10;
      this.y = 170;
      this.setStatusBarEndboss();
    }
  }

  setStatusBarPercent(percent) {
    this.percent = percent;
    let path = this.IMAGE_ENERGY[this.checkPercent()];
    this.img = this.imageCache[path];
  }

  setStatusBarCoins() {
    let path = this.IMAGE_COIN[0];
    this.img = this.imageCache[path];
  }

  setStatusBarBottle() {
    let path = this.IMAGE_bottle[0];
    this.img = this.imageCache[path];
  }

  setStatusBarEndboss() {
    let path = this.IMAGE_ENDBOSS[5];
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
