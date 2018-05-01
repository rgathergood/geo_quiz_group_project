const ResultView = function (container) {
  this.container = container;
}

ResultView.prototype.renderResult = function (result) {
  this.container.innerHTML = "";

  const text = document.createElement('h3');
  text.classList.add('result-text');
  text.textContent = `Congratulations, ${result.name}! You got ${result.score} out of 10!`;
  this.container.appendChild(text);

  const table = document.createElement('table');
  table.classList.add('results-table');
  this.container.appendChild(table);
  const row = table.insertRow(0);
  const nameHeader = row.insertCell(0);
  const scoreHeader = row.insertCell(1);
  nameHeader.innerHTML = 'Name';
  scoreHeader.innerHTML = 'Score';
};

module.exports = ResultView;
