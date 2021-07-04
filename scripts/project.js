const lettersEl = document.getElementById("letters");

const firstLetterAscii = 65;
const lastLetterAscii = 90;

for (let i = firstLetterAscii; i <= lastLetterAscii; i++) {
    lettersEl.innerHTML += `<button type="button">${String.fromCharCode(i)}</button>`;
}
