/* global process */
var http = require('http');
var express = require('express');
var RED = require('node-red');

var app = express();
app.use('/', express.static('public'));
var server = http.createServer(app);

var settings = {
	httpAdminRoot : "/red",
	httpNodeRoot : "/api", 
	userDir : './.nodered',
	functionGlobalContext : { }
};

RED.init(server, settings);

app.use(settings.httpAdminRoot, RED.httpAdmin);
app.use(settings.httpNodeRoot, RED.httpNode);

server.listen(8000);
RED.start().then(function () {
	console.log('app started');
});


