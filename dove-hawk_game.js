'use strict';
// bird = [鳩鷹, 行先座標, 餌の数]

let maxResource = 100;
let numberOfDove = 10;
let numberOfHawk = 0; 
const birdcage = [];
const prebirdcage = [];
const coordinate = [];
const resourcePlace = []; 

function getRandomCoodinate() {
    coordinate.length = 0;
    let min;
    let max;
    min = Math.ceil(null);
    max = Math.floor(maxResource);
    // 0~maxResourceまでのランダムな数値がcoordinateの末尾に挿入
    for (let i = 0; i < maxResource * 2; i++) {
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
    // console.log(coordinate);
}

// 重複なしランダムな数字maxResource個を生成
function generateRandomNumArray(maxNum, generateArrayLength){
    let generateArray = []; //ランダム格納用配列
    let numberArray = []; //ランダム生成用配列
    //ランダム生成用配列を作成
    for(let i=0; i<maxNum; i++){
        numberArray[i] = i+1;
    }
    //ランダム格納用配列にランダム整数を格納
    for(let j=0,len=numberArray.length; j<generateArrayLength; j++,len--){
        let rndNum = Math.floor(Math.random()*len);
        generateArray.push(numberArray[rndNum]);
        numberArray[rndNum] = numberArray[len-1];
    }
    return generateArray;
}

// 鳥籠を作る
function makeBirdcage() {
    prebirdcage.length = 0;
    for (let i = 0; i <= (numberOfDove + numberOfHawk) - 1; i++) {
        let bird = [];
        if (i <= numberOfDove - 1) {
            bird.push("Dove");
        } else {
            bird.push("Hawk");
        }
        prebirdcage.push(bird);
    }   
    console.log(prebirdcage);
}

// 餌にありつける鳥の数がmaxResource*2以下になるように鷹鳩を無作為抽出
function selectBird() {
    birdcage.length=0;
    if (prebirdcage.length > maxResource*2) {
        let C = 0
        let judgeNumber = generateRandomNumArray(numberOfDove + numberOfHawk, maxResource)
        for (const number of judgeNumber){
            birdcage.push(prebirdcage[number])
            birdcage[number].push(coordinate[C])
            C++
        }
    } else {
        let D = 0;
        for (let i = 0; i <= prebirdcage.length -1; i++) {
            birdcage.push(prebirdcage[i])
            birdcage[i].push(coordinate[D])
            D++
        }
    }
    console.log(birdcage);
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
            if (birdcage[j][1] === i) { 
                if (resourcePlace[i][0] === 0) {
                    resourcePlace[i][0] = birdcage[j];
                } else {
                    resourcePlace[i][1] = birdcage[j];
                }
            }
        }

    }
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
        resourcePlace[i][0].push(1/2);
        resourcePlace[i][1].push(3/2);            
        } else if(resourcePlace[i][0][0] === "Hawk" && resourcePlace[i][1][0] === "Hawk") {
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


