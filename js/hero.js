import { Projectile } from "./projectile.js"

export class Entity {

    #health
    #name
    #image
    #entityVisual
    #damage

    constructor(health = 100,name,image,damage) {
        this.#health = health
        this.#name = name
        this.#image = image
        this.#damage = damage
        this.#entityVisual = document.createElement('div')
        this.#entityVisual.style.width = '12.5%'
        this.#entityVisual.style.height = '16.6%'
        this.#entityVisual.style.position = 'absolute'
        const entitImg = document.createElement('img')
        entitImg.src = this.#image
        entitImg.alt = this.#name
        this.#entityVisual.appendChild(entitImg)
        console.log("Entity Created")
    }



    takeDamage(Opponent){
        this.#health -= Opponent.damage
        console.log("fight")
    }



    visualize(){
        return this.#entityVisual
    }


    get health() {
        return this.#health;
    }

    get name() {
        return this.#name;
    }

    get image() {
        return this.#image;
    }

    get entityVisual() {
        return this.#entityVisual;
    }

    get damage() {
        return this.#damage;
    }
    
}





export class Shooter extends Entity{

    #projectile
    #interval

    constructor() {
        super(100,"Shooter","../Assets/HEROFLES.png",15);
    }

    shoot(){
        clearInterval(this.#interval)
        this.#projectile = new Projectile()
        this.entityVisual.appendChild(this.#projectile.projVisual)
        this.#interval = setInterval(() => this.#projectile.move(),1000/30)
        //this.#projectile.move()
        console.log(this.#projectile)
    }
}




export class Blocker extends Entity{
    constructor() {
        super(200,"Blocker","../Assets/HEROPOT.png",30);
    }

    takeDamage(Opponent) {
        super.takeDamage(Opponent);
        this.entityVisual.firstChild.style.filter = "hue-rotate(-90deg)"
    }
}



export class Villain extends Entity{

    margRight

    constructor() {
        super(100,"Vervuiling", "../Assets/plasticfles.png", 30);
        this.entityVisual.style.width = '6%'
        this.entityVisual.style.right = '0%'
        this.entityVisual.style.position = 'absolute'
        this.margRight = 0
    }

    move(){
        this.margRight += 0.1
        this.entityVisual.style.right = this.margRight + '%'
    }
    
    takeDamage(Opponent) {
        super.takeDamage(Opponent);
        this.entityVisual.firstChild.style.filter = "hue-rotate(" + (100-this.health) + "deg)"
        this.margRight -= 1
    }

}

