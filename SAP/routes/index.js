var express = require('express');
var router = express.Router();
var linedata = require('../controllers/linedata.js');

router.get('/', function(req, res) {
  res.render('startpage');
});

//Demo Routes Using for test




module.exports = router;
