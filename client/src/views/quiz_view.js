const QuizView = function(quizContainer) {
  this.quizContainer = quizContainer;
}

QuizView.prototype.renderQuestion = function (question, onNextButtonClicked) {
  this.quizContainer.innerHTML = "";

  const text = document.createElement('h3');
  text.classList.add('question-text');
  text.textContent = question.text;
  this.quizContainer.appendChild(text);

  const image = document.createElement('img');
  image.classList.add('question-image');
  image.src = question.imgUrl;
  this.quizContainer.appendChild(image);

  this.renderAnswerButtons(question);
  this.createNextButton(onNextButtonClicked);

};

QuizView.prototype.renderAnswerButtons = function(question) {
  for(let i = 0; i < question.answers.length; i++) {
    const button = document.createElement('button');
    button.classList.add('answer-button');
    if(i === question.correctIndex) {
      button.classList.add('correct-answer');
    } else {
      button.classList.add('incorrect-answer');
    }
    button.textContent = question.answers[i];
    this.quizContainer.appendChild(button);
    console.log(button.classList);

    button.addEventListener('click', ()  =>  {
      const correctBtn = document.querySelector('.correct-answer');
      correctBtn.classList.add('show-correct');

      if (!button.classList.contains('show-correct')) {
        button.classList.add('show-incorrect');
      }

      const buttons = document.querySelectorAll('.answer-button');
      buttons.forEach((button) => button.disabled = true);
    });
  }
}

QuizView.prototype.renderResult = function () {
  this.quizContainer.innerHTML = "";

  const text = document.createElement('h3');
  text.classList.add('result-text');
  text.textContent = 'Wahoo!';
  this.quizContainer.appendChild(text);
};

QuizView.prototype.createNextButton = function (onNextButtonClicked) {
  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.classList.add('next-button');
  nextButton.addEventListener('click', onNextButtonClicked);
  this.quizContainer.appendChild(nextButton);
};

module.exports = QuizView;
