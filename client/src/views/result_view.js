const ResultView = function (container) {
  this.container = container;
}

ResultView.prototype.renderResult = function (result) {
  this.container.innerHTML = "";

  const text = document.createElement('h3');
  text.classList.add('result-text');
  text.textContent = `Congratulations, ${result.name}! You got ${result.score} out of 10!`;
  this.container.appendChild(text);
};

module.exports = ResultView;
