class Level {
    coins;
    enemies;
    clouds;
    backgroundObjects;
    level_end_x = 2200;


    constructor(coins, enemies, clouds, backgroundObjects) {
        this.coins = coins;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
    }
}