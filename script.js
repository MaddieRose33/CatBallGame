/* 
    Developer Madison Rose
    Peanut Pong
*/

/* Variables */
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext('2d');

var x = canvas.width/2; /* Center the ball */
var y = canvas.height - 90; 
var dx = 2;
var dy = -2;
var ballRadius = 50;
var paddleHeight = 15;
var paddleWidth = 140;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 7;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 2;

var bricks = [];
for (c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for (r=0; r<brickRowCount; r++) {
        bricks[c][r] = {x:0, y:0, status: 1};
    }
}

document.addEventListener("keydown", keyDownHandler);
document.addEventListener("keyup", keyUpHandler);

function drawBricks(){
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "blue";
                ctx.fill();
                ctx.closePath();
            }    
        }
    }
}

function keyDownHandler(e) {
    if(e.keyCode == 39) { // Right arrow
        rightPressed = true;
    } else if(e.keyCode == 37) { // Left arrow
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) { // Right arrow
        rightPressed = false;
    } else if(e.keyCode == 37) { // Left arrow
        leftPressed = false;
    }
}

var catImg = document.createElement('img');
catImg.src = "peanutfloating.png";

var paddleImg = document.createElement('img');
paddleImg.src = "paddle.png";


function drawBall() {
    ctx.beginPath();
    //ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    //ctx.fillStyle = "peanut.jpeg";
    ctx.drawImage(catImg, x, y, ballRadius, Math.PI*13);

   // ctx.drawImage(catImg, x, y, ballRadius);
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    //ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.drawImage(paddleImg, paddleX, canvas.height-paddleHeight);
    //ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) { // They win
                        alert("You win!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

// function peanutCheats() {
//     ctx.font = "16px Arial";
//     ctx.fillStyle = "black";
//     ctx.fillText("Guys keep your eye on the ball Peanut the cat cheats sometimes lol", 9, 20);
// }

function author() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Game Developer - Madison Rose", 300, 20);
}

function website() {
    ctx.font = "45px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText("CatsCraftMC.com", 150, 300);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width-65, 20);
}

function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    website();
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();
    drawScore();
    author();

    drawLives();
    

    if(y + dy < ballRadius-50) { // ball top of canvas
        dy = -dy;
    } else if((x > paddleX && x < paddleX + paddleWidth) && (y + dy > canvas.height-ballRadius -3)) { // WHEN YOU WANT THE GAME TO END EDIT CODE HERE!
        dy = -dy;
    } else if (y + dy > canvas.height-ballRadius +15) {
        lives--;
        if(!lives) { // if you have positive numbers
            dy = -dy;
            alert("Peanut wins!");
            document.location.reload();
        } else {
            // Reset the values
            x = canvas.width/2;
            y = canvas.height-90;
            dx = 2;
            dy = -2;
            paddleX = (canvas.width-paddleWidth)/2;
        }
    }
   
        
        ///dy = -dy;
        //document.location.reload();
    
    if((x + dx < 0) || (x + dx > canvas.width -ballRadius)) {
        dx = -dx;
    }

    // paddle
    if(rightPressed && paddleX < canvas.width-paddleWidth -15) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 15) {
        paddleX -= 7;
    }
    

    x += dx;
    y += dy;

    //requestAnimationFrame(draw);
}

document.addEventListener("mousemove", mouseMoveHandler);

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if((relativeX > 0+paddleWidth/2) && (relativeX < canvas.width - paddleWidth/2)) {
        paddleX = relativeX - paddleWidth/2;
    }
}

setInterval(draw, 6);
//draw();