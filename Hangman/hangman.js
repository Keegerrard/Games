// Hangman Game JavaScript
class HangmanGame {
  constructor() {
    this.wordLists = [
      "apple",
      "banana",
      "cherry",
      "date",
      "elderberry",
      "fig",
      "grape",
      "honeydew",
      "kiwi",
      "lemon",
      "mango",
      "nectarine",
      "orange",
      "peach",
      "quince",
      "raspberry",
      "strawberry",
      "tangerine",
      "ugli",
      "watermelon",
      "apricot",
      "blueberry",
      "coconut",
      "dragonfruit",
      "guava",
      "jackfruit",
      "kumquat",
      "lychee",
      "melon",
      "papaya",
      "pineapple",
      "pomegranate",
      "rambutan",
      "soursop",
      "tamarind",
      "avocado",
      "blackberry",
      "cantaloupe",
      "durian",
      "gooseberry",
      "lime",
      "mandarin",
      "passionfruit",
      "persimmon",
      "plum",
      "starfruit",
      "yuzu",
      "acorn",
      "bamboo",
      "cedar",
      "daisy",
      "elm",
      "fern",
      "ginseng",
      "hickory",
      "iris",
      "juniper",
      "kelp",
      "lotus",
      "maple",
      "narcissus",
      "oak",
      "palm",
      "quinoa",
      "rose",
      "spruce",
      "tulip",
      "violet",
      "willow",
      "yew",
      "zinnia",
      "badger",
      "cheetah",
      "dolphin",
      "eagle",
      "flamingo",
      "gazelle",
      "hyena",
      "iguana",
      "jaguar",
      "koala",
      "lemur",
      "meerkat",
      "narwhal",
      "ostrich",
      "panda",
      "quail",
      "raccoon",
      "sloth",
      "tiger",
      "urchin",
      "vulture",
      "walrus",
      "xerus",
      "yak",
      "zebra",
      "amethyst",
      "bronze",
      "copper",
      "diamond",
      "emerald",
      "gold",
      "iron",
      "jade",
      "nickel",
      "onyx",
    ];

    this.hangmanParts = [
      "rope",
      "head",
      "body",
      "left-arm",
      "right-arm",
      "left-leg",
      "right-leg",
    ];
    this.maxLives = 6;
    this.reset();
    this.bindEvents();
  }

  reset() {
    this.chosenWord =
      this.wordLists[
        Math.floor(Math.random() * this.wordLists.length)
      ].toLowerCase();
    this.guessedLetters = [];
    this.correctLetters = [];
    this.lives = this.maxLives;
    this.gameOver = false;

    this.updateDisplay();
    this.updateHearts();
    this.updateGuessedLetters();
    this.hideHangmanParts();
    this.hideGameMessage();
    this.enableInput();
  }

