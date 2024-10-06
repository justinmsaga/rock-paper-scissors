class player {
  constructor(name, score) {
    this.name = name;
    this.score = score;
    this.el = "";
  }
  win() {
    this.score++;
  }
  setEl(set) {
    this.el = set;
  }
}

const play1 = new player("p1", 0);
const play2 = new player("p2", 0);

function updateScore(winner) {
  switch (winner) {
    case "P1 Wins":
      play1.win();
      break;

    case "P2 Wins":
      play2.win();
      break;

    default:
      break;
  }
}

const btnEl = document.getElementsByClassName("palette");
const title = document.querySelector("h1");
const scoreBoard = document.getElementById("score");
const p1Score = document.getElementById("p1");
const p2Score = document.getElementById("p2");
let game = play();
scoreBoard.innerHTML = "Player 1 GO!";

function element(base, element, loser) {
  function play(element) {
    if (base === element) {
      return "draw ";
    } else if (base === "water") {
      return element === "fire" ? "P1 Wins" : "P2 Wins";
    } else {
      return element === "fire" || element === loser ? "P2 Wins" : "P1 Wins";
    }
  }
  return play;
}

function setP1(el) {
  switch (el) {
    case "fire":
      play1.setEl(element("fire", el, "water"));
      break;
    case "water":
      play1.setEl(element("water", el, ""));
      break;
    case "rock":
      play1.setEl(element("rock", el, "paper"));
      break;
    case "paper":
      play1.setEl(element("paper", el, "scissors"));
      break;
    case "scissors":
      play1.setEl(element("scissors", el, "rock"));
      break;
  }
}

function play() {
  let p1Select = "";
  function player(lmnt) {
    if (p1Select === "") {
      scoreBoard.innerHTML = "Player 2 GO!";
      p1Select = setP1(lmnt);
    } else {
      updateScore(play1.el(lmnt));
      scoreBoard.innerHTML = `${play1.el(lmnt)} <span class="inspo">Player 1 GO</span>`;
      p1Score.textContent = `Player 1 score: ${play1.score}`;
      p2Score.textContent = `Player 2 score: ${play2.score}`;
      p1Select = "";
    }
  }
  return player;
}

for (let b of btnEl) {
  b.addEventListener("click", () => {
    game(b.innerHTML);
  });
}
