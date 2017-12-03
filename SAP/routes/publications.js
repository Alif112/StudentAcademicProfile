var express = require('express');
var router = express.Router();
//var mongodb = require('mongodb');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var User = require('../models/user');
var Publications = require('../models/publication');

router.get('/publicationsdata', function(req, res) {
  var username = req.user.username;

  console.log('--------------------->>>>  inside publicationsdata');
  Publications.find({
    username: username
  }, function(err, results) {
    var fullname = req.user.firstname + ' ' + req.user.lastname;
    if (err) return console.error(err);

    console.log(results);
    console.log('----------------------------->>>>>>>>>> inside results/publicationsdata');

    res.render('publicationsdata', {
      fullname: fullname,
      photo: req.session.photo,
      results
    });
    console.log('ok huh');
  });


});

router.get('/publicationsdataedit', function(req, res) {
  var username = req.user.username;
  var fullname = req.user.firstname + ' ' + req.user.lastname;
  console.log('--------------------->>>>  inside publicationsdataedit');
  res.render('publicationsdataedit', {
    fullname: fullname,
    photo: req.session.photo
  });
});


router.post('/publicationsdataedit', function(req, res) {
  var username = req.user.username;
  var fullname = req.user.firstname + ' ' + req.user.lastname;
  var publicationtitle=req.body.publicationtitle;
  var publicationshort=req.body.publicationshort;
  var publicationdetails=req.body.publicationdetails;
  var publicationplace=req.body.publicationplace;
  var publicationurl=req.body.publicationurl;

  console.log('------>'+publicationurl);
  console.log('------>'+publicationplace);
  console.log('------>'+publicationdetails);
  console.log('------>'+publicationtitle);
  console.log(publicationshort);



  var query = {
    'username': username,
    'publicationtitle': publicationtitle
  };

  Publications.findOneAndUpdate(query, {
    $set: {

      username:username,
      publicationtitle:publicationtitle,
      publicationshort:publicationshort,
      publicationdetails:publicationdetails,
      publicationplace:publicationplace,
      publicationurl:publicationurl
    }
  }, {
    new: true,
    upsert: true
  }, function(err, doc) {
    if (err) {
      console.log("Something wrong when updating data!");
    }

  });
  res.redirect('/publications/publicationsdata');


});


router.get('/data/edit/:id', function(req, res) {
  var id = req.params.id;
  var username = req.user.username;
  console.log('------>>' + id);

  Publications.find({
    username: username,
    _id: id
  }, function(err, results) {
    var fullname = req.user.firstname + ' ' + req.user.lastname;
    if (err) return console.error(err);

    console.log(results);
    console.log('----------------------------->>>>>>>>>> inside results/projectsdataupdate');

    console.log('full name--its here>' + fullname);
    res.render('publicationsdataupdate', {
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
  console.log('----------------------delete-------publications------------------------>');
  console.log('------>>' + id);

  Publications.remove({
    username: username,
    _id: id
  }, function(err) {
    var fullname = req.user.firstname + ' ' + req.user.lastname;

    res.redirect('/publications/publicationsdata');
    console.log('ok huh');
  });




});



module.exports = router;
