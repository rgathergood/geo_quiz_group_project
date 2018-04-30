const reqPromise = require('request-promise');
const Cheerio = require('cheerio');

const AnthemScraper = function(url) {
  this.url = url;
  this.data = {};
  this.leftToProcess = 0;
}

AnthemScraper.prototype.scrape = function(onComplete) {
  reqPromise(this.url + 'national_anthems.html')
  .then((html) => {
    const cheerio = Cheerio.load(html);
    alphabet = 'abcdefghijklmNOPQRSTUVWXYZ'.split('');
    alphabet.forEach((letter) => {
      const dropDown = cheerio('#' + letter + 'drop');
      this.getAudios(dropDown);
      console.log('getting missing audios...');
      this.checkUrls(onComplete);
      console.log(`Completed AnthemScraper.prototype.scrape for letter ${letter}.`);
    });
  })
  .catch((err) => {
    console.error('AnthemScraper: scrape request failed');
  });
};

AnthemScraper.prototype.getAudios = function(cheerio) {
  cheerio.find('a').each((index, element) => {
    const countryName = element.children[0].data;
    const src = element.attribs.href;
    this.data[countryName] = src;
  });
};

AnthemScraper.prototype.checkUrls = function(onComplete) {
  const countryNames = Object.keys(this.data);
  for (let i = 0; i < countryNames.length; i++) {
    const relativePath = this.data[countryNames[i]];
    const fileExtension = relativePath.split('.').pop();
    if (fileExtension === 'html') {
      this.leftToProcess += 1;
      this.getMissingAudios(this.url + relativePath, countryNames[i], onComplete);
    }
    else if (fileExtension !== 'mp3') {
      console.log('Found unexpected file extension when scraping for audio files:');
      console.log(href);
      delete this.data[countryNames[i]];
    }
  }
};

AnthemScraper.prototype.getMissingAudios = function(href, countryName, onComplete) {
  console.log(`lefttoprocess at beginning: ${this.leftToProcess}`);
  reqPromise(href)
  .then((html) => {
    const cheerio = Cheerio.load(html);
    const firstSongElement = cheerio('#mainContent').find('table').find('a')[0];
    const firstSongLink = firstSongElement.attribs.href;
    this.data[countryName] = firstSongLink;
    this.makeProgress(callback);
  })
  .catch((err) => {
    console.log(`AnthemScraper: getMissingAudios request failed for ${href}`);
    this.makeProgress(onComplete);
  });
}

AnthemScraper.prototype.makeProgress = function(callback) {
  this.leftToProcess = this.leftToProcess - 1;
  if (this.leftToProcess === 0) callback();
}

module.exports = AnthemScraper;
