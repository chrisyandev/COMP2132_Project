// HTML elements
const lettersEl = document.getElementById("letters");
const wordDisplayEl = document.getElementById("word-display");

// Constant values
const firstLetterAscii = 65;
const lastLetterAscii = 90;

// Game variables
let currentWord;
let currentHint;
let hangmanState = 0;
let currentLetters = [];

// Other variables
let html = "";

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
}

for (let i = firstLetterAscii; i <= lastLetterAscii; i++) {
    const letterButton = new LetterButton(String.fromCharCode(i));
    lettersEl.appendChild(letterButton.getButton());
    letterButton.getButton().addEventListener("click", checkForLetter);
}

const randomWord = pickRandomWord();
currentWord = randomWord.word.toUpperCase();
currentHint = randomWord.hint;
console.log(randomWord);

wordDisplayEl.innerHTML = "";
currentLetters = [];
for (let i = 0; i < currentWord.length; i++) {
    const letter = document.createElement("SPAN");
    letter.className = "letter-input";
    letter.textContent = "_";
    currentLetters.push(letter);
    wordDisplayEl.appendChild(letter);
}

function checkForLetter() {
    const key = this.textContent.toUpperCase().charAt(0);
    for (let i = 0; i < currentWord.length; i++) {
        if (key === currentWord.charAt(i)) {
            currentLetters[i].textContent = key;
        }
    }
}

function pickRandomWord() {
    const randNum = Math.floor(Math.random() * words.length);
    return words[randNum];
}