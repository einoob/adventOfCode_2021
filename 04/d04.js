const { input, testInput } = require('./input');

const getBingoCardsArray = (cardsArray) => {
  let tmpBingoCards = [];
  cardsArray.forEach((card) => tmpBingoCards.push(card.split('\n')));
  let bingoCards = [];
  for (let i = 0; i < tmpBingoCards.length; i++) {
    let j = 0;
    bingoCards[i] = [];
    while (j < tmpBingoCards[i].length) {
      bingoCards[i][j] = tmpBingoCards[i][j].split(' ').filter((number) => number);
      j++
    }
    bingoCards[i] = bingoCards[i].filter((row) => row.length);
  }
  return bingoCards;
}

const findHits = (card, number) => {
  let y = 0;

  while (card[y]) {
    const index = card[y].findIndex((nbr) => nbr === number); 
    if (index !== -1) {
      card[y][index] = 'x';
      return card;
    }
    y++;
  }
  return card;
}

const bingoInARow = (card) => {
  let y = 0;
  while (card[y]) {
    let numbersNotDrawn = card[y].filter((nbr) => nbr !== 'x');
    if (numbersNotDrawn.length === 0) {
      return true;
    }
    y++;
  }
  return false;
}

const bingoInAColumn = (card) => {
  let x = 0;
  while (card[0][x]) {
    if (card[0][x] === 'x' && card[1][x] === 'x' && card[2][x] === 'x'
    && card[3][x] === 'x' && card[4][x] === 'x')
      return true;
    x++;
  }
  return false;
}

const checkBingo = (card) => {
  return bingoInAColumn(card) || bingoInARow(card);
}

const sumOfNumbersLeftInCard = (card) => {
  let sum = 0;

  for (let i = 0; card[i]; i++) {
    sum = card[i].filter((nbr) => nbr !== 'x').reduce((a, b) => +a + +b, sum);
  }
  return sum;
}

const simulateBingo = (numbersDrawn, bingoCards) => {
  let nbrIndex = 0;
  let cardNbr = 0;
  let winner = null;
  let loser = null;

  while (numbersDrawn[nbrIndex]) {
    let currentNumber = numbersDrawn[nbrIndex];
    while (bingoCards[cardNbr]) {
      bingoCards[cardNbr] = findHits(bingoCards[cardNbr], currentNumber);
      if (checkBingo(bingoCards[cardNbr]))
      {
        if (!winner) {
          winner = {
            winningNumber: currentNumber,
            sumOfNumbersLeftInCard: sumOfNumbersLeftInCard(bingoCards[cardNbr])
          }
        }
        if (bingoCards.length === 1) {
          loser = {
              winningNumber: currentNumber,
              sumOfNumbersLeftInCard: sumOfNumbersLeftInCard(bingoCards[cardNbr])
            };
        }

        bingoCards.splice(cardNbr, 1);
        cardNbr--;
      }
      cardNbr++;
    }
    cardNbr = 0;
    nbrIndex++;
  }

  return [winner.winningNumber, winner.sumOfNumbersLeftInCard,
    loser.winningNumber, loser.sumOfNumbersLeftInCard];
}

const solver = (input) => {
  let [numbersDrawn, ...cards] = input.split('\n\n');
  numbersDrawn = numbersDrawn.split(',');
  cards.forEach((card) => card.split('\n'));
  const bingoCards = getBingoCardsArray(cards);

  const [
    winningNumber,
    sumOfUncheckedNumbersInWinningCard,
    losingNumber,
    sumOfUncheckedNumbersInLosingCard
  ] = simulateBingo(numbersDrawn, bingoCards);

  return {
    '1': winningNumber * sumOfUncheckedNumbersInWinningCard,
    '2': losingNumber * sumOfUncheckedNumbersInLosingCard
  };
};

console.log('test input:\t', solver(testInput));
console.log('actual input:\t', solver(input));