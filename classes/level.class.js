class Level {
    coins;
    bottle;
    enemies;
    endBoss;
    clouds;
    backgroundObjects;
    throwableObject;
    level_end_x = 2200;


    constructor(coins, bottle, enemies, endBoss, clouds, backgroundObjects, throwableObject) {
        this.coins = coins;
        this.bottle = bottle;
        this.enemies = enemies;
        this.endBoss = endBoss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.throwableObject = throwableObject;
    }
}