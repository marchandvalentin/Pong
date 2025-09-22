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

/* -------------------------------------------------------------------------- */
/*                                EVENT LISTNER                               */
/* -------------------------------------------------------------------------- */


launch.addEventListener("click", () => {
  launchgame();
});

closebtn.addEventListener("click", () => {
  closegame();
});

/*right.addEventListener("mousedown", () => {
  rightInterval = setInterval(onRight, 50);
});

right.addEventListener("mouseup", () => {
  clearInterval(rightInterval);
});*/

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

/*left.addEventListener("mousedown", () => {
  leftInterval = setInterval(onLeft, 50);
});

left.addEventListener("mouseup", () => {
  clearInterval(leftInterval);
});*/

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
  
  ctx.fillRect(x, y, paddleSizeX, paddleSizeY); // x, y, width, height
}

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

function handeBallBehavior(){
  ballY = 100;
  pastX = canva.width/2; // Initial X position of the ball
  pastY = ballY; // Initial Y position of the ball
   let ballInterval = setInterval(() => {
    ballY += ballSpeed; // La balle descend
    
    drawBallMoving(pastX, pastY+ballSpeed);
    drawBall(pastX, pastY+ballSpeed);

    pastX = pastX; // Update pastX (no horizontal movement for now)
    pastY = pastY+ballSpeed; // Update pastY

    if(ballY + ballRadius == paddleOY+paddleSizeY && (pastX >= paddleOX && pastX <= paddleOX + paddleSizeX)){
      alert("impact paddle");
      clearInterval(ballInterval);
     }

    if(ballY+ballRadius >= canva.height){
      alert("impact en bas") ;
      clearInterval(ballInterval);
    }
    if(ballX+ballRadius >= canva.width ){
      alert("impact à droite");
      clearInterval(ballInterval);
    }
    if(ballX-ballRadius <= 0 ){
      alert("impact à gauche");
      clearInterval(ballInterval);
    }
    if(ballY-ballRadius <= 0 ){
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
