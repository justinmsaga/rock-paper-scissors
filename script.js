import player from "./players.js";
import play from "./game.js";

//players
const play1 = new player("p1", 0, false);
const play2 = new player("p2", 0, false);

//buttons
const rulesBtn = document.getElementById("showRules");
const playBtn = document.getElementById("play");
const elementBtns = document.getElementsByClassName("palette");
const autoBtn = document.getElementById("auto");

//game sections
const board = document.querySelector(".board");
const rules = document.getElementById("rules");

//text
const playerInst = document.getElementById("who");

//true = single player | false = multi player
let gameType;

//scoreboard
const p1Score = document.getElementById("p1");
const p2Score = document.getElementById("p2");

//game object
let game;

//set visibility
function updateVisibility(sect) {
  sect.classList.remove("hidden");
}

//button event handlers

//show rules
rulesBtn.addEventListener("click", () => {
  updateVisibility(rules);
});

//show game one player
autoBtn.addEventListener("click", () => {
  updateVisibility(board);
  playerInst.innerHTML = `1 player mode selected`;
  gameType = true;
  game = play(play1, play2, p1Score, p2Score, gameType, playerInst);
});

//show game two player
playBtn.addEventListener("click", () => {
  updateVisibility(board);
  playerInst.innerHTML = `2 player mode selected`;
  gameType = false;
  game = play(play1, play2, p1Score, p2Score, gameType, playerInst);
});

//player inputs
for (let b of elementBtns) {
  b.addEventListener("click", () => {
    game(b.innerHTML);
  });
}
