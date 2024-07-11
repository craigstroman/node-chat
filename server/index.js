const path = require('path');
const http = require('http');
const { sequelize } = require('./database.js');
const { app } = require('./app.js');
const socket = require('./sockets/index');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const port = process.env.port;

app.set('port', port);

const server = http.createServer(app);
const io = require('socket.io')(server);

io.sockets.on('connection', socket);

sequelize
  .sync()
  .then(() => {
    console.log(`Databases loaded.`);

    server.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });

    server.on('error', onError);
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
