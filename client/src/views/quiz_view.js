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

  for(let i = 0; i < question.answers.length; i++) {
    const button = document.createElement('button');
    if(i === question.correctIndex) {
      button.classList.add('correct-answer');
    } else {
      button.classList.add('incorrect-answer');
    }
    button.textContent = question.answers[i];
    this.quizContainer.appendChild(button);

    button.addEventListener('click', function () {
      const correctBtn = document.querySelector('.correct-answer');
      correctBtn.classList.add('show-correct');
      if (!button.classList['show-correct']) {
        button.classList.add('show-incorrect');
      }
    });
  }
  this.createNextButton(onNextButtonClicked);

};

QuizView.prototype.createNextButton = function (onNextButtonClicked) {
  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.classList.add('next-button');
  nextButton.addEventListener('click', onNextButtonClicked);
  this.quizContainer.appendChild(nextButton);
};

module.exports = QuizView;
