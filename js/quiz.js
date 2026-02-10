document.addEventListener("DOMContentLoaded", () => {

  const quizBox = document.querySelector(".quiz-box");

  let questions = [
    { text: "Where did Lucia study Oceanography?", answers: ["Stanford University","Fudan University","University of Buenos Aires","National University of the South"], correct: 2 },
    { text: "What does Lucia like to do in her free time?", answers: ["Read","Do sports","Learn about new things","All options are correct"], correct: 3 },
    { text: "What best describes Lucia’s professional profile?", answers: ["She enjoys working on challenging tasks that push her to grow every day.","She is interested in fashion design","She prefers working alone and avoids challenges","She wants to work only in offices"], correct: 0 },
    { text: "Where has Lucia gained field experience?", answers: ["In laboratories and classrooms","In an Antarctic research campaign","On an oceanographic cruise","All options are correct"], correct: 3 },
    { text: "Which option best describes Lucia’s strengths and weaknesses?", answers: ["She is lazy but very confident.","She is highly motivated and curious, but sometimes feels overwhelmed.","She avoids challenges and prefers easy tasks.","She is disorganized and not interested in learning."], correct: 1 }
  ];

  let currentQuestion = 0;
  let timeLeft = 20;
  let timer;
  let score = 0;
  let correctCount = 0;

  const startBtn = document.getElementById("start-btn");
  const startScreen = document.getElementById("start-screen");
  const quizContent = document.getElementById("quiz-content");
  const scoreDisplay = document.getElementById("score");
  const timeDisplay = document.getElementById("time");
  const questionEl = document.getElementById("question");
  const buttons = document.querySelectorAll(".answers button");

  // --- NUEVO: crear botón de restart al final ---
  const finalRestartBtn = document.createElement("button");
  finalRestartBtn.id = "final-restart-btn";
  finalRestartBtn.innerText = "Restart ↻";
  finalRestartBtn.style.display = "none";
  finalRestartBtn.style.marginTop = "20px";
  finalRestartBtn.style.padding = "12px 25px";
  finalRestartBtn.style.fontSize = "16px";
  finalRestartBtn.style.borderRadius = "25px";
  finalRestartBtn.style.background = "#28a745";
  finalRestartBtn.style.color = "white";
  finalRestartBtn.style.border = "none";
  finalRestartBtn.style.cursor = "pointer";
  quizContent.appendChild(finalRestartBtn);

  finalRestartBtn.addEventListener("click", () => {
    resetQuiz();
  });
  // --- FIN DE LA PARTE NUEVA ---

  startBtn.onclick = () => {
    startScreen.style.display = "none";
    quizContent.style.display = "block";
    loadQuestion();
  };

  function loadQuestion() {
    quizBox.classList.add("highlight"); // efecto de resalte
    setTimeout(() => quizBox.classList.remove("highlight"), 300);

    let q = questions[currentQuestion];
    questionEl.innerText = q.text;

    buttons.forEach((btn,index) => {
      btn.innerText = q.answers[index];
      btn.style.background = "#666";
      btn.disabled = false;
      btn.classList.remove("selected");
      btn.onclick = () => checkAnswer(index);
    });

    timeLeft = 20;
    timeDisplay.innerText = timeLeft;
    scoreDisplay.innerText = score;

    clearInterval(timer);
    timer = setInterval(countdown, 1000);
  }

  function countdown() {
    timeLeft--;
    timeDisplay.innerText = timeLeft;
    if(timeLeft <=0) nextQuestion();
  }

  function checkAnswer(selected){
    clearInterval(timer);
    let q = questions[currentQuestion];

    buttons.forEach((btn,index)=>{
      btn.disabled = true;
      if(index === q.correct) btn.style.background = "green";
      if(index === selected && index !== q.correct) btn.style.background = "red";
      if(index === selected) btn.classList.add("selected");
    });

    if(selected === q.correct){
      score += 20;
      correctCount++;
    }

    scoreDisplay.innerText = score;

    setTimeout(nextQuestion,1000);
  }

  function nextQuestion(){
    currentQuestion++;
    if(currentQuestion < questions.length) loadQuestion();
    else{
      quizContent.innerHTML = `
        <h2>Quiz finished 🎉</h2>
        <p>Correct answers: ${correctCount} / ${questions.length}</p>
        <p>Final Score: ${score} / 100</p>
      `;
      // --- Mostrar botón de restart al final ---
      quizContent.appendChild(finalRestartBtn);
      finalRestartBtn.style.display = "inline-block";
      // --- Fin de botón final ---
    }
  }

  // --- función para reiniciar el quiz ---
  function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    correctCount = 0;
    timeLeft = 20;

    startScreen.style.display = "flex";
    quizContent.style.display = "none";
    finalRestartBtn.style.display = "none";

    buttons.forEach(btn => {
      btn.style.background = "#666";
      btn.disabled = false;
      btn.classList.remove("selected");
    });
  }

});
