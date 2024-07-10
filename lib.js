var word = [
    ["run", "mouse", "apple", "jump", "swim", "snow", "sun", "play", "pen", "write"],
    ["drive", "note", "read", "walk", "type", "orange", "eat", "paint", "rain", "learn"],
    ["teach", "barley", "soccer", "shower", "sing", "monitor", "grape", "watch", "study", "run"],
    ["dance", "draw", "kick", "listen", "line", "potato", "watch", "remember", "cook", "explore"],
    ["plant", "brush", "travel", "bake", "jump", "gust", "discover", "visit", "swim", "run"]
];
var stage;
var sel; //level을 선택할 select box
var hpBox;//hp를 동적으로 추가하게 될 div
var scoreBox; //점수를 출력할 div
var keyword; //텍스트 입력 박스
var score = 0;//점수
var level = 0; //게이머의 현재 레벨을 표현하는 변수, 우리 게임은 0~4 레벨까지있다
var spanArray = []; //단어 10개의 span을 모아놓을 배열..
var stepY = 5; //몇 걸음씩 내려올지를 결정하는 변수
var flag = false; //단어가 움직일지 여부를 결정짓는 논리값 변수!!!
var hpArray = []; // HP div elements array
var moveInterval; // Interval ID for move function
var intervalId = null;

//화면에 등장할 단어를 감쌀 태그 생성
function createWord() {
    for (var i = 0; i < word[level].length; i++) {
        var span = document.createElement("span");
        span.innerHTML = word[level][i];
        span.style.position = "absolute";
        span.style.left = (i * 95) + 30 + "px";
        span.style.top = getRandomBetween(-150, 0) + "px";
        span.style.fontFamily = "Ubuntu"
        stage.appendChild(span);
        spanArray.push(span);
    }
}

//단어 내려오기 함수 
function move() {
    if (flag) {
        var len = spanArray.length;
        for (var i = 0; i < len; i++) {
            spanArray[i].style.top = parseInt(spanArray[i].style.top) + stepY + "px";
            if (parseInt(spanArray[i].style.top) >= 690) {
                // Remove all current words
                for (var j = 0; j < spanArray.length; j++) {
                    if (spanArray[j].parentNode === stage) {
                        stage.removeChild(spanArray[j]);
                    }
                }
                spanArray = [];

                // Remove one hp from hpBox
                if (hpArray.length > 0) {
                    var hp = hpArray.pop();
                    if (hp.parentNode === hpBox) {
                        hpBox.removeChild(hp);
                    }
                }

                // Check if hpArray is empty
                if (hpArray.length === 0) {
                    alert("Game Over");
                    score = 0;
                    printScore();
                    flag = false;
                    createHp();
                }
                return;
            }
        }
    }
}

function startGame() {
    if (!flag) {
        createWord();
        flag = true;
        if (!moveInterval) {
            moveInterval = setInterval(move, 100);
        }
    }
}

//레벨을 선택할 옵션을 동적으로 생성 
function createLevelOption() {
    for (var i = 0; i < word.length; i++) {
        var op = document.createElement("option");
        op.text = "Level " + (i + 1);
        op.value = i;
        op.style.fontFamily = 'Black Han Sans';
        op.style.fontSize = '20px';
        sel.add(op);
    }
}

//hp 생성하기 
function createHp() {
    for (var i = 0; i < 3; i++) {
        var hp = document.createElement("div");
        hp.style.width = 60 + "px";
        hp.style.height = 60 + "px";
        hp.style.background = "#ff5f5f";
        hp.style.float = "left";
        hp.style.margin = "2px";
        hp.style.borderRadius = "10px";
        hpBox.appendChild(hp);
        hpArray.push(hp);
    }
}

//점수를 출력하는 함수 
function printScore() {
    scoreBox.style.fontFamily = "Black Han Sans";
    scoreBox.style.color = "#fff"
    scoreBox.innerHTML = score;
}

function init() {
    stage = document.getElementById("stage");
    sel = document.getElementById("sel");
    hpBox = document.getElementById("hpBox");
    scoreBox = document.getElementById("scoreBox");
    keyword = document.getElementById("keyword");

    keyword.addEventListener("keyup", function (e) {
        if (e.keyCode == 13) {
            for (var i = 0; i < word[level].length; i++) {
                if (keyword.value == word[level][i]) {
                    stage.removeChild(spanArray[i]);
                    score += 10;
                    printScore();
                }
            }
            keyword.value = "";
        }
    });

    sel.addEventListener("change", function () {
        level = parseInt(sel.value);
        if (flag) {
            clearInterval(moveInterval);
            spanArray.forEach(function (span) {
                stage.removeChild(span);
            });
            spanArray = [];
            createWord();
            moveInterval = setInterval(move, 100);
        }
    });
}

function getRandomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.addEventListener("load", function () {
    init();
    createLevelOption();
    createHp();
    printScore();
});
