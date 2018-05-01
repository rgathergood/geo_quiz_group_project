const StartView = function(container) {
  this.container = container;
}

StartView.prototype.renderStart = function (onStartButtonClicked) {
  this.container.innerHTML = "";

  const form = document.createElement('form');

  const text = document.createElement('h3');
  text.textContent = "Please enter your name";
  form.appendChild(text);

  const input = document.createElement('input');
  input.required = true;
  form.appendChild(input);

  const button = document.createElement('button');
  button.textContent = "Start";
  button.classList.add('start-quiz-button');
  button.type = 'submit';
  onStartButtonClicked(button, input);
  form.appendChild(button);

  this.container.appendChild(form);
}

module.exports = StartView;
