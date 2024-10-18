import player from "./players.js";

const agent = new player("a1", 0, true);

function updateScore(winner, p1, p2) {
  switch (winner) {
    case "P1 Wins":
      p1.win();
      break;

    case "P2 Wins":
      p2.win();
      break;

    default:
      break;
  }
}

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

function setP1(el, p1) {
  switch (el) {
    case "fire":
      p1.setEl(element("fire", el, "water"));
      break;
    case "water":
      p1.setEl(element("water", el, ""));
      break;
    case "rock":
      p1.setEl(element("rock", el, "paper"));
      break;
    case "paper":
      p1.setEl(element("paper", el, "scissors"));
      break;
    case "scissors":
      p1.setEl(element("scissors", el, "rock"));
      break;
  }
}

function play(p1, p2, p1Scr, p2Scr, gmeType, inst) {
  let p1Select = "";
  function player(lmnt) {
    if (p1Select === "") {
      inst.innerHTML = `<span class="inspo">Player 2 GO</span> `;
      p1Select = setP1(lmnt, p1);
      if (gmeType) {
        const agentSel = agent.autoSelect();
        updateScore(p1.el(agentSel), p1, agent);
        inst.innerHTML = `${p1.el(agentSel)} Player 1 GO [1 player mode]`;
        p1Scr.innerHTML = `Player 1 score: ${p1.score}`;
        p2Scr.innerHTML = `agent score: ${agent.score}`;
        p1Select = "";
      }
    } else {
      const gg = p1.el(lmnt);
      updateScore(gg, p1, p2);
      inst.innerHTML = `${gg} Player 1 GO [2 player mode]`;
      p1Scr.innerHTML = `Player 1 score: ${p1.score}`;
      p2Scr.innerHTML = `Player 2 score: ${p2.score}`;
      p1Select = "";
    }
  }
  return player;
}

export default play;
