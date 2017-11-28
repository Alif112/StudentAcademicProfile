
var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var User = require('../models/user');
var Awards = require('../models/award');
exports.awardsdata  = function(req, res) {
  var username = req.user.username;

  console.log('--------------------->>>>  inside awardsdata');
  Awards.find({
    username: username
  }, function(err, results) {
    var fullname = req.user.firstname + ' ' + req.user.lastname;
    if (err) return console.error(err);

    console.log(results);
    console.log('----------------------------->>>>>>>>>> inside results/projectsdata');

    console.log('full name--its here>' + fullname);
    res.render('awardsdata', {
      fullname: fullname,
      results
    });
    console.log('ok huh');
  });
}
