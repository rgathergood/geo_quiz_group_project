const AudioView = function(container, audioPlayer, audioData) {
  this.container = container;
  this.audioPlayer = audioPlayer;
  this.audioData = audioData;
  this.index = 0;
}

AudioView.prototype.render = function () {
  this.audioPlayer.innerHTML = '';
  this.audioPlayer.src = this.audioData.data[this.index].anthem;
  this.audioPlayer.addEventListener('ended', () => {this.nextTrack()});
  this.refreshDisplay();
};

AudioView.prototype.nextTrack = function() {
  this.index++;
  if (this.index === this.audioData.length) this.index = 0;
  this.audioPlayer.src = this.audioData.data[this.index].anthem;
  this.refreshDisplay();
}

AudioView.prototype.refreshDisplay = function () {
  const audioDisplay = document.querySelector('#audio-display');
  audioDisplay.innerHTML = '';
  const h4 = document.createElement('h4');
  h4.textContent = this.audioData.data[this.index].name;
  audioDisplay.appendChild(h4);
};

module.exports = AudioView;
