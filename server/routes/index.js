const express = require('express');
const { login, main, register } = require('../controllers/main/index');

const router = express.Router();

router.route('/').get(main);
router.route('/register').get(main);
router.route('/signUp').post(register);
router.route('/login').post(login);
router.route('/chat').get(main);

module.exports.routes = router;
