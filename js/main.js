const gameContainer = document.querySelector('.game-container');
const items = document.querySelector('.items');
const blockerItem = document.querySelector('#item-1')
const shooterItem = document.querySelector('#item-2')
const gameOverScreen = document.querySelector('#gameOver')
let selectedTower = null;
import { Blocker, Shooter, Villain } from "./hero.js";
import { setDifficulty } from "./levelselector.js";

let zombieArr = [];
let heroArr = [];
let projArr = [];
let zombieInterval;
let gameLoopInterval;
let zombiesPassed = 0;
let zombieSpeed;
let zombieIntervalTime;
let shooter = new Shooter();
const energiebesparingstips = [
    "Gebruik LED-lampen in plaats van gloeilampen.",
    "Schakel apparaten volledig uit wanneer ze niet in gebruik zijn.",
    "Was kleding op een lagere temperatuur.",
    "Gebruik een programmeerbare thermostaat om de verwarming te regelen.",
    "Isoleer je woning om warmteverlies te voorkomen.",
    "Maak gebruik van zonlicht in plaats van elektrische verlichting.",
    "Kies voor energiezuinige apparaten bij vervanging.",
    "Droog de was aan de lucht in plaats van in de droger.",
    "Gebruik tochtstrips om kieren en naden te dichten.",
    "Zet de verwarming lager en trek een extra trui aan.",
    "Laat apparaten niet op stand-by staan.",
    "Gebruik een waterbesparende douchekop.",
    "Kook met deksels op de pannen om energie te besparen.",
    "Vervang oude ramen door dubbel glas.",
    "Zet de koelkast op een energiezuinige temperatuur.",
    "Sluit gordijnen 's nachts om warmte binnen te houden.",
    "Gebruik een laptop in plaats van een desktopcomputer.",
    "Zet de vaatwasser pas aan als hij volledig vol is.",
    "Plaats zonnepanelen om zelf energie op te wekken.",
    "Doe lichten uit in kamers die je niet gebruikt."
];

const initializeGame = function(difficulty) {
    const difficultySettings = setDifficulty(difficulty);
    zombieSpeed = difficultySettings.zombieSpeed;
    zombieIntervalTime = difficultySettings.zombieIntervalTime;

    zombieInterval = setInterval(addZombie, zombieIntervalTime);
    gameLoopInterval = setInterval(gameLoop, 1000);
};

const placeTower = function (tower, cell) {
    if (cell.firstChild) {
        alert("Deze cel is al bezet!");
        return;
    }
    if (tower.querySelector('span').innerText.includes("Blocker")) {
        const newTower = new Blocker();
        cell.appendChild(newTower.entityVisual);
        heroArr.push(newTower);
    } else if (tower.querySelector('span').innerText.includes("Shooter")) {
        const newTower = new Shooter();
        cell.appendChild(newTower.entityVisual);
        setInterval(() => newTower.shoot(), 3200);
        heroArr.push(newTower);
    }
};

const selectItem = function (event) {
    const money = document.querySelector('.points span');
    const amount = money.innerText.slice(0, money.innerText.length - 1);
    selectedTower = event.currentTarget;
    console.log(event.currentTarget)
    const amountToBuy = selectedTower.querySelector('.price').innerText.slice(0, selectedTower.querySelector('.price').innerText.length - 1);
    if (parseInt(amount) < parseInt(amountToBuy)) {
        selectedTower = null;
    }
};

const placeItem = function (event) {
    if (selectedTower !== null) {
        const money = document.querySelector('.points span');
        const amount = parseInt(money.innerText.slice(0, money.innerText.length - 1));
        const amountToBuy = parseInt(selectedTower.querySelector('.price').innerText.slice(0, selectedTower.querySelector('.price').innerText.length - 1));
        const cell = event.target;

        if (amount >= amountToBuy && cell.classList.contains('grid-cell')) {
            placeTower(selectedTower, cell);
            money.innerText = (amount - amountToBuy) + "⭐";
            selectedTower = null;
        }
    }
};


