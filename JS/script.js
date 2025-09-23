/* -------------------------------------------------------------------------- */
/*                            VARIABLES DECLARATION                           */
/* -------------------------------------------------------------------------- */

launch = document.getElementById("launch");
closebtn = document.getElementById("close");
canva = document.getElementById("pongCanva");
score = document.getElementById("score");
left = document.getElementById("left");
right = document.getElementById("right");

gameIsOn = false;

paddleSizeX = 75;
paddleSizeY = 10;

ballSpeed = 3;
ballRadius = 6;

// Animation frame variables
let rightAnimation = null;
let leftAnimation = null;

/* -------------------------------------------------------------------------- */
/*                                EVENT LISTNER                               */
/* -------------------------------------------------------------------------- */


launch.addEventListener("click", () => {
  launchgame();
  console.log("Game launched !"); 
});

closebtn.addEventListener("click", () => {
  closegame();
});

right.addEventListener("mousedown", () => {
  rightAnimation = window.requestAnimationFrame(onRight);
});

right.addEventListener("mouseup", () => {
  window.cancelAnimationFrame(rightAnimation);
  rightAnimation = null;
});

document.body.addEventListener("keydown", function (event) {
  const key = event.key;
  switch (key) {
    case "ArrowLeft":
      leftAnimation = window.requestAnimationFrame(onLeft);
      break;
    case "ArrowRight":
      rightAnimation = window.requestAnimationFrame(onRight);
      break;
    
    default:
      window.cancelAnimationFrame(leftAnimation);
      window.cancelAnimationFrame(rightAnimation);
      leftAnimation = null;
      rightAnimation = null;
      break;
  }
});

left.addEventListener("mousedown", () => {
  leftAnimation = window.requestAnimationFrame(onLeft);
});

left.addEventListener("mouseup", () => {
  window.cancelAnimationFrame(leftAnimation);
  leftAnimation = null;
});

/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */

//Function to launch the game
function launchgame() {
  if (gameIsOn == false) {
    paddleOX = canva.width/2-paddleSizeX/2;
    paddleOY = canva.height-20;
    drawPaddle(paddleOX, paddleOY);

    drawBall(canva.width/2, 100);
    gameIsOn = true;
    handleTimer(true);
    handeBallBehavior();
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
  sc = 0;
  score.textContent = "Score : 0 s";
}


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
  
  ctx.fillRect(x, y, paddleSizeX, paddleSizeY); // x, y, width, height
}

//Function to draw the ball
function drawBall(x, y){
  ctx = canva.getContext("2d");
  ctx.beginPath();
  ctx.fillStyle = "grey";
  ctx.arc(x, y, 6, 0, 2 * Math.PI);
  ctx.stroke();
}

//Fucntion to stop the game
function closegame() {
  ctx = canva.getContext("2d");
  ctx.clearRect(0, 0, canva.width, canva.height);

  /*paddleOX = canva.width/2-paddleSizeX/2;
  paddleOY = canva.height-20;
  drawPaddle(paddleOX, paddleOY);*/

  gameIsOn = false;
  //handleTimer(false);
}

//Function to move the paddle on the right
function onRight() {
  if (gameIsOn == true) {
    ctx = canva.getContext("2d");
    newPaddleX = paddleOX + 2;
    if (newPaddleX + paddleSizeX <= canva.width) {
      ctx.clearRect(paddleOX, paddleOY, paddleSizeX, paddleSizeY);
      drawPaddle(newPaddleX, paddleOY);
      paddleOX = newPaddleX;
    }
    // Only continue animation if rightAnimation is still active
    if (rightAnimation) {
      rightAnimation = requestAnimationFrame(onRight);
    }
  }
}

//Function to move the paddle on the left
function onLeft() {
  if (gameIsOn == true) {
    ctx = canva.getContext("2d");
    newPaddleX = paddleOX - 2;
    if (newPaddleX >= 0) {
      ctx.clearRect(paddleOX, paddleOY, paddleSizeX, paddleSizeY);
      drawPaddle(newPaddleX, paddleOY);
      paddleOX = newPaddleX;
    }
    // Only continue animation if leftAnimation is still active
    if (leftAnimation) {
      leftAnimation = requestAnimationFrame(onLeft);
    }
  }
}
 
function handleEndagme() {
  alert("You lost the Game ! \n You'll do better next time.");

  handleTimer(false);
}

function handeBallBehavior(){
  ballX = canva.width / 2;
  ballY = 100;
  pastX = ballX;
  pastY = ballY;


  
  let ballInterval = setInterval(() => {
    ballY += ballSpeed; // ballX += ballSpeed => vers la droite ballY += ballSpeed => vers le bas
  
    drawBallMoving(ballX, ballY);

    pastX = ballX;
    pastY = ballY;

    // Collision avec le paddle
    if (
      ballY + ballRadius >= paddleOY && 
      ballX >= paddleOX &&
      ballX <= paddleOX + paddleSizeX
    ) {
      alert("impact paddle");
      clearInterval(ballInterval);
    }

    // Collision avec les bords
    if (ballY + ballRadius >= canva.height) {
      alert("impact en bas");
      clearInterval(ballInterval);
    }
    if (ballX + ballRadius >= canva.width) {
      alert("impact à droite");
      clearInterval(ballInterval);
    }
    if (ballX - ballRadius <= 0) {
      alert("impact à gauche");
      clearInterval(ballInterval);
    }
    if (ballY - ballRadius <= 0) {
      alert("impact en haut");
      clearInterval(ballInterval);
    }
  }, 15);
}

function drawBallMoving(ballX, ballY) {
    ctx = canva.getContext("2d");
    ctx.clearRect(0, 0, canva.width, canva.height); // Efface le canvas
    drawPaddle(paddleOX, paddleOY); // Redessine le paddle
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
  }
