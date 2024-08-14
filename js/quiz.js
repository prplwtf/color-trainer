document.addEventListener("DOMContentLoaded", () => {
  // Get elements
  let ScoreCounterCorrect = document.getElementById("ScoreCounterCorrect")
  let ScoreCounterTotal = document.getElementById("ScoreCounterTotal")
  let ColorBox = document.getElementById("ColorBox")
  let QuizAnswer1 = document.getElementById("QuizAnswer1")
  let QuizAnswer2 = document.getElementById("QuizAnswer2")
  let QuizAnswer3 = document.getElementById("QuizAnswer3")

  // Create a variable that increments on every quiz question
  window.QuestionCount = 0

  CreateQuestion()
});

function CreateQuestion() {
  // Increment question count
  ScoreCounterTotal.innerHTML = window.QuestionCount
  window.QuestionCount = window.QuestionCount + 1

  function getRandomHexColor() {
    const hex = Math.floor(Math.random() * 16777215).toString(16);
    return `#${hex.padStart(6, '0')}`;
  }
  function getContrastColor(hexColor) {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(1, 3), 16);
    const b = parseInt(hexColor.slice(1, 3), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? '#000000' : '#FFFFFF';
  }

  let HexColor = getRandomHexColor()
  ColorBox.style.backgroundColor = HexColor
  ColorBox.style.color = getContrastColor(HexColor)
}

function QuizSelect(answer) {
  let CorrectAnswer = 1 // Temporarily correct answer id
  if(answer == CorrectAnswer) {
    CreateQuestion()
  }
}