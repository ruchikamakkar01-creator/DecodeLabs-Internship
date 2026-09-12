const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const img1 = document.getElementById("img1");
const img2 = document.getElementById("img2");
const h21 = document.getElementById("h21");
const h22 = document.getElementById("h22");
const resetBtn = document.getElementById("reset-btn");

let filling = new Array(9).fill("E");
let turn = "p1";
let totalTurns = 0;
let gameOver = false;

function highlightActivePlayer() {
  img1.style.transform = turn === "p1" ? "scale(1.1)" : "scale(1)";
  img2.style.transform = turn === "p2" ? "scale(1.1)" : "scale(1)";
}

function checkWinner() {
  for (const [a, b, c] of winCombos) {
    if (
      filling[a] !== "E" &&
      filling[a] === filling[b] &&
      filling[b] === filling[c]
    ) {
      return true;
    }
  }
  return false;
}

function endGame(message1, message2) {
  h21.innerHTML = message1;
  h22.innerHTML = message2;
  img1.style.transform = "scale(1)";
  img2.style.transform = "scale(1)";
  gameOver = true;
}

function placeMark(cell) {
  const id = cell.id;

  if (gameOver || filling[id] !== "E") return;

  totalTurns++;
  filling[id] = turn;
  cell.innerHTML = turn === "p1" ? "O" : "X";

  if (checkWinner()) {
    if (turn === "p1") {
      endGame("YAYYY!! I WON", "");
    } else {
      endGame("", "YAYYY!! I WON");
    }
    return;
  }

  if (totalTurns === 9) {
    endGame("MATCH", "DRAW");
    return;
  }

  turn = turn === "p1" ? "p2" : "p1";
  highlightActivePlayer();
}

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("cell")) {
    placeMark(event.target);
  }
});

cells.forEach((cell) => {
  cell.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      placeMark(cell);
    }
  });
});

function resetGame() {
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });
  filling = new Array(9).fill("E");
  totalTurns = 0;
  turn = "p1";
  gameOver = false;
  h21.innerHTML = "";
  h22.innerHTML = "";
  highlightActivePlayer();
}

resetBtn.addEventListener("click", resetGame);

// Initial state
highlightActivePlayer();
