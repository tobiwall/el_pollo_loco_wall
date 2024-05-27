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

  jump() {
    this.speedY = 30;
  }

  isColliding(obj) {
    return (
      this.x + this.width >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.offsety + this.height >= obj.y &&
      this.y + this.offsety <= obj.y + obj.height
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
    this.applyGravityInterval = setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
    if (this instanceof Chicken || this instanceof ChickenSmall) {
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

  /*drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Chicken ||
      this instanceof ChickenSmall
    ) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }*/
}
