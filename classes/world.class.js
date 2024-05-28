class World {
  character = new Character();
  statusbars = [];
  level = level1;
  hitEndboss = 100;
  endscreen = new Endscreen(this.character, this);
  throwableObject = [];
  SOUND_WIN = new Audio("audio/win.mp3");
  SOUND_CHICKEN = new Audio("audio/chicken-sound.mp3");
  ENDBOSS_SOUND = new Audio("audio/endboss-sound.mp3");
  COIN_SOUND = new Audio("audio/coin.mp3");
  DING_SOUND = new Audio("audio/ding.mp3");

  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  colisionIntervall;
  bottleHit = false;
  isGameOver = false;
  killEnemy = false;
  collectedBottles = 0;
  collectedCoins = 0;
  newBottles = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.addStatusbars();
    this.draw();
    this.setWorld();
    this.run();
    this.setEndbossSpeed();
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
    }, 60);
  }

  checkThrowObjects() {
    if (this.keyboard.D && this.collectedBottles > 0) {
      this.collectedBottles -= 1;
      this.statusbars[2].setStatusBarBottle(this.collectedBottles);
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
      this.colisionCharacterEnemy(enemy, index);
      this.colisionBottleEnemy(enemy, index);
    });
    this.level.endBoss.forEach((boss) => {
      this.colisionCharacterEnemy(boss);
      this.colisionBottleEnemy(boss, 0);
    });
    this.level.bottle.forEach((salsa, index) => this.colisionCharacterBottle(salsa, index));
    this.level.coins.forEach((coin, index) => this.colisionCharacterCoin(coin, index));
  }

  colisionCharacterCoin(coin, index) {
    if (this.character.isColliding(coin)) {
      this.COIN_SOUND.volume = 0.3;
      if (!musikStoped) this.COIN_SOUND.play();
      this.level.coins.splice(index, 1);
      this.collectedCoins += 1;
      if (this.collectedCoins > 5) {
        this.collectedCoins = 5;
        this.character.energy += 10;
        this.statusbars[0].setStatusBarPercent(this.character.energy);
      }
      this.statusbars[1].setStatusBarCoins(this.collectedCoins);
    }
  }

  colisionCharacterBottle(salsa, index) {
    if (this.character.isColliding(salsa)) {
      this.DING_SOUND.volume = 0.5;
      if (!musikStoped) this.DING_SOUND.play();
      this.level.bottle.splice(index, 1);
      this.collectedBottles += 1;
      if (this.collectedBottles > 5) this.collectedBottles = 5;
      this.statusbars[2].setStatusBarBottle(this.collectedBottles);
    }
  }

  colisionCharacterEnemy(enemy, index) {
    if (this.character.isColliding(enemy)) {
      if (this.characterAttacksChicken(enemy)) this.killChicken(enemy, index);
      else if (!this.killEnemy && this.hitEndboss > 0) this.hurtCharacter();
    }
  }

  characterAttacksChicken(enemy) {
    return (this.character.isAboveGround() && this.character.speedY < 0 && !(enemy instanceof Endboss));
  }

  killChicken(enemy, index) {
    this.chickenKilled(enemy, index);
    this.character.speedY = 20;
    this.killEnemy = true;
    setTimeout(() => (this.killEnemy = false), 1000);
  }

  hurtCharacter() {
    this.character.hit();
    this.statusbars[0].setStatusBarPercent(this.character.energy);
  }

  colisionBottleEnemy(enemy, index) {
    if (this.throwableObject.length !== 0) {
      this.throwableObject.forEach((bottle) => {
        if (bottle.isColliding(enemy)) {
          if (enemy instanceof Endboss) {
            this.hurtEndboss(enemy);
            this.endbossDead(enemy);
          } else this.chickenKilled(enemy, index);
        }
      });
    }
  }

  chickenKilled(enemy, index) {
    clearInterval(enemy.moveLeftIntervall);
    if (!musikStoped) this.SOUND_CHICKEN.play();
    enemy.animate(enemy.IMAGES_DEAD);
    enemy.speedY = -10;
    enemy.applyGravity();
    setTimeout(() => this.level.enemies.splice(index, 1), 1000);
  }

  hurtEndboss(enemy) {
    if (!this.bottleHit) {
      this.bottleHit = true;
      this.hitEndboss -= 20;
      this.ENDBOSS_SOUND.pause();
      this.ENDBOSS_SOUND.currentTime = 2;
      if (!musikStoped) this.ENDBOSS_SOUND.play();
      clearInterval(enemy.moveLeftIntervall);
      enemy.animate(enemy.IMAGES_HURT);
      if (this.hitEndboss > 40) enemy.speed = 10;
      else enemy.speed = 20;
      this.statusbars[3].setStatusBarEndboss(this.hitEndboss);
      this.createNewBottles();
    }
  }

  createNewBottles() {
    if (!this.newBottles) {
      this.newBottles = true;
      setTimeout(() => {
        const bottleTypes = ["air", "air", "air", "ground", "ground"];
        bottleTypes.forEach((type) => this.level.bottle.push(new Bottle(type)));
      }, 6000);
    }
  }

  endbossDead(enemy) {
    if (this.hitEndboss == 0) {
      this.intervallBossDead(enemy);
      this.timeoutWinAnimation();
    }
  }

  intervallBossDead(enemy) {
    clearInterval(enemy.moveLeftIntervall);
    enemy.animateBossDead(enemy.IMAGES_DEAD);
    setTimeout(() => {
      clearInterval(enemy.animateBossDeadIntervall);
      enemy.speedY = -10;
      enemy.applyGravity();
    }, 1000);
  }

  timeoutWinAnimation() {
    setTimeout(() => {
      this.level.endBoss.splice(0, 1);
      this.gameIsOver = true;
      this.ENDBOSS_SOUND.pause();
      if (!musikStoped) this.SOUND_WIN.play();
      setTimeout(() => (window.location.href = "index.html"), 7000);
    }, 2000);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.drawObjectsToMove();
    this.ctx.translate(-this.camera_x, 0);
    this.drawStatusbar();
    this.drawEndscreen();
    this.repeadDraw();
  }

  drawObjectsToMove() {
    this.addObjectToMap(this.level.backgroundObjects);
    this.addObjectToMap(this.level.clouds);
    if (!this.gameIsOver) {
      this.addToMap(this.character);
      this.addObjectToMap(this.level.coins);
      this.addObjectToMap(this.level.bottle);
      this.addObjectToMap(this.throwableObject);
      this.addObjectToMap(this.level.enemies);
      this.addObjectToMap(this.level.endBoss);
    }
  }

  drawStatusbar() {
    if (!this.gameIsOver) this.statusbars.forEach((statusbar) => this.addToMap(statusbar));
  }

  drawEndscreen() {
    if (this.gameIsOver) this.addToMap(this.endscreen);
  }

  repeadDraw() {
    let self = this;
    requestAnimationFrame(() => self.draw());
  }

  clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }

  addObjectToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    mo.draw(this.ctx);
    if (mo.otherDirection) this.flipImageBack(mo);
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

  setEndbossSpeed() {
    setInterval(() => {
      if (this.character.sawEndboss && this.hitEndboss > 0) this.level.endBoss[0].speed = 10;
    }, 500);
  }
}
