const Request = require('../helpers/request.js');

const leaderboardRequest = new Request('./db/leaderboard');

const ResultView = function (container) {
  this.container = container;
}

const customMessages = ['Oh dear', 'Not bad', 'Good Job', 'Amazing', 'Incredible'];

ResultView.prototype.renderResult = function (result) {
  this.container.innerHTML = "";

  const messageText = document.createElement('h2');
  messageText.classList.add('result-text');
  const message = this.customMessage(result);
  messageText.textContent = `${message}, ${result.name}!`;
  this.container.appendChild(messageText);

  const scoreText = document.createElement('h2');
  scoreText.classList.add('result-text');
  scoreText.textContent = `You got ${result.score} out of 10 with ${result.timeRemaining} seconds remaining!`;
  this.container.appendChild(scoreText);

  const table = document.createElement('table');
  table.classList.add('results-table');
  this.container.appendChild(table);

  const row = table.insertRow(0);
  row.classList.add('name-score-row');
  const nameHeader = row.insertCell(0);
  const scoreHeader = row.insertCell(1);
  const timeHeader = row.insertCell(2);
  nameHeader.innerHTML = 'Name';
  scoreHeader.innerHTML = 'Score';
  timeHeader.innerHTML = 'Time Left';

  const getScoresRequestComplete = function (allScores) {
    for (let i = 0; i < allScores.length; i++) {
      allScores[i].oldindex = i;
    }

    console.log(allScores);

    const sortedScores = allScores.sort(function(a, b) {
      return b.score - a.score  ||  b.remainingTime - a.remainingTime;
    });

    for (let i = 0; i < sortedScores.length; i++) {
      const resultsRow = table.insertRow(i + 1);
      const playerName = resultsRow.insertCell(0);
      const playerScore = resultsRow.insertCell(1);
      const playerRemainingTime = resultsRow.insertCell(2);
      if (sortedScores[i].oldindex === sortedScores.length - 1) {
        playerName.classList.add('new-entry');
        playerScore.classList.add('new-entry');
        playerRemainingTime.classList.add('new-entry');
      }
      playerName.innerHTML = `${sortedScores[i].name}`;
      playerScore.innerHTML = `${sortedScores[i].score}`;
      playerRemainingTime.innerHTML = `${sortedScores[i].timeRemaining}`;
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
