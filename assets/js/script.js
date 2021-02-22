
var startButton = document.getElementById('start-btn');
var nextButton = document.getElementById('next-btn');
var resultButton = document.getElementById('result-btn');
var questionContainerEl = document.getElementById('question-container');

var questionEl = document.getElementById('question');
var answerButtonEl = document.getElementById('answer-buttons');

var timerEl = document.getElementById('timer');
var timeLeft = 60;
var timeInterval;
var score = 0
var highscore = localStorage.getItem("highscore");
var correctSound = document.getElementById("correct-sound");
var wrongSound = document.getElementById("wrong-sound");

var initialsInputSpan = document.querySelector('#userinitials');

startButton.addEventListener('click', startGame);
startButton.addEventListener('click', countdown);
nextButton.addEventListener('click', () => {
  currentQuestions++
  moveNextQuestion()
})

let shuffledQuestions, currentQuestions

// starting the game 
function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestions = 0;
  questionContainerEl.classList.remove('hide');
  moveNextQuestion();
}

//Timer count down from 60 
function countdown() {
  timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      timerEl.textContent = timeLeft + ' seconds remaining';
      timeLeft--;
    } else if (timeLeft === 1) {
      timerEl.textContent = timeLeft + ' second remaining ';
    } else {
      timerEl.textContent = '';
      clearInterval(timeInterval)
      listScores()
    }


  }, 1000);

}



// Move to the next question 
function moveNextQuestion() {
  resetQuestions()
  showQuestion(shuffledQuestions[currentQuestions]);
}

function showQuestion(question) {
  questionEl.innerText = question.question;
  question.answers.forEach(answer => {
    var button = document.createElement('button');
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonEl.appendChild(button)
  });

}


// answer a question 
function selectAnswer(event) {

  var selectedAnswer = event.target
  var correct = selectedAnswer.dataset.correct

  if (!correct) {
    timeLeft = timeLeft - 5;
    wrongSound.play()
  }
  else {
    score = score + 10;
    correctSound.play()
  }


  setStatusClass(document.body, correct);
  Array.from(answerButtonEl.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestions + 1) {
    nextButton.classList.remove('hide')
  } else {
    resultButton.innerText = ' Your score is ' + score;
    resultButton.classList.remove('hide');
    clearInterval(timeInterval);
    initialsInputSpan.classList.remove('hide');
    // listScores()

  }
}

initialsInputSpan.addEventListener('click', function (event) {
  var initialInput = document.querySelector("#userinitials").value;


  localStorage.setItem('initials', initialInput);
  localStorage.setItem('score', score);
  renderLastRegistered()
});


function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')

  } else {
    element.classList.add('wrong');

  }

}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

function resetQuestions() {
  nextButton.classList.add('hide')
  while (answerButtonEl.firstChild) {
    answerButtonEl.removeChild
      (answerButtonEl.firstChild)
  }
}

function renderLastRegistered() {
  // TODO: Retrieve the last scores from localStorage
  let lastInitials = localStorage.getItem('initials');
  let lastScore = localStorage.getItem('score');
  var highscores = document.getElementById("highscores");

  // highscores.textContent = lastInitials + "  " + lastScore

  if (score) {
    i= 0; i >= lastScore 
    highscores.textContent = lastInitials + "  " + lastScore
  }
 


  var node = document.createElement("LI")
  var textnode = document.createTextNode(lastInitials + "  " + lastScore)

  node.appendChild(textnode);
 
  document.getElementById("highscores").appendChild

  playerScores.push("highscores");
  hsLen = playerScores.length;

}

playerScores = []


// Q & A array 
var questions = [
  {
    question: 'Which of these are not allowed in variable naming?',
    answers: [
      { text: 'letters', correct: false },
      { text: 'numbers', correct: false },
      { text: 'special characters ! and %', correct: true },
      { text: 'special characters $ and _', correct: false },
    ]
  },
  {
    question: 'Which of these are NOT a data type?',
    answers: [
      { text: 'Boolean', correct: false },
      { text: 'Null', correct: false },
      { text: 'Var', correct: true },
      { text: 'String', correct: false },
    ]
  },
  {
    question: 'The typeof operator _______',
    answers: [
      { text: 'makes a type of its own', correct: false },
      { text: 'returns the type of the argument', correct: true },
      { text: 'is used to store true/false values', correct: false },
      { text: 'is wrapped in "" ', correct: false },
    ]
  },
  {
    question: 'which is true about unary + ?',
    answers: [
      { text: 'They convert strings to numbers', correct: false },
      { text: 'They are applied first', correct: false },
      { text: 'Is the same as "Number(...)" ', correct: false },
      { text: 'All of the above', correct: true },
    ]
  },
  {
    question: 'Which is false about global variables?',
    answers: [
      { text: 'It is declared inside a function', correct: true },
      { text: 'It is good practice to minimize use of global variables', correct: false },
      { text: 'They are visable from any function', correct: false },
      { text: 'It can be shadowed by local functions', correct: false },
    ]
  },
];
