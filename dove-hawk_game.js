'use strict';
// bird = [鳩鷹, 行先座標, 餌の数]

let maxResource = 100;
let numberOfDove = 10;
let numberOfHawk = 0; 
let birdcage = [];
let prebirdcage = [];
let coordinate = [];
let resourcePlace = []; 

function getRandomCoodinate() {
    
    console.log(coordinate)
    let min;
    let max;
    min = Math.ceil(null);
    max = Math.floor(maxResource);
    // 0~maxResourceまでのランダムな数値がcoordinateの末尾に挿入
    for (let i = 0; i < numberOfDove + numberOfHawk; i++) {
        coordinate.push(Math.floor(Math.random() * (max - min) + min));        
    }
    // console.log(coordinate);
}

// 鳥籠を作る
function makeBirdcage() {
    
    // console.log(birdcage);
    for (let i = 0; i <= (numberOfDove + numberOfHawk) - 1; i++) {
        let bird = [];
        if (i <= numberOfDove - 1) {
            bird.push("Dove");
            bird.push(coordinate[i]);
            // console.log(bird);
        } else if (numberOfDove - 1 < i){
            bird.push("Hawk");
            bird.push(coordinate[i]);
        } else{}
        birdcage.push(bird);
    }   
    console.log(birdcage);
}
function arrayShuffle() {
    for(let i = (birdcage.length - 1); 0 < i; i--){
      let r = Math.floor(Math.random() * (i + 1));

      let tmp = birdcage[i];
      birdcage[i] = birdcage[r];
      birdcage[r] = tmp;
    }
}
  

// 餌場を作る
function makeResourcePlace() {
    for(let i=0; i < birdcage.length - 1; i++) {
        arrayShuffle();
    }
    for (let i = 0; i <= maxResource - 1; i++) {
        resourcePlace.push([0, 0]);
    }
    // return resourcePlace;
}

// 鳥をresourcePlaceに配置
function launchBirds() {
    for (let i = 0; i <= numberOfDove + numberOfHawk; i++) {
        for (let j = 0; j <= birdcage.length - 1; j++) {
            if (birdcage[j][1] === i) { 
                if (resourcePlace[i][0] === 0) {
                    resourcePlace[i][0] = birdcage[j];
                } else if (resourcePlace[i][1] === 0){
                    resourcePlace[i][1] = birdcage[j];
                } else {
                    if (birdcage[j][0] === "Dove") {
                        numberOfDove--;
                    } else if (birdcage[j][0] === "Hawk") {
                        numberOfHawk--;
                    }
                }
            }
        }


    }
    // console.log(resourcePlace);
}

//鳥を戦わせて餌の取り分を決める
function fightBirds() {
    for (let i = 0; i <= resourcePlace.length - 1; i++) {
        if (resourcePlace[i][0][0] === "Dove" && resourcePlace[i][1] === 0) {
            resourcePlace[i][0].push(2);
        } else if (resourcePlace[i][0][0] === "Hawk" && resourcePlace[i][1] === 0) {
            resourcePlace[i][0].push(2);
        } else if (resourcePlace[i][0][0] === "Dove" && resourcePlace[i][1][0] === "Dove") {
            resourcePlace[i][0].push(1);
            resourcePlace[i][1].push(1);
        } else if(resourcePlace[i][0][0] === "Dove" && resourcePlace[i][1][0] === "Hawk") {
            resourcePlace[i][0].push(1/2);
            resourcePlace[i][1].push(3/2);   
        } else if(resourcePlace[i][0][0] === "Hawk" && resourcePlace[i][1][0] === "Dove") {
            resourcePlace[i][0].push(3/2);
            resourcePlace[i][1].push(1/2);    
        } else if(resourcePlace[i][0][0] === "Hawk" && resourcePlace[i][1][0] === "Hawk") {
            resourcePlace[i][0].push(0);
            resourcePlace[i][1].push(0);            
        }
    }
    // console.log(resourcePlace);
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
            if (resourcePlace[i][0][0] === "Dove") {
                numberOfDove = numberOfDove + judgeLife(resourcePlace[i][0][2]);
            } else if (resourcePlace[i][0][0] === "Hawk") {
                numberOfHawk = numberOfHawk + judgeLife(resourcePlace[i][0][2]);
            }
        } else if (resourcePlace[i][1] !== 0) {
            if (resourcePlace[i][1][0] === "Dove") {
                numberOfDove = numberOfDove + judgeLife(resourcePlace[i][1][2]);
            } else if (resourcePlace[i][2][0] === "Hawk") {
                numberOfHawk = numberOfHawk + judgeLife(resourcePlace[i][1][2]);
            }
        }
    }
}


