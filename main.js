'use strict';
// bird = [行先座標, 鳩鷹, 餌の数]

let maxResource = 100;
let numberOfDove = 10;
let numberOfHawk = 101; 
const birdcage = [];
const coordinate = [];
const resourcePlace = []; 

function getRandomCoodinate() {
    coordinate.length = 0;
    let min;
    let max;
    min = Math.ceil(1);
    max = Math.floor(maxResource);
    // 0~maxResourceまでのランダムな数値がcoordinateの末尾に挿入
    for (let i = 0; i <= (max - min); i++) {
        let num = 0;
        coordinate.push(Math.floor(Math.random() * (max - min) + min));
        // coodinate[0]~coordinate[最終一個前]までの間に末尾の要素が存在しないか調査
        // あった場合、numに追加、num>2のとき（同じ数字が３つ以上の時）末尾の要素を削除しランダム数生成からやり直す
        for (let j = 0; j <= coordinate.length - 2; j++) {
            if (coordinate[coordinate.length - 1] === coordinate[j]) {
                num++;
                if (num === 2) {
                    coordinate.pop();
                    i--;
                 }
            } 
        }
    }
    // return coordinate;
}

// 鳥籠を作る
function makeBirdcage() {
    birdcage.length = 0;
    for (let i = 0; i <= (numberOfDove + numberOfHawk) - 1; i++) {
        let bird = [];
        bird.push(coordinate[i]);
        if (i <= numberOfDove - 1) {
            bird.push("Dove");
        } else {
            bird.push("Hawk");
        }
        birdcage.push(bird);
    }   
    // return birdcage;
}

// 餌場を作る
function makeResourcePlace() {
    resourcePlace.length = 0;
    for (let i = 0; i <= maxResource - 1; i++) {
        resourcePlace.push([0, 0]);
    }
    // return resourcePlace;
}

// 鳥をresourcePlaceに配置
function launchBirds() {
    for (let i = 0; i <= maxResource; i++) {
        for (let j = 0; j <= birdcage.length - 1; j++) {
            if (birdcage[j][0] === i) { 
                if (resourcePlace[i][0] === 0) {
                    resourcePlace[i][0] = birdcage[j];
                } else {
                    resourcePlace[i][1] = birdcage[j];
                }
            }
        }

    }
    // return resourcePlace;
}

//鳥を戦わせて餌の取り分を決める
function fightBirds() {
    for (let i = 0; i <= resourcePlace.length - 1; i++) {
        if (resourcePlace[i][0][1] === "Dove" && resourcePlace[i][1] === 0) {
            resourcePlace[i][0].push(2);
        } else if (resourcePlace[i][0][1] === "Hawk" && resourcePlace[i][1] === 0) {
            resourcePlace[i][0].push(2);
        } else if (resourcePlace[i][0][1] === "Dove" && resourcePlace[i][1][1] === "Dove") {
            resourcePlace[i][0].push(1);
            resourcePlace[i][1].push(1);
        } else if(resourcePlace[i][0][1] === "Dove" && resourcePlace[i][1][1] === "Hawk") {
            resourcePlace[i][0].push(1/2);
            resourcePlace[i][1].push(3/2);            
        } else if(resourcePlace[i][0][1] === "Hawk" && resourcePlace[i][1][1] === "Dove") {
        resourcePlace[i][0].push(1/2);
        resourcePlace[i][1].push(3/2);            
        } else if(resourcePlace[i][0][1] === "Hawk" && resourcePlace[i][1][1] === "Hawk") {
        resourcePlace[i][0].push(0);
        resourcePlace[i][1].push(0);            
        }
    }
    // return resourcePlace;
}

// 鳥の命運を決める
function judgeLife(Resource) {
    if (Resource === 0) {
        return - 1;
    } else if (Resource === 1/2) {
        return - Math.round(Math.random());
    } else if (Resource === 1) {
        return 0;
    } else if (Resource === 3/2) {
        return Math.round(Math.random());
    } else if (Resource === 2) {
        return 1;
    }      
}

//全体数に反映
function judgementDay() {
    for (let i = 0; i <= resourcePlace.length - 1; i++) {
        if (resourcePlace[i][0] !== 0) {
            if (resourcePlace[i][0][1] === "Dove") {
                numberOfDove = numberOfDove + judgeLife(resourcePlace[i][0][2]);
            } else if (resourcePlace[i][0][1] === "Hawk") {
                numberOfHawk = numberOfHawk + judgeLife(resourcePlace[i][0][2]);
            }
        } else if (resourcePlace[i][1] !== 0) {
            if (resourcePlace[i][1][1] === "Dove") {
                numberOfDove = numberOfDove + judgeLife(resourcePlace[i][1][2]);
            } else if (resourcePlace[i][2][1] === "Hawk") {
                numberOfHawk = numberOfHawk + judgeLife(resourcePlace[i][1][2]);
            }
        }
    }
    console.log(numberOfHawk)
}



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


const day1 = [100, 100, 60, 50];
const day2 = [], day3 = [], day4 = [], day5 = [];
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
        update();
        draw();
        countFrame += 1;
            if (countFrame % 10 === 0) {
            day += 1;
            getRandomCoodinate();
            makeBirdcage();
            makeResourcePlace();
            launchBirds();
            fightBirds();
            judgementDay();
            console.log(`Days ${day}`);
            console.log(`Dove : ${numberOfDove}`);
            console.log(`Hawk : ${numberOfHawk}`);
            }
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
  // g.clearRect(0, 0, 800, 800);
  g.beginPath();
  g.moveTo(100, 100);
  g.lineTo(100, 400); 
  g.stroke();
  g.beginPath(); 
  g.moveTo(100, 100); 
  g.lineTo(400, 100); 
  g.stroke(); 
  
    g.fillStyle = "black"; 
    g.fillRect(day1[0],day1[1],day1[2],day1[3]);
  
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


const start = document.getElementById("start");
start.addEventListener("click", startEverything);
const stop1 = document.getElementById("stop");
stop1.addEventListener("click", stop);

