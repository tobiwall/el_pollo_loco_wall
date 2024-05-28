class ThrowableObject extends MovableObject {
  width = 80;
  height = 80;
  bottleSplashAnimation;

  sound_throw = new Audio("audio/throw.mp3");

  IMAGE_THROWABLE_BOTTLE = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGE_BOTTLE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  IMAGE_BOTTLE_ONGROUND = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  IMAGE_BOTTLE = ["img/6_salsa_bottle/salsa_bottle.png"];

  /**
   * constructor() loads all images for the bottles to throw
   * 
   * @param {x coordinate of pepe} x 
   * @param {y coordinate of pepe} y 
   * @param {directen to throw} direction 
   */
  constructor(x, y, direction) {
    super().loadImage(this.IMAGE_BOTTLE);
    this.loadImages(this.IMAGE_THROWABLE_BOTTLE);
    this.loadImages(this.IMAGE_BOTTLE_SPLASH);
    this.loadImages(this.IMAGE_BOTTLE_ONGROUND);
    if (direction) this.x = x - 80;
    else this.x = x;
    this.y = y;
    this.throw(direction);
  }

  /**
   * throw() sets the speed y to 25 to throw the bottle in a nice radius
   * 
   * @param {*} direction 
   */
  throw(direction) {
    this.sound_throw.playbackRate = 0.5;
    if (!musikStoped) this.sound_throw.play();
    this.speedY = 25;
    this.applyGravity();
    this.speedX(direction);
    this.splashAnimation();
  }

  /**
   * splashAnimation() animates the plash when the bottle is toutching the ground
   * 
   */
  splashAnimation() {
    this.bottleSplashAnimation = setInterval(() => {
      if (this.y > 370) {
        this.speedY = 0;
        this.playAnimation(this.IMAGE_BOTTLE_SPLASH);
        setTimeout(() => clearInterval(this.bottleSplashAnimation), 1000);
      }
    }, 100);
  }

  /**
   * speedX() set the speed x to move the bottle forward
   * 
   * @param {*} direction 
   */
  speedX(direction) {
    setInterval(() => {
      if (direction) this.x -= 8;
      else this.x += 8;
    }, 25);
  }
}
