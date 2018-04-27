const Request = require('./helpers/request.js');
const CountriesData = require('./models/countries_data.js');


document.addEventListener('DOMContentLoaded', () => {
  const countriesData = new CountriesData();
  countriesData.getData((countries) => {
    // console.dir(countriesData.data);

    const sample = countriesData.getSampleCountries();
    console.log(sample);
    const smallSample = countriesData.getDifferentCountries(sample[0]);
    console.log(smallSample);
  });
});
