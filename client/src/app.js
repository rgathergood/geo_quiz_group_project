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

  countriesData.getData((countries) => {
    quizStartButton.addEventListener('click', () =>  {
      quizData.generateQuiz();
      quizView.renderQuestion(quizData.questions[0]);
      console.log(quizData.questions[0]);
    
    });
  });

});
