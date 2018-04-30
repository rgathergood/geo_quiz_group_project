const Request = require('./helpers/request.js');
const CountriesData = require('./models/countries_data.js');
const QuizData = require('./models/quiz_data.js');
const QuizView = require('./views/quiz_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const quizStartButton = document.querySelector("#flag-quiz-button");
  const quizContainer = document.querySelector("#quiz-container");

  const countriesData = new CountriesData();
  const quizData = new QuizData(countriesData);
  const quizView = new QuizView(quizContainer);

  let score;
  const incrementScore = function() {
    score += 1;
  }

  const renderNewQuestion = function(index) {
    if (index < quizData.questions.length - 1) {
      quizView.renderQuestion(
        quizData.questions[index + 1],
        () => {
          renderNewQuestion(index + 1);
        },
        incrementScore
      );
    }
    else {
      quizView.renderResult(score);
    }
  }

  countriesData.getData((countries) => {
    quizStartButton.addEventListener('click', () =>  {
      quizData.generateQuiz();
      score = 0;
      let index = 0;
      quizView.renderQuestion(quizData.questions[0], () => {
        renderNewQuestion(index);
        },
        incrementScore
      );
    });
  });

});
