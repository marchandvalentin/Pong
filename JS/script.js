launch = document.getElementById("launch");
closebtn = document.getElementById("close");
canva = document.getElementById("pongCanva");
score = document.getElementById("score");
left = document.getElementById("left");
right = document.getElementById("right");

gameIsOn = false;

launch.addEventListener("click", () => {
  launchgame();
});

closebtn.addEventListener("click", () => {
  closegame();
});

right.addEventListener("mousedown", () => {
  rightInterval = setInterval(onRight, 50);
});

right.addEventListener("mouseup", () => {
  clearInterval(rightInterval);
});

document.body.addEventListener("keydown", function (event) {
  const key = event.key;
  switch (key) {
    case "ArrowLeft":
      onLeft();
      break;
    case "ArrowRight":
      onRight();
      break;
  }
});

left.addEventListener("mousedown", () => {
  leftInterval = setInterval(onLeft, 50);
});

left.addEventListener("mouseup", () => {
  clearInterval(leftInterval);
});

//Function to launch the game
function launchgame() {
  if (gameIsOn == false) {
    paddleOX = 300;
    paddleOY = 380;
    drawPaddle(paddleOX, paddleOY);
    gameIsOn = true;
    handleTimer(true);
  }
}

//Function to launch the timer
function launchtimer() {
  sc = 0;
  ti = setInterval(() => {
    sc++;
    score.textContent = "Score : " + sc + " s";
  }, 1000);
}

//Function to stop the timer and reset the score to 0
function stoptimer() {
  clearInterval(ti);
  sc = 0;
  score.textContent = "Score : 0 s";
}

//Function to handle the timer depending on the boolean val in parameters
//USELESS for the moment but could be useful later
function handleTimer(val) {
  if (val == false) {
    stoptimer();
  } else {
    launchtimer();
  }
}

//Function to draw the paddle
function drawPaddle(x, y) {
  ctx = canva.getContext("2d");
  ctx.fillStyle = "black";
  paddleSizeX = 200;
  paddleSizeY = 10;
  ctx.fillRect(x, y, paddleSizeX, paddleSizeY); // x, y, width, height
}

//Fucntion to stop the game
function closegame() {
  ctx = canva.getContext("2d");
  ctx.clearRect(0, 0, canva.width, canva.height);
  gameIsOn = false;
  handleTimer(false);
}

//Function to move the paddle on the right
function onRight() {
  if (gameIsOn == true) {
    ctx = canva.getContext("2d");
    newPaddleX = paddleOX + 30;
    if (newPaddleX + paddleSizeX <= canva.width) {
      ctx.clearRect(paddleOX, paddleOY, paddleSizeX, paddleSizeY);
      drawPaddle(newPaddleX, paddleOY);
      paddleOX = newPaddleX;
    }
  }
}

//Function to move the paddle on the left
function onLeft() {
  if (gameIsOn == true) {
    ctx = canva.getContext("2d");
    newPaddleX = paddleOX - 30;
    if (newPaddleX >= 0) {
      ctx.clearRect(paddleOX, paddleOY, paddleSizeX, paddleSizeY);
      drawPaddle(newPaddleX, paddleOY);
      paddleOX = newPaddleX;
    }
  }
}

function handleEndagme() {
  alert("You lost the Game ! \n You'll do better next time.");

  handleTimer(false);
}
