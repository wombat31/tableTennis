var canvas =document.getElementById('canvas');
var ctx = canvas.getContext("2d");

function paddle(x,y,width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.hasCollidedWith = function(ball){
        var paddleLeftWall = this.x;
        var paddleRightWall = this.x + this.width;
        var paddleTopWall = this.y;
        var paddleBottomWall = this.y + this.height;
        if(ball.x > paddleLeftWall && ball.x < paddleRightWall && ball.y > paddleTopWall && ball.y < paddleBottomWall) {
            return true;
        }
        return false;
    };
    this.move = function(keyCode) {
        var nextY = this.y;
        if(keyCode == 40){
            nextY += 5;
        } else if (keyCode == 38){
            nextY += -5
        }
        nextY = nextY < 0 ? 0 : nextY;
        nextY = nextY + this.height> 480 ? 480 -this.height : nextY;
        this.y = nextY;
    };
}

var player = new paddle(5,200, 25, 100);
var ai = new paddle(610,200,25,100);
var ball = {
    x:320,
    y:240,
    radius:3,
    xSpeed:2,
    ySpeed:0,
    reverseX: function(){
        this.xSpeed *= -1;
    },
    reverseY: function(){
        this.ySpeed *= -1;
    }
};

function renderPaddle(paddle){
    ctx.fillStyle="white";
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
}

function renderBall(ball) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0 , 2* Math.PI, false);
    ctx.fillStyle = "white";
    ctx.fill();
}


function tick(){
    updateGame();
    draw();
    window.setTimeout("tick()", 1000/60);
}

function updateGame(){
    ball.x += ball.xSpeed;
    ball.y += ball.ySpeed;
    var collidedWithPlayer = player.hasCollidedWith(ball);
    var collidedwithAi = ai.hasCollidedWith(ball);
    if(player.hasCollidedWith(ball)||ai.hasCollidedWith(ball)){
        ball.reverseX();
    }
    for (var keyCode in heldDown){
        player.move(keyCode);
    }
}
    
function draw(){
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,640,480);
        renderPaddle(player);
        renderPaddle(ai);
        renderBall(ball);
}

var heldDown = {};
window.addEventListener("keydown",function(keyInfo){
    heldDown[event.keyCode] = true;
}, false);
window.addEventListener("keyup", function(keyInfo){
    delete heldDown[event.keyCode];
}, false);
tick();
