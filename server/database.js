const path = require('path');
const dotenv = require('dotenv');
const Sequelize = require('sequelize');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_USER_PASSWORD, {
  host: 'localhost',
  dialect: 'postgres',
  logging: function (str) {
    console.log(str);
  },
});

module.exports = {
  sequelize,
};
