var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/books',require('./books'));
router.use('/users',require('./users'));
router.use('/authors',require('./authors'));
router.use('/auth',require('./auth'));

module.exports = router;
