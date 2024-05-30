let level1;

function createLevel1() {
  level1 = new Level(
    [
      new BackgroundObjekt("img/5_background/layers/air.png", -719),
      new BackgroundObjekt("img/5_background/layers/3_third_layer/2.png", -719),
      new BackgroundObjekt("img/5_background/layers/2_second_layer/2.png", -719),
      new BackgroundObjekt("img/5_background/layers/1_first_layer/2.png", -719),
      new BackgroundObjekt("img/5_background/layers/air.png", 0),
      new BackgroundObjekt("img/5_background/layers/3_third_layer/1.png", 0),
      new BackgroundObjekt("img/5_background/layers/2_second_layer/1.png", 0),
      new BackgroundObjekt("img/5_background/layers/1_first_layer/1.png", 0),
      new BackgroundObjekt("img/5_background/layers/air.png", 719),
      new BackgroundObjekt("img/5_background/layers/3_third_layer/2.png", 719),
      new BackgroundObjekt("img/5_background/layers/2_second_layer/2.png", 719),
      new BackgroundObjekt("img/5_background/layers/1_first_layer/2.png", 719),
      new BackgroundObjekt("img/5_background/layers/air.png", 719 * 2),
      new BackgroundObjekt("img/5_background/layers/3_third_layer/1.png", 719 * 2),
      new BackgroundObjekt("img/5_background/layers/2_second_layer/1.png", 719 * 2),
      new BackgroundObjekt("img/5_background/layers/1_first_layer/1.png", 719 * 2),
      new BackgroundObjekt("img/5_background/layers/air.png", 719 * 3),
      new BackgroundObjekt("img/5_background/layers/3_third_layer/2.png", 719 * 3),
      new BackgroundObjekt("img/5_background/layers/2_second_layer/2.png", 719 * 3),
      new BackgroundObjekt("img/5_background/layers/1_first_layer/2.png", 719 * 3),
    ],
  [
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
    new Coin(),
  ],
  [
    new Bottle("ground"),
    new Bottle("ground"),
    new Bottle("ground"),
    new Bottle("ground"),
    new Bottle("air"),
    new Bottle("air"),
    new Bottle("air"),
    new Bottle("air")
  ],
  [
    new ChickenSmall(),
    new Chicken(),
    new ChickenSmall(),
    new Chicken(),
    new ChickenSmall(),
  ],
  [new Endboss()],
  [
    new Cloud(0),
    new Cloud(1),
    new Cloud(2),
    new Cloud(3)
  ],
);
}
