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

//ballSpeed = 3;
ballRadius = 6;

//score variable
sc = 0;

// Animation frame variables
let rightAnimation = null;
let leftAnimation = null;
let last = 0; // For timer timing

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
    handleTimer();
    handeBallBehavior();
  }
}

//Function to launch the timer
function launchtimer() {
  lastTime = 0; // Initialize timing variable
  timerAnimation = window.requestAnimationFrame(handleTimer);
}

//Function to stop the timer and reset the score to 0
function stoptimer() {
  sc = 0;
  score.textContent = "Score : 0 s";
}


function handleTimer(now) {
  if (gameIsOn == true) {
    if (now - last >= 1000) { // Wait 1 second (1000ms)
      sc++;
      score.textContent = "Score : " + sc + " s";
      last = now;
    }
    timerAnimation = window.requestAnimationFrame(handleTimer); // Continue the loop
  } else {
    window.cancelAnimationFrame(timerAnimation);
    stoptimer();
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
  handleTimer(false);
}

//Function to move the paddle on the right
function onRight() {
  if (gameIsOn == true) {
    ctx = canva.getContext("2d");
    newPaddleX = paddleOX + 5;
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
    newPaddleX = paddleOX - 5;
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

  defaultXspeed = 1.5;
  defaultYspeed = -3;

  ballSpeedX = defaultXspeed;
  ballSpeedY = defaultYspeed;
  
  let ballInterval = setInterval(() => {
    ballY += ballSpeedY; 
    ballX += ballSpeedX;

    drawBallMoving(ballX, ballY);

    pastX = ballX;
    pastY = ballY;

    // Collision avec le paddle
    if (
      ballY + ballRadius >= paddleOY && 
      ballX >= paddleOX &&
      ballX <= paddleOX + paddleSizeX
    ) {
      //console.log("impact paddle");
      ballSpeedY = -ballSpeedY;
    }

    // Collision avec les bords
    if (ballY + ballRadius >= canva.height) {
      console.log("Perdu !");
      closegame();
      clearInterval(ballInterval);
    }
    if (ballX + ballRadius >= canva.width) {
      //console.log("impact à droite");
      ballSpeedX = -ballSpeedX;
      addSpeed();
      console.log("Vitesse X : " + ballSpeedX + " Vitesse Y : " + ballSpeedY);
    }
    if (ballX - ballRadius <= 0) {
      //console.log("impact à gauche");
      ballSpeedX = -ballSpeedX;
      addSpeed();
      console.log("Vitesse X : " + ballSpeedX + " Vitesse Y : " + ballSpeedY);
    }
    if (ballY - ballRadius <= 0) {
      //console.log("impact en haut");
      ballSpeedY = -ballSpeedY;
      addSpeed();
      console.log("Vitesse X : " + ballSpeedX + " Vitesse Y : " + ballSpeedY);
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


//add speed to the ball after each bounce up to (times the original speed)
function addSpeed(){
  //entre -speed de base *5 et 0
  if( ballSpeedX > -defaultXspeed*5 && ballSpeedX < 0 ){
    ballSpeedX -= 0.5;
  }

  if( ballSpeedY > -defaultYspeed*5 && ballSpeedY < 0 ){
    ballSpeedY -= 0.5;
  }

  //entre 0 et la speed de base *5
  if ( ballSpeedX > 0 && ballSpeedX < defaultXspeed*5){
    ballSpeedX += 0.5;
  } 
    
  if ( ballSpeedY > 0 && ballSpeedY < defaultYspeed*5){
    ballSpeedY += 0.5;
  } 
}
