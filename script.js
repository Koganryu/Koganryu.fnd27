'use strict';
// bird = [鳩鷹, 行先座標, 餌の数]

// function main(days) {
//     for (let day = 1; day <= days; day++) {
//         getRandomCoodinate();
//         makeBirdcage();
//         makeResourcePlace();
//         launchBirds();
//         fightBirds();
//         judgementDay();
//         console.log(`Days ${day}`);
//         console.log(`Dove : ${numberOfDove}`);
//         console.log(`Hawk : ${numberOfHawk}`);
//     }
// } 
// main(10);
let canvas, g, goal, countFrame;
let dove, hawk, particles, moon, castle, day;
let count;
let scene;
let situation = true;
let interval;
const daylist = [0];
const changingOfDove = [numberOfDove]
const changingOfHawk = [numberOfHawk]



// シーンの定義
const Scenes = {
  GameMain: "GameMain",
  GameOver: "GameOver",
};


const startEverything = function () {
    // 描画コンテキストの取得
    canvas = document.getElementById("gamecanvas");
    g = canvas.getContext("2d");

    // 初期化
    init();
    // ゲームループの設定 60FPS
    balanceChart()
    interval = setInterval("gameloop()", 100);
};

function stop() {
  if (situation) {
    situation = false;
  } else {
    situation = true;
    interval = setInterval("gameloop()", 100);
  }
}

function init() {
    // 自キャラ初期化
    dove = new Player(100, 400, 16, "./reimu.png", 0, 0);

    // 敵キャラ初期化
    goal = [50, 50];
    scene = Scenes.GameMain;
    countFrame = 0;
    day = 0;
}

function gameloop() {  
    if (situation){
      // g.clearRect(0, 0, 800, 800);
      update();
      draw();
      countFrame += 1;
        if (countFrame % 10 === 0) {
          day += 1;
          daylist.push(day);
          getRandomCoodinate();
          makeBirdcage();
          selectBird();
          makeResourcePlace();
          launchBirds();
          fightBirds();
          judgementDay();
          console.log(`Days ${day}`);
          console.log(`Dove : ${numberOfDove}`);
          console.log(`Hawk : ${numberOfHawk}`);
          }
          changingOfDove.push(numberOfDove);
          changingOfHawk.push(numberOfHawk);
          chart.data.labels = changingOfDove;
          chart.data.labels = changingOfHawk;
          chart.update()
          
        } else {
        clearInterval(interval);
    }
}

function update() {
  // ゲームプレイ中
  if (scene == Scenes.GameMain) {
    dove.posx = dove.posx + (goal[0] - dove.posx) / 32;
    dove.posy = dove.posy + (goal[1] - dove.posy) / 32;
   
    if (dove.posx === goal[0]) {
        dove.posx === goal[0];
    }
   // ゲームオーバー中
  } 
}

function draw() {
  // g.beginPath();
  // g.moveTo(100, 100);
  // g.lineTo(100, 400); 
  // g.stroke();
  // g.beginPath(); 
  // g.moveTo(100, 100); 
  // g.lineTo(400, 100); 
  // g.stroke(); 
  
  //   g.fillStyle = "black"; 
  //   g.fillRect(day1[0],day1[1],day1[2],day1[3]);
  
  // 背景描写
  // g.fillStyle = "black"; 
  // g.fillRect(0,0,800,800);
  // g.imageSmoothingEnabled = false;
  
    // // ゲームプレイ中
    // if (scene == Scenes.GameMain) {
  
    //     g.drawImage(
    //         dove.image,
    //         dove.posx,
    //         dove.posy = dove.posy
    //       );
  
    //   // ゲームオーバー中
    // }
} 

  
//  プレイヤークラス
class Player {
  baseLine = 400;

  constructor(posx, posy, r, imageUrl, speed) {
    this.posx = posx;
    this.posy = posy;
    this.r = r;
    this.image = new Image();
    this.image.src = imageUrl;
    this.speed = speed;
    }

  update() {
    // 自キャラの状態更新
    this.speed = this.speed + this.acceleration;
    this.posy = this.posy + this.speed;
    if (this.posy > this.baseLine) {
      this.posy = this.baseLine;
      this.speed = 0;
      this.acceleration = 0;
    }
  }
}


// const ctx2d = document.getElementById('gamecanvas').getContext('2d');



const start = document.getElementById("start");
start.addEventListener("click", startEverything);
const stop1 = document.getElementById("stop");
stop1.addEventListener("click", stop);