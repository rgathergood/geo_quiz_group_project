const express = require('express');
const parser = require('body-parser');
const server = express();

server.use(parser.json());
server.use(express.static('client/public'));

server.listen(3000, function () {
  console.log('Listening on port 3000');
});
