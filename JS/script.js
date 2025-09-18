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


right.addEventListener("click", () => {
    onRight();
});

left.addEventListener("click", () => {
    onLeft();
});

//Function to launch the game
function launchgame() {

    drawPaddle(50, 30);
    console.log("Game started");
    gameIsOn = true;
 
  //alert("Lancement de la partie");//temp
}

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
    initX = 
    initY;

}

//Function to move the paddle on the left
function onLeft() {
    
}
