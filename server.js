var path = require('path');
var express = require('express');

var app = express();

// app.use(express.static(path.join(__dirname, 'dist')));
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
app.set('port', process.env.PORT || 8080);

const request = require('request');

var server = app.listen(app.get('port'), function() {
  console.log('listening on port ', server.address().port);
});

app.get('/games', function(req, res) {
  request(req.protocol + '://' + req.get('host')).pipe(res);
});

app.get('/textbook', function(req, res) {
  request(req.protocol + '://' + req.get('host')).pipe(res);
});

app.get('/statistic', function(req, res) {
  request(req.protocol + '://' + req.get('host')).pipe(res);
});

app.get('/games/audiochallenge', function(req, res) {
  request(req.protocol + '://' + req.get('host')).pipe(res);
});

app.get('/games/audiochallenge/*', function(req, res) {
  request(req.protocol + '://' + req.get('host')).pipe(res);
});

app.get('/team', function(req, res) {
  request(req.protocol + '://' + req.get('host')).pipe(res);
});

app.get('/games/sprint', function(req, res) {
  request(req.protocol + '://' + req.get('host')).pipe(res);
});

app.get('/games/sprint/*', function(req, res) {
  request(req.protocol + '://' + req.get('host')).pipe(res);
});
