const Request = require('../helpers/request.js');
const shuffle = require('shuffle-array');

const AudioData = function () {
  this.url = './db/anthems';
}

AudioData.prototype.getData = function (onComplete) {
  const request = new Request(this.url);
  request.get((data) => {
    this.data = data;
    onComplete();
  });
}

module.exports = AudioData;
