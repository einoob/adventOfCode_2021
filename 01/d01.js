const { input } = require('./input');

function create_sliding_windows_array(measurements) {
  let i = 2;
  const sliding_windows_array = [];
  while (measurements[i]) {
    const sumOfThree = +measurements[i] + +measurements[i - 1] + +measurements[i - 2];
    sliding_windows_array.push(sumOfThree);
    i++;
  }
  return sliding_windows_array;
}

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

console.log('1:', count_increasements(input.split('\n')));
console.log('2:', count_increasements(create_sliding_windows_array(input.split('\n'))));
