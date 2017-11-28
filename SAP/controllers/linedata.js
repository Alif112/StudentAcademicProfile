var mongoose = require('mongoose');
var Graduations = require('../models/graduation');
var Sync = require('sync');
var sync = require('synchronize');
var data =[ { x: 'CSE 133', y: 4 },
{ x: 'CSE 143', y: 3.5 },
{ x: 'CSE 375', y: 4 },
{ x: 'CSE 100', y: 4 },
{ x: 'CSE 200', y: 4 },
{ x: 'CSE 233', y: 3.75 },
{ x: 'CSE 254', y: 4 },
{ x: 'CSE 373', y: 3.75 },
{ x: 'CSE 253', y: 3.5 },
{ x: 'CSE 455', y: 4 } ];


exports.linegraph = function(req, res) {

 //data = calculateData('tuhin47');JSON.stringify()

  res.render('linechart',{data:data});
};

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
    console.log(data);
    return data;
  });
}

//
