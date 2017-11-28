var express = require('express');
var router = express.Router();
var linedata = require('../controllers/linedata.js');

router.get('/', function(req, res) {
  res.render('startpage');
});

//Demo Routes Using for test


function calculateData(username) {
   username = 'tuhin47';
  var data = [];

  Graduations.find({
    username: username
  }, function(err, results) {

    if (err) throw err;

    else if (results) {

      for (var i = 0; i < results.length; i++) {
        if (parseFloat(results[i].gradepoint) > 0.0) {
          data.push({
            x: results[i].coursecode,
            y: parseFloat(results[i].gradepoint)
          });
        } else {
          drop = +parseFloat(results[i].gradepoint);
        }
      }
    }

    //console.log(data);
    return data;

  });

}

router.get('/line',linedata.linegraph);









module.exports = router;
