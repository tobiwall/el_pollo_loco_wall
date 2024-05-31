class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  offsety = 0;
  isCollidingEnemy = false;
  isCatchingCoin = false;
  lastHit = 0;
  moveLeftIntervall;
  applyGravityInterval;

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /**
   * jump() sets the jump speed to 30
   * 
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * isColliding() checks one object colides width another
   * 
   * @param {the object to check} obj 
   * @returns true or false
   */
  isColliding(obj) {
    return (
      this.x + this.width - this.offset.right >= obj.x + obj.offset.left &&
      this.x + this.offset.left <= obj.x + obj.width - obj.offset.right &&
      this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top &&
      this.y + this.offset.top <= obj.y + obj.height - obj.offset.bottom
    );
  }

  /**
   * hit() sets the energy of Pepe minus 1
   * 
   */
  hit() {
    this.energy -= 1;
    if (this.energy < 0) this.energy = 0;
    else this.lastHit = new Date().getTime();
  }

  /**
   * applyGravity() calls the functions to aply gravity
   * 
   */
  applyGravity() {
    this.gravityCharacter();
    this.gravityChicken();
  }

  /**
   * gravityCharacter() set the interval to aply gravity
   * 
   */
  gravityCharacter() {
    this.applyGravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * gravityChicken() set the interval to aply gravity
   * 
   */
  gravityChicken() {
    if (this instanceof Chicken || this instanceof ChickenSmall || this instanceof Endboss) {
      setTimeout(() => {
        setInterval(() => {
          this.y -= this.speedY;
          this.speedY -= this.acceleration;
        }, 1000 / 60);
      }, 500);
    }
  }

  /**
   * isAboveGround checks if Pepe is above the ground
   * 
   * @returns true or false
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) return true;
    else return this.y < 150;
  }

  /**
   * playAnimation() plays the animations for every array of images
   * 
   * @param {the array of images} images 
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  playAnimationDeadEndboss(images) {
    setTimeout(() => {
      world.level.endBoss.splice(0, 1);
    }, 1200)
    let animateBossDeadIntervall = setInterval(() => {
    let path = images[this.currentImage];
    this.img = this.imageCache[path];
    if (this.currentImage > 3) {
      this.currentImage = 3;
    } else this.currentImage++;
    }, 333)
  }

  /**
   * moveRight() adds the speed to x to move right
   * 
   */
  moveRight() {
    this.x += this.speed;
  }

/**
 * moveLeft() add the minus speed to x to move left
 * 
 */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * animate() sets the interval to move left and play the animation of each element
   * 
   * @param {is the image to animate} image 
   */
  animate(image) {
    this.moveLeftIntervall = setInterval(() => {
      this.moveLeft();
      this.playAnimation(image);
    }, 100);
  }
}
