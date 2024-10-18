class player {
  constructor(name, score, auto) {
    this.name = name;
    this.score = score;
    this.el = "";
    this.auto = auto;
  }
  win() {
    this.score++;
  }
  setEl(set) {
    this.el = set;
  }

  toggleAuto() {
    this.auto ? false : true;
  }

  autoSelect() {
    const selection = ["fire", "rock", "paper", "scissors", "water"];
    return selection[Math.floor(Math.random() * 5)];
  }
}

export default player;
