const CountdownTimer = function(duration, onComplete) {
  this.duration = duration;
  this.onComplete = onComplete;
  this.updateDisplay(duration);
}

CountdownTimer.prototype.start = function() {
  this.startTime = Date.now();
  this.interval = setInterval(() => this.printTimeLeft(), 100);
}

CountdownTimer.prototype.printTimeLeft = function() {
  const secondsExpired = Math.floor((Date.now() - this.startTime)/1000);
  const totalSecondsLeft = this.duration - secondsExpired;
  this.updateDisplay(totalSecondsLeft);

  if (totalSecondsLeft <= 0) {
    clearInterval(this.interval);
    this.onComplete();
  }
}

CountdownTimer.prototype.updateDisplay = function(totalSeconds) {
  let minutes = Math.floor(totalSeconds/60);
  let seconds = Math.floor(totalSeconds % 60);

  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  this.display = timeString = minutes + ':' + seconds;
  console.log(this.display);
}

module.exports = CountdownTimer;
