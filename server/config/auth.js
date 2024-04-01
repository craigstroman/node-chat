const { google } = require('./google/index.js');
const Users = require('../models/users.js');

function auth(passport) {
  passport.serializeUser(function (Users, done) {
    done(null, Users);
  });

  passport.deserializeUser(function (Users, done) {
    done(null, Users);
  });

  google(Users, passport);
}

module.exports.auth = auth;
