const gameContainer = document.querySelector('.game-container')
const items = document.querySelector('.items');
let selectedTower;
import {Blocker, Entity, Shooter, Villain} from "./hero.js"
let zombieArr = [];
let heroArr = [];
let projArr;
let shooter = new Shooter()


const placeTower = function (tower, cell) {
    // Bereken de positie van de toren
    // De linker bovenhoeken komen overeen met elkaar, denk ik

    // TODO: foutmelding als er niet op lege cel wordt geklikt, ook kijken voor als de cel al is ingevuld.

    // Maak tower element

    if (tower.innerHTML.includes("Blocker")) {
        const newTower = new Blocker();
        console.log(newTower)

        // Voeg toren toe aan speelveld op juiste cel
        cell.appendChild(newTower.entityVisual);
        heroArr.push(newTower)
    }
    else if (tower.innerHTML.includes("Shooter")){
        const newTower = new Shooter();
        console.log(newTower)

        // Voeg toren toe aan speelveld op juiste cel
        cell.appendChild(newTower.entityVisual);
        setInterval(() => newTower.shoot(),3000)
        //newTower.shoot()
        heroArr.push(newTower)
    }

};

items.addEventListener('click', (event) => {
    selectedTower = event.target;
})


gameContainer.addEventListener('click', function (event) {
    const cell = event.target;
    placeTower(selectedTower, cell)
});


const addZombie = function () {
    const cellNr = Math. floor(Math. random()*6) + 1
    const cell = document.querySelector('#field-' + cellNr)
    const zombieCell = cell.lastElementChild
    const newZombie = new Villain()
    zombieCell.appendChild(newZombie.entityVisual)
    setInterval(() => {
        newZombie.move()
    }, 1000/30)
    zombieArr.push(newZombie)
}


const gameOver = function () {
    zombieArr.forEach((zombie) => {
        console.log(zombie.visualize().style.right)
        if (zombie.visualize().style.right.length === 6){
            console.log("GAME OVER")

        }
    })
}


const zombieDamage = function () {
    zombieArr.forEach((zombie) => {
        const zRect = zombie.visualize().getBoundingClientRect()
        heroArr.forEach((hero) => {
            const hRect = hero.visualize().getBoundingClientRect()
            const overlap = !(zRect.right <= hRect.left || zRect.left >= hRect.right || zRect.bottom <= hRect.top || zRect.top >= hRect.bottom)
            if (hero instanceof Shooter && (overlap)){
                hero.takeDamage(zombie)
            }
            else if (hero instanceof Blocker && (overlap)){
                zombie.takeDamage(hero)
                hero.takeDamage(zombie)
            }
        })
    })
    projArr = [].slice.call(document.getElementsByClassName('Proj'))
    projArr.forEach((proj) => {
        const pRect = proj.getBoundingClientRect()
        zombieArr.forEach((zombie) => {
            const zRect = zombie.visualize().getBoundingClientRect()
            const overlap = !(zRect.right <= pRect.left || zRect.left >= pRect.right || zRect.bottom <= pRect.top || zRect.top >= pRect.bottom)
            if (overlap){
                zombie.takeDamage(shooter)
                proj.remove()
            }
            })
    })
}

const checkDead = function () {
    zombieArr.forEach((zombie) => {
        if (zombie.health <= 0){
            zombie.entityVisual.remove()
            const index = zombieArr.indexOf(zombie)
            zombieArr.splice(index, 1)
        }
    })
    heroArr.forEach((hero) => {
        if (hero.health <= 0){
            hero.entityVisual.remove()
            const index = heroArr.indexOf(hero)
            heroArr.splice(index, 1)
        }
    })
}


const gameLoop = function () {
    zombieDamage()
    checkDead()
    gameOver()
}

//setInterval(addZombie,(Math. floor(Math. random()*1000) + 6000))
setInterval(gameLoop,1000/30)



