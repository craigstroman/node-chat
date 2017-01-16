// Requirements
var express = require('express');
var http = require('http');
var socketio = require('socket.io');
var path = require('path');
var ChatServer = require('./chatServer');// Require chat server
var routes =require('./routes/index.js');// Routes

var app = express();

app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './public/js')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'./public/index.html'));
});

var server = http.createServer(app);
var io = socketio.listen(server);

var port = process.env.PORT || 8080;

server.listen(port, function() {
    console.log(' - listening on http://localhost:' + port);
});

new ChatServer({io: io}).init();

