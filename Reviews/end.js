const correctAnswers = document.getElementById('correctAnswers');
const wrongAnswers = document.getElementById('wrongAnswers');
const mostRecentScore = localStorage.getItem('mostRecentScore');
var userId = localStorage.getItem('userID');
var total;

var topicId = localStorage.getItem('topicId');
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
fetch('https://mcqapi.onrender.com/api/quiz/review', {
  method: 'POST',
  body: JSON.stringify({ "userId":userId , "topicId":topicId}),
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((res) => res.json())
  .then((loadedQuestions) => {
    total = loadedQuestions.length;
    
    correctAnswers.innerText = `${mostRecentScore}`;
  
    var wrongAnswerCount = total - mostRecentScore;
    if (isNaN(wrongAnswerCount)) {
    wrongAnswerCount = 0;
   }
    wrongAnswers.innerText = wrongAnswerCount;

  })
  .catch((err) => {
    console.error(err);
  });



