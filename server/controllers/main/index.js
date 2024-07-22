const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const models = require('../../database.js');
const Users = require('../../models/users.js');

function main(req, res) {
  res.render('index', {
    title: req.app.locals.title,
    content: req.app.locals.description,
    javascript: req.app.locals.javascript,
    path: req.path,
  });
}

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const response = await models.sequelize.query('select * from users where username = ?', {
      replacements: [username],
      type: QueryTypes.SELECT,
      raw: true,
    });

    if (response.length >= 1) {
      bcrypt.compare(password, response[0].password, (error, result) => {
        if (result) {
          res.send(response[0].username);
        } else {
          console.log(error);
          return res.sendStatus(401);
        }
      });
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    console.log('error: ');
    console.log(error);

    res.send(error);
  }
}

async function register(req, res, next) {
  const saltRounds = 12;
  const { firstName, lastName, email, username, password } = req.body;
  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  try {
    const response = await models.sequelize.query(
      'insert into users ("firstName", "lastName", email, username, password, online, "socketId", "createdAt", "updatedAt") values(?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING id;',
      {
        replacements: [
          firstName,
          lastName,
          email,
          username,
          encryptedPassword,
          'false',
          '',
          new Date(),
          new Date(),
        ],
        type: QueryTypes.INSERT,
        raw: true,
      },
    );

    if (response) {
      res.send(true);
    }
  } catch (error) {
    console.log('error: ');
    console.log(error);

    res.send(error);
  }
}

function sessionStatus(req, res, next) {
  res.send({
    user: req.user,
  });
}

module.exports = {
  main,
  login,
  register,
  sessionStatus,
};
