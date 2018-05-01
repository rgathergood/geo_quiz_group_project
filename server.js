const express = require('express');
const parser = require('body-parser');

const Scraper = require('./db/anthem_scraper.js');
scraper = new Scraper('http://www.navyband.navy.mil/');

const server = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

server.use(parser.json());
server.use(express.static('client/public'));

MongoClient.connect('mongodb://localhost:27017', function(err, client){
  if (err){
    console.error(err);
    return;
  }

  const db = client.db('geo_quiz');
  console.log('Connected to db');
  const leaderboardCollection = db.collection('leaderboard');

  // get anthems
  const anthemsCollection = db.collection('anthems');
  scraper.scrape(() => {
    console.log('Finished scraping for anthems');
    anthemsCollection.drop(null, (err, result) => {
      if (err) console.log(err);
    });

    for (let country in scraper.data) {
      const newEntry = {
        "name": country,
        "anthem": scraper.data[country]
      }
      anthemsCollection.save(newEntry, null, (err, result) => {
        if (err) console.log(err);
      });
    }
    console.log('Updated anthems collection');
  });


  server.get('/db/leaderboard', function (req, res){
    leaderboardCollection.find().toArray(function(err, allScores){
      if (err){
        console.error(err);
        req.status(500);
        res.send();
        return;
      }
      res.json(allScores);
    });
  });

  server.post('/db/leaderboard', function (req, res){
    const newScore = req.body;

    leaderboardCollection.save(newScore, function (err, result){
      if (err) {
        console.error(err);
        res.status(500);
        res.send();
      }
      console.log('saved');
      res.status(201);
      res.json(result.ops[0]);
    });
  });

  // server.listen(3000, function () {
  //   console.log('Listening on port 3000');
  // });

});
