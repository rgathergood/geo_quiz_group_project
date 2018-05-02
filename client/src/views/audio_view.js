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
};

AudioView.prototype.nextTrack = function() {
  this.index++;
  if (this.index === this.audioData.length) this.index = 0;
  this.audioPlayer.src = this.audioData.data[this.index].anthem;
  console.dir(this.audioData.data[this.index].anthem);
}

module.exports = AudioView;
