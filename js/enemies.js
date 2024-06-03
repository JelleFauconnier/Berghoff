export class Enemy {
    name;
    #health;
    #damage;
    #attackSpeed;
    #image;
    #xCo;
    #yCo;


    constructor(name = "enemy", damage = 1, attackSpeed = 1000, image = "../assets/test.png") {
        this.name = name;
        this.#damage = damage;
        this.#attackSpeed = attackSpeed;
        this.#image = image;
    }

    // attack(target) {
    //     setTimeout(() => {
    //         target.takeDamage(this.#damage);²
    //         this.#projectile.fire(this.#xCo, this.#yCo, target);
    //     }, this.#attackSpeed)
    //
    // }

    #takeDamage(damage) {
        this.#health -= damage;
    }

    destroy() {
        if (this.#health <= 0) {
            console.log("Vijand heeft 0HP en is verwoest.")
            // Verdere logica wordt nog bepaald ahv verdere code.
        }
    }

    draw() {

    }

    get image() {
        return this.#image;
    }


    set xCo(x) {
        this.#xCo = x;
    }

    set yCo(y) {
        this.#yCo = y;
    }

    get xCo() {
        return this.#xCo;
    }

    get yCo() {
        return this.#yCo;
    }


}