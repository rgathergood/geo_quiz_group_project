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
      console.log('getting missing audios...');
      this.getMissingAudios();
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

AnthemScraper.prototype.getMissingAudios = function () {
  const countryNames = Object.keys(this.data);
  for (let i = 0; i < countryNames.length; i++) {
    const href = this.data[countryNames[i]];
    const fileExtension = href.split('.').pop();

    if (fileExtension === 'html') {
      console.log(href);
    }
    else if (fileExtension !== 'mp3') {
      console.log(href);
    }
  }

};

module.exports = AnthemScraper;
