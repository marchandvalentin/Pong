/* -------------------------------------------------------------------------- */
/*                            VARIABLES DECLARATION                           */
/* -------------------------------------------------------------------------- */

//HTML elements
launch = document.getElementById("launch");
closebtn = document.getElementById("close");
canva = document.getElementById("pongCanva");
score = document.getElementById("score");
left = document.getElementById("left");
right = document.getElementById("right");

//Paddle variables
gameIsOn = false;

paddleSizeX = 75;
paddleSizeY = 10;

//ballSpeed = 3;
ballRadius = 6;

//score variable
let sc = 0;
let keepScore = 0;
// Animation frame variables
let rightAnimation = null;
let leftAnimation = null;
let last = 0; // For timer timing

let ballInterval = null;

/* -------------------------------------------------------------------------- */
/*                                EVENT LISTNER                               */
/* -------------------------------------------------------------------------- */

//Launch the game when clicking on the launch button
launch.addEventListener("click", () => {
  launchgame();
  console.log("Game launched !"); 
});

//Close the game when clicking on the close button
closebtn.addEventListener("click", () => {
  closegame();
});

//Move the paddle when pressing the left or right arrow keys (on PC)
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

//Move the paddle when pressing the left or right button (with the mouse)
right.addEventListener("mousedown", () => {
  rightAnimation = window.requestAnimationFrame(onRight);
});

// Stop the animation when the mouse button is released
right.addEventListener("mouseup", () => {
  window.cancelAnimationFrame(rightAnimation);
  rightAnimation = null;
});

//Move the paddle when touching the left or right button (on mobile)
right.addEventListener("touchstart", () => {
  rightAnimation = window.requestAnimationFrame(onRight);
});

// Stop the animation when the touch ends
right.addEventListener("touchend", () => {
  window.cancelAnimationFrame(rightAnimation);
  rightAnimation = null;
});

//Move the paddle when pressing the left button (with the mouse)
left.addEventListener("mousedown", () => {
  leftAnimation = window.requestAnimationFrame(onLeft);
});

// Stop the animation when the mouse button is released
left.addEventListener("mouseup", () => {
  window.cancelAnimationFrame(leftAnimation);
  leftAnimation = null;
});

//Move the paddle when touching the left button (on mobile)
left.addEventListener("touchstart", () => {
  leftAnimation = window.requestAnimationFrame(onLeft);
});

// Stop the animation when the touch ends
left.addEventListener("touchend", () => {
  window.cancelAnimationFrame(leftAnimation);
  leftAnimation = null;
});



/* -------------------------------------------------------------------------- */
/*                                  FUNCTIONS                                 */
/* -------------------------------------------------------------------------- */

/**
 * Function to launch the game
 * @return {void}
 */
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


/**
 * Function to launch the timer which counts the seconds the player lasts in the game
 * @return {void}
 */
function launchtimer() {
  lastTime = 0; // Initialize timing variable
  timerAnimation = window.requestAnimationFrame(handleTimer);
}

/**
 * Function to stop the timer, reste the score to 0 and save the last score
 * @return {void}
 */
function stoptimer() {
  keepScore =  sc;
  sc = 0;
  score.textContent = "Score : 0 s";
}

/**
 * function to handle the timer's incrementation, animation and stopping
 * @return {void}
 * @param {*} now 
 */
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

/**
 * Function to draw the paddle on the canvas
 * @param {number} x 
 * @param {number} y 
 */
function drawPaddle(x, y) {
  ctx = canva.getContext("2d");
  ctx.fillStyle = "black";
  
  ctx.fillRect(x, y, paddleSizeX, paddleSizeY); // x, y, width, height
}

/***
 * Function to draw the ball on the canvas
 * @param {number} x 
 * @param {number} y 
 */
function drawBall(x, y){
  ctx = canva.getContext("2d");
  ctx.beginPath();
  ctx.fillStyle = "grey";
  ctx.arc(x, y, 6, 0, 2 * Math.PI);
  ctx.stroke();
}

/**
 * function to stop the game
 * @return {void}
 */
function closegame() {
  ctx = canva.getContext("2d");
  ctx.clearRect(0, 0, canva.width, canva.height);
  gameIsOn = false;
  handleTimer(false);
  if (ballInterval) {
    clearInterval(ballInterval);
    ballInterval = null;
  }
}

/**
 * Function to move the paddle on the right
 * @return {void}
 */
function onRight() {
  if (gameIsOn == true) {
    ctx = canva.getContext("2d");
    newPaddleX = paddleOX + 8;
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

/**
 * Function to move the paddle on the left
 * @return {void}
 */
function onLeft() {
  if (gameIsOn == true) {
    ctx = canva.getContext("2d");
    newPaddleX = paddleOX - 8;
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

/**
 * Function to handle the end of the game, stop it and display the final score
 * @return {void}
 */
function handleEndgame() {
  closegame();
  score.textContent = "You lost the Game ! \n You'll do better next time.\n Here is your score : " + keepScore + " s" ;
}

/**
 * Function to handle the ball's behavior, movement and collisions
 * @return {void}
 */
function handeBallBehavior(){
  //spawn position o the ball
  ballX = canva.width/2;
  ballY = canva.height - 30;

  //the last known coordinates of the ball
  pastX = ballX;
  pastY = ballY;

  //default speed of the ball
  defaultXspeed = 0.025 + Math.random()*2;
  defaultYspeed = -3 + Math.random()*2;

  console.log("Default Xspeed chose : " + defaultXspeed);
  console.log("Default Yspeed chose : " + defaultYspeed);

  ballSpeedX = defaultXspeed;
  ballSpeedY = defaultYspeed;
  
  ballInterval = setInterval(() => {
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
      handleEndagme();
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

/**
 * Function to draw the ball's movement on the canvas
 * @param {*} ballX 
 * @param {*} ballY
 * @returns {void}
 */
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


/**
 * Function to add speed to the ball after each bounce up to (times the original speed)
 * @return {void}
 */
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

/**
 *  Function to select a random number for the ball's initial speed
 * @returns {number} rand A random number between -2 and 2 but not between -1.5 and 1.5
 */
function selectRandNumber(){
  min = -2.0;
  max = 2.0;
  
  rand = Math.floor(Math.random() * (max - min + 1.0)) + min;

  if(rand < 1.5 && rand > -1.5){
    selectRandNumber();
  }
  else{
    return rand;
  }
}
