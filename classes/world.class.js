class World {
  character = new Character();
  statusbars = [];
  level = level1;
  hitEndboss = 100;
  endscreen = new Endscreen(this.character, this);
  throwableObject = [];
  SOUND_WIN = new Audio('audio/win.mp3');

  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  colisionIntervall;
  bottleHit = false;
  isGameOver = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.addStatusbars();
    this.draw();
    this.setWorld();
    this.run();
  }

  addStatusbars() {
    this.statusbars.push(new Statusbar("energy"));
    this.statusbars.push(new Statusbar("coins"));
    this.statusbars.push(new Statusbar("bottle"));
    this.statusbars.push(new Statusbar("endboss"));
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    this.colisionIntervall = setInterval(() => {
      this.checkColision();
      this.checkThrowObjects();
    }, 100);
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
        this.bottleHit = false;
      let bottle = new ThrowableObject(
        this.character.x + 80,
        this.character.y + 120,
        this.character.otherDirection
      );
      this.throwableObject.push(bottle);
    }
  }

  checkColision() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusbars[0].setStatusBarPercent(this.character.energy);
      }
      if (this.throwableObject.length !== 0) {
        this.throwableObject.forEach((bottle) => {
          if (bottle.isColliding(enemy)) {


            if (enemy instanceof Endboss && !this.bottleHit) {
                this.bottleHit = true;
                this.hitEndboss -= 20;
                this.statusbars[3].setStatusBarEndboss(this.hitEndboss);



              if (this.hitEndboss == 0) {
                setTimeout(() => {
                    this.level.enemies.splice(index, 1);
                    this.gameIsOver = true;
                    this.SOUND_WIN.play();
                    setTimeout(() => {
                        window.location.href = "index.html";
                    }, 7000)
                }, 1000)
              }



            } else if (!(enemy instanceof Endboss)) {
                enemy.animate(enemy.IMAGES_DEAD);
                setTimeout(() => {
                    this.level.enemies.splice(index, 1);
                }, 1000)
            }
          }
        });
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectToMap(this.level.backgroundObjects);
    this.addObjectToMap(this.level.clouds);
    if (!this.gameIsOver) {
      this.addToMap(this.character);
      this.addObjectToMap(this.level.coins);
      this.addObjectToMap(this.throwableObject);
      this.addObjectToMap(this.level.enemies);
    }
    this.ctx.translate(-this.camera_x, 0);
    if (!this.gameIsOver) {
      this.statusbars.forEach((statusbar) => {
        this.addToMap(statusbar);
      });
    }
    if (this.gameIsOver) {
      this.addToMap(this.endscreen);
    }

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }

  addObjectToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    //mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}
