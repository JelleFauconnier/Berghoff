import { Tower, TowerView } from './tower.js';

//  TODO: Voeg toren & enemy toe aan array van gameboard
//  TODO: Collision detection met projectile => enemy, enemy => tower

const btn = document.querySelector('#btn');
const field1 = document.querySelector('.field-1');
const gameContainer = document.querySelector('.game-container')
const items = document.querySelector('.items');
let selectedTower;

// const tower = new Tower();
// tower.draw();


let towers = [];
towers.push(new Tower(gameContainer));
towers.push(new Tower(gameContainer));
towers.push(new Tower(gameContainer));


// towers.forEach((tower) => {
//     tower.draw()
//     //const towerElement = document.querySelector(`${tower.towerID}`);
//     items.appendChild(tower.towerElement);
// });
let towersRenders = towers.map((tower) => {
    new TowerView(tower, gameContainer);
    items.appendChild(tower.towerElement);
});

// if (towerplaced) => money - tower.cost





items.addEventListener('click', (event) => {
    selectedTower = event.target;
})

