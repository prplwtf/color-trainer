document.addEventListener("DOMContentLoaded", () => {
  // Get elements
  let TitleContainer = document.getElementById("TitleContainer")
  let ScoreCounterCorrect = document.getElementById("ScoreCounterCorrect")
  let ScoreCounterCorrectContainer = document.getElementById("ScoreCounterCorrectContainer")
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

  // Change background colors
  ColorBox.style.backgroundColor = HexColor
  ScoreCounterCorrectContainer.style.backgroundColor = HexColor

  // Change foreground colors
  TitleContainer.style.color = HexColor
  ScoreCounterCorrectContainer.style.color = getContrastColor(HexColor)
  ColorBox.style.color = getContrastColor(HexColor)

  // Change question text
  ColorBox.innerHTML = HexColor

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
  let SimilarHex = getSimilarHexColor(HexColor);
  window["QuizAnswer"+CorrectAnswer].innerHTML = SimilarHex
  window["AnswerContainer"+CorrectAnswer].style.setProperty("--mdc-ripple-color", SimilarHex)

  // Assign incorrect options
  // FIXME: Random hex colors have a chance of being more similar than the correct answer
  if(window.CorrectAnswer != 1) { color = getRandomHexColor(); QuizAnswer1.innerHTML = color; AnswerContainer1.style.setProperty("--mdc-ripple-color", color) }
  if(window.CorrectAnswer != 2) { color = getRandomHexColor(); QuizAnswer2.innerHTML = color; AnswerContainer2.style.setProperty("--mdc-ripple-color", color) }
  if(window.CorrectAnswer != 3) { color = getRandomHexColor(); QuizAnswer3.innerHTML = color; AnswerContainer3.style.setProperty("--mdc-ripple-color", color) }
}

function QuizSelect(answer) {
  if(window.AnswerBlock == true) return;

  window.GuessAttempts = window.GuessAttempts + 1
  window["AnswerContainer"+answer].style.backgroundColor = window["QuizAnswer"+answer].innerHTML
  window["QuizAnswer"+answer].style.color = getContrastColor(window["QuizAnswer"+answer].innerHTML)
  if(answer == window.CorrectAnswer) {
    window.AnswerBlock = true
    setTimeout(() => {
      AnswerContainer1.style.opacity = 0
      AnswerContainer2.style.opacity = 0
      AnswerContainer3.style.opacity = 0
      AnswerContainer1.style.backgroundColor = null
      AnswerContainer2.style.backgroundColor = null
      AnswerContainer3.style.backgroundColor = null
      QuizAnswer1.style.color = null
      QuizAnswer2.style.color = null
      QuizAnswer3.style.color = null
    }, 250)
    setTimeout(() => {
      AnswerContainer1.style.opacity = 1
      AnswerContainer2.style.opacity = 1
      AnswerContainer3.style.opacity = 1
      CreateQuestion()
      window.AnswerBlock = false
    }, 650)
  }
}