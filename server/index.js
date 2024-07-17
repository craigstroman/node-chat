const path = require('path');
const { sequelize } = require('./database.js');
const { app } = require('./app.js');
const socket = require('./sockets/index');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const port = process.env.port;

app.set('port', port);

const http = require('http').createServer(app);

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
