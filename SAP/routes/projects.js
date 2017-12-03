var express = require('express');
var router = express.Router();
//var mongodb = require('mongodb');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var User = require('../models/user');
var Projects = require('../models/project');

router.get('/projectsdata', function(req, res) {
  var username = req.user.username;

  console.log('--------------------->>>>  inside projectsdata');
  Projects.find({
    username: username
  }, function(err, results) {
    var fullname = req.user.firstname + ' ' + req.user.lastname;
    if (err) return console.error(err);

    console.log(results);
    console.log('----------------------------->>>>>>>>>> inside results/projectsdata');

    console.log('full name--its here>' + fullname);
    res.render('projectsdata', {
      fullname: fullname,
      photo: req.session.photo,
      results
    });
    console.log('ok huh');
  });


});

router.get('/projectsdataedit', function(req, res) {
  var username = req.user.username;
  var fullname = req.user.firstname + ' ' + req.user.lastname;
  console.log('--------------------->>>>  inside projectsdataedit');
  res.render('projectsdataedit', {
    fullname: fullname,
    photo: req.session.photo
  });
});


router.post('/projectsdataedit', function(req, res) {
  var username = req.user.username;
  var fullname = req.user.firstname + ' ' + req.user.lastname;
  var projecttitle = req.body.projecttitle;
  var projectdetails = req.body.projectdetails;


  var query = {
    'username': username,
    'projecttitle': projecttitle
  };

  Projects.findOneAndUpdate(query, {
    $set: {

      username: username,
      projecttitle: projecttitle,
      projectdetails: projectdetails

    }
  }, {
    new: true,
    upsert: true
  }, function(err, doc) {
    if (err) {
      console.log("Something wrong when updating data!");
    }

  });
  res.redirect('/projects/projectsdata');


});


router.get('/data/edit/:id', function(req, res) {
  var id = req.params.id;
  var username = req.user.username;
  console.log('------>>' + id);

  Projects.find({
    username: username,
    _id: id
  }, function(err, results) {
    var fullname = req.user.firstname + ' ' + req.user.lastname;
    if (err) return console.error(err);

    console.log(results);
    console.log('----------------------------->>>>>>>>>> inside results/projectsdataupdate');

    console.log('full name--its here>' + fullname);
    res.render('projectsdataupdate', {
      fullname: fullname,
      photo: req.session.photo,
      results
    });
    console.log('ok huh');
  });




});

router.get('/data/delete/:id', function(req, res) {
  var id = req.params.id;
  var username = req.user.username;
  console.log('------>>' + id);

  Projects.remove({
    username: username,
    _id: id
  }, function(err) {
    var fullname = req.user.firstname + ' ' + req.user.lastname;

    res.redirect('/projects/projectsdata');
    console.log('ok huh');
  });




});



module.exports = router;
