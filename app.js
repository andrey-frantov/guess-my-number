/* MODELS */
let gameData = {
    score: 20,
    highScore: 0,
    randomNum: 0,
};

const texts = {
    startGame: 'Start guessing...',
    wrongValue: 'Number out of range.',
    wrongGuessLow: 'To low!',
    wrongGuessHigh: 'To high!',
    rightGuess: `You guessed right!`,
    gameOver: `You've lost. Number is %RANDOM_NUM%.`,
};

/* VIEWS */
const againBtn = document.querySelector('.again-btn');
const checkBtn = document.querySelector('.check-btn');
const numInput = document.querySelector('.num-input');
const messageString = document.querySelector('.message-text');
const scoreString = document.querySelector('.score');
const highScoreString = document.querySelector('.highscore');

/* DATA CONTROLLER */
const getRandomNum = () => {
    return Math.floor(Math.random() * 20 + 1);
};

const updateScore = () => {
    if (gameData.score > 0) {
        gameData.score -= 1;
    }
};

const updateHighScore = () => {
    if (gameData.score > gameData.highScore) {
        gameData.highScore = gameData.score;
    }
};

/* VIEW CONTROLLERS */
const updateScoreUI = () => {
    if (gameData.score < 1) {
        messageString.textContent = texts.gameOver.replace('%RANDOM_NUM%', gameData.randomNum);
    }

    scoreString.textContent = `Score: ${gameData.score}`;
};

const updateHighScoreUI = () => {
    highScoreString.textContent = `Highscore: ${gameData.highScore}`;
};

const validateInput = (num) => {
    if (num <= 0 || num > 20) {
        messageString.textContent = texts.wrongValue;
        numInput.value = null;
        numInput.focus();
        return;
    }
};

const clearInputAndFocus = () => {
    numInput.value = null;
    numInput.focus();
}


/* GAME CONTROLLER */
const startGame = () => {
    gameData.score = 20;
    updateScoreUI();
    gameData.randomNum = getRandomNum();
    console.log(gameData.randomNum); // Todo: Remove after testing
    messageString.textContent = texts.startGame;
    clearInputAndFocus();
};

const compareNums = () => {
    const userNum = numInput.value;
    validateInput(userNum);

    if (userNum > gameData.randomNum) {
        messageString.textContent = texts.wrongGuessHigh;
        updateScore();
        updateScoreUI();
        clearInputAndFocus();
    } else if (userNum < gameData.randomNum) {
        messageString.textContent = texts.wrongGuessLow;
        updateScore();
        updateScoreUI();
        clearInputAndFocus();
    } else if (userNum == gameData.randomNum) {
        messageString.textContent = texts.rightGuess;
        updateHighScore();
        updateHighScoreUI();
        clearInputAndFocus();
    }
};

againBtn.addEventListener('click', startGame);
checkBtn.addEventListener('click', compareNums);

startGame();
