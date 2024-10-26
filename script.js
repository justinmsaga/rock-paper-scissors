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
const scoreBoard = document.getElementById("scoreBoard");

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

//setup game depending on game type,
//true = one player | false = two player
function gameSetup(type) {
  updateVisibility(board);
  playerInst.innerHTML = type
    ? `1 player mode selected`
    : `2 player mode selected`;
  game = play(play1, play2, scoreBoard, type, playerInst);
}

//show game one player
autoBtn.addEventListener("click", () => {
  gameSetup(true);
});

//show game two player
playBtn.addEventListener("click", () => {
  gameSetup(false);
});

//player inputs
for (let b of elementBtns) {
  b.addEventListener("click", () => {
    game(b.innerHTML);
  });
}
