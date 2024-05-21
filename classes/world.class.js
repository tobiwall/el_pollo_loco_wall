class World {
  character = new Character();
  statusbar = new Statusbar();
  level = level1;


  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  colisionIntervall;
  isGameOver = false;


  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollision();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollision() {
    this.colisionIntervall = setInterval(() => {
      this.level.enemies.forEach((enemy) => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
          this.statusbar.setStatusBarPercent(this.character.energy);
        }
      });
      /*this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.character.isCatchingCoin = true;
            }
        })*/
    }, 100);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectToMap(this.level.backgroundObjects);
    this.addObjectToMap(this.level.clouds);
    if (!this.gameIsOver) {
      this.addToMap(this.character);
      this.addObjectToMap(this.level.coins);
      this.addObjectToMap(this.level.enemies);
    }
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusbar);

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
