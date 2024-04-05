const express = require('express');
const passport = require('passport');
const { main } = require('../controllers/main/index');

const router = express.Router();

router.route('/').get(main);

module.exports.routes = router;
