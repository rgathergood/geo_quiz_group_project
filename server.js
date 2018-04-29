const express = require('express');
const parser = require('body-parser');

const Scraper = require('./db/anthem_scraper.js');
scraper = new Scraper();
scraper.scrape('http://www.navyband.navy.mil/national_anthems.html', () => {
  console.log('Done scraping!');
});

const server = express();

server.use(parser.json());
server.use(express.static('client/public'));

server.listen(3000, function () {
  console.log('Listening on port 3000');
});
