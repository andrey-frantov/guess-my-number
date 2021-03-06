/* MODELS */
let gameData = {
    score: 20,
    highScore: 0,
    randomNum: 0,
};

const texts = {
    startGame: 'Start guessing...',
    wrongValue: 'Value out of range.',
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
const body = document.querySelector('body');


/* DATA CONTROLLERS */
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
        messageString.textContent = texts.gameOver.replace(
            '%RANDOM_NUM%',
            gameData.randomNum
        );
        body.style.backgroundColor = '#c96e6e';
        checkBtn.disabled = true;
    }
    scoreString.textContent = `Score: ${gameData.score}`;
};

const updateHighScoreUI = () => {
    highScoreString.textContent = `Highscore: ${gameData.highScore}`;
};

const updateMessageUI = (text) => {
    messageString.textContent = text;
};

const clearInputAndFocus = () => {
    numInput.value = null;
    numInput.focus();
};

const validateInput = (num) => {
    if (num <= 0 || num > 20 || num == '') {
        updateMessageUI(texts.wrongValue);
        clearInputAndFocus();
        return false;
    } else return true;
};

/* GAME CONTROLLERS */
const startGame = () => {
    body.style.backgroundColor = '#1F1F1F';
    gameData.score = 20;
    updateScoreUI();
    gameData.randomNum = getRandomNum();
    updateMessageUI(texts.startGame);
    checkBtn.disabled = false;
    clearInputAndFocus();
};

const compareNums = () => {
    const userNum = numInput.value;
    if (!validateInput(userNum)) return;

    if (userNum > gameData.randomNum) {
        updateMessageUI(texts.wrongGuessHigh);
        updateScore();
        updateScoreUI();
        clearInputAndFocus();
    } else if (userNum < gameData.randomNum) {
        updateMessageUI(texts.wrongGuessLow);
        updateScore();
        updateScoreUI();
        clearInputAndFocus();
    } else if (userNum == gameData.randomNum) {
        body.style.backgroundColor = '#5CBA42';
        checkBtn.disabled = true;
        updateMessageUI(texts.rightGuess);
        updateHighScore();
        updateHighScoreUI();
        clearInputAndFocus();
    }
};

againBtn.addEventListener('click', startGame);
checkBtn.addEventListener('click', compareNums);

startGame();
