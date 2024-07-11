const { QueryTypes } = require('sequelize');
const Users = require('../models/users.js');
const Chat = require('../models/chats.js');
const models = require('../database.js');

// TODO: Change server to be more like example server and have everything within a socket.on('connection')
// TODO: Figure out why chat isn't updating when 2 users are logged in
// TODO: Add password field for login and add user creation page

module.exports = (socket) => {
  socket.on('user:join', async (data) => {
    console.log('user:join: ');
    console.log('data: ', data);
    const user = data.user;
    const socketId = data.socketID;

    const response = await Users.findOrCreate({
      where: { username: user },
      defaults: {
        username: user,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      },
      raw: true,
    });

    if (response[0].id) {
      await models.sequelize.query('update users set online = true, "socketId" = ? where id = ?', {
        replacements: [socketId, response[0].id],
        type: QueryTypes.UPDATE,
        raw: true,
      });

      const foundUsers = await models.sequelize.query('select * from users where online = true', {
        type: QueryTypes.SELECT,
        raw: true,
      });

      // Update users list in chat.
      socket.emit('newUserResponse', foundUsers);
    }

    const messages = await models.sequelize.query('select * from chats', {
      type: QueryTypes.SELECT,
      raw: true,
    });

    socket.emit('messageResponse', messages);
  });

  socket.on('leaveChat', async (data) => {
    console.log('leaveChat: ');
    console.log('data: ', data);
    const socketId = data.socketID;
    console.log('data: ', data);
    await models.sequelize.query('update users set online = false where "socketId" = ?', {
      replacements: [socketId],
      type: QueryTypes.UPDATE,
      raw: true,
    });

    const users = await models.sequelize.query('select * from users where online = true', {
      type: QueryTypes.SELECT,
      raw: true,
    });

    console.log('users: ', users);
    // Update users list in chat.
    socket.emit('newUserResponse', users);

    socket.disconnect();
  });

  socket.on('user:updateStatus', async (data) => {
    console.log('user:updateStatus: ');
    const socketId = data.socketID;

    await models.sequelize.query('update users set online = true where "socketId" = ?', {
      replacements: [socketId],
      type: QueryTypes.UPDATE,
      raw: true,
    });
  });

  socket.on('sendChat', async (data) => {
    console.log('sendChat: ');
    console.log('data: ', data);

    try {
      if (data.id) {
        const newChat = await models.sequelize.query(
          'insert into chats (text, "socketId", username, "createdAt", "updatedAt") values(?, ?, ?, ?, ?)',
          {
            replacements: [data.text, data.id, data.name, new Date().toISOString(), new Date().toISOString()],
            type: QueryTypes.INSERT,
            raw: true,
            returning: true,
          },
        );

        if (newChat) {
          const response = await models.sequelize.query('select *  from chats order by id desc limit 1', {
            type: QueryTypes.SELECT,
            raw: true,
          });

          console.log('response: ', response);

          socket.emit('messageResponse', response);
        }
      }
    } catch (error) {
      console.log('error: ', error);
    }
  });
};
