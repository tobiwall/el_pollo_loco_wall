class Endscreen extends DrawableObject {
  x = 0;
  y = 0;
  img;
  height = 480;
  width = 705;

  IMAGE_GAMEOVER = [
    "img/9_intro_outro_screens/game_over/game over.png"
  ];
  IMAGE_WIN = [
    "img/9_intro_outro_screens/win/win_2.png"
  ];

  constructor(character) {
    super().loadImages(this.IMAGE_GAMEOVER);
    this.loadImages(this.IMAGE_WIN);
    this.animateEndscreen(character);
  }

  animateEndscreen(character) {
    setInterval(() => {
      if (character.energy == 0) {
        let path = this.IMAGE_GAMEOVER;
        this.img = this.imageCache[path];
      } else {
        let path = this.IMAGE_WIN;
        this.img = this.imageCache[path];
      }
    }, 1000 / 60);
  }
}