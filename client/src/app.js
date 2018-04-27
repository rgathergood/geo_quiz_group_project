const Request = require('./helpers/request.js');
const CountriesData = require('./models/countries_data.js');


document.addEventListener('DOMContentLoaded', () => {
  console.log('Test DOM Load');
  const countriesData = new CountriesData();
  countriesData.getData((data) => {
    console.log('Test');
    console.dir(countriesData.data);
  });
});
