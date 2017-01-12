// Requirements
var express = require('express');
var http = require('http');
var socketio = require('socket.io');
var path = require('path');

// Routes
var routes =require('../routes/index.js');

var app = express();

app.set('views', path.join(__dirname, '../views'));

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public/js')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'../public/index.html'));
});

var server = http.createServer(app);
var io = socketio.listen(server);

var port = process.env.PORT || 8080;

server.listen(port, function() {
    console.log(' - listening on ' + port + ' ' + __dirname);
});

// Require chat server
var ChatServer = require('./chatserver');

new ChatServer({io: io}).init();

