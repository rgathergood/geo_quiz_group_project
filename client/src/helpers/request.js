const Request = function (url) {
  this.url = url;
}

Request.prototype.get = function (onComplete) {
  const req = new XMLHttpRequest();
  req.open('GET', this.url);
  req.addEventListener('load', function () {
    if (this.status !== 200) {
      return;
    }
    const responseBody = JSON.parse(this.responseText);
    onComplete(responseBody);
  });
  req.send();
}

module.exports = Request;
