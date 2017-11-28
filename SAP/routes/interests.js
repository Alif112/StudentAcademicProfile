var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var User = require('../models/user');
var Interests = require('../models/interest');

//alif alamin

// function calculate(result) {
//   var cgpa = 0.0;
//   var credit = 0.0;
//   var total = 0.0;
//   for (i = 0; i < result.length; i++) {
//     if (parseFloat(result[i].gradepoint) > 0.0) {
//       var coursecredit = parseFloat(result[i].coursecredit);
//       var gradepoint = parseFloat(result[i].gradepoint);
//
//       console.log('-------coursecredit----->' + coursecredit);
//       console.log('-------coursecredit----->' + gradepoint);
//
//       credit = credit + coursecredit;
//       total = total + gradepoint * coursecredit;
//       console.log(credit);
//       console.log(total);
//     }
//   }
//   if (credit > 0)
//     cgpa = total / credit;
//   return cgpa;
//
// }


router.get('/interestsdata', function(req, res) {
  var username = req.user.username;
  console.log('--------------------->>>>  inside interestsdata');

  Interests.find({
    username: username
  }, function(err, results) {
    if (err) return console.error(err);
    var fullname = req.user.firstname + ' ' + req.user.lastname;

    console.log('full name--its here>' + fullname);
    res.render('interestsdata', {
      fullname: fullname,
      results
    });
    console.log('ok huh');
  });


});

router.get('/interestsdataedit', function(req, res) {
  var username = req.user.username;
  var fullname = req.user.firstname + ' ' + req.user.lastname;
  console.log('--------------------->>>>  inside interestsdataedit');


  res.render('interestsdataedit', {
    fullname: fullname
  });
});

//

router.post('/interestsdataedit', function(req, res) {
  var username = req.user.username;
  var fullname = req.user.firstname + ' ' + req.user.lastname;
  var interestabout=req.body.interestabout;
  var interestshortails=req.body.interestshortails;
  var interestdetails=req.body.interestdetails;
  var interesturl=req.body.interesturl;

  var query = {
    'username': username,
    'interestabout':interestabout
  };

  Interests.findOneAndUpdate(query, {
    $set: {

      username: username,
      interestabout:interestabout,
      interestshortails:interestshortails,
      interestdetails:interestdetails,
      interesturl:interesturl

    }
  }, {
    new: true,
    upsert: true
  }, function(err, doc) {
    if (err) {
      console.log("Something wrong when updating data!");
    }

  });
  res.redirect('/interests/interestsdata');


});

//
router.get('/data/edit/:id', function(req, res) {
  var id = req.params.id;
  var username = req.user.username;
  console.log('------>>' + id);

  Interests.find({
    username: username,
    _id: id
  }, function(err, results) {
    var fullname = req.user.firstname + ' ' + req.user.lastname;
    if (err) return console.error(err);

    console.log(results);
    console.log('----------------------------->>>>>>>>>> inside results/projectsdataupdate');

    console.log('full name--its here>' + fullname);
    res.render('interestsdataupdate', {
      fullname: fullname,
      results
    });
    console.log('ok huh');
  });




});
//
router.get('/data/delete/:id', function(req, res) {
  var id = req.params.id;
  var username = req.user.username;
  console.log('------>>' + id);

  Interests.remove({
    username: username,
    _id: id
  }, function(err) {
    var fullname = req.user.firstname + ' ' + req.user.lastname;

    res.redirect('/interests/interestsdata');
    console.log('ok huh');
  });




});

module.exports = router;
