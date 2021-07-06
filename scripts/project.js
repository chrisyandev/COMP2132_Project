// HTML elements
const hangmanStateEl = document.getElementById("hangman-state");
const lettersEl = document.getElementById("letters");
const hintEl = document.getElementById("hint");
const wordDisplayEl = document.getElementById("word-display");
const playAgainButtonEl = document.getElementById("play-again-button");
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

// Words the game can choose from and their respective hints
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

// A button with a letter
class LetterButton {
    constructor(letter) {
        this.button = document.createElement("BUTTON");
        this.button.innerHTML = letter;
        this.button.className = "letter-button";
    }

    getButton() {
        return this.button;
    }

    enable() {
        this.button.disabled = false;
    }
}

// Generates letters from A-Z and appends them as buttons
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

// Resets variables, hangman image, and buttons
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
        letter.className = "letter-field";
        letter.textContent = "_";
        currentLetters.push(letter);
        wordDisplayEl.appendChild(letter);
    }

    hintEl.innerHTML = `<p>Hint: ${currentHint}</p>`;

    letterButtons.forEach(function(lb) {
        lb.enable();
    });
}

// Picks a random word
function pickRandomWord() {
    const randNum = Math.floor(Math.random() * words.length);
    return words[randNum];
}

/*
Checks if word contains user's letter choice. If found,
replaces the "_" with the letter wherever applicable.
*/
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

// Changes the hangman image
function nextHangmanState() {
    hangmanState++;
    hangmanStateEl.src = `images/hangman-${hangmanState}.png`;
    hangmanStateEl.alt = `hangman ${hangmanState}`;
}

// Checks if game should be over
function checkGameState() {
    if (lettersCorrect >= currentWord.length) {
        winGame();
    } else if (hangmanState >= totalTries) {
        loseGame();
    }
}

// Called if the player wins the game
function winGame() {
    gameEndMessageEl.textContent = `You Won! Word was ${currentWord}`;
    fadeIn(popUpEl, 1);
    fadeIn(dimmerEl, 0.5);
}

// Called if the player loses the game
function loseGame() {
    gameEndMessageEl.textContent = `You Lost! Word was ${currentWord}`;
    fadeIn(popUpEl, 1);
    fadeIn(dimmerEl, 0.5);
}

// Fades in an element to a specified opacity
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

// Allows the player to play again
playAgainButtonEl.onclick = function() {
    popUpEl.style.display = "none";
    dimmerEl.style.display = "none";
    popUpEl.style.opacity = "0.0";
    dimmerEl.style.opacity = "0.0";
    initializeGame();
};