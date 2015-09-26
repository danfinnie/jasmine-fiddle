var path = require('path');
var express = require('express');
var app = express();

app.use("/jasmine-fiddle", express.static(path.join(__dirname, 'dist')));

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Server running at http://localhost:3000/jasmine-fiddle', host, port);
});
