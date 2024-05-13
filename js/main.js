const btn = document.querySelector('#btn');
const field1 = document.querySelector('.field-1');
const gameContainer = document.querySelector('.game-container')
const items = document.querySelector('.items');
let selectedTower;

const placeTower = function (tower, cell, col, row) {
    // Bereken de positie van de toren
    const cellWidth = cell.offsetWidth;  // Breedte van cel
    const cellHeight = cell.offsetHeight;  // hoogte van cel
    const leftPos = (col * cellWidth) - cellWidth;
    const topPos = (row * cellHeight) - cellHeight;
    // De linker bovenhoeken komen overeen met elkaar, denk ik.

    // TODO: foutmelding als er niet op lege cel wordt geklikt, ook kijken voor als de cel al is ingevuld.

    // Maak tower element
    // const tower = document.createElement('div');
    tower.classList.add('tower');
    tower.style.left = leftPos + 'px';
    tower.style.top = topPos + 'px';

    selectedTower = null;
    // Voeg toren toe aan speelveld op juiste cel
    gameContainer.appendChild(tower);
};

items.addEventListener('click', (event) => {
    selectedTower = event.target;
})


gameContainer.addEventListener('click', function (event) {
    const cell = event.target;
    const row = cell.dataset.row; // Rij nummer
    const col = cell.dataset.col; // Kolom nummer
    placeTower(selectedTower, cell, col, row)
});