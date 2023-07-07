var holdButton = document.querySelector(".btn-hold");
var rollButton = document.querySelector(".btn-roll");

var diceImg = document.querySelector(".dice");

var p1Score = document.querySelector(".p1-score");
var p2Score = document.querySelector(".p2-score");

var p1Name = document.querySelector(".p1-name");
var p2Name = document.querySelector(".p2-name");

var p1_currScore = document.querySelector(".p1-curr");
var p2_currScore = document.querySelector(".p2-curr");

var limit = document.querySelector(".dice-limit");

var gameButton = document.querySelector(".btn-new");

var players = {
    player_1: {
        mainScore: 0,
        currScore: 0
    },
    player_2: {
        mainScore: 0,
        currScore: 0
    },
    currentPlayer: 1
}

var { player_1, player_2, currentPlayer } = players;

function gameOver() {
    var score = limit.value;
    return score;
}

function holdDice() {
    if (currentPlayer === 1) {
        if (p1Score.parentElement.classList.contains("active")) {
            p1Score.parentElement.classList.remove("active");
        }
        p2Score.parentElement.classList.add("active");
        currentPlayer = 2;
        player_1.mainScore += player_1.currScore;
        p1Score.textContent = player_1.mainScore;
        player_1.currScore = 0;
        p1_currScore.textContent = player_1.currScore;
        
    } else {
        if (p2Score.parentElement.classList.contains("active")) {
            p2Score.parentElement.classList.remove("active");
        }
        p1Score.parentElement.classList.add("active");
        currentPlayer = 1;
        player_2.mainScore += player_2.currScore;
        p2Score.textContent = player_2.mainScore;
        player_2.currScore = 0;
        p2_currScore.textContent = player_2.currScore;
    }

    if (gameOver() === "") { return };

    if (player_1.mainScore >= Number(gameOver())) {
        p1Name.classList.add("winner");
        p1Name.textContent = "Winner!!!";
    } else if (player_2.mainScore >= Number(gameOver())) {
        p2Name.classList.add("winner");
        p2Name.textContent = "Winner!!!";
    }

    if (player_1.mainScore >= Number(gameOver()) || player_2.mainScore >= Number(gameOver())) {
        holdButton.disabled = true;
        rollButton.disabled = true;
        console.log("button")
    }
}

function rollDice() {
    var diceScore = Math.ceil(Math.random() * 6);
    // Change dice number
    diceImg.src = `dice-${diceScore}.png`;

    if (diceScore === 1) {
        if (currentPlayer === 1) {
            if (p1Score.parentElement.classList.contains("active")) {
                p1Score.parentElement.classList.remove("active");
            }
            p2Score.parentElement.classList.add("active");
            currentPlayer = 2;
            player_1.currScore = 0;
            p1_currScore.textContent = player_1.currScore;
            
        } else {
            if (p2Score.parentElement.classList.contains("active")) {
                p2Score.parentElement.classList.remove("active");
            }
            p1Score.parentElement.classList.add("active");
            currentPlayer = 1;
            player_2.currScore = 0;
            p2_currScore.textContent = player_2.currScore;
        }
    } else {
        if (currentPlayer === 1) {
            player_1.currScore += diceScore;
            p1_currScore.textContent = player_1.currScore;
        } else {
            player_2.currScore += diceScore;
            p2_currScore.textContent = player_2.currScore;
        }
    }
}

function gameStop() {

    player_1.mainScore = 0;
    player_2.mainScore = 0;

    player_1.currScore = 0;
    player_2.currScore = 0;

    p1Name.textContent = "Player 1";
    p2Name.textContent = "Player 2";

    p1Name.classList.remove("winner");
    p2Name.classList.remove("winner");

    
    p1Score.textContent = 0;
    p2Score.textContent = 0;
    
    p1_currScore.textContent = 0;
    p2_currScore.textContent = 0;

    limit.value = "50";

    holdButton.disabled = false;
    rollButton.disabled = false;
}

function gameLoad() {
    p1Score.textContent = player_1.mainScore;
    p2Score.textContent = player_2.mainScore;
    
    p1_currScore.textContent = player_1.currScore;
    p2_currScore.textContent = player_2.currScore;
}
document.addEventListener("DOMContentLoaded", () => gameLoad());

holdButton.addEventListener("click", () => holdDice());
rollButton.addEventListener("click", () => rollDice());

gameButton.addEventListener("click", () => gameStop());