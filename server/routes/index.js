const express = require('express');
const { main } = require('../controllers/main/index');

const router = express.Router();

router.route('/').get(main);
router.route('/register').get(main);
router.route('/chat').get(main);

module.exports.routes = router;
