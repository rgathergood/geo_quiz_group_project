const Request = require('../helpers/request.js')

const CountriesData = function () {
  this.url = 'https://restcountries.eu/rest/v2/all';
}

CountriesData.prototype.getData = function (onComplete) {
  const request = new Request(this.url);
  request.get((data) => {
    this.data = data;
    onComplete(data);
  });
}

module.exports = CountriesData;
