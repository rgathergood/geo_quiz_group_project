const QuizView = function(quizContainer) {
  this.quizContainer = quizContainer;
}

QuizView.prototype.renderQuestion = function (question, onNextButtonClicked, onCorrectAnswerClicked) {
  this.quizContainer.innerHTML = "";

  const timerDisplay = document.createElement('h2');
  timerDisplay.classList.add('timer');
  this.quizContainer.appendChild(timerDisplay);

  const text = document.createElement('h3');
  text.classList.add('question-text');
  text.textContent = question.text;
  this.quizContainer.appendChild(text);

  const image = document.createElement('img');
  image.classList.add('question-image');
  image.src = question.imgUrl;
  this.quizContainer.appendChild(image);

  this.renderAnswerButtons(question, onCorrectAnswerClicked);
  this.createNextButton(onNextButtonClicked);
};

QuizView.prototype.updateTimerDisplay = function (timeString) {
  const timerDisplay = document.querySelector('.timer');
  if (timerDisplay !== null) timerDisplay.textContent = timeString;
};

QuizView.prototype.renderAnswerButtons = function(question, onCorrectAnswerClicked) {
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

    button.addEventListener('click', ()  =>  {
      const correctBtn = document.querySelector('.correct-answer');
      correctBtn.classList.add('show-correct');

      if (button.classList.contains('show-correct')) {
        onCorrectAnswerClicked();
      }
      else {
        button.classList.add('show-incorrect');
      }

      const buttons = document.querySelectorAll('.answer-button');
      buttons.forEach((button) => button.disabled = true);
    });
  }
}

QuizView.prototype.renderResult = function (result) {
  this.quizContainer.innerHTML = "";

  const text = document.createElement('h3');
  text.classList.add('result-text');
  text.textContent = `Congratulations, ${result.name}! You got ${result.score} out of 10!`;
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
