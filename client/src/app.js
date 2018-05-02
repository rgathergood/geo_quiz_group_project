const Request = require('./helpers/request.js');

const CountriesData = require('./models/countries_data.js');
const CountdownTimer = require('./models/countdown_timer.js');
const QuizData = require('./models/quiz_data.js');
const AudioData = require('./models/audio_data.js');

const QuizView = require('./views/quiz_view.js');
const StartView = require('./views/start_view.js');
const ResultView = require('./views/result_view.js');
const AudioView = require('./views/audio_view.js');

const leaderboardRequest = new Request('./db/leaderboard');

let result = {};

document.addEventListener('DOMContentLoaded', () => {
  const newQuizButton = document.querySelector("#new-quiz-button");
  const quizContainer = document.querySelector("#quiz-container");
  const audioContainer = document.querySelector("#audio-container");
  const anthemPlayer = document.querySelector('#anthem-player');

  const countriesData = new CountriesData();
  const quizData = new QuizData(countriesData);
  const audioData = new AudioData();

  const quizView = new QuizView(quizContainer);
  const startView = new StartView(quizContainer);
  const resultView = new ResultView(quizContainer);
  const audioView = new AudioView(audioContainer, anthemPlayer, audioData);

  const timer = new CountdownTimer(60, function() {
    if (this.display === '00:00') {
      console.log('out of time - calling loadResultsPage');
      loadResultsPage(this, resultView);
    }
    quizView.updateTimerDisplay(this.display);
  });

  audioData.getData(() => {
    countriesData.getData(() => {

      audioView.render();

      newQuizButton.addEventListener('click', () =>  {
        startView.renderStart((startButton, input) =>  {
          startButton.addEventListener('click', (event) => {
            event.preventDefault();
            quizData.generateQuiz();
            result.score = 0;
            result.name = input.value;

            renderNewQuestion(0, quizData, quizView, resultView, timer);
            timer.start();
          });
        });
      });
    });
  });
});

const incrementScore = function() {
  result.score += 1;
}

const renderNewQuestion = function(index, quizData, quizView, resultView, timer) {
  if (index < quizData.questions.length) {
    quizView.renderQuestion(
      index + 1,
      quizData.questions[index],
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
  const a = timer.display.split(':');
  const secondsRemaining = Number(a[0] * 60 + a[1]);
  result.timeRemaining = secondsRemaining;

  leaderboardRequest.post(result, () => resultView.renderResult(result));
}
