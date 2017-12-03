var express = require('express');
var router = express.Router();

var Sync = require('sync');
//var mongodb = require('mongodb');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var User = require('../models/user');
var Awards = require('../models/award');

var awards = require('../controllers/award_controllers');
var Data = require('../controllers/gettingData');

var Profile = require('../models/profilemodel');
var SSCResult = require('../models/sschscresult');
var Projects = require('../models/project');


router.get('/', function(req, res) {
  //var fullname = req.user.firstname + ' ' + req.user.lastname;
  Profile.find({}, function(err, results) {
    if (err) throw err;
    if (!results) res.send('No result found');
    else {
      res.render('search', {
        fullname: 'unknown',
        photo: 'dist/img/avatar.jpg',
        results
      });

    }

  });

});

router.get('/searchresult/:id', function(req, res) {
  var id = req.params.id;
  console.log(id);
  // use this id to fetch username then find all data

  if (id.length != 24) res.send("Invalid User");
  else
    Profile.findOne({
      _id: id
    }, function(err, user) {
      if (err) throw err;
      var username = null;
      var profilename = null;
      var university = null;
      var registration = null;
      var dept = null;
      var dob = null;
      var father = null;
      var mother = null;
      var gender = null;
      var maritalstatus = null;
      var permanentaddress = null;
      var temporaryaddress = null;
      var primaryoccupation = null;
      var secondaryoccupation = null;
      var phonenumber = null;
      var email = null;
      var language = null;
      var workexperience = null;
      var overview = null;
      var photo = 'dist/img/avatar.jpg';
      if (user) {
        username = user.username;
        profilename = user.profilename;
        university = user.university;
        registration = user.registration;
        dept = user.dept;
        dob = user.dob;
        father = user.father;
        mother = user.mother;
        gender = user.gender;
        maritalstatus = user.maritalstatus;
        permanentaddress = user.permanentaddress;
        temporaryaddress = user.temporaryaddress;
        primaryoccupation = user.primaryoccupation;
        secondaryoccupation = user.secondaryoccupation;
        phonenumber = user.phonenumber;
        email = user.email;
        language = user.language;
        workexperience = user.workexperience;
        overview = user.overview;
        photo = user.photo;
      }

      if (!user) res.send("Invalid User");
      else {
        var resultProject = null;
        var resultSSC = null;
        var resultAward = null;
        var resultPublication = null;
        Sync(function() {
          //  console.log(username);
          resultProject = Data.projectsData.sync(null, username);
          //console.log(resultProject);
          resultSSC = Data.SSCData.sync(null, username);
          //console.log(resultProject);
          resultAward = Data.awardData.sync(null, username);

          resultPublication = Data.publicationData.sync(null, username);
          res.render('demoprofile', {
            username: username,
            profilename: profilename,
            university: university,
            registration: registration,
            dept: dept,
            dob: dob,
            father: father,
            mother: mother,
            gender: gender,
            maritalstatus: maritalstatus,
            permanentaddress: permanentaddress,
            temporaryaddress: temporaryaddress,
            primaryoccupation: primaryoccupation,
            secondaryoccupation: secondaryoccupation,
            phonenumber: phonenumber,
            email: email,
            language: language,
            workexperience: workexperience,
            overview: overview,
            photo: photo,
            resultProject: resultProject,
            results: resultSSC,
            resultAward: resultAward,
            resultPublication: resultPublication
          });
        });


      }
      console.log('ok output---------------->');

    });
  //res.send('result will be shown here');
});



module.exports = router;