blockerItem.addEventListener('click', selectItem);
blockerItem.addEventListener('keypress', selectItem);
shooterItem.addEventListener('click', selectItem);
shooterItem.addEventListener('keypress', selectItem);
gameContainer.addEventListener('click', placeItem);
gameContainer.addEventListener('keypress', placeItem);

const addZombie = function () {
    const cellNr = Math.floor(Math.random() * 6) + 1;
    const cell = document.querySelector('#field-' + cellNr);
    const zombieCell = cell.lastElementChild;
    const newZombie = new Villain();
    zombieCell.appendChild(newZombie.entityVisual);
    setInterval(() => {
        newZombie.move();
    }, zombieSpeed);
    zombieArr.push(newZombie);
};

const gameOver = function () {
    zombieArr.forEach((zombie) => {
        if (zombie.visualize().style.right.length === 6){
            zombiesPassed += 1;
            zombieArr.splice(zombieArr.indexOf(zombie), 1)
        }
    })

    if (zombiesPassed === 3) {
        gameOverScreen.classList.remove('visually-hidden')
        const energieTip = energiebesparingstips.at(Math.floor(Math.random() * energiebesparingstips.length));
        const energieTipSpan = document.createElement('span')
        energieTipSpan.innerText = energieTip;
        gameOverScreen.appendChild(energieTipSpan)
        clearInterval(zombieInterval);
        clearInterval(gameLoopInterval);
        blockerItem.removeEventListener('click', selectItem)
        shooterItem.removeEventListener('click', selectItem);
        gameContainer.removeEventListener('click', placeItem);
    }
};

const hurtSound = new Audio("../Assets/Sounds/accidentally-punching-the-floor-99814.mp3")
const zombieDamage = function () {
    let money = document.querySelector('.points span');
    let amount = parseInt(money.innerText.slice(0, money.innerText.length - 1));
    zombieArr.forEach((zombie) => {
        const zRect = zombie.visualize().getBoundingClientRect();
        heroArr.forEach((hero) => {
            const hRect = hero.visualize().getBoundingClientRect();
            const overlap = !(zRect.right <= hRect.left || zRect.left >= hRect.right || zRect.bottom <= hRect.top || zRect.top >= hRect.bottom);
            if (hero instanceof Shooter && overlap) {
                hero.takeDamage(zombie);
                hurtSound.play();
            } else if (hero instanceof Blocker && overlap) {
                zombie.takeDamage(hero);
                hero.takeDamage(zombie);
                amount += 10;
                money.innerText = amount + "⭐";
                hurtSound.play();
            }
        });
    });
    projArr = [].slice.call(document.getElementsByClassName('Proj'));
    projArr.forEach((proj) => {
        const pRect = proj.getBoundingClientRect();
        zombieArr.forEach((zombie) => {
            const zRect = zombie.visualize().getBoundingClientRect();
            const overlap = !(zRect.right <= pRect.left || zRect.left >= pRect.right || zRect.bottom <= pRect.top || zRect.top >= pRect.bottom);
            if (overlap) {
                zombie.takeDamage(shooter);
                amount += 5;
                money.innerText = amount + "⭐";
                proj.remove();
                hurtSound.play();
            }
        });
    });
};

const deadSound = new Audio('../Assets/Sounds/punch-140236.mp3');
const checkDead = function () {
    zombieArr.forEach((zombie) => {
        if (zombie.health <= 0) {
            zombie.entityVisual.remove();
            const index = zombieArr.indexOf(zombie);
            zombieArr.splice(index, 1);
            deadSound.play();
        }
    });
    heroArr.forEach((hero) => {
        if (hero.health <= 0) {
            hero.entityVisual.remove();
            const index = heroArr.indexOf(hero);
            heroArr.splice(index, 1);
            delete hero.pop;
            deadSound.play();
        }
    });
};

const gameLoop = function () {
    zombieDamage();
    checkDead();
    gameOver();
};

const startGame = function(difficulty) {
    initializeGame(difficulty);
    gameLoopInterval = setInterval(gameLoop, 1000/30);
};

// Get difficulty level from URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const selectedDifficulty = urlParams.get('difficulty') || 'medium';

startGame(selectedDifficulty);