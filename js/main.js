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

const selectItem = function (event) {
    const money = document.querySelector('.points span')
    const amount = money.innerText.slice(0,(money.innerText.length - 1))
    console.log(amount)
    selectedTower = event.target;
    const amountToBuy = selectedTower.querySelector('.price').innerText.slice(0,(selectedTower.querySelector('span:nth-child(2)').innerText.length - 1))
    if ((parseInt(amount) < parseInt(amountToBuy))){
        selectedTower = null
    }
}

const placeItem = function (event) {
    if (selectedTower !== null){
        const money = document.querySelector('.points span')
        const amount = parseInt(money.innerText.slice(0,(money.innerText.length - 1)))
        const amountToBuy = parseInt(selectedTower.querySelector('.price').innerText.slice(0,(selectedTower.querySelector('span:nth-child(2)').innerText.length - 1)))
        const cell = event.target;
        if (!((parseInt(amount) < parseInt(amountToBuy)))){
            placeTower(selectedTower, cell)
            console.log(amount,amountToBuy)
            money.innerText = (amount - amountToBuy) + "⭐"
        }
    }
}

items.addEventListener('click', selectItem)
items.addEventListener('keypress', selectItem)
gameContainer.addEventListener('click', placeItem)
gameContainer.addEventListener('keypress', placeItem)






gameContainer.addEventListener('click', function (event) {
    if (selectedTower !== null){
        const money = document.querySelector('.points span')
        const amount = parseInt(money.innerText.slice(0,(money.innerText.length - 1)))
        const amountToBuy = parseInt(selectedTower.querySelector('.price').innerText.slice(0,(selectedTower.querySelector('span:nth-child(2)').innerText.length - 1)))
        const cell = event.target;
        if (!((parseInt(amount) < parseInt(amountToBuy)))){
            placeTower(selectedTower, cell)
            console.log(amount,amountToBuy)
            money.innerText = (amount - amountToBuy) + "⭐"
        }
    }

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
        if (zombie.visualize().style.right.length === 6){
            console.log("GAME OVER")

        }
    })
}


const zombieDamage = function () {
    let money = document.querySelector('.points span')
    let amount = parseInt(money.innerText.slice(0,(money.innerText.length - 1)))
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
                amount += 10
                console.log(amount)
                money.innerText = amount + "⭐"
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
                amount += 5
                console.log(amount)
                money.innerText = amount + "⭐"
                proj.remove()
            }
            })
    })
}

const deadSound = new Audio('../Assets/Sounds/punch-140236.mp3')
const checkDead = function () {
    zombieArr.forEach((zombie) => {
        if (zombie.health <= 0){
            zombie.entityVisual.remove()
            const index = zombieArr.indexOf(zombie)
            zombieArr.splice(index, 1)
            deadSound.play()
        }
    })
    heroArr.forEach((hero) => {
        if (hero.health <= 0){
            hero.entityVisual.remove()
            const index = heroArr.indexOf(hero)
            heroArr.splice(index, 1)
            deadSound.play()
        }
    })
}


const gameLoop = function () {
    zombieDamage()
    checkDead()
    gameOver()
}

setInterval(addZombie,(Math. floor(Math. random()*1000) + 6000))
setInterval(gameLoop,1000/30)



