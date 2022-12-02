let totalGames = 0;
let userPoints = 0;
let computerPoints = 0;
let roundResult = "-";

//Stats fields
const userPoints_p = document.querySelector("[data-user-points]");
const computerPoints_p = document.querySelector("[data-computer-points]");
const roundsLeft_p = document.querySelector("[data-rounds-left]");
const roundResult_p = document.querySelector("[data-round-result]");
const gameResult_p = document.querySelector("[data-game-result]");
const userChoice_span = document.querySelector("[data-user-choice-display]");
const computerChoice_span = document.querySelector("[data-computer-choice-display]");
//Choices
const rock = document.querySelector("[data-rock]");
const paper = document.querySelector("[data-paper]");
const scissor = document.querySelector("[data-scissor]");

rock.addEventListener("click", () => {
    game("r");
});
paper.addEventListener("click", () => {
    game("p");
});
scissor.addEventListener("click", () => {
    game("s");
});

//Play Trigger
const playButton = document.querySelector("[data-play-game]");
const inputField = document.querySelector("[data-game-number]");

playButton.addEventListener("click", (event) => {
    event.preventDefault();
    let value = inputField.value;
    if (value !== "" && totalGames === 0) {
        totalGames = parseInt(value);
        inputField.value = "";
        userPoints = 0;
        computerPoints = 0;
        roundResult = "-"; 
        updateGameStats("-", "","");
        updateStats(true);
    }
});

function game(userChoice) {
    if (totalGames > 0) {
        totalGames--;
        let computerChoice = getComputerChoice();
        //console.log(userChoice, computerChoice);
        let result = res(userChoice, computerChoice);
        countPoints(result);
        updateGameStats(result, userChoice, computerChoice);
        if (totalGames === 0) {
            updateStats(true);
        } else {
            updateStats();
        }
    }
}

function updateStats(updateRoundResult) {
    roundsLeft_p.innerText = totalGames === 0 ? "-" : totalGames.toString();
    userPoints_p.innerText = userPoints === 0 ? "-" : userPoints.toString();
    computerPoints_p.innerText =
        computerPoints === 0 ? "-" : computerPoints.toString();
    if (updateRoundResult) {
        roundResult_p.innerText =
            userPoints > computerPoints
                ? "User Won"
                : userPoints === computerPoints && userPoints !== 0
                ? "Round Tied"
                : userPoints < computerPoints
                ? "Computer Won"
                : "-";
    }
}

function updateGameStats(result, userChoice, computerChoice) {
    let userString = parseChoice(userChoice);
    let computerString = parseChoice(computerChoice);
    userChoice_span.innerText = userString;
    computerChoice_span.innerText = computerString;
    gameResult_p.innerText = result;
}

function parseChoice(choiceStr) {
    switch(choiceStr) {
        case "r":
           return "Rock";
        case "p":
            return "Paper";
        case "s":
            return "Scissor";
        default: 
            return "";
    }
}

function countPoints(result) {
    switch (result) {
        case "Won":
            userPoints++;
            break;
        case "Lost":
            computerPoints++;
            break;
        default:
            break;
    }
}

function res(userChoice, computerChoice) {
    let combination = userChoice + computerChoice;
    let res = "";
    switch (combination) {
        case "rs":
        case "pr":
        case "sp":
            res = "Won";
            break;
        case "rp":
        case "ps":
        case "sr":
            res = "Lost";
            break;
        default:
            res = "Tied";
            break;
    }

    return res;
}

function getComputerChoice() {
    let choice = ["r", "p", "s"];
    let randIdx = Math.floor(Math.random() * 3);
    return choice[randIdx];
}
