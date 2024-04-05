const express = require('express');
const passport = require('passport');
const { main, googleLogin, login, sessionStatus } = require('../controllers/main/index');
const { loggedIn } = require('../controllers/util/index');

const router = express.Router();

router.route('/').get(main);

router.route('/login').get(login);

module.exports.routes = router;
