class Level {
    coins;
    bottle;
    enemies;
    endBoss;
    clouds;
    backgroundObjects;
    throwableObject;
    level_end_x = 2200;

    /**
     * constructor() sets all parameter for the level 1
     * 
     * @param {*} coins 
     * @param {*} bottle 
     * @param {*} enemies 
     * @param {*} endBoss 
     * @param {*} clouds 
     * @param {*} backgroundObjects 
     * @param {*} throwableObject 
     */
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
