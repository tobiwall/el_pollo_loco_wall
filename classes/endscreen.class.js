class Endscreen extends DrawableObject {
  x = 0;
  y = 0;
  img;
  height = 480;
  width = 705;

  IMAGE_GAMEOVER = ["img/9_intro_outro_screens/game_over/game over.png"];
  IMAGE_WIN = ["img/9_intro_outro_screens/win/win_2.png"];

  /**
   * constructor() loads all images for the endscreen and calls the animate function
   * 
   * @param {this is the character} character 
   * @param {this is the whole world} world 
   */
  constructor(character, world) {
    super().loadImages(this.IMAGE_GAMEOVER);
    this.loadImages(this.IMAGE_WIN);
    this.animateEndscreen(character, world);
  }

  /**
   * animateEndscreen() animates the endscreen for win or lose
   * 
   * @param {this is the character} character 
   * @param {this is the whole world} world 
   */
  animateEndscreen(character, world) {
    let restartbtn = document.getElementById('home-btn');
    setInterval(() => {
      let boss = world.hitEndboss;
      if (character.energy == 0) {
        let path = this.IMAGE_GAMEOVER;
        this.img = this.imageCache[path];
        restartbtn.classList.remove('d-none');
      } else if (boss <= 0) {
        let path = this.IMAGE_WIN;
        this.img = this.imageCache[path];
        restartbtn.classList.remove('d-none');
      }
    }, 1000 / 60);
  }
}
