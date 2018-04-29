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

  const renderNewQuestion = function(index) {
    if (index < quizData.questions.length - 1) {
      quizView.renderQuestion(quizData.questions[index + 1], () => {
        renderNewQuestion(index + 1);
      });
    }
    else {
      quizView.renderResult();
    }
  }

  countriesData.getData((countries) => {
    quizStartButton.addEventListener('click', () =>  {
      quizData.generateQuiz();
      let index = 0;
      quizView.renderQuestion(quizData.questions[0], () => {
        renderNewQuestion(index);
      });
      console.log(quizData.questions[0]);
    });
  });

});
