const AudioView = function(container, audioData) {
  this.container = container;
  this.audioData = audioData;
  this.index = 0;
}

AudioView.prototype.render = function () {
  const player = document.querySelector('#anthem-player');

  player.innerHTML = '';
  let source = document.createElement('source');
  source.type = "audio/mpeg";
  source.src = this.audioData.data[this.index].anthem;
  player.appendChild(source);
};

module.exports = AudioView;
