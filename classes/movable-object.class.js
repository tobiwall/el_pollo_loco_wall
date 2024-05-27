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
    rigth: 0
  }

  jump() {
    this.speedY = 30;
  }

  isColliding(obj) {
    return (
      this.x + this.width - obj.offset.rigth >= obj.x + obj.offset.left &&
      this.x + obj.offset.left <= obj.x + obj.width - obj.offset.rigth &&
      this.y + this.height - obj.offset.bottom >= obj.y + obj.offset.top &&
      this.y + obj.offset.top <= obj.y + obj.height - obj.offset.bottom
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  applyGravity() {
    this.gravityCharacter();
    this.gravityChicken();
  }

  gravityCharacter() {
    this.applyGravityInterval = setInterval(() => {
        if (this.isAboveGround() || this.speedY > 0) {
          this.y -= this.speedY;
          this.speedY -= this.acceleration;
        }
      }, 1000 / 25);
  }

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

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 150;
    }
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  animate(image) {
    this.moveLeftIntervall = setInterval(() => {
        this.moveLeft();
        this.playAnimation(image);
    }, 100);
  }
}
