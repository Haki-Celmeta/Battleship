import { createAllShips, addShip, getNotDropped, setNotDropped } from "./ship";

const shipsContainer = Array.from(document.querySelector('.ships-container').children);
const ships = createAllShips();
const playerBlocks = document.querySelectorAll('#player div');
let draggedShip;

function dragStart(e) {
  setNotDropped(false);
  draggedShip = e.target;
}

function dragOver(e) {
  e.preventDefault();
}

function dropShip(e) {
  const id = e.target.id;
  const ship = ships[draggedShip.id];
  addShip('player', ship, id);
  if (!getNotDropped()) {
    draggedShip.remove();
  }
}

function dragged() {
  playerBlocks.forEach(playerBlock => {
    playerBlock.addEventListener('dragover', dragOver);
    playerBlock.addEventListener('drop', dropShip);
  })
}

function drag() {
  shipsContainer.forEach(ship => {
    ship.addEventListener('dragstart', dragStart)
  })
}

export default drag;
export { dragged }