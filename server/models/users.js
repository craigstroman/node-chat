const DataTypes = require('sequelize');
const bcrypt = require('bcrypt');
const { sequelize } = require('../database.js');

const saltRounds = 12;

const Users = sequelize.define('users', {
  socketId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  online: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

Users.beforeSave((user) => {
  return bcrypt
    .hash(user.password, saltRounds)
    .then((hash) => (user.password = hash))
    .catch((error) => console.log(error));
});

module.exports = Users;
