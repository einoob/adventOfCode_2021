const { input } = require('./input');

function count_increasements(measurements) {
  let i = 1;
  let sum = 0;

  while (measurements[i]) {
    if (+measurements[i] > +measurements[i - 1])
      sum++;
    i++;
  }
  return sum;
}

function create_sliding_windows_array(measurements) {
  let i = 2;
  let sliding_windows_array = [];
  while (measurements[i]) {
    const sumOfThree = +measurements[i] + +measurements[i - 1] + +measurements[i - 2];
    sliding_windows_array = sliding_windows_array.concat(sumOfThree);
    i++;
  }
  return sliding_windows_array;
}

console.log(count_increasements(input.split('\n'))); // a
console.log(count_increasements(create_sliding_windows_array(input.split('\n')))); // b