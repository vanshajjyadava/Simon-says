let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started === false) {
    console.log("The game has begun.");
    started = true;
    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 350);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randomIdx = Math.floor(Math.random() * 4);
  let randomColor = btns[randomIdx];
  let randomBtn = document.querySelector(`.${randomColor}`);

  gameSeq.push(randomColor);
  console.log(gameSeq);

  btnFlash(randomBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    // Correct so far
    if (userSeq.length === gameSeq.length) {
      // Completed the level
      setTimeout(levelUp, 1000);
    }
  } else {
    // Wrong answer
    gameOverFlash();
    h2.innerText = `Game Over! Your Score: ${level} 😢
    Press any key to Restart.`;
    reset();
  }
}

function btnPress() {
  let btn = this;
  btnFlash(btn);

  let userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for (let btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

function gameOverFlash() {
  document.body.style.backgroundColor = "red";
  setTimeout(() => {
    document.body.style.backgroundColor = "white";
  }, 200);
}
