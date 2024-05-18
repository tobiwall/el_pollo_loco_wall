class World {
  character = new Character();

  enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken()
    ];
  clouds = [
    new Cloud(),
  ];
  backgroundObjects = [
    new BackgroundObjekt('img/5_background/layers/air.png', 0),
    new BackgroundObjekt('img/5_background/layers/3_third_layer/1.png', 0),
    new BackgroundObjekt('img/5_background/layers/2_second_layer/1.png', 0),
    new BackgroundObjekt('img/5_background/layers/1_first_layer/1.png', 0),
  ];
  ctx;
  canvas;

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
    this.addEventListeners();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addObjectToMap(this.backgroundObjects);
    this.addObjectToMap(this.clouds);
    this.addToMap(this.character);
    this.addObjectToMap(this.enemies);


    let self = this;
    requestAnimationFrame(function() {
        self.draw();
    })
  }

  addObjectToMap(objects) {
    objects.forEach(o => {
        this.addToMap(o);
    });
  }

  addToMap(mo) {
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)
  }














  addEventListeners() {
    document.addEventListener('keydown', (event) => {
      if (event.key === "ArrowRight" || event.keyCode === 39) {
        this.character.moveRight();
      }
      if (event.key === "ArrowLeft" || event.keyCode === 37) {
        this.character.moveLeft();
      }
      if (event.key === "ArrowUp" || event.keyCode === 38) {
        this.character.jump();
      }
    });
  }
}
