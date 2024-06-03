export class Tower {
    static towerCount = 1;

    name;
    #cost;
    #health;
    #damage;
    #attackSpeed;
    #image;
    #projectile;
    #x;
    #y;
    towerID;
    towerElement;
    gameContainer;


    constructor(gameContainer, name = "toren", cost = 10, damage = 1, attackSpeed = 1000, image = "../assets/test.png") {
        this.name = name;
        this.#cost = cost;
        this.#damage = damage;
        this.#attackSpeed = attackSpeed;
        this.#image = image;
        this.towerID = Tower.towerCount++;
        this.gameContainer = gameContainer;
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
            console.log("Toren heeft 0HP en is verwoest.")
            // Verdere logica wordt nog bepaald ahv verdere code.

        }
    }

    // draw() {
    //     this.towerElement = document.createElement('div');
    //     this.towerElement.classList.add('item');
    //     this.towerElement.id = this.towerID;
    //     this.towerElement.style.backgroundImage = `url("${this.#image}")`;
    // }

    drawProjectile() {
        this.#projectile = document.createElement('div');
        this.#projectile.classList.add('projectile');
        this.#projectile.id = `projectile-${this.towerID}`;
        this.#projectile.style.top = `${this.#y}px`;
        this.#projectile.style.left = `${this.#x}px`;
        this.gameContainer.appendChild(this.#projectile);
        //this.#projectile.style.backgroundImage = `url("../assets/projectile.png")`;
    }

    get image() {
        return this.#image;
    }


    set setX(x) {
        this.#x = x;
    }

    set setY(y) {
        this.#y = y;
    }

    get getX() {
        return this.#x;
    }

    get getY() {
        return this.#y;
    }

    get cost() {
        return this.#cost;
    }

    get damage() {
        return this.#damage;
    }

    get attackSpeed() {
        return this.#attackSpeed;
    }

    get health() {
        return this.#health;
    }

    get projectile() {
        return this.#projectile;
    }


    set setHealth(health) {
        this.#health = health;
    }


}

export class TowerView {
    constructor(tower, container) {
        this.tower = tower;
        this.container = container;
        this.selectedTower = null;
        this.#render();
        this.#addEventListeners();
    }

    #render() {
        this.tower.towerElement = document.createElement('div');
        this.tower.towerElement.classList.add('item');
        this.tower.towerElement.id = `item-${this.tower.towerID}`;
        this.tower.towerElement.style.backgroundImage = `url("${this.tower.image}")`;
        this.tower.towerElement.addEventListener('click', this.selectTower.bind(this));

        this.container.appendChild(this.tower.towerElement);
    }

    placeTower(event) {
        if (this.selectedTower) {
            try {
                const cell = event.target;
                const row = cell.dataset.row; // Rij nummer
                const col = cell.dataset.col; // Kolom nummer

                // Bereken de positie van de toren
                const cellWidth = cell.offsetWidth;  // Breedte van cel
                const cellHeight = cell.offsetHeight;  // hoogte van cel
                const leftPos = (col * cellWidth) - cellWidth;
                const topPos = (row * cellHeight) - cellHeight;
                // De linker bovenhoeken komen overeen met elkaar
                this.tower.setX = leftPos;
                this.tower.setY = topPos;
                // Maak tower element
                this.selectedTower.classList.add('tower');
                this.selectedTower.style.left = leftPos + 'px';
                this.selectedTower.style.top = topPos + 'px';

                this.tower.drawProjectile();
                console.log(this.tower.getX, this.tower.getY)

                this.container.appendChild(this.selectedTower);
                this.selectedTower = null;

            } catch (err) {
                console.log("Er is iets misgegaan: " + err)
            }
        }
    }

    #addEventListeners() {
        this.container.addEventListener('click', (event) => {
            this.placeTower(event);
        });
    }

    selectTower(event) {
        this.selectedTower = event.target;
    }


}