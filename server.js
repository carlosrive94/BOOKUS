var express = require('express');
var app = express();

// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/app'));

app.listen(port, function () {
	console.log('App listening on port' + port);
});