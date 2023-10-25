import './styles/main.scss';

console.log(123);

/**
 * Function get an array and returns the sum of all
 * the elements inside that array
 *
 * @param {object} array - array argument
 * @returns {number} - The sum
 */

function sum(array) {
  const total = array.reduce((accumulator, currentValue) => {
    accumulator + currentValue;
  }, 0);

  return total;
}

sum([1, 2, 3, 4, 6]);