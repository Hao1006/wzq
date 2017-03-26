/**
 * Created by TF on 2017/3/26.
 */
let cv = document.getElementById("chessboard");
let cx = cv.getContext("2d");
let tip = document.getElementById("tip");
let black = true; //棋子颜色
let count = 0;//胜利方法
let playerWin = [];
let aiWin = [];
let gameOver = false;

//存储棋子
let chessBoard = [];
for (let i =0; i  < 15; i ++) {
    chessBoard[i] = [];
    for (let j = 0; j < 15; j++) {
        chessBoard[i][j] = 0;
    }
}

//初始化胜利数组
let wins = [];
for (let i = 0; i < 15; i ++) {
    wins[i] = [];
    for (let j = 0; j < 15; j++) {
        wins[i][j] = [];
    }
}

//横向的所有胜利方法
for (let i =0; i < 15; i ++) {     //胜利方法的纵坐标
    for (let j = 0; j < 11; j ++) {     //胜利方法的横坐标
        for (let m = 0; m < 5; m++) {    //棋子的连续个数
            wins[i][j + m][count] = true;   //横线上连续5颗棋子
        }
        count ++ ;   //胜利方法 + 1
    }
}

//纵向的胜利方法
for (let i =0; i < 11; i ++) {
    for (let j = 0; j < 15; j ++) {
        for (let m = 0; m < 5; m++) {
            wins[i + m][j ][count] = true;
        }
        count ++ ;
    }
}

//斜向的胜利方法
for (let i =0; i < 11; i ++) {
    for (let j = 0; j < 11; j ++) {
        for (let m = 0; m < 5; m++) {
            wins[i + m][j + m][count] = true;
        }
        count ++ ;
    }
}

//反斜向的胜利方法
for (let i =0; i < 11; i ++) {
    for (let j = 14; j > 3; j --) {
        for (let m = 0; m < 5; m++) {
            wins[i + m][j - m][count] = true;
        }
        count ++ ;
    }
}

for (let i =0; i < count; i++) {
    playerWin[i] = 0;
    aiWin[i] = 0;
}

window.onload = function () {
    let cv = document.getElementById("chessboard");
    let cx = cv.getContext("2d");
    drawBoard();
}

//画棋盘
function drawBoard() {
    for (let i = 0; i < 15; i++) {
        cx.moveTo(15 + i * 30, 15);
        cx.lineTo(15 + i * 30, 435);
        cx.stroke();
        cx.moveTo(15, 15 + i * 30);
        cx.lineTo(435, 15 + i * 30);
        cx.stroke();
    }
}

//棋子的实现
function onStep(i, j, black) {
    let grd = cx.createRadialGradient(15 + i * 30 + 2, 15 + j * 30 - 2, 13, 15 + i * 30, 15 + j * 30, 0);
    if (black) {
        grd.addColorStop(0, "#0A0A0A");
        grd.addColorStop(1, "#636766");
    } else {
        grd.addColorStop(0, "#D1D1D1");
        grd.addColorStop(1, "#F9F9F9");
    }
    cx.fillStyle = grd;
    cx.beginPath();
    cx.arc(15 + i * 30, 15 + j * 30, 13 ,0, 2 * Math.PI);
    cx.fill();
}

//点击落子
cv.onclick = function (e) {
    if (gameOver) {
        return;
    }
    let x = e.offsetX;
    let y = e.offsetY;

    //落子判定范围
    let i = Math.floor( x / 30 );
    let j = Math.floor( y / 30 );

    //判断点击的位置上是否有棋子
    if (chessBoard[i][j] == 0) {
        onStep(i, j, black);
        if (black) {
            chessBoard[i][j] = 1;
            tip.innerHTML = "白棋下";
        }else {
            chessBoard[i][j] = 2;
            tip.innerHTML = "黑棋下";
        }
        black = !black;
        for (let k = 0; k < count; k ++) {
            if (wins[i][j][k]) {     //判断是否有棋子
                playerWin[k] ++;
                aiWin[k] = 6;
                if (playerWin[k] == 5) {
                    window.alert("你赢了");
                    gameOver = true;
                }
            }
        }
    }
}
