/**
 * Created by TF on 2017/3/26.
 */
let cv = document.getElementById("chessboard");
let cx = cv.getContext("2d");
let black = true;

//存储棋子
let chessBoard = [];
for (let i =0; i  < 15; i ++) {
    chessBoard[i] = [];
    for (let j = 0; j < 15; j++) {
        chessBoard[i][j] = 0;
    }
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
        }else {
            chessBoard[i][j] = 2;
        }
        black = !black;
    }
}
