// Requirements
const express = require('express');
const http = require('http');
const path = require('path');

 // app
const app = express();

app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../public/js')));

app.get('/', function(req, res) {
    res.render('index', {title: 'Node Chat'});
});

// Creates http server
const port = process.env.PORT || 8080;
const server = http.createServer(app);

// Chat server
const socket = require('./sockets/sockets');

const io = require('socket.io').listen(server);

io.sockets.on('connection', socket);

server.listen(port, () => {
    console.log(' - listening on http://localhost:' + port);
});
