const path = require('path');
const dotenv = require('dotenv');
const Sequelize = require('sequelize');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_USER_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  logging: (str) => {
    console.log(str);
  },
});

const models = {
  User: require(__dirname, './models/users.js'),
  Notes: require(__dirname, './models/chat.js'),
};

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = {
  models,
  sequelize,
};
