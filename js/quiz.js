let questions = [
  {
    text: "Question 1",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    correct: 0
  },
  {
    text: "Question 2",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    correct: 1
  },
  {
    text: "Question 3",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    correct: 2
  },
  {
    text: "Question 4",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    correct: 3
  },
  {
    text: "Question 5",
    answers: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
    correct: 0
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
