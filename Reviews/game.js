let time;
var userId = localStorage.getItem('userID');
if (!userId) {
  window.location.href = "https://muhammadp3.sg-host.com/";
} else {
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let startTime;
let endTime;
let correctQuestions = [];
let wrongQuestions = [];
let topicIds = [];
let questionIds = [];
let finalresult = [];
let questionTimes = [];
let questions = [];
var userId = localStorage.getItem('userID') ;
var topicId = localStorage.getItem('topicId');
var MAX_QUESTIONS;



let quizId;

fetch('https://mcqapi.onrender.com/api/quiz/review', {
  method: 'POST',
  body: JSON.stringify({ "userId":userId , "topicId":topicId}),
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((res) => res.json())
  .then((loadedQuestions) => {
    quizId = loadedQuestions[0].QuizId;
    MAX_QUESTIONS = loadedQuestions.length;
    

    questions = loadedQuestions.map((loadedQuestion) => {
      const question = loadedQuestion.question;
      const choices = [loadedQuestion.answer1, loadedQuestion.answer2, loadedQuestion.answer3, loadedQuestion.answer4];
      shuffleArray(choices);

      const answer = loadedQuestion.correctAnswer;
      const topicId = loadedQuestion.TopicId;
      const questionId = loadedQuestion.id;

      return {
        question,
        choice1: choices[0],
        choice2: choices[1],
        choice3: choices[2],
        choice4: choices[3],
        answer,
        topicId,
        questionId,
      };
    });

    startGame();
  })
  .catch((err) => {
    console.error(err);
  });

const CORRECT_BONUS = 1;


startGame = () => {
  startTime = new Date();
  startTime.setTime(startTime.getTime() + (1 * 3600000));
  console.log('Quiz Start Time (GMT+1):', startTime);
  time = formatDate(startTime);
  console.log("fixed time is:", time);

  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
  game.classList.remove('hidden');
  loader.classList.add('hidden');
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
    // Go to the end page
    return window.location.assign('https://muhammadp3.sg-host.com/Reviews/end.html');}
  
  if (questionCounter === MAX_QUESTIONS) {
    endTime = new Date();
    endTime1 = new Date();
    endTime1.setTime(endTime1.getTime() + (1 * 3600000));
    const totalTimeInSeconds = Math.round((endTime - startTime) / 1000);

    const quizData = {
      userId: userId,
      topicIds: topicIds,
      questionIds: questionIds,
      attemptBy: 'Quiz',
      quizId: quizId,
      corrects: finalresult,
      timetakens: questionTimes,
      quizstime: time,
      quizetime: formatDate(endTime1),
    };

    console.log('Quiz End Time:', endTime);
    console.log('Quiz Data:', quizData);

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(quizData),
      redirect: 'follow',
    };

    fetch('https://mcqapi.onrender.com/api/quiz/result', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));

    return;
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = currentQuestion.question;

  choices.forEach((choice, index) => {
    choice.innerHTML = currentQuestion['choice' + (index + 1)];
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
  startTime = new Date();
};

choices.forEach((choice) => {
  choice.addEventListener('click', (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.innerHTML;

    const classToApply = selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect';

    if (classToApply === 'correct') {
      incrementScore(CORRECT_BONUS);
      correctQuestions.push(currentQuestion);
    } else {
      wrongQuestions.push(currentQuestion);
    }
    if (classToApply === 'correct') {
      finalresult.push(1);
    } else {
      finalresult.push(0);
    }

    topicIds.push(currentQuestion.topicId);
    questionIds.push(currentQuestion.questionId);

    selectedChoice.parentElement.classList.add(classToApply);

    const endTime = new Date();
    const timeInSeconds = Math.round((endTime - startTime) / 1000);
    questionTimes.push(timeInSeconds);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

getUniqueValues = (array) => {
  return Array.from(new Set(array));
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function formatDate(date) {
  const formattedDate = date.toISOString().split('.')[0];
  return formattedDate.replace('T', ' ');
}
}