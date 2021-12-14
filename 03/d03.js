const { input, testInput } = require("./input");

const createBinaryNumbers = (intArray) => {
  let rates = { gamma: [], epsilon: [] };
  
  for (let i = 0; i < intArray.length; i++) {
    rates.gamma[i] = intArray[i] >= 0 ? 1 : 0;
    rates.epsilon[i] = intArray[i] >= 0 ? 0 : 1;
  }
  return rates;
};

const convertToDecimal = (binaryRates) => {
  let first = 0;
  let second = 0;
  let added = 1;
  let i = binaryRates.first.length - 1;

  while (i > -1) {
    first += +binaryRates.first[i] === 1 ? added : 0;
    second += +binaryRates.second[i] === 1 ? added : 0;
    added += added;
    i--;
  }
  return [first, second];
};

const countMostCommonBits = (binaryArray) => {
  let byte = 0;
  let bit = 0;
  let mostCommonBits = Array(binaryArray[0].length).fill(0);

  while (binaryArray[byte]) {
    while (binaryArray[byte][bit]) {
      mostCommonBits[bit] += binaryArray[byte][bit] == '1' ? 1 : -1;
      bit++;
    }
    bit = 0;
    byte++;
  }
  return mostCommonBits;
};

const getOxygenRate = (binaryArray) => {
  let filtered = binaryArray;
  let zeros;
  let ones;
  let i = 0;

  while (filtered.length > 1) {
    ones = filtered.filter((binaryNumber) => binaryNumber[i] == 1);
    zeros = filtered.filter((binaryNumber) => binaryNumber[i] == 0)
    filtered = ones.length >= zeros.length ? ones : zeros;
    i++;
  }
  return filtered.toString().split('');
}

const getCo2Rate = (binaryArray) => {
  let filtered = binaryArray;
  let zeros;
  let ones;
  let i = 0;

  while (filtered.length > 1) {
    ones = filtered.filter((binaryNumber) => binaryNumber[i] == 1);
    zeros = filtered.filter((binaryNumber) => binaryNumber[i] == 0)
    filtered = ones.length < zeros.length ? ones : zeros;
    i++;
  }
  return filtered.toString().split('');
}

const solvePuzzle = (input) => {
  const binaryArray = input.split("\n");
  const mostCommonBits = countMostCommonBits(binaryArray);
  const ratesInBinary = createBinaryNumbers(mostCommonBits);
  const oxygenBinary = getOxygenRate(binaryArray);
  const co2Binary = getCo2Rate(binaryArray);
  const [gammaRate, epsilonRate] = convertToDecimal({ first: ratesInBinary.gamma, second: ratesInBinary.epsilon});
  const [oxygenRate, co2Rate] = convertToDecimal({ first: oxygenBinary, second: co2Binary});
  return { '1': gammaRate * epsilonRate, '2': oxygenRate * co2Rate}
};

// console.log('test result:\t', solvePuzzle(testInput));
console.log('actual result:\t', solvePuzzle(input));
