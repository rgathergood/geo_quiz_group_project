const Request = require('../helpers/request.js');
const shuffle = require('shuffle-array');

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

CountriesData.prototype.getSampleCountries = function (number = 10) {
  const indices = [...new Array(this.data.length).keys()];
  shuffle(indices);
  const countriesArray = new Array(number);
  for (let i = 0; i < number; i++) {
    countriesArray[i] = this.data[indices[i]];
  }
  return countriesArray;
}

// CountriesData.prototype.getDifferentCountries = function (sampleCountry, number = 3) {
//
// };

module.exports = CountriesData;
