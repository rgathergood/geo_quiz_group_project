const Request = require('./helpers/request.js');
const CountriesData = require('./models/countries_data.js');
const CountdownTimer = require('./models/countdown_timer.js');
const QuizData = require('./models/quiz_data.js');
const QuizView = require('./views/quiz_view.js');
const StartView = require('./views/start_view.js');
const ResultView = require('./views/result_view.js');

const leaderboardRequest = new Request('./db/leaderboard');
let result = {};

document.addEventListener('DOMContentLoaded', () => {
  const newQuizButton = document.querySelector("#new-quiz-button");
  const quizContainer = document.querySelector("#quiz-container");

  const countriesData = new CountriesData();
  const quizData = new QuizData(countriesData);
  const quizView = new QuizView(quizContainer);
  const startView = new StartView(quizContainer);
  const resultView = new ResultView(quizContainer);

  const timer = new CountdownTimer(60, function() {
    if (this.display === '00:00') loadResultsPage(this, resultView)
    quizView.updateTimerDisplay(this.display);
  });

  countriesData.getData(() => {
    newQuizButton.addEventListener('click', () =>  {
      startView.renderStart((startButton, input) =>  {
        startButton.addEventListener('click', (event) => {
          event.preventDefault();
          quizData.generateQuiz();
          result.score = 0;
          result.name = input.value;

          renderNewQuestion(-1, quizData, quizView, resultView, timer);
          timer.start();
        });
      });
    });
  });
});

const incrementScore = function() {
  result.score += 1;
}

const renderNewQuestion = function(index, quizData, quizView, resultView, timer) {
  if (index < quizData.questions.length - 1) {
    quizView.renderQuestion(
      index + 2,
      quizData.questions[index + 1],
      () => {
        renderNewQuestion(index + 1, quizData, quizView, resultView, timer);
      },
      incrementScore
    );
  }
  else {
    loadResultsPage(timer, resultView);
  }
}

const loadResultsPage = function(timer, resultView) {
  timer.stop();
  result.timeRemaining = timer.display;
  resultView.renderResult(result);
  leaderboardRequest.post(result, () => {console.log('Successfully wrote to db')});
}
