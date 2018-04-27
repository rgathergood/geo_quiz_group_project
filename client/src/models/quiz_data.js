

const QuizData = function(countriesData){
  this.countriesData = countriesData;
}

QuizData.prototype.generateQuiz = function(){
  this.title = 'Flag Quiz';
  const rightAnswers = this.countriesData.getSampleCountries();
  this.questions = [];
  rightAnswers.forEach((rightAnswer) => {
    const wrongAnswers = this.countriesData.getDifferentCountries(rightAnswer);
    this.questions.push(this.generateQuestion(rightAnswer, wrongAnswers));
  });
}

QuizData.prototype.generateQuestion = function (rightAnswer, wrongAnswers) {
  let question = {};

  question.text = 'What country does this flag belong to?';
  question.imgUrl = rightAnswer.flag;
  question.correctIndex = Math.floor(Math.random() * (wrongAnswers.length + 1));

  const rightName = rightAnswer.name;
  const wrongNames = wrongAnswers.map((wrongAnswer) => wrongAnswer.name);

  question.answers = [...wrongAnswers];
  question.answers.splice(question.correctIndex, 0, rightName);
  question.wrongNames = wrongNames;
  question.wrongAnswers = wrongAnswers;
  return question;
}

module.exports = QuizData;
