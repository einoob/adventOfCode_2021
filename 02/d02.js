const { input, testInput } = require('./input');

const countPosition = (input) => {
  
  const commands = input.split('\n');
  let forward = 0;
  let aim = 0;
  let depth = 0;

  for (let i = 0; i < commands.length; i++) {
    let [direction, measure] = commands[i].split(' ');
    if (direction === 'up') 
      aim -= +measure;
    if (direction === 'down') 
      aim += +measure;
    if (direction === 'forward') {
      forward += +measure;
      depth += (aim * measure);
    }
  }

  return {'1': aim * forward, '2': forward * depth};
}

console.log('test input:\t', countPosition(testInput));
console.log('actual input:\t', countPosition(input));
