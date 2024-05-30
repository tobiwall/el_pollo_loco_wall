class World {
  character = new Character();
  statusbars = [];
  hitEndboss = 100;
  level = level1;
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
  throwTime = true;
  pepeSawBoss = false;
  endbossAttacks = false;

  /**
   * constructor() set the parameters and calls the functions to draw the whole game
   * 
   * @param {*} canvas 
   * @param {*} keyboard 
   */
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

  /**
   * addStatusbars() creates the 4 statusbars and pushes them in the array
   * 
   */
  addStatusbars() {
    this.statusbars.push(new Statusbar("energy"));
    this.statusbars.push(new Statusbar("coins"));
    this.statusbars.push(new Statusbar("bottle"));
    this.statusbars.push(new Statusbar("endboss"));
  }

  /**
   * setWorld() gives the whole world to the parameter for the character to use all the data
   * 
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * run() set the interval to check collisions
   * 
   */
  run() {
    this.colisionIntervall = setInterval(() => {
      this.checkColision();
      this.checkThrowObjects();
    }, 1000/60);
  }

  /**
   * checkThrowObjects() create the bottle to throw if touch keyboard D and if there are collected bottles
   * 
   */
  checkThrowObjects() {
    if (this.keyboard.D && this.collectedBottles > 0 && this.throwTime) {
      this.throwTime = false;
      setTimeout(() => this.throwTime = true, 1000);
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

  /**
   * checkColision() checks the colision for character, enemy, coins and bottles
   * 
   */
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

  /**
   * colisionCharacterCoin() checks and act if character touches a coin
   * 
   * @param {*} coin 
   * @param {index of coin} index 
   */
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

  /**
   * colisionCharacterBottle() checks and act if character touches a bottle
   * 
   * @param {*} salsa 
   * @param {index of bottle} index 
   */
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

  /**
   * colisionCharacterEnemy() checks and act if character touches a enemy
   * 
   * @param {*} enemy 
   * @param {index of chicken} index 
   */
  colisionCharacterEnemy(enemy, index) {
    if (this.character.isColliding(enemy)) {
      if (this.characterAttacksChicken(enemy)) this.killChicken(enemy, index);
      else if (!this.killEnemy && this.hitEndboss > 0) this.hurtCharacter();
    }
  }

  /**
   * characterAttacksChicken() returns true if Pepe is jumping on chicken
   * 
   * @param {*} enemy 
   * @returns true or false
   */
  characterAttacksChicken(enemy) {
    return (this.character.isAboveGround() && this.character.speedY < 0 && !(enemy instanceof Endboss));
  }

  /**
   * killChicken() if Pepe is jumping on chicken, the chicken dies
   * 
   * @param {*} enemy 
   * @param {*} index 
   */
  killChicken(enemy, index) {
    this.chickenKilled(enemy, index);
    this.character.speedY = 20;
    this.killEnemy = true;
    setTimeout(() => (this.killEnemy = false), 1000);
  }

  /**
   * hurtCharacter() calls the function to animate the hit character and change the energy in statusbar
   * 
   */
  hurtCharacter() {
    this.character.hit();
    this.statusbars[0].setStatusBarPercent(this.character.energy);
  }

  /**
   * colisionBottleEnemy() checks if the bottle hits an enemy
   * 
   * @param {*} enemy 
   * @param {*} index 
   */
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

  /**
   * chickenKilled() animates the sound and action for the cilled chicken
   * 
   * @param {*} enemy 
   * @param {*} index 
   */
  chickenKilled(enemy, index) {
    clearInterval(enemy.moveLeftIntervall);
    if (!musikStoped) this.SOUND_CHICKEN.play();
    enemy.animate(enemy.IMAGES_DEAD);
    enemy.speedY = -10;
    enemy.applyGravity();
    setTimeout(() => this.level.enemies.splice(index, 1), 1000);
  }

  /**
   * hurtEndboss() set the energy of endboss - 20 if the bottle hits it and animate
   * 
   * @param {*} enemy 
   */
  hurtEndboss(enemy) {
    if (!this.bottleHit) {
      this.bottleHit = true;
      this.hitEndboss -= 20;
    }
    if (!this.bottleHit || this.pepeSawBoss) this.playAttackEndboss(enemy);
}

/**
 * playAttackEndboss() starts the attack of the endboss and sets the speed
 * 
 * @param {*} enemy 
 */
playAttackEndboss(enemy) {
  if (!this.endbossAttacks) this.setEndbossAttack(enemy);
    if (!this.level.endBoss[0].otherDirection) {
      if (this.hitEndboss > 40) enemy.speed = 10;
      else enemy.speed = 20;
    }
    this.statusbars[3].setStatusBarEndboss(this.hitEndboss);
    this.createNewBottles();
    if (!musikStoped) this.ENDBOSS_SOUND.play();
}

/**
 * setEndbossAttack() sets the musik and animation for angry enemy
 * 
 * @param {*} enemy 
 */
setEndbossAttack(enemy) {
  this.ENDBOSS_SOUND.pause();
  this.ENDBOSS_SOUND.currentTime = 2;
  clearInterval(enemy.moveLeftIntervall);
  enemy.animate(enemy.IMAGES_HURT);
  this.endbossAttacks = true;
}

  /**
   * createNewBottles after thrown them on endboss
   * 
   */
  createNewBottles() {
    if (!this.newBottles) {
      this.newBottles = true;
      setTimeout(() => {
        const bottleTypes = ["air", "air", "air", "ground", "ground"];
        bottleTypes.forEach((type) => this.level.bottle.push(new Bottle(type)));
      }, 6000);
    }
  }

  /**
   * endbossDead() calls the function to animate th eendboss dead
   * 
   * @param {*} enemy 
   */
  endbossDead(enemy) {
    if (this.hitEndboss == 0) {
      this.intervallBossDead(enemy);
      this.timeoutWinAnimation();
    }
  }

  /**
   * intervallBossDead() calls the animate function and sets the timeout for the boss to fall dead down
   * 
   * @param {*} enemy 
   */
  intervallBossDead(enemy) {
    clearInterval(enemy.moveLeftIntervall);
    enemy.animateBossDead(enemy.IMAGES_DEAD);
    setTimeout(() => {
      clearInterval(enemy.animateBossDeadIntervall);
      enemy.speedY = -10;
      enemy.applyGravity();
    }, 1000);
  }

  /**
   * timeoutWinAnimation() sets all animation and sound if win
   * 
   */
  timeoutWinAnimation() {
    setTimeout(() => {
      this.level.endBoss.splice(0, 1);
      this.gameIsOver = true;
      this.ENDBOSS_SOUND.pause();
      if (!musikStoped) this.SOUND_WIN.play();
      setTimeout(() => (window.location.href = "index.html"), 7000);
    }, 2000);
  }

  /**
   * draw() calls all function do draw all the objects in canvas
   * 
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.drawObjectsToMove();
    this.ctx.translate(-this.camera_x, 0);
    this.drawStatusbar();
    this.drawEndscreen();
    this.repeadDraw();
  }

  /**
   * drawObjectsToMove() draws all objects which moves
   * 
   */
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

  /**
   * repeadDraw() repeads the draw function after it went throu
   */
  repeadDraw() {
    let self = this;
    requestAnimationFrame(() => self.draw());
  }

  clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
  }

  /**
   * addObjectToMap() calls for each element in array the function to draw
   */
  addObjectToMap(objects) {
    objects.forEach((o) => this.addToMap(o));
  }

  /**
   * addToMap() draws the object in canvas in the right direction
   * @param {moveble object to draw} mo 
   */
  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    mo.draw(this.ctx);
    if (mo.otherDirection) this.flipImageBack(mo);
  }

  /**
   * flipImage() flipps the image to look to the other direction
   * @param {moveble object to draw} mo 
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * flipImageBack() flipps the image back to look to the other direction
   * @param {moveble object to draw} mo 
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * setEndbossSpeed() starts to move the endboss if the character was near
   */
  setEndbossSpeed() {
    setInterval(() => {
      if (this.character.sawEndboss && this.hitEndboss > 0) {
        this.pepeSawBoss = true;
        this.hurtEndboss(this.level.endBoss[0]);
      }
    }, 500);
  }
}
