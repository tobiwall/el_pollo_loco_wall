class Level {
    coins;
    enemies;
    clouds;
    backgroundObjects;
    throwableObject;
    level_end_x = 2200;


    constructor(coins, enemies, clouds, backgroundObjects, throwableObject) {
        this.coins = coins;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.throwableObject = throwableObject;
    }
}