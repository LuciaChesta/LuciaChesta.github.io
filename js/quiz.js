let currentQuestion = 1;
let timeLeft = 10;
let timer;

function startTimer() {
    timeLeft = 10;
    document.getElementById("time").innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;

        if (timeLeft === 0) {
            nextQuestion();
        }
    }, 1000);
}

function selectAnswer() {
    nextQuestion();
}

function nextQuestion() {
    clearInterval(timer);

    currentQuestion++;

    if (currentQuestion > 5) {
        document.querySelector(".quiz-container").innerHTML = "<h2>Quiz finished!</h2>";
        return;
    }

    document.getElementById("question").innerText = "Question " + currentQuestion;
    startTimer();
}

startTimer();
