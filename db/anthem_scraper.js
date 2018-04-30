const reqPromise = require('request-promise');
const Cheerio = require('cheerio');

const AnthemScraper = function() {
  this.data = {};
}

AnthemScraper.prototype.scrape = function(url, onComplete) {
  reqPromise(url)
  .then((html) => {
    const cheerio = Cheerio.load(html);
    alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    alphabet.forEach((letter) => {
      const dropDown = cheerio('#' + letter + 'drop');
      this.getAudios(dropDown);
      console.log('getting missing audios...');
      this.checkUrls();
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

AnthemScraper.prototype.checkUrls = function() {
  const countryNames = Object.keys(this.data);
  for (let i = 0; i < countryNames.length; i++) {
    const href = this.data[countryNames[i]];
    const fileExtension = href.split('.').pop();

    if (fileExtension === 'html') {
      this.data[countryNames[i]] = this.getMissingAudios(href);
    }
    else if (fileExtension !== 'mp3') {
      console.log('Found unexpected file extension when scraping for audio files:');
      console.log(href);
      delete this.data[countryNames[i]];
    }
  }
};

AnthemScraper.prototype.getMissingAudios(href) {
  
}

module.exports = AnthemScraper;
