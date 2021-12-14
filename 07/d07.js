const { input, testInput } = require('./input');

const getFuelCostAtPosition = (intArray, tab) => {
  let sum_1 = 0;
  let sum_2 = 0;
  for (let i = 0; i < intArray.length; i++) {
    let add_1 = intArray[tab] - intArray[i];
    if (add_1 < 0)
      add_1 *= -1;
    sum_1 += add_1;
    let add_2 = 0;
    for (let count = 1; count <= add_1; count++) {
      add_2 += count;
    }
    sum_2 += add_2;
  }
  return [sum_1, sum_2];
}

const solver = (input) => {
  const intArray = input.split(',');
  let minimum_1 = null;
  let minimum_2 = null;
  for (let tab = 0; tab < intArray.length; tab++)
  {
    let [sum_1, sum_2] = getFuelCostAtPosition(intArray, tab);
    if (!minimum_1 || sum_1 < minimum_1)
      minimum_1 = sum_1;
    if (!minimum_2 || sum_2 < minimum_2)
      minimum_2 = sum_2;
  }
  return { 'a': minimum_1, 'b': minimum_2 };
};

console.log(solver(testInput));
console.log(solver(input));