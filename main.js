const playerOne = document.querySelector(".player-one h2");
const playerTwo = document.querySelector(".player-two h2")
const inputs = document.querySelectorAll(".gameboard div");
const resultHeader = document.querySelector(".winner");

function setPlayerOne(name) {
  playerOne.textContent = name;
}

function setPlayerTwo(name) {
  playerTwo.textContent = name;
}

const playerOneObj = {
  name: "Jugador Uno",
  win: 3,
  symbol: "X",
};

const playerTwoObj = {
  name: "Jugador Dos",
  win: 27,
  symbol: "O",
};

setPlayerOne(playerOneObj.name);
setPlayerTwo(playerTwoObj.name);

let gameboard = [0, 0, 0, 0, 0, 0, 0, 0, 0];

function checkIndex(className) {
  switch (className) {
    case "zero":
      return 0;
    case "one":
      return 1;
    case "two":
      return 2;
    case "three":
      return 3;
    case "four":
      return 4;
    case "five":
      return 5;
    case "six":
      return 6;
    case "seven":
      return 7;
    case "eight":
      return 8;
  }
}

function checkEmpty(index) {
  return gameboard[index] === 0 ? true : false;
}

let turnValue = 1;

function setTurnValue() {
  turnValue === 1 ? turnValue += 8 : turnValue -= 8;
}

function setBoard(index, value) {
  gameboard[index] = value;
}

let game = true;

let totalTurns = 0;

function checkHorizontals() {
  for (let i = 0; i < 3; i++) {
    const sum = gameboard[i * 3] + gameboard[i * 3 + 1] + gameboard[i * 3 + 2];
    if (sum === 3 || sum === 27) {
      return true;
    }
  }
}

function checkVerticals() {
  for (let i = 0; i < 3; i++) {
    const sum = gameboard[i + 0] + gameboard[i + 3] + gameboard[i + 6];
    if (sum === 3 || sum === 27) {
      return true;
    }
  }
}

function checkDiagonals() {
  const d1 = gameboard[0] + gameboard[4] + gameboard[8];
  const d2 = gameboard[2] + gameboard[4] + gameboard[6];
  if ((d1 === 3 || d1 === 27) || (d2 === 3 || d2 === 27)) {
    return true;
  }
}

function setResult(result) {
  if (result) {
    resultHeader.textContent = `The winner is ${result}`;
  } else {
    resultHeader.textContent = "There is no winner.";
  }
}

function setStyle(index, value) {
  const input = document.querySelector(`.gameboard :nth-child(${index + 1})`);
  if (value === 1) {
    input.textContent = playerOneObj.symbol;
  } else {
    input.textContent = playerTwoObj.symbol;
  }
}

function checkWin() {
  if (checkHorizontals() || checkVerticals() || checkDiagonals()) {
    if (turnValue === 1) {
      setResult(playerOneObj.name);
    } else {
      setResult(playerTwoObj.name);
    }
    game = false;
  } else {
    totalTurns++;
    if (totalTurns === 9) {
      setResult(false);
      game = false;
    }
  }
}

inputs.forEach((element) => {
  element.addEventListener("click", () => {
    const inputIndex = checkIndex(element.className);
    if (checkEmpty(inputIndex) && game) {
      setBoard(inputIndex, turnValue);
      setStyle(inputIndex, turnValue);
      checkWin();
    }
    console.log(gameboard);
    setTurnValue();
  });
});
