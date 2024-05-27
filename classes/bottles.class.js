class Bottle extends MovableObject {
  width = 80;
  height = 80;

  IMAGES_BOTTLE_GROUND = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  IMAGES_BOTTLE_AIR = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(position) {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.loadImages(this.IMAGES_BOTTLE_GROUND);
    this.loadImages(this.IMAGES_BOTTLE_AIR);
    if (position == "ground") {
        this.x = 200 + Math.random() * 2000;
        this.y = 370;
        this.animateBottleGround();
    } else {
        this.x = 200 + Math.random() * 2000;
        this.y = 30 + Math.random() * 100;
        this.animateBottleAir();
    }
  }

  animateBottleGround() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE_GROUND);
    }, 1000);
  }

  animateBottleAir() {
    setInterval(() => {
        this.playAnimation(this.IMAGES_BOTTLE_AIR);
      }, 200);
  }
}
