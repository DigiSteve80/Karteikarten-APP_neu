let cards = JSON.parse(localStorage.getItem("cards") || "[]");
let currentIndex = 0;
let attempt = 0;

function switchMode(mode) {
  document.getElementById("input-mode").style.display = mode === "input" ? "block" : "none";
  document.getElementById("quiz-mode").style.display = mode === "quiz" ? "block" : "none";
  if (mode === "quiz") {
    currentIndex = 0;
    showCard();
  }
}

function addCard() {
  const q = document.getElementById("question").value.trim();
  const a = document.getElementById("answer").value.trim();
  if (q && a) {
    cards.push({ question: q, answer: a });
    localStorage.setItem("cards", JSON.stringify(cards));
    alert("Karte gespeichert!");
    document.getElementById("question").value = "";
    document.getElementById("answer").value = "";
  }
}

function showCard() {
  if (cards.length === 0) {
    document.getElementById("quiz-question").innerText = "Keine Karten vorhanden.";
    return;
  }
  const card = cards[currentIndex];
  document.getElementById("quiz-question").innerText = card.question;
  document.getElementById("quiz-answer").value = "";
  document.getElementById("feedback").innerText = "";
  document.getElementById("show-answer-btn").style.display = "none";
  document.getElementById("dont-know-btn").style.display = "none";
  attempt = 0;
}

function checkAnswer() {
  const userAnswer = document.getElementById("quiz-answer").value.trim();
  const correct = cards[currentIndex].answer.trim();
  const feedback = document.getElementById("feedback");

  if (userAnswer.toLowerCase() === correct.toLowerCase()) {
    feedback.innerText = "✅ Richtig!";
    setTimeout(() => nextCard(), 1000);
  } else {
    attempt++;
    if (attempt === 1) {
      feedback.innerText = "❌ Falsch – überlege nochmal!";
    } else {
      feedback.innerText = "❌ Wieder falsch.";
      document.getElementById("show-answer-btn").style.display = "inline-block";
      document.getElementById("dont-know-btn").style.display = "inline-block";
    }
  }
}

function showCorrectAnswer() {
  const correct = cards[currentIndex].answer.trim();
  document.getElementById("feedback").innerText = `✔️ Richtige Antwort: ${correct}`;
}

function nextCard() {
  if (cards.length > 0) {
    currentIndex = (currentIndex + 1) % cards.length;
    showCard();
  }
}

function prevCard() {
  if (cards.length > 0) {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    showCard();
  }
}
