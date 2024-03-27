const express = require('express');
const { main } = require('../controllers/main/index');

const router = express.Router();

router.route('/').get(main);

module.exports.routes = router;
