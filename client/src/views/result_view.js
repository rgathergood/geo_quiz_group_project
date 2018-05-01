const Request = require('../helpers/request.js');

const leaderboardRequest = new Request('./db/leaderboard');

const ResultView = function (container) {
  this.container = container;
}

const customMessages = ['Oh dear...', 'Not bad', 'Good Job', 'Amazing!', 'Incredible!!!'];

ResultView.prototype.renderResult = function (result) {
  this.container.innerHTML = "";

  const text = document.createElement('h3');
  text.classList.add('result-text');
  const message = this.customMessage(result);
  text.textContent = `${message} ${result.name}! You got ${result.score} out of 10 with ${result.timeRemaining} left on the clock!`;
  this.container.appendChild(text);

  const table = document.createElement('table');
  table.classList.add('results-table');
  this.container.appendChild(table);

  const row = table.insertRow(0);
  const nameHeader = row.insertCell(0);
  const scoreHeader = row.insertCell(1);
  nameHeader.innerHTML = 'Name';
  scoreHeader.innerHTML = 'Score';

  const getScoresRequestComplete = function (allScores) {
    const sortedScores = allScores.sort((a, b) => b.score - a.score);
    for (let i = 0; i < sortedScores.length; i++) {
      const resultsRow = table.insertRow(i + 1);
      const playerName = resultsRow.insertCell(0);
      const playerScore = resultsRow.insertCell(1);
      playerName.innerHTML = `${sortedScores[i].name}`;
      playerScore.innerHTML = `${sortedScores[i].score}`;
    }
  }
  leaderboardRequest.get(getScoresRequestComplete);
}

ResultView.prototype.customMessage = function (result) {
  switch (true) {
    case (result.score < 3):
    return customMessages[0];
    break;

    case (result.score < 6):
    return customMessages[1];
    break;

    case (result.score < 8):
    return customMessages[2];
    break;

    case (result.score < 10):
    return customMessages[3];
    break;

    default:
    return customMessages[4];
  }
}

module.exports = ResultView;
