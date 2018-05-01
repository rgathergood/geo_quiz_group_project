const CountdownTimer = function(duration) {

  this.duration = duration;
}

CountdownTimer.prototype.start = function() {
  // todo: set display = duration
  this.startTime = Date.now();
  this.interval = setInterval(this.printTimeLeft, 1000);
}

CountdownTimer.prototype.printTimeLeft = function() {
  const secondsElapsed = Math.floor((Date.now() - this.startTime)/1000);
  console.log(secondsElapsed);
}

module.exports = CountdownTimer;
