var mongoose = require('mongoose');
var Graduations = require('../models/graduation');
var Sync = require('sync');
var sync = require('synchronize');
var data =[ { x: 'CSE 133', y: 4 },
{ x: 'CSE 143', y: 3.5 },
{ x: 'CSE 375', y: 4 },
{ x: 'CSE 100', y: 4 }];

var lebels = ['CSE 133','CSE 143','CSE 375','CSE 100'];
exports.linegraph = function(req, res) {

 //data = calculateData('tuhin47');JSON.stringify()
 console.log(lebels);
  res.render('linechart',{data:data,lebels:lebels});
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
