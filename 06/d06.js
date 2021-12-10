const { input, testInput } = require('./input');

const solver = (input) => {
  let fish = input.split(',');
  let days = 80;
  while (days > 0)
  {
    let i = 0;
    while(i < fish.length)
    {
      fish[i]--;
      if (+fish[i] < 0) {
        fish.push(9);
        fish[i] = 6;
      }
      i++;
    }
    days--;
  }
  return fish.length;
};

console.log(solver(testInput));
console.log(solver(input));