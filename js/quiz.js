document.addEventListener("DOMContentLoaded", () => {
  // Get elements
  let ScoreCounterCorrect = document.getElementById("ScoreCounterCorrect")
  let ScoreCounterTotal = document.getElementById("ScoreCounterTotal")
  let ColorBox = document.getElementById("ColorBox")
  let AnswerContainer1 = document.getElementById("AnswerContainer1")
  let AnswerContainer2 = document.getElementById("AnswerContainer2")
  let AnswerContainer3 = document.getElementById("AnswerContainer3")
  let QuizAnswer1 = document.getElementById("QuizAnswer1")
  let QuizAnswer2 = document.getElementById("QuizAnswer2")
  let QuizAnswer3 = document.getElementById("QuizAnswer3")

  // Create a variable that increments on every quiz question
  window.QuestionCount = 0
  // Create a variable that keeps track of total correct answers
  window.CorrectScore = 0

  CreateQuestion()
});

function getContrastColor(hexColor) {
  // Convert hexColor into RGB values
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(1, 3), 16);
  const b = parseInt(hexColor.slice(1, 3), 16);
  // Calculate brightness based on RGB values
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  // Return either black or white depending on contrast
  return brightness > 128 ? '#000000' : '#FFFFFF';
}

function CreateQuestion() {
  // Increment question count
  ScoreCounterTotal.innerHTML = window.QuestionCount
  window.QuestionCount = window.QuestionCount + 1

  // Increment correct answers count
  if(window.GuessAttempts == 1) {
    window.CorrectScore = window.CorrectScore + 1
    ScoreCounterCorrect.innerHTML = window.CorrectScore
  }
  window.GuessAttempts = 0

  function getRandomHexColor() {
    // Generate random hex color
    const hex = Math.floor(Math.random() * 16777215).toString(16);
    return `#${hex.padStart(6, '0')}`;
  }

  let HexColor = getRandomHexColor()
  ColorBox.style.backgroundColor = HexColor
  ColorBox.style.color = getContrastColor(HexColor)

  function getSimilarHexColor(hexColor) {
    // Convert hexColor into RGB values
    let r = parseInt(hexColor.slice(1, 3), 16);
    let g = parseInt(hexColor.slice(3, 5), 16);
    let b = parseInt(hexColor.slice(5, 7), 16);
    // Adjust each component by a small amount (-15 to +15 picked randomly)
    r = Math.min(255, Math.max(0, r + Math.floor(Math.random() * 31) - 15));
    g = Math.min(255, Math.max(0, g + Math.floor(Math.random() * 31) - 15));
    b = Math.min(255, Math.max(0, b + Math.floor(Math.random() * 31) - 15));
    // Convert adjusted RGB values back into hex.
    const similarHex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    return similarHex;
}

  // Pick correct option
  window.CorrectAnswer = Math.floor(Math.random() * 3) + 1;
  window["QuizAnswer"+CorrectAnswer].innerHTML = getSimilarHexColor(HexColor)

  // Assign incorrect options
  // FIXME: Random hex colors have a chance of being more similar than the correct answer
  if(window.CorrectAnswer != 1) { QuizAnswer1.innerHTML = getRandomHexColor() }
  if(window.CorrectAnswer != 2) { QuizAnswer2.innerHTML = getRandomHexColor() }
  if(window.CorrectAnswer != 3) { QuizAnswer3.innerHTML = getRandomHexColor() }
}

function QuizSelect(answer) {
  window.GuessAttempts = window.GuessAttempts + 1
  window["AnswerContainer"+answer].style.backgroundColor = window["QuizAnswer"+answer].innerHTML
  window["QuizAnswer"+answer].style.color = getContrastColor(window["QuizAnswer"+answer].innerHTML)
  if(answer == window.CorrectAnswer) {
    setTimeout(() => {
      AnswerContainer1.style.backgroundColor = null
      AnswerContainer2.style.backgroundColor = null
      AnswerContainer3.style.backgroundColor = null
      QuizAnswer1.style.color = null
      QuizAnswer2.style.color = null
      QuizAnswer3.style.color = null
      CreateQuestion()
    }, 500)
  }
}