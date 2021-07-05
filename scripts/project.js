// HTML elements
const hangmanStateEl = document.getElementById("hangman-state");
const lettersEl = document.getElementById("letters");
const wordDisplayEl = document.getElementById("word-display");
const closeWindowButtonEl = document.querySelector("#pop-up .close-window-button");
const popUpEl = document.getElementById("pop-up");
const dimmerEl = document.getElementById("dimmer");
const gameEndMessageEl = document.getElementById("game-end-message");
const letterButtons = [];

// Constant values
const firstLetterAscii = 65;
const lastLetterAscii = 90;
const showPopupAfter = 3000;
const fadeInPopupTime = 40;
const totalTries = 6;

// Game values
let currentWord;
let currentHint;
let hangmanState = 0;
let lettersCorrect = 0;
let currentLetters = [];

// Other variables
let showPopupHandler;

const words = [
    {
        word: "apple",
        hint: "a red fruit"
    },
    {
        word: "keyboard",
        hint: "an input device"
    },
    {
        word: "calculator",
        hint: "math class"
    },
    {
        word: "giraffe",
        hint: "tall animal"
    },
    {
        word: "snowball",
        hint: "white and cold"
    },
    {
        word: "cheetah",
        hint: "fast animal"
    },
    {
        word: "cheese",
        hint: "made from milk"
    },
    {
        word: "monitor",
        hint: "an output device"
    },
    {
        word: "motherboard",
        hint: "a computer part"
    },
    {
        word: "cookie",
        hint: "a baked good"
    }
]

class LetterButton {
    constructor(letter) {
        this.button = document.createElement("BUTTON");
        this.button.innerHTML = letter;
    }

    getButton() {
        return this.button;
    }

    enable() {
        this.button.disabled = false;
    }
}

for (let i = firstLetterAscii; i <= lastLetterAscii; i++) {
    const letterButton = new LetterButton(String.fromCharCode(i));
    letterButtons.push(letterButton);
    lettersEl.appendChild(letterButton.getButton());
    letterButton.getButton().addEventListener("click", function(evt) {
        evt.currentTarget.disabled = true;
        checkForLetter(evt.currentTarget.textContent);
        checkGameState();
    });
}

initializeGame();

function initializeGame() {
    const randomWord = pickRandomWord();
    currentWord = randomWord.word.toUpperCase();
    currentHint = randomWord.hint;
    hangmanState = 0;
    lettersCorrect = 0;
    currentLetters = [];

    hangmanStateEl.src = `images/hangman-${hangmanState}.png`;
    hangmanStateEl.alt = `hangman ${hangmanState}`;

    wordDisplayEl.innerHTML = "";
    currentLetters = [];
    for (let i = 0; i < currentWord.length; i++) {
        const letter = document.createElement("SPAN");
        letter.className = "letter-input";
        letter.textContent = "_";
        currentLetters.push(letter);
        wordDisplayEl.appendChild(letter);
    }

    letterButtons.forEach(function(lb) {
        lb.enable();
    });

    console.log(randomWord);
}

function pickRandomWord() {
    const randNum = Math.floor(Math.random() * words.length);
    return words[randNum];
}

function checkForLetter(letter) {
    const key = letter.toUpperCase().charAt(0);
    let letterFound = false;
    for (let i = 0; i < currentWord.length; i++) {
        if (key === currentWord.charAt(i)) {
            letterFound = true;
            currentLetters[i].textContent = key;
            lettersCorrect++;
        }
    }
    if (!letterFound) {
        nextHangmanState();
    }
}

function nextHangmanState() {
    hangmanState++;
    hangmanStateEl.src = `images/hangman-${hangmanState}.png`;
    hangmanStateEl.alt = `hangman ${hangmanState}`;
}

function checkGameState() {
    if (lettersCorrect >= currentWord.length) {
        winGame();
    } else if (hangmanState >= totalTries) {
        loseGame();
    }
}

function winGame() {
    gameEndMessageEl.textContent = `You Won! Word was ${currentWord}`;
    fadeIn(popUpEl, 1);
    fadeIn(dimmerEl, 0.5);
}

function loseGame() {
    gameEndMessageEl.textContent = `You Lost! Word was ${currentWord}`;
    fadeIn(popUpEl, 1);
    fadeIn(dimmerEl, 0.5);
}

function fadeIn(element, maxOpacity) {
    element.style.display = "block";
    const opacityHandler = setInterval(function() {
        elementStyles = window.getComputedStyle(element);
        const currentOpacity = +elementStyles.getPropertyValue("opacity");
        if (currentOpacity < maxOpacity) {
            element.style.opacity = `${currentOpacity + 0.05}`;
        } else {
            clearInterval(opacityHandler);
        }
    }, fadeInPopupTime);
}

closeWindowButtonEl.onclick = function() {
    popUpEl.style.display = "none";
    dimmerEl.style.display = "none";
    popUpEl.style.opacity = "0.0";
    dimmerEl.style.opacity = "0.0";
    initializeGame();
};