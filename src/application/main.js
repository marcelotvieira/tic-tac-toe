const scoreView = document.getElementById("score");
const cells = document.getElementsByClassName("box");
const boxes = document.getElementsByClassName("box");
let lastPlayer = "";
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];


const showScore = () => {
  const playButton = document.getElementById("play-button");
  playButton.addEventListener("click", () => {
    scoreView.classList.toggle("active");
    cleanBoard();
  });
};

const togglePlayer = (currentPlayer) => {
  currentPlayer = !currentPlayer;
  return currentPlayer;
};

const checkWin = (box) => {
  lastPlayer = box.classList[1];
  return winConditions.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(box.classList[1]);
    });
  });
};

const cleanBoard = () => {
  for (let cell of cells) {
    cell.classList = "box";
  }
};

const showCongratulations = (winner) => {
  const winCard = document.getElementById("winner-card");
  winCard.classList.toggle("active");
  console.log(winner);
  winner == "circle"
    ? (winCard.children[0].innerHTML = "P1 WIN!")
    : (winCard.children[0].innerHTML = "P2 WIN!");
  winner == "tie" ? (winCard.children[0].innerHTML = "TIE!!!") : null;
  setTimeout(() => {
    scoreView.classList.toggle("active");
    winCard.classList.toggle("active");
  }, 3000);
};

const setWin = (checkWin) => {
  const scores = document.getElementsByClassName("score-values");
  checkWin && lastPlayer == "circle" ? scores[1].innerHTML++ : null;
  checkWin && lastPlayer == "x" ? scores[2].innerHTML++ : null;
  checkWin ? showCongratulations(lastPlayer) : null;
};

const checkTie = () => {
  let boardCells = [];
  for (let cell of cells) {
    boardCells.push(cell.classList);
  }
  const boardUsed = boardCells.filter((cell) => {
    return cell != "box";
  });
  boardUsed.length == 9 ? showCongratulations("tie") : null;
};

const setBoardEvents = () => {
  let currentPlayer = true;
  for (let box of boxes) {
    box.addEventListener("click", function setSymbol() {
      currentPlayer == true
        ? box.classList.add("circle")
        : box.classList.add("x");
      currentPlayer = togglePlayer(currentPlayer);
      !checkWin(box) ? checkTie() : null;
      setWin(checkWin(box));
    });
  }
};

const main = () => {
  scoreView.classList.toggle("active");
  showScore();
  setBoardEvents();
};

main();
