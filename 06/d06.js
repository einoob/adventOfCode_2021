const { input, testInput } = require("./input");

const iterateObject = (object) => {
  const zeros = object[0];
  for (let i = 0; i < Object.keys(object).length - 2; i++) {
    object[i] = object[i + 1];
  }
  object[9] = zeros;
  object[8] = object[9];
  object[6] += object[9];
  return object;
};

const inputToIntArray = (input) => {
  let intArray = input.split(",");
  for (let i = 0; i < intArray.length; i++) {
    intArray[i] = parseInt(intArray[i]);
  }
  return intArray;
};

const initializeValues = (intArray) => {
  let fish = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
  };
  for (let i = 0; i < Object.keys(fish).length; i++) {
    fish[i] = intArray.filter((number) => number == i).length;
  }
  return fish;
};

const solver2 = (input) => {
  let intArray = inputToIntArray(input);
  let days = 256;
  let fish = initializeValues(intArray);
  let fishAmounAfter80Days
  while (days > 0) {
    fish = iterateObject(fish);
    days--;
    if (256 - days === 80) {
       fishAmounAfter80Days =
        Object.entries(fish)
          .map((entry) => entry[1])
          .reduce((a, b) => a + b) - fish[9];
    }
  }
  const finalAmount =
    Object.entries(fish)
      .map((entry) => entry[1])
      .reduce((a, b) => a + b) - fish[9];
  return {a: fishAmounAfter80Days, b: finalAmount};
};

console.log('test input:\t', solver2(testInput));
console.log('actual input: \t', solver2(input));
