  const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("timeLeft");
const gameoverEl = document.getElementById("gameover");
const settingsBtn = document.getElementById("setbtn");
const settings = document.querySelector(".sets");
const form = document.getElementById("form");
const levelSelect = document.getElementById("levelSelect");

const words = [
    "hello","world","javascript","typing","speed",
    "developer","function","variable","object","array",
    "string","number","keyboard","programming",
    "Delayram","Mawufemor","Senyo","Akwasi","Kwame","Kofi","Ama","Abena",
];

let lastWord = "";

function getRandomWord() {
    let newWord;

    do {
        newWord = words[Math.floor(Math.random() * words.length)];
    } while (newWord === lastWord);

    lastWord = newWord;
    return newWord;
}

let randomWord;
let score = 0;
let time = 10;

let level = localStorage.getItem("level") || "medium";
levelSelect.value = level;

function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function displayWord() {
    randomWord = getRandomWord();
    word.innerText = randomWord;
}

function updateScore() {
    score++;
    scoreEl.innerText = score;
}

function updateTime() {
    time--;
    timeEl.innerText = time + "s";

    if (time === 0) {
        clearInterval(timer);
        gameOver();
    }
}

function gameOver() {
    gameoverEl.innerHTML = `
        <h1>Game Over</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Play Again</button>
    `;
    gameoverEl.style.display = "flex";
}

text.addEventListener("input", (e) => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {
        e.target.value = "";
        displayWord();
        updateScore();

        if (level === "hard") time += 2;
        else if (level === "medium") time += 3;
        else time += 5;

        timeEl.innerText = time + "s";
    }
});

settingsBtn.addEventListener("click", () => {
    settings.classList.toggle("hide");
});

form.addEventListener("change", (e) => {
    level = levelSelect.value;
    localStorage.setItem("level", level);
});

displayWord();
text.focus();

const timer = setInterval(updateTime, 1000);