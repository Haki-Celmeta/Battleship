let angle = 0;

/**
 * It flips all the ships when is checked in 90 degrees, if unchecked back to 0 degrees.
 */
function flipShips() {
  const checkbox = document.querySelector('#checkbox');
  const ships = Array.from(document.querySelector('.ships-container').children);

  checkbox.addEventListener('click', () => {
    angle = angle === 0 ? 90 : 0;
    ships.forEach(ship => {
      ship.style.transform = `rotate(${angle}deg)`;
    })
  })
}

function getAngle() {
  return angle;
}

function setAngle(value) {
  return angle = value;
}

export default flipShips;
export { getAngle, setAngle }