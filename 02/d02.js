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

  return {a: aim * forward, b: forward * depth};
}

console.log(countPosition(testInput));
console.log(countPosition(input));
