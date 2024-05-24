class ThrowableObject extends MovableObject {
    
    height = 80;
    width = 80;

    IMAGE_THROWABLE_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGE_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    IMAGE_BOTTLE_ONGROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    IMAGE_BOTTLE = [
        'img/6_salsa_bottle/salsa_bottle.png'
    ];


    constructor() {
        super().loadImage(this.IMAGE_BOTTLE);
        this.loadImages(this.IMAGE_THROWABLE_BOTTLE);
        this.loadImages(this.IMAGE_BOTTLE_SPLASH);
        this.loadImages(this.IMAGE_BOTTLE_ONGROUND);
        //this.throw();
    }

 
    throw() {
        this.x = this.character.x + 100;
        this.y = this.character.y + 100;
    }
}