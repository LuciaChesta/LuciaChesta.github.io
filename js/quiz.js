let questions = [
  "Question 1",
  "Question 2",
  "Question 3",
  "Question 4",
  "Question 5"
];

let currentQuestion = 0;
let timeLeft = 10;
let timer;

function loadQuestion() {
  document.getElementById("question").innerText = questions[currentQuestion];
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

function answer() {
  nextQuestion();
}

function nextQuestion() {
  clearInterval(timer);
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    document.querySelector(".quiz-box").innerHTML =
      "<h2>Quiz finished 🎉</h2>";
  }
}

loadQuestion();
