const express = require('express');
const parser = require('body-parser');

const Scraper = require('./db/anthem_scraper.js');
scraper = new Scraper('http://www.navyband.navy.mil/');
scraper.scrape(() => {
  console.log((Object.keys(scraper.data)).length);
  console.log(scraper.data);
});

const server = express();

server.use(parser.json());
server.use(express.static('client/public'));

server.listen(3000, function () {
  console.log('Listening on port 3000');
});
