
window.onload = ()=>{

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d"); // 2D描画コンテキスト

//縁の半径を変数化しておく
var ballRadius = 20;
//スタート位置
var x = canvas.width/2-20;
var y = canvas.height-50;
//移動幅
var dx = 2;
var dy = -2;
//パドル
var paddleHeight = 10;
var paddleWidth = 100;
var paddleX = (canvas.width-paddleWidth)/2;
//パドル操作
var rightPressed = false;
var leftPressed = false;

//ブロック
var brickRowCount = 4;
var brickColumnCount = 5;
var brickWidth = 80;
var brickHeight = 70;
var brickPadding = 5;
var brickOffsetTop = 30;
var brickOffsetLeft = 10;

//スコア
var score = 0;
//start
var startPressed = false;
var finishFLG = false;

    // 画像読み込み
    var cheese = new Image();
    cheese.src = "./img/game/cheese.png";  
    var mouse = new Image();
    mouse.src = "./img/game/mouse.png";  

//回転用
    var angle = 0;
    var rad = 0;
    const map = [-30, -45, -25, 25, 30, 45];
      
//brock生成
let mapRow = [0,1,1,1];
let finishscore =0;
function randomBrock(){
    let i = mapRow[Math.floor(Math.random()*4)];
    finishscore += i ;
    console.log(finishscore);
    return { x: 0, y: 0, status: i };
}
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = randomBrock();//{ x: 0, y: 0, status: 1 };
    // console.log(bricks[c][r]);
  }
}

var interval;


//パドル操作用
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

//start stop
document.addEventListener("keydown", StartHandler, false);
function StartHandler(e) {
    if(e.key == " " && !finishFLG) {
        startPressed = !startPressed;
        // id属性で要素を取得
        let over_element = document.getElementById('Overlay1');
        over_element.classList.toggle("fullOverlay");
        over_element.classList.toggle("noneOverlay");
    }
    console.log(x,y,angle);
}
//finish
function finishGame(clear) {
    console.log('finish');
        //stop
        startPressed = !startPressed;
        finishFLG = true;
        clearInterval(interval); 
        //link text show
        document.getElementById('RestartButton').innerHTML = "<span class='material-icons md-48'>restart_alt</span>";
        document.getElementById('GotoMainButton').innerHTML = "<span class='material-icons md-48'>verified</span>";
        

        //change message
        var message = ""
        if(clear==1){
            message = 'Wow, CONGRATULATIONS !';
        }else{
            message = 'Oh........Game Over';
        }
        document.getElementById('FinMessage').textContent = message;
        //show
        let over_element = document.getElementById('Overlay2');
        over_element.classList.toggle("fullOverlay");
        over_element.classList.toggle("noneOverlay");
    //document.location.reload();
}

//ブロックへの衝突検知
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    angleRotate();
                    if(score == finishscore) {
                        finishGame(1);
                        //setTimeout(alert("YOU WIN, CONGRATULATIONS!"), 5000);
                        //document.location.reload();
                        //clearInterval(interval); // Needed for Chrome to end game
                }
            }
        }
    }
  }
}

function drawMouse() {
    // const cheese = new Image();
    // cheese.src = "./img/game/cheese.png";  // 画像のURLを指定
    // cheese.onload = () => {

        // 角度をラジアンに変換
        rad = angle * Math.PI/180;
        ctx.save();

        // 回転の中心位置を計算（画像の中心を回転中心にする）
    var cx = x + mouse.width/2;
    var cy = y + mouse.height/2;
// 画像を回転
    ctx.setTransform(Math.cos(rad), Math.sin(rad), -Math.sin(rad), Math.cos(rad),cx-cx*Math.cos(rad)+cy*Math.sin(rad),cy-cx*Math.sin(rad)-cy*Math.cos(rad));

    	// ctx.translate( canvas.width/2, canvas.height/2 ) ;
        // ctx.rotate( ++degree * Math.PI / 180 ) ;
        // ctx.translate( -canvas.width/2, -canvas.height/2 ) ;
        //ctx.drawImage(mouse, canvas.width-100, 0);
        ctx.drawImage(mouse, x, y);
        ctx.restore();

        // 回転角度を変化させる
// angle ++;
// if(angle > 360) angle = 0;

    // };
}
function drawBall() {
    
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI*2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

 //   ctx.drawImage(mouse, x-20, y-20);


}

function drawPaddle() {
ctx.beginPath();
ctx.rect(paddleX, canvas.height-paddleHeight-2, paddleWidth, paddleHeight);
ctx.fillStyle = "#4D4913";
ctx.fill();
ctx.closePath();
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.drawImage(cheese, brickX, brickY);
                // ctx.beginPath();
                // ctx.rect(brickX, brickY, brickWidth, brickHeight);
                // ctx.fillStyle = "#FFF240";
                // ctx.fill();
                // ctx.closePath();
            }
        }
    }
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#4d4913";
    ctx.fillText(score +" Cheese ", 10, 20);
  }

function angleRotate() {
    var v = map[Math.floor(Math.random() * 6)];
    angle += v;
    if(angle > 360) angle = 0;
}

//インターバルを持って再絵画していく
function draw() {
ctx.clearRect(0, 0, canvas.width, canvas.height);
drawBricks();
//drawBall(); //デバック赤い点でxyをしめす
drawPaddle();
drawScore();
collisionDetection();
drawMouse();

//ボール弾む
  //横壁
if(x  > canvas.width-(ballRadius*2) || x  < 0) {
dx = -dx;
angleRotate();
}
  //上端はheight=０
if(y  < 0 ) {
    dy = -dy;
    angleRotate();
} 
  //パドルに接したら折り返す
else if(y  > canvas.height-paddleHeight  - (ballRadius*2)) { //600-10-20=570
    if(x+ballRadius > paddleX && x+ballRadius < paddleX + paddleWidth) { //
        dy = -dy;
        angleRotate();
    }
    else if(y  > canvas.height ) {
        finishGame(0);
        //setTimeout(alert("GAME OVER"), 7000);
        //document.location.reload();
        //clearInterval(interval); // Needed for Chrome to end game
    }
    }
//パドル操作
if(rightPressed && paddleX < canvas.width-paddleWidth) {
    paddleX += 7;
}
else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
}

if(startPressed) {
    x += dx;
    y += dy;
    }

    if(startPressed &&y  >= canvas.height-paddleHeight  - (ballRadius*2)) {
        console.log(x,y);
        }

}


    cheese.onload = () => {
        mouse.onload = () => {
            
            interval = setInterval(draw, 15);

            // // id属性で要素を取得
            // var main_element = document.getElementById('main');
            // // 新しいHTML要素を作成
            // var over_element = document.createElement('div');
            // over_element.id = '#fullOverlay';
            // // 指定した要素の後に挿入
            // main_element.after(over_element);

            
        };
    };
  };

