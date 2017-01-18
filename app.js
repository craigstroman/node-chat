// Requirements
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const ChatServer = require('./chatServer');
const routes =require('./routes/index.js');// Routes

const app = express();

app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './public')));
app.use(express.static(path.join(__dirname, './public/js')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'./public/index.html'));
}); 

const server = http.createServer(app);
const io = socketio.listen(server);

const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log(' - listening on http://localhost:' + port);
});

new ChatServer({io: io}).init();

