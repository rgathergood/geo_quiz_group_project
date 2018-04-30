const Request = require('./helpers/request.js');
const CountriesData = require('./models/countries_data.js');
const QuizData = require('./models/quiz_data.js');
const QuizView = require('./views/quiz_view.js');
const StartView = require('./views/start_view.js');

let score;

document.addEventListener('DOMContentLoaded', () => {
  const quizStartButton = document.querySelector("#flag-quiz-button");
  const quizContainer = document.querySelector("#quiz-container");

  const countriesData = new CountriesData();
  const quizData = new QuizData(countriesData);
  const quizView = new QuizView(quizContainer);
  const startView = new StartView(quizContainer);

  countriesData.getData(() => {
    quizStartButton.addEventListener('click', () =>  {
      startView.renderStart((button) =>  {
        button.addEventListener('click', (event) => {
          event.preventDefault();
          quizData.generateQuiz();
          score = 0;
          renderNewQuestion(-1, quizData, quizView);
        });
      });
    });
  });

});

const incrementScore = function() {
  score += 1;
}

const renderNewQuestion = function(index, quizData, quizView) {
  if (index < quizData.questions.length - 1) {
    quizView.renderQuestion(
      quizData.questions[index + 1],
      () => {
        renderNewQuestion(index + 1, quizData, quizView);
      },
      incrementScore
    );
  }
  else {
    quizView.renderResult(score);
  }
}
