const reqPromise = require('request-promise');
const Cheerio = require('cheerio');

const AnthemScraper = function() {
  this.data = {};
}

AnthemScraper.prototype.scrape = function(url, onComplete) {
  // this.getCountryUrl(url, this.getAnthemUrl);
  reqPromise(url)
  .then((html) => {
    const cheerio = Cheerio.load(html);
    alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    alphabet.forEach((letter) => {
      const dropDown = cheerio('#' + letter + 'drop');
      this.getAudios(dropDown);
      console.log(`Completed scraping audio files for ${letter}.`);
    });
    onComplete();
  })
  .catch((err) => {
    // error handling
  });
};

AnthemScraper.prototype.getAudios = function(cheerio) {
  cheerio.find('a').each((index, element) => {
    const countryName = element.children[0].data;
    const src = element.attribs.href;
    this.data[countryName] = src;
  });
};

module.exports = AnthemScraper;
