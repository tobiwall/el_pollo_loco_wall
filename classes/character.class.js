class Character extends MovableObject {

    height = 300;
    width = 150;
    

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png')
    }



    jump() {
        this.y -= 100;
        setTimeout(() => {
            this.y += 100;
        }, 300)
    }
}