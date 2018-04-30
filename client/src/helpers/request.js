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

Request.prototype.post = function(data, onComplete){
  const req = new XMLHttpRequest();
  req.open('OPEN', this.url);

  req.setRequestHeader('Content-Type', 'application/json');

  req.addEventListener('load', function(){
    if (req.status !== 201) return;

    const response = JSON.parse(req.responseText);

    onComplete(response);
  });

  const jsonData = JSON.stringify(data);
  req.send(jsonData);
}

module.exports = Request;
