'use strict';

var ChatClient = function(options) {
    // Redefine this to avoid conflicts
    var self = this;

    //  App event bus
    self.vent = options.vent;

    // Server hostname replace with your server's hostname eg: http://localhost
    self.hostname = 'http://' + window.location.host;

    self.connect = function() {
        console.log('Chat loaded.');

        // Connect to the host
        self.socket = io.connect(self.hostname);
        // Set responseListeners on the socket
        self.setResponseListeners(self.socket);
    }

    self.login = function(name) {
        self.socket.emit('login', name);
    }

    self.chat = function(chat) {
        self.socket.emit('chat', chat);
    }

    self.setResponseListeners = function(socket) {
        // Handle messages from the server
        socket.on('welcome', function(data) {
            socket.emit('onlineUsers');

            self.vent.trigger('loginDone', data);
        });

        socket.on('loginNameExists', function(data) {
          self.vent.trigger('loginNameExists', data);
        });

        socket.on('loginNameBad', function(data) {
          self.vent.trigger('loginNameBad', data);
        });

        socket.on('onlineUsers', function(data) {
          console.log(data);
          self.vent.trigger('usersInfo', data);
        });

        socket.on('userJoined', function(data) {
          self.vent.trigger('userJoined', data);
        });

        socket.on('userLeft', function(data) {
          self.vent.trigger('userLeft', data);
        });

        socket.on('chat', function(data) {
          self.vent.trigger('chatReceived', data);
        });
    }
}