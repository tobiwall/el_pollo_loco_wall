class Level {
    backgroundObjects;
    coins;
    bottle;
    enemies;
    endBoss;
    clouds;
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
    constructor(backgroundObjects, coins, bottle, enemies, endBoss, clouds, throwableObject) {
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottle = bottle;
        this.enemies = enemies;
        this.endBoss = endBoss;
        this.clouds = clouds;
        this.throwableObject = throwableObject;
    }
}
