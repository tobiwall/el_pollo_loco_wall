class Character extends MovableObject {
  height = 300;
  width = 150;
  speed = 10;
  lastCheckTime;
  lastPosition;
  sawEndboss = false;

  offset = {
    top: 120,
    bottom: 20,
    left: 30,
    right: 40,
  };

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png"
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
    "img/2_character_pepe/5_dead/D-57.png",
    "img/2_character_pepe/5_dead/D-57.png",
    "img/2_character_pepe/5_dead/D-57.png",
    "img/2_character_pepe/5_dead/D-57.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_SLEEP = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  IMAGES_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png'
  ]

  world;
  walking_sound = new Audio("audio/running.mp3");
  jump_sound = new Audio("audio/jump.mp3");
  hurt_sound = new Audio("audio/hurt.mp3");
  dead_sound = new Audio("audio/dead.mp3");
  win_sound = new Audio("audio/win.mp3");
  coin_sound = new Audio("audio/coin.mp3");
  ding_sound = new Audio("audio/ding.mp3");
  snorring_sound = new Audio("audio/snorring.mp3");

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_SLEEP);
    this.loadImages(this.IMAGES_IDLE);
    this.animateCharacter();
    this.applyGravity();
  }

  /**
   * checkCharacterAction() checks the situation of character to set sleep or not
   * 
   */
  checkCharacterAction() {
    if (this.isHurt() || this.isDead()) this.snorring_sound.pause();
    else {
      this.playAnimation(this.IMAGES_SLEEP);
      this.snorring_sound.volume = 0.1;
      if (!musikStoped) this.snorring_sound.play();
    }
  }

  /**
   * checkCharacterIdle() plays animation of pepe in idle
   * 
   */
  checkCharacterIdle() {
    this.playAnimation(this.IMAGES_IDLE);
  }

  /**
   * animateCharacter() sets the Interval to move the background if Pepe is walking
   * it sets the interval for calling characterAction()
   * 
   */
  animateCharacter() {
    setInterval(() => {
      this.walking_sound.pause();
      if (this.energy > 0 && this.world.hitEndboss > 0) {
      this.checkKeyboard();
      this.world.camera_x = -this.x + 180;
      }
    }, 1000 / 60);
    setInterval(() => this.characterAction(), 50);
  }

  /**
   * checkKeyboard() calls the functions to check the keyboard action
   * it checks if Pepe was near the Endboss
   * 
   */
  checkKeyboard() {
    this.checkKeyboardRightLeft();
    this.sawEndbossAction();
    this.checkKeyboardUp();
  }

  /**
   * checkKeyboardRightLeft() checks the keyboard right and left to move Pepe right or left
   * 
   */
  checkKeyboardRightLeft() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
      if (!musikStoped) this.walking_sound.play();
    }
    if (this.world.keyboard.LEFT && this.x > -520) {
      this.moveLeft();
      this.otherDirection = true;
      if (!musikStoped) this.walking_sound.play();
    }
  }

  /**
   * sawEndbossAction() checks, if Pepe was near Endboss
   * 
   */
  sawEndbossAction() {
    if (this.x >= 2000) this.sawEndboss = true;
  }

  /**
   * checkKeyboardUp() checks the Keayboard up to jump
   * 
   */
  checkKeyboardUp() {
    if (this.world.keyboard.UP && !this.isAboveGround()) {
      this.currentImage = 0;
      this.jump();
      if (!musikStoped) this.jump_sound.play();
    }
  }

  /**
   * characterAction() calls the right animate functions for each situation
   * 
   */
  characterAction() {
    if (this.isDead() && world.hitEndboss > 0) this.characterDeadAction();
    else if (this.isHurt()) this.characterHurtAction();
    else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
      if (this.speedY > 0) {
        if (this.currentImage > 3) this.currentImage = 3;
      } else {
        if (this.currentImage > 8) this.currentImage = 8;
        if (this.currentImage < 4) this.currentImage = 4;
      }  
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT)
      this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * characterDeadAction() ends the game and calls all animations for it
   * 
   */
  characterDeadAction() {
    setTimeout(() => {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }, 700);
    this.playAnimation(this.IMAGES_DEAD);
    BACKGROUND_MUSIK.pause();
    if (!musikStoped) this.dead_sound.play();
    this.gameOver();
    setTimeout(() => (window.location.href = "index.html"), 3000);
  }

  /**
   * characterHurtAction() plays the animation if Pepe is hurt
   * 
   */
  characterHurtAction() {
    this.playAnimation(this.IMAGES_HURT);
    this.hurt_sound.volume = 0.2;
    if (!musikStoped) this.hurt_sound.play();
  }

  /**
   * isDead() checks if Pepe has energy
   * 
   * @returns right or false
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * gameOver() ends the game and all intervals
   * 
   */
  gameOver() {
    setTimeout(() => {
      this.world.gameIsOver = true;
      this.walking_sound.pause();
      setTimeout(() => this.world.clearAllIntervals(), 2000);
    }, 1400);
  }

  /**
   * isHurt()checks the time Pepe was hurt
   * 
   * @returns true or false
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 0.5;
  }
}
