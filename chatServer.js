'use strict';

var _ = require('underscore');

var Server = function(options) {
  var self = this;

  self.io = options.io;

  // users array
  self.users = [];

  // initialize function
  self.init = function() {
    // Fired upon a connection
    self.io.on('connection', function(socket) {
      self.handleConnection(socket);
    });
  }

  // socket handler for an incoming socket
  self.handleConnection = function(socket) {
    // wait for a login message
    socket.on('login', function(username) {
      var nameBad = !username || username.length < 3 || username.length > 10;

      // check for badname
      if (nameBad) {
        socket.emit('loginNameBad', username);
        return;
      }

      var nameExists = _.some(self.users, function(item) {
        return item.user == username;
      });

      // check for already existing name
      if (nameExists) {
        socket.emit('loginNameExists', username);
      } else {
        // create a new user model
        var newUser = new User({ user: username, socket: socket });
        // push to users array
        self.users.push(newUser);
        // set response listeners for the new user
        self.setResponseListeners(newUser);
        // send welcome message to user
        socket.emit('welcome');
        // send user joined message to all users
        self.io.sockets.emit('userJoined', newUser.user);
      }
    });
  }

  // method to set response listeners
  self.setResponseListeners = function(user) {
    // triggered when a socket disconnects
    user.socket.on('disconnect', function() {
      // remove the user and send user left message to all sockets
      self.users.splice(self.users.indexOf(user), 1);
      self.io.sockets.emit('userLeft', user.user);
    });
    // triggered when socket requests online users
    user.socket.on('onlineUsers', function() {
      var users = _.map(self.users, function(item) {
        return item.user;
      });

      user.socket.emit('onlineUsers', users);
    });

    // triggered when socket send a chat message
    user.socket.on('chat', function(chat) {
      if (chat) {
        self.io.sockets.emit('chat', { sender: user.user, message: chat });
      }
    });
  }
}

// User Model
var User = function(args) {
  var self = this;

  // Socket field
  self.socket = args.socket;
  // username field
  self.user = args.user;
}

module.exports = Server;