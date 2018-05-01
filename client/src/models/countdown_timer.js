const CountdownTimer = function(duration, onUpdate) {
  this.display = '';
  this.duration = duration;
  this.onUpdate = onUpdate;
  this.updateDisplay(duration);
}

CountdownTimer.prototype.start = function() {
  this.startTime = Date.now();
  this.interval = setInterval(() => this.printTimeLeft(), 500);
}

CountdownTimer.prototype.stop = function() {
  clearInterval(this.interval);
  console.log('Timer stopped');
}

CountdownTimer.prototype.printTimeLeft = function() {
  const secondsExpired = Math.floor((Date.now() - this.startTime)/1000);
  const totalSecondsLeft = this.duration - secondsExpired;
  this.updateDisplayWithCallback(totalSecondsLeft);
  if (totalSecondsLeft <= 0) {
    this.stop();
  }
}

CountdownTimer.prototype.updateDisplay = function(totalSeconds) {
  let minutes = Math.floor(totalSeconds/60);
  let seconds = Math.floor(totalSeconds % 60);

  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  this.display = timeString = minutes + ':' + seconds;
}

CountdownTimer.prototype.updateDisplayWithCallback = function(totalSeconds) {
  this.updateDisplay(totalSeconds);
  this.onUpdate();
}

module.exports = CountdownTimer;
