launch = document.getElementById("launch");
closebtn = document.getElementById("close");
canva = document.getElementById("pongCanva");
score = document.getElementById("score");

launch.addEventListener("click", () => {
  launchgame();
});

closebtn.addEventListener("click", () => {
    closegame();
}); 

//Function to launch the game
function launchgame() {

    drawPaddle();
    console.log("Game started");
 
  //alert("Lancement de la partie");//temp
}

function drawPaddle(x, y) {

  ctx = canva.getContext("2d");
  ctx.fillStyle = "black";
  paddleSizeX = 200;
  paddleSizeY = 10;
  ctx.fillRect(canva.width/2-paddleSizeX/2, canva.height - 25, paddleSizeX, paddleSizeY); // x, y, width, height
}

//Fucntion to stop the game
function closegame() {
    ctx = canva.getContext("2d");
    ctx.clearRect(0, 0, canva.width, canva.height);  
}

//Function to move the paddle on the right
function onRight() {}

//Function to move the paddle on the left
function onLeft() {}
