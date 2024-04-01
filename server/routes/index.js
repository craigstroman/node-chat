const express = require('express');
const passport = require('passport');
const { main, googleLogin, login, sessionStatus } = require('../controllers/main/index');
const { loggedIn } = require('../controllers/util/index');

const router = express.Router();

router.route('/').get(main);

router.route('/login').get(login);

/**
 * Google auth routes.
 */
router.route('/auth/google').get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router.route('/auth/google/callback').get(passport.authenticate('google'), googleLogin);

router.route('/api/sessionStatus').get(loggedIn, sessionStatus);

module.exports.routes = router;
