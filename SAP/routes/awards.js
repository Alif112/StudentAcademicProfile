

var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var User = require('../models/user');
var Awards = require('../models/award');
var awards = require('../controllers/award_controllers');

//alif alamin
router.get('/awardsdata',awards.awardsdata);

router.get('/awardsdataedit', function(req, res) {
  var username = req.user.username;
  var fullname = req.user.firstname + ' ' + req.user.lastname;
  console.log('--------------------->>>>  inside projectsdataedit');
  res.render('awardsdataedit', {
    fullname: fullname
  });
});


router.post('/awardsdataedit', function(req, res) {
  var username = req.user.username;
  var fullname = req.user.firstname + ' ' + req.user.lastname;
  var awardtitle = req.body.awardtitle;
  var awarddetails = req.body.awarddetails;


  var query = {
    'username': username,
    'awardtitle': awardtitle
  };

  Awards.findOneAndUpdate(query, {
    $set: {

      username: username,
      awardtitle: awardtitle,
      awarddetails: awarddetails

    }
  }, {
    new: true,
    upsert: true
  }, function(err, doc) {
    if (err) {
      console.log("Something wrong when updating data!");
    }

  });
  res.redirect('/awards/awardsdata');


});


router.get('/data/edit/:id', function(req, res) {
  var id = req.params.id;
  var username = req.user.username;
  console.log('------>>' + id);

  Awards.find({
    username: username,
    _id: id
  }, function(err, results) {
    var fullname = req.user.firstname + ' ' + req.user.lastname;
    if (err) return console.error(err);

    console.log(results);
    console.log('----------------------------->>>>>>>>>> inside results/projectsdataupdate');

    console.log('full name--its here>' + fullname);
    res.render('awardsdataupdate', {
      fullname: fullname,
      results
    });
    console.log('ok huh');
  });




});

router.get('/data/delete/:id', function(req, res) {
  var id = req.params.id;
  var username = req.user.username;
  console.log('------>>' + id);

  Awards.remove({
    username: username,
    _id: id
  }, function(err) {
    var fullname = req.user.firstname + ' ' + req.user.lastname;

    res.redirect('/awards/awardsdata');
    console.log('ok huh');
  });




});



module.exports = router;
