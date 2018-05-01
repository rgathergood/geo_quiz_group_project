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
  form.appendChild(input);

  let button = document.createElement('button');
  button.textContent = "Start";
  button.classList.add('start-quiz-button');
  button.disabled = true;
  form.appendChild(button);

  input.addEventListener('input', function() {
    button.disabled = false;
  });

  onStartButtonClicked(button, input);

  this.container.appendChild(form);
}

module.exports = StartView;
