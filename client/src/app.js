const Request = require('./helpers/request.js');
const CountriesData = require('./models/countries_data.js');
const QuizData = require('./models/quiz_data.js');

document.addEventListener('DOMContentLoaded', () => {
  const countriesData = new CountriesData();
  const quizData = new QuizData(countriesData);
  countriesData.getData((countries) => {
    // console.dir(countriesData.data);

    const sample = countriesData.getSampleCountries();
    console.log(sample);
    const smallSample = countriesData.getDifferentCountries(sample[0]);
    console.log(smallSample);
    quizData.generateQuiz();
    console.log(quizData);
  });


});
