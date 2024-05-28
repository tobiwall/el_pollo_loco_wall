class Statusbar extends DrawableObject {
  height = 55;
  width = 160;
  x = 10;

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

  /**
   * constructor() loads all images for the statusbar
   * 
   * @param {is the current statusBar to draw} statusBar 
   */
  constructor(statusBar) {
    super().loadImages(this.IMAGE_ENERGY);
    this.loadImages(this.IMAGE_COIN);
    this.loadImages(this.IMAGE_bottle);
    this.loadImages(this.IMAGE_ENDBOSS);
    this.setAllStatusBars(statusBar);
  }

  /**
   * sets the current statusbar to draw
   * 
   * @param {is the current statusBar} statusBar 
   */
  setAllStatusBars(statusBar) {
    if (statusBar == "energy") this.setStatusBarPercent(100);
    if (statusBar == "coins") this.setStatusBarCoins(0);
    if (statusBar == "bottle") this.setStatusBarBottle(0);
    if (statusBar == "endboss") this.setStatusBarEndboss(100);
  }

  /**
   * setStatusBarPercent() set the energy statusbar for Pepe
   * 
   * @param {is the energy of Pepe} percent 
   */
  setStatusBarPercent(percent) {
    this.percent = percent;
    this.y = 10;
    let path = this.IMAGE_ENERGY[this.checkPercent(this.percent)];
    this.img = this.imageCache[path];
  }

  /**
   * setStatusBarCoins() set the statusbar of collected coins
   * 
   * @param {*} collectedCoins 
   */
  setStatusBarCoins(collectedCoins) {
    this.y = 60;
    let path = this.IMAGE_COIN[collectedCoins];
    this.img = this.imageCache[path];
  }

  /**
   * setStatusBarBottle() set the Statusbar of collected bottles
   * 
   * @param {*} collectedBottles 
   */
  setStatusBarBottle(collectedBottles) {
    this.y = 110;
    let path = this.IMAGE_bottle[collectedBottles];
    this.img = this.imageCache[path];
  }

  /**
   * setStatusBarEndboss() set the statusbar of energy for the endboss
   * 
   * @param {percent of energy} percent 
   */
  setStatusBarEndboss(percent) {
    this.y = 170;
    let path = this.IMAGE_ENDBOSS[this.checkPercent(percent)];
    this.img = this.imageCache[path];
  }

  /**
   * counts the percent to get the right index of statusbar
   * 
   * @param {*} percent 
   * @returns the index for image array
   */
  checkPercent(percent) {
    if (percent >= 100) return 5;
    else if (percent > 80) return 4;
    else if (percent > 60) return 3;
    else if (percent > 40) return 2;
    else if (percent > 20) return 1;
    else return 0;
  }
}
