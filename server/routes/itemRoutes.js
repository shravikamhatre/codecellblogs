const express = require('express');
const router = express.Router();
const { getItems, setItem } = require('../controllers/itemController');

router.route('/').get(getItems).post(setItem);

module.exports = router;
