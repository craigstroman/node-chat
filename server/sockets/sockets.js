const _ = require('lodash');
const moment = require('moment');
const db = require('../models/chat');
const namesModel = require('../models/users');


module.exports = (socket) => {
  // Notify other clients that a new user has joined
  socket.on('user:join', (data) => {
    console.log('Connected to server.');
    const user = data.user;

    // Check if name exists.
    if (namesModel.nameExists(user) >= 1) {
      socket.emit('loginError', user);
    } else {
      socket.username = user;

      // Connect user to chat.
      socket.emit('userConnected', 'User connected');

      // Update users list in chat.
      socket.emit('updatechat:users', namesModel.getUsers());

      // Send notification back to user that they are connected to chat.
      socket.emit('updatechat:newUser', user);

      // Announce to the room that a new user has connected to the chat.
      socket.broadcast.emit('updatechat:newUser', user);

      // Set new name in the names model.
      namesModel.setUser(user);

      // Get the previous 50 messages from the chat to display to the user.
      db.getPreviousMsgs(50, function(err, docs) {
        docs.forEach(function(el) {
          const  messageDate = moment(el.created).format("MMM D YYYY, h:mm:ss a");

          socket.emit('updatechat:chatText', el.user, messageDate, el.msg);
        });
      });
    }
  });

  // Send the chat to the chatroom when received from a user by the server.
  socket.on('sendchat', (data) => {
    const created = moment(Date.now()).format("MMM D YYYY, h:mm:ss a");

    if (data) {
      db.saveMsg({user: socket.username, text: data, created: created}, function(err) {
        if (err) {
          throw err;
        }
      });

      // Update the users chatroom with the new text.
      socket.emit('updatechat:chatText', socket.username, created, data);

      // Update the chatroom with the new text from the user.
      socket.broadcast.emit('updatechat:chatText', socket.username, created, data);
    }
  });

  // Clean up when a user leaves, and broadcast it to other users
  socket.on('disconnect', (data) => {
    console.log('Disconnected from server.');
    namesModel.deleteUser(socket.username);
      if (socket.username !== undefined) {
          socket.broadcast.emit('updatechat:userLeft', socket.username);
          socket.leave(socket.room);
      }
  });
};
