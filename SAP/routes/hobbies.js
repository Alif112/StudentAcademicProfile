var express = require('express');
var router = express.Router();
//var mongodb = require('mongodb');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var User = require('../models/user');
var Hobbies = require('../models/hobby');

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


router.get('/hobbiesdata', function(req, res) {
  var username = req.user.username;
  console.log('--------------------->>>>  inside hobbiesdata');

  Hobbies.find({
    username: username
  }, function(err, results) {
    if (err) return console.error(err);
    var fullname = req.user.firstname + ' ' + req.user.lastname;

    console.log('full name--its here>' + fullname);
    res.render('hobbiesdata', {
      fullname: fullname,
      photo: req.session.photo,
      results
    });
    console.log('ok huh');
  });


});

router.get('/hobbiesdataedit', function(req, res) {
  var username = req.user.username;
  var fullname = req.user.firstname + ' ' + req.user.lastname;
  console.log('--------------------->>>>  inside hobbiesdataedit');


  res.render('hobbiesdataedit', {
    fullname: fullname,
    photo: req.session.photo
  });
});

//

router.post('/hobbiesdataedit', function(req, res) {
  var username = req.user.username;
  var fullname = req.user.firstname + ' ' + req.user.lastname;
  var hobbyabout=req.body.hobbyabout;
  var hobbyshortails=req.body.hobbyshortails;
  var hobbydetails=req.body.hobbydetails;
  var hobbyurl=req.body.hobbyurl;

  var query = {
    'username': username,
    'hobbyabout':hobbyabout
  };

  Hobbies.findOneAndUpdate(query, {
    $set: {

      username: username,
      hobbyabout:hobbyabout,
      hobbyshortails:hobbyshortails,
      hobbydetails:hobbydetails,
      hobbyurl:hobbyurl
    }
  }, {
    new: true,
    upsert: true
  }, function(err, doc) {
    if (err) {
      console.log("Something wrong when updating data!");
    }

  });
  res.redirect('/hobbies/hobbiesdata');


});

//
router.get('/data/edit/:id', function(req, res) {
  var id = req.params.id;
  var username = req.user.username;
  console.log('------>>' + id);

  Hobbies.find({
    username: username,
    _id: id
  }, function(err, results) {
    var fullname = req.user.firstname + ' ' + req.user.lastname;
    if (err) return console.error(err);

    console.log(results);
    console.log('----------------------------->>>>>>>>>> inside hobbiesdataupdate');

    console.log('full name--its here>' + fullname);
    res.render('hobbiesdataupdate', {
      fullname: fullname,
      photo: req.session.photo,
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

  Hobbies.remove({
    username: username,
    _id: id
  }, function(err) {
    var fullname = req.user.firstname + ' ' + req.user.lastname;

    res.redirect('/hobbies/hobbiesdata');
    console.log('ok huh');
  });


});

module.exports = router;
