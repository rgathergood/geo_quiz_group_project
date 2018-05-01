const CountdownTimer = function(duration) {
  this.duration = duration;
}

CountdownTimer.prototype.start = function() {
  // todo: set display = duration
  this.startTime = Date.now();
  this.interval = setInterval(() => this.printTimeLeft(), 1000);
}

CountdownTimer.prototype.printTimeLeft = function() {
  const secondsExpired = Math.floor((Date.now() - this.startTime)/1000);
  const totalSecondsLeft = this.duration - secondsExpired;

  let minutes = Math.floor(totalSecondsLeft/60);
  let seconds = Math.floor(totalSecondsLeft % 60);

  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  const timeString = minutes + ':' + seconds;
  console.log(timeString);

  if (totalSecondsLeft <= 0) {
    clearInterval(this.interval);
  }

}

module.exports = CountdownTimer;
