const correctLetersEl = document.querySelector(".game-correct-letter");
const questionEl = document.querySelector(".question");
const playBtn = document.querySelector(".play-button");
const resultPopup = document.querySelector(".notification-popup");
const hintEl = document.querySelector(".hint");
const inputEl = document.querySelector("input");

const WIDTH_FOR_SHOW_INPUT = 768;

const words = [
  {
    question: "What car manufacturer had the highest revenue in 2020?",
    word: "Volkswagen",
  },
  {
    question: `What art form is described as "decorative handwriting or handwritten lettering"?`,
    word: "Calligraphy",
  },
  {
    question: "What software company is headquartered in Redmond, Washington?",
    word: "Microsoft",
  },
  {
    question: "Where is Angel Falls, the world’s largest waterfall, located?",
    word: "Venezuela",
  },
  {
    question: "What is the tallest type of tree?",
    word: "Redwoods",
  },
  {
    question: "In what capital would you find The Little Mermaid statue?",
    word: "Copenhagen",
  },
  {
    question: "What is the world’s best-selling stout beer?",
    word: "Guinness",
  },
  {
    question: "What sporting event has a strict dress code of all-white?",
    word: "Wimbledon",
  },
  {
    question: "Simone Biles is famous for her skill in what sport?",
    word: "Gymnastics",
  },
  {
    question:
      "Which of the following sauces is NOT traditionally vegan - Hoisin, Worcestershire, Mustard, Wasabi?",
    word: "Worcestershire",
  },
  {
    question: "What planet is closest to the sun?",
    word: "Mercury",
  },
];

const correctLetters = [];
const wrongLetters = [];

let isPlay = true;

let randomWords = getrandomWord(words);

// Receive random quesyion and word
function getrandomWord(words) {
  return words[Math.floor(Math.random() * words.length)];
}

// Show question and hidden word
function displayQuestion() {
  // Show question
  hintEl.innerText = randomWords.question;

  // Show word-answer
  const word = randomWords.word.toLowerCase();
  correctLetersEl.innerHTML = `
        ${word
          .split("")
          .map(
            (letter) =>
              `<li class="letter">${
                correctLetters.includes(letter) ? letter : ""
              }</li>`
          )
          .join("")}
    `;

  const isCorrect = correctLetersEl.textContent.trim() === word;

  if (isCorrect) {
    showResult("Congras! You have won!");

    isPlay = false;
  }
}

// Show figure parts and wrong letters
function updateWrong() {
  const figureParts = document.querySelectorAll(".figure-part");
  const wrongLetersEl = document.querySelector(".game-wrong-letter");

  wrongLetersEl.innerHTML = `
  <p>${wrongLetters.length > 0 ? "Wrong letters" : ""}</p>
    <ul>
      ${wrongLetters.map((letter) => `<li>${letter}</li>`).join("")}
    </ul>
  `;

  figureParts.forEach((part, index) => {
    if (wrongLetters.length > index) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }

    if (wrongLetters.length >= figureParts.length) {
      showResult("Unfortunately! You have lost!");

      isPlay = false;
    }
  });
}

// Show notification when letter already typed
function showNotification() {
  const notification = document.querySelector(".notification-container");

  notification.style.display = "block";

  setTimeout(() => {
    notification.style.display = "none";
  }, 1500);
}

// Show popup window with result
function showResult(result) {
  const resultMessage = resultPopup.querySelector(".message");
  const resultWord = resultPopup.querySelector(".message-word");
  const word = randomWords.word.toLowerCase();

  document.querySelector(".overlay").style.display = "block";

  resultMessage.innerText = result;
  resultWord.innerText = `The word was: ${word}`;
}

// Handle press key
window.addEventListener("keydown", (e) => {
  if (isPlay && window.innerWidth >= WIDTH_FOR_SHOW_INPUT) {
    const letterCode = e.keyCode;
    let letter = e.key;
    const word = randomWords.word.toLowerCase();

    letter = letter.toLowerCase();

    if (letterCode >= 65 && letterCode <= 90) {
      if (word.includes(letter)) {
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          displayQuestion();
        } else {
          showNotification();
        }
      } else {
        if (!wrongLetters.includes(letter)) {
          wrongLetters.push(letter);
          updateWrong();
        } else {
          showNotification();
        }
      }
    }
  }
});

// Input type for mobile phone
inputEl.addEventListener("input", (e) => {
  if (isPlay) {
    let letter = e.data; // Get the typed character

    if (letter) {
      const word = randomWords.word.toLowerCase();

      letter = letter.toLowerCase();

      if (isLetter(letter)) {
        if (word.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            correctLetters.push(letter);
            displayQuestion();
          } else {
            showNotification();
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);
            updateWrong();
          } else {
            showNotification();
          }
        }
      }
    }
  }
});

// Check if the input is a letter
function isLetter(letter) {
  return /^[a-z]$/.test(letter);
}

// Play again
playBtn.addEventListener("click", () => {
  isPlay = true;

  correctLetters.splice(0);
  wrongLetters.splice(0);

  randomWords = getrandomWord(words);

  hintEl.classList.remove("active");

  displayQuestion();
  updateWrong();

  document.querySelector(".overlay").style.display = "none";
  inputEl.value = "";
});

// Show or hide hint
questionEl.addEventListener("click", () => {
  hintEl.classList.toggle("active");
});

displayQuestion();
