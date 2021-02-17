var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('play', { title: 'Play' });});

module.exports = router;
