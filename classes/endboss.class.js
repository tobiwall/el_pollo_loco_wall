class Endboss extends MovableObject {
  width = 350;
  height = 400;
  y = 70;
  animateBossDeadIntervall;

  IMAGES_WALKING = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png'
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * constructor() loads the images for every situation of the endboss
   * 
   */
  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2400;
    this.animate(this.IMAGES_ALERT);
    this.checkEndbossPosition();
  }

  /**
   * animateBossDead() set the Animation of the endboss for each situation
   * 
   * @param {the right image Array of the situation} image 
   */
  animateBossDead(image) {
    this.animateBossDeadIntervall = setInterval(() => this.playAnimation(image), 300);
  }

  /**
   * checkEndbossPosition() checks the position of the endboss to change the direction
   * 
   */
  checkEndbossPosition() {
    setInterval(() => {
      if (this.x < 0) {
        this.otherDirection = true;
        this.speed = -10;
      }
      if (this.x > 2400 && this.otherDirection) {
        this.otherDirection = false;
        this.speed = 10;
      }
    });
  }
}
