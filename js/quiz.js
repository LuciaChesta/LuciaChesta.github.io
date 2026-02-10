let questions = [
  {
    text: "Where did Lucia study Oceanography?",
    answers: [
      "Stanford University",
      "Fudan University",
      "University of Buenos Aires",
      "National University of the South"
    ],
    correct: 3
  },
  {
    text: "What does Lucia like to do in her free time?",
    answers: [
      "Read",
      "Do sports",
      "Learn about new things",
      "All options are correct"
    ],
    correct: 4
  },
  {
    text: "What best describes Lucia’s professional profile?",
    answers: [
      "She enjoys working on challenging tasks that push her to grow every day.",
      "She is interested in fashion design",
      "She prefers working alone and avoids challenges",
      "She wants to work only in offices"
    ],
    correct: 1
  },
  {
    text: "Where has Lucia gained field experience?",
    answers: [
      "In laboratories and classrooms",
      "In an Antarctic research campaign",
      "On an oceanographic cruise",
      "All options are correct"
    ],
    correct: 4
  },
  {
    text: "Which option best describes Lucia’s strengths and weaknesses?",
    answers: [
      "She is lazy but very confident.",
      "She is highly motivated and curious, but sometimes feels overwhelmed.",
      "She avoids challenges and prefers easy tasks.",
      "She is disorganized and not interested in learning."
    ],
    correct: 2
  }
];

let currentQuestion = 0;
let timeLeft = 10;
let timer;
let score = 0;
let correctCount = 0;

function loadQuestion() {
  let q = questions[currentQuestion];

  document.getElementById("question").innerText = q.text;

  let buttons = document.querySelectorAll(".answers button");
  buttons.forEach((btn, index) => {
    btn.innerText = q.answers[index];
    btn.style.background = "#666";
    btn.disabled = false;
    btn.onclick = () => checkAnswer(index);
  });

  timeLeft = 10;
  document.getElementById("time").innerText = timeLeft;

  clearInterval(timer);
  timer = setInterval(countdown, 1000);
}

function countdown() {
  timeLeft--;
  document.getElementById("time").innerText = timeLeft;

  if (timeLeft <= 0) {
    nextQuestion();
  }
}

function checkAnswer(selected) {
  clearInterval(timer);

  let q = questions[currentQuestion];
  let buttons = document.querySelectorAll(".answers button");

  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === q.correct) {
      btn.style.background = "green";
    }
    if (index === selected && index !== q.correct) {
      btn.style.background = "red";
    }
  });

  if (selected === q.correct) {
    score += 20;
    correctCount++;
  }

  setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    document.querySelector(".quiz-box").innerHTML = `
      <h2>Quiz finished 🎉</h2>
      <p>Correct answers: ${correctCount} / ${questions.length}</p>
      <p>Score: ${score} / 100</p>
    `;
  }
}

loadQuestion();
