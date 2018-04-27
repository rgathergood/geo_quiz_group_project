const Request = require('./helpers/request.js');
const CountriesData = require('./models/countries_data.js');
const QuizData = require('./models/quiz_data.js');

document.addEventListener('DOMContentLoaded', () => {
  const countriesData = new CountriesData();
  const quizData = new QuizData(countriesData);

  const quizStartButton = document.querySelector("#flag-quiz-button");
  const quizContainer = document.querySelector("#quiz-container");

  countriesData.getData((countries) => {
    const sample = countriesData.getSampleCountries();
    const smallSample = countriesData.getDifferentCountries(sample[0]);

    quizStartButton.addEventListener('click', () =>  {
      quizData.generateQuiz();
      console.log(quizData);
    });
  });

});
