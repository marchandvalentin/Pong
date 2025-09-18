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



left.addEventListener("mousedown", () => {
   leftInterval = setInterval(onLeft, 50);
});

left.addEventListener("mouseup", () => {
   clearInterval(leftInterval);
});

//Function to launch the game
function launchgame() {

    paddleOX = 300;
    paddleOY = 380;
    drawPaddle(paddleOX, paddleOY);
    console.log("Game started");
    gameIsOn = true;
 
  //alert("Lancement de la partie");//temp
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
}

//Function to move the paddle on the right
function onRight() {
    ctx = canva.getContext("2d");
    newPaddleX = paddleOX + 30;
    if (newPaddleX + paddleSizeX <= canva.width) {
        ctx.clearRect(paddleOX, paddleOY, paddleSizeX, paddleSizeY);  
        drawPaddle(newPaddleX, paddleOY);
        paddleOX = newPaddleX;
    }

}

//Function to move the paddle on the left
function onLeft() {
    ctx = canva.getContext("2d");
    newPaddleX = paddleOX - 30;
    if (newPaddleX >= 0) {
        ctx.clearRect(paddleOX, paddleOY, paddleSizeX, paddleSizeY);  
        drawPaddle(newPaddleX, paddleOY);
        paddleOX = newPaddleX;
    }
}
