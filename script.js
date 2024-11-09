board = [
  ["t", "h", "b", "k", "q", "b", "h", "t"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["t", "h", "b", "k", "q", "b", "h", "t"],
];

function loopContent() {
  for (let i = 11; i <= 28; i++) {
    const cell = document.getElementById(i);
    console.log(cell);
  }
}
loopContent();
