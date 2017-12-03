var express = require('express');
var router = express.Router();
//var mongodb = require('mongodb');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var User = require('../models/user');
var SSCResult = require('../models/sschscresult');

router.get('/sscandhsc', function(req, res) {
  var usename = req.user.username;


  SSCResult.find({
    username: username
  }, function(err, results) {
    var fullname = req.user.firstname + ' ' + req.user.lastname;
    if (err) return console.error(err);

    console.log(results);
    console.log('----------------------------->>>>>>>>>> inside results/sscandhsc');


    console.log('full name-->' + fullname);
    res.render('sscandhsc', {
      fullname: fullname,
      photo: req.session.photo,
      results
    });
    console.log('ok huh');
  });

  console.log('ok huh');




});

router.post('/sscandhsc', function(req, res) {


  var username = req.user.username;
  var examtype = req.body.examtype;
  var board = req.body.board;
  var passedyear = req.body.passedyear;
  var institution = req.body.institution;
  var gpa = req.body.gpa;

  console.log('--------------    ' + username + '------------------------------->');
  console.log('--------------    ' + examtype + '------------------------------->');
  console.log('--------------    ' + board + '------------------------------->');
  console.log('--------------    ' + passedyear + '------------------------------->');
  console.log('--------------    ' + institution + '------------------------------->');
  console.log('--------------    ' + gpa + '------------------------------->');

  var newSSCResult = new SSCResult({
    username: username,
    examtype: examtype,
    board: board,
    passedyear: passedyear,
    institution: institution,
    gpa: gpa

  });



  var query = {
    'username': username,
    'examtype': examtype
  };

  SSCResult.findOneAndUpdate(query, {
    $set: {

      username: username,
      examtype: examtype,
      board: board,
      passedyear: passedyear,
      institution: institution,
      gpa: gpa

    }
  }, {
    new: true,
    upsert: true
  }, function(err, doc) {
    if (err) {
      console.log("Something wrong when updating data!");
    }

    console.log(doc);
  });

  //sleep(300,function(){});
  res.redirect('/results/sscandhsc');

});


router.get('/sscandhscedit', function(req, res) {
  console.log('----------------------------->>>>>>>>>> inside results/sscandhsc');
  var fullname = req.user.firstname + ' ' + req.user.lastname;
  console.log('full name-->' + fullname);
  res.render('sscandhscedit', {
    fullname: fullname,
    photo: req.session.photo
  });
});


module.exports = router;
