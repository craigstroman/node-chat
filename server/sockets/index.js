const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const models = require('../database.js');

module.exports = (socket) => {
  socket.on('user:join', async (data) => {
    const { user, password, socketId } = data;

    const response = await models.sequelize.query('select * From users where username = ?', {
      replacements: [user],
      type: QueryTypes.SELECT,
      raw: true,
    });

    if (response) {
      const id = response[0].id;
      bcrypt.compare(password, response[0].password, async (error, result) => {
        if (result) {
          await models.sequelize.query('update users set online = true, "socketId" = ? where id = ?', {
            replacements: [socketId, id],
            type: QueryTypes.UPDATE,
            raw: true,
          });
          const foundUsers = await models.sequelize.query('select * from users where online = true', {
            type: QueryTypes.SELECT,
            raw: true,
          });

          // Update users list in chat.
          socket.emit('newUserResponse', foundUsers);
          socket.broadcast.emit('newUserResponse', foundUsers);
          const messages = await models.sequelize.query('select * from chats', {
            type: QueryTypes.SELECT,
            raw: true,
          });
          socket.emit('messageResponse', messages);
        } else {
          return new Error('Invalid username or password.');
        }
      });
    }
  });

  socket.on('leaveChat', async (data) => {
    const socketId = data.socketID;
    await models.sequelize.query('update users set online = false where "socketId" = ?', {
      replacements: [socketId],
      type: QueryTypes.UPDATE,
      raw: true,
    });

    const users = await models.sequelize.query('select * from users where online = true', {
      type: QueryTypes.SELECT,
      raw: true,
    });

    // Update users list in chat.
    socket.broadcast.emit('newUserResponse', users);

    socket.disconnect();
  });

  socket.on('user:updateStatus', async (data) => {
    const socketId = data.socketID;

    await models.sequelize.query('update users set online = true where "socketId" = ?', {
      replacements: [socketId],
      type: QueryTypes.UPDATE,
      raw: true,
    });
  });

  socket.on('message', async (data) => {
    try {
      if (data.id) {
        await models.sequelize.query(
          'insert into chats (text, "socketId", username, "createdAt", "updatedAt") values(?, ?, ?, ?, ?)',
          {
            replacements: [data.text, data.id, data.name, new Date().toISOString(), new Date().toISOString()],
            type: QueryTypes.INSERT,
            raw: true,
            returning: true,
          },
        );

        const response = await models.sequelize.query('select *  from chats order by id desc limit 1', {
          type: QueryTypes.SELECT,
          raw: true,
        });

        socket.emit('messageResponse', response);

        socket.broadcast.emit('messageResponse', response);
      }
    } catch (error) {
      console.log('error: ', error);
    }
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typingResponse', data);
  });
};
