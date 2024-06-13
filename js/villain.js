import {Entity} from "./hero.js"
export class Villain extends Entity{
    
    #margRight

    constructor() {
        super(100,"Vervuiling", "../Assets/plasticfles.png", 30);
        this.entityVisual.style.marginRight = '0px'
    }

    move(){
        this.#margRight += 17
        this.entityVisual.style.marginRight = this.#margRight + 'px'
        console.log(this.entityVisual)
    }

}