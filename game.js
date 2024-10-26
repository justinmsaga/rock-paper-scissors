import player from "./players.js";

const agent = new player("a1", 0, true);
let p1Auto = false;
let p2Auto = false;

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
    } else if (base === "🌊") {
      return element === "🔥" ? "P1 Wins" : "P2 Wins";
    } else {
      return element === "🔥" || element === loser ? "P2 Wins" : "P1 Wins";
    }
  }
  return play;
}

function setP1(el, p1) {
  switch (el) {
    case "🔥":
      p1.setEl(element("🔥", el, "🌊"));
      break;
    case "🌊":
      p1.setEl(element("🌊", el, ""));
      break;
    case "🪨":
      p1.setEl(element("🪨", el, "🧻"));
      break;
    case "🧻":
      p1.setEl(element("🧻", el, "✂️"));
      break;
    case "✂️":
      p1.setEl(element("✂️", el, "🪨"));
      break;
  }
}

//setup player instruction html section then update instruction based on game state
function updateInstruction(pgSection) {
  const section = pgSection;
  function updateText(txt) {
    const toDisplay = document.createElement("p");
    toDisplay.innerHTML = txt;
    //const randBtn = document.createElement("button");
    //randBtn.innerHTML = "rand";
    section.replaceChildren(toDisplay);
  }
  return updateText;
}

//setup score html section then update score, text will depend on if agent is active
function updateScoreBoard(scoreSection) {
  const section = scoreSection;
  function updateScoreBoard(p1Score, p2Score, agnt) {
    const scoreTxt = agnt
      ? `<p> Player 1 score: ${p1Score}</p>
      <p> Agent score: ${p2Score}</p>`
      : `<p> Player 1 score: ${p1Score}</p>
    <p> Player 2 score: ${p2Score}</p>`;
    section.innerHTML = scoreTxt;
  }
  return updateScoreBoard;
}

function play(p1, p2, score, gmeType, inst) {
  let p1Select = "";
  const instruction = updateInstruction(inst);
  const scoreboard = updateScoreBoard(score);
  function player(lmnt) {
    if (p1Select === "") {
      instruction(`<span class="inspo">Player 2 GO</span> `);
      p1Select = setP1(lmnt, p1);
      if (gmeType) {
        const agentSel = agent.autoSelect();
        updateScore(p1.el(agentSel), p1, agent);
        instruction(`${p1.el(agentSel)} Player 1 GO [1 player mode]`);
        scoreboard(p1.score, agent.score, true);
        p1Select = "";
      }
    } else {
      const gg = p1.el(lmnt);
      updateScore(gg, p1, p2);
      instruction(`${gg} Player 1 GO [2 player mode]`);
      scoreboard(p1.score, p2.score, false);
      p1Select = "";
    }
  }
  return player;
}

export default play;
