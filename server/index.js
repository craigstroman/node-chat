const path = require('path');
// const http = require('http');
const cors = require('cors');
const { sequelize } = require('./database.js');
const { app } = require('./app.js');
const socket = require('./sockets/index');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const port = process.env.port;

app.set('port', port);

// TODO: Figure out why chat not showing up for another user logged in, log the other user in using the incognito window in Chrome
// TODO: Try and figure out why I can't match the server code of the example chat I'm looking at

// const server = http.createServer(app);
// const io = require('socket.io')(server);
const http = require('http').createServer(app);
// const io = require('socket.io', (http,
// {
//   cors: {
//     origin: `http://localhost.00000:${port}`,
//   },
// }));

const io = require('socket.io')(http);

io.cors = { origin: `http://localhost:${port}` };

io.on('connection', socket);

sequelize
  .sync()
  .then(() => {
    console.log(`Databases loaded.`);

    http.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });

    http.on('error', onError);
  })
  .catch((err) => {
    console.log('There was errors: ');
    console.log(err);
  });

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