  bindEvents() {
    const guessBtn = document.getElementById("guess-btn");
    const guessInput = document.getElementById("guess-input");
    const newGameBtn = document.getElementById("new-game-btn");

    guessBtn.addEventListener("click", () => this.makeGuess());
    guessInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        this.makeGuess();
      }
    });
    guessInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.toLowerCase().replace(/[^a-z]/g, "");
    });
    newGameBtn.addEventListener("click", () => this.reset());
  }

  makeGuess() {
    const guessInput = document.getElementById("guess-input");
    const guess = guessInput.value.trim().toLowerCase();

    if (!guess || guess.length !== 1) {
      this.showMessage("Please enter a single letter!", "error");
      return;
    }

    if (this.guessedLetters.includes(guess)) {
      this.showMessage(`You've already guessed "${guess}"!`, "warning");
      guessInput.value = "";
      return;
    }

    this.guessedLetters.push(guess);
    guessInput.value = "";

    if (this.chosenWord.includes(guess)) {
      this.correctLetters.push(guess);
      this.updateDisplay();
      this.checkWin();
    } else {
      this.lives--;
      this.updateHearts();
      this.showHangmanPart();
      this.checkLose();
    }

    this.updateGuessedLetters();
  }

  updateDisplay() {
    const wordDisplay = document.getElementById("word-display");
    let display = "";

    for (let letter of this.chosenWord) {
      if (this.correctLetters.includes(letter)) {
        display += letter + " ";
      } else {
        display += "_ ";
      }
    }

    wordDisplay.textContent = display.trim();
    wordDisplay.classList.add("letter-reveal");
    setTimeout(() => wordDisplay.classList.remove("letter-reveal"), 600);
  }

  updateHearts() {
    const hearts = document.querySelectorAll(".heart");
    hearts.forEach((heart, index) => {
      if (index < this.lives) {
        heart.classList.remove("lost");
      } else {
        heart.classList.add("lost");
      }
    });
  }

  updateGuessedLetters() {
    const guessedDisplay = document.getElementById("guessed-display");
    guessedDisplay.innerHTML = "";

    this.guessedLetters.forEach((letter) => {
      const letterSpan = document.createElement("span");
      letterSpan.className = "guessed-letter";
      letterSpan.textContent = letter.toUpperCase();

      if (this.chosenWord.includes(letter)) {
        letterSpan.classList.add("correct");
      } else {
        letterSpan.classList.add("wrong");
      }

      guessedDisplay.appendChild(letterSpan);
    });
  }

  showHangmanPart() {
    const partIndex = this.maxLives - this.lives - 1;
    if (partIndex >= 0 && partIndex < this.hangmanParts.length) {
      const part = document.getElementById(this.hangmanParts[partIndex]);
      part.style.opacity = "1";
      part.classList.add("hangman-part-appear");
    }
  }

  hideHangmanParts() {
    this.hangmanParts.forEach((partId) => {
      const part = document.getElementById(partId);
      part.style.opacity = "0";
      part.classList.remove("hangman-part-appear");
    });
  }

  checkWin() {
    const hasWon = this.chosenWord
      .split("")
      .every((letter) => this.correctLetters.includes(letter));
    if (hasWon) {
      this.gameOver = true;
      this.showGameMessage("🎉 Congratulations! You Win! 🎉", "win");
      this.disableInput();
    }
  }

  checkLose() {
    if (this.lives <= 0) {
      this.gameOver = true;
      this.showGameMessage(
        `💀 Game Over! The word was "${this.chosenWord.toUpperCase()}"`,
        "lose"
      );
      this.disableInput();
    }
  }

  showGameMessage(message, type) {
    const gameMessage = document.getElementById("game-message");
    gameMessage.textContent = message;
    gameMessage.className = `game-message show ${type}`;
  }

  hideGameMessage() {
    const gameMessage = document.getElementById("game-message");
    gameMessage.className = "game-message";
  }

  showMessage(message, type) {
    // Create a temporary message for input validation
    const existingTemp = document.querySelector(".temp-message");
    if (existingTemp) {
      existingTemp.remove();
    }

    const tempMessage = document.createElement("div");
    tempMessage.className = "temp-message";
    tempMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === "error" ? "#f44336" : "#ff9800"};
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;
    tempMessage.textContent = message;
    document.body.appendChild(tempMessage);

    setTimeout(() => {
      if (tempMessage.parentNode) {
        tempMessage.remove();
      }
    }, 2000);
  }

  enableInput() {
    const guessInput = document.getElementById("guess-input");
    const guessBtn = document.getElementById("guess-btn");
    guessInput.disabled = false;
    guessBtn.disabled = false;
    guessInput.focus();
  }

  disableInput() {
    const guessInput = document.getElementById("guess-input");
    const guessBtn = document.getElementById("guess-btn");
    guessInput.disabled = true;
    guessBtn.disabled = true;
  }
}

// Add slide in animation for temporary messages
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize the game when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const game = new HangmanGame();
});
