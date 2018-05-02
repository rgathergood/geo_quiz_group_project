const QuizView = function(quizContainer) {
  this.quizContainer = quizContainer;
}

QuizView.prototype.renderQuestion = function (index, question, onNextButtonClicked, onCorrectAnswerClicked) {
  this.quizContainer.innerHTML = "";
  this.questionContainer = document.createElement('div');
  this.flexboxContainer = document.createElement('div');
  this.flagContainer = document.createElement('div');
  this.buttonContainer = document.createElement('div');
  this.quizContainer.appendChild(this.questionContainer);
  this.quizContainer.appendChild(this.flexboxContainer);
  this.quizContainer.appendChild(this.flagContainer);
  this.quizContainer.appendChild(this.buttonContainer);

  console.log(1);
  this.questionContainer.innerHTML = "";
  this.flexboxContainer.innerHTML = "";
  this.flagContainer.innerHTML = "";
  this.buttonContainer.innerHTML = "";
  console.log(2);
  const timerDisplay = document.createElement('h2');
  timerDisplay.classList.add('timer');
  this.questionContainer.appendChild(timerDisplay);
console.log(3);
  const text = document.createElement('h3');
  text.classList.add('question-text');
  text.textContent = question.text;
  this.questionContainer.appendChild(text);
  // this.quizContainer.appendChild(text);
console.log(4);
  const image = document.createElement('img');
  image.classList.add('question-image');
  image.src = question.imgUrl;
  this.flagContainer.appendChild(image);
  // this.quizContainer.appendChild(image);
console.log(5);
  const counter = document.createElement('p');
  counter.classList.add('counter');
  counter.textContent = `${index} of 10`;
  this.questionContainer.appendChild(counter);
console.log(6);
  this.renderAnswerButtons(question, onCorrectAnswerClicked);
  console.log(7);
  this.createNextButton(onNextButtonClicked);
  console.log(8);
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
    this.buttonContainer.appendChild(button);

    button.addEventListener('click', ()  =>  {
      const correctBtn = document.querySelector('.correct-answer');
      correctBtn.classList.add('show-correct');

      if (button.classList.contains('show-correct')) {
        onCorrectAnswerClicked();
      }
      else {
        button.classList.add('show-incorrect');
      }

      const nextButton = document.querySelector('.next-button');
      nextButton.textContent = 'Next';

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
  flexBoxContainerRight.appendChild(text);
  this.quizContainer.appendChild(flexBoxContainerRight);
};

QuizView.prototype.createNextButton = function (onNextButtonClicked) {
  const nextButton = document.createElement('button');
  nextButton.textContent = 'Skip';
  nextButton.classList.add('next-button');
  nextButton.addEventListener('click', onNextButtonClicked);
  this.buttonContainer.appendChild(nextButton);
};

module.exports = QuizView;
