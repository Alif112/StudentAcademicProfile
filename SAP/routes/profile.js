var express = require('express');
var router = express.Router();
var path = require('path');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var Upload = require('../controllers/upload');
var Graduations = require('../models/graduation');
var Profile = require('../models/profilemodel');

var Sync = require('sync');

var multer = require('multer');
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/profile');
  },
  filename: function(req, file, cb) {

    var imgname = req.user.username + path.extname(file.originalname);
    req.session.photo = 'profile/' + imgname;
    cb(null, imgname);
  }
});

var limits = {
  fileSize: 1 * 1024 * 1024
};

var upload = multer({
  storage: storage,
  limits: limits
});

function asyncFunction(username, callback) {
  process.nextTick(function() {

    var data = [];
    var drop = 0;
    Graduations.find({
      username: username
    }, function(err, results) {

      if (err) throw err;

      else if (results) {
        // console.log(results);

        for (var i = 0; i < results.length; i++) {
          data.push({
            x: results[i].coursecode,
            y: parseFloat(results[i].gradepoint)
          });

        }
      }
      //console.log(data);


      return callback(null, data);
    });
    //console.log(data);


  });
}

function calculate(result) {
  var cgpa = 0.0;
  var credit = 0.0;
  var total = 0.0;
  for (i = 0; i < result.length; i++) {
    if (parseFloat(result[i].gradepoint) > 0.0) {
      var coursecredit = parseFloat(result[i].coursecredit);
      var gradepoint = parseFloat(result[i].gradepoint);

      console.log('-------coursecredit----->' + coursecredit);
      console.log('-------coursecredit----->' + gradepoint);

      credit = credit + coursecredit;
      total = total + gradepoint * coursecredit;
      console.log(credit);
      console.log(total);
    }
  }
  if (credit > 0)
    cgpa = total / credit;
  return cgpa;

}


function sleep(time, callback) {
  var stop = new Date().getTime();
  while (new Date().getTime() < stop + time) {}
  callback();
}





router.get('/dashboard/:id', ensureAuthenticated, function(req, res) {


  console.log('---------------------------------->>>>>>  inside profile');
  var fullname = req.user.firstname + ' ' + req.user.lastname;
  username = req.params.id;
  var photo = '/dist/img/avatar.jpg';


  var cgpa = 0.00;
  var completed = 0.00;
  var drop = 0.00;
  var precgpa = 0.00;
  console.log(username);
  Graduations.find({
    username: username
  }, function(err, results) {

    if (err) {
      console.error(err);
      throw err;
    } else if (results) {
      //console.log(results);

      cgpa = calculate(results);
      precgpa = cgpa;
      for (i = 0; i < results.length; i++) {
        if (parseFloat(results[i].gradepoint) > 0.0) {
          completed += parseFloat(results[i].coursecredit);
        } else {
          drop += parseFloat(results[i].coursecredit);
        }

      }
    }
    //  console.log(completed + "====drop=============" + drop);


    cgpa = cgpa.toFixed(2);
    //console.log(cgpa);
    var data = [];
    var lebels = [];

    Sync(function() {
      //  console.log(username);
      data = asyncFunction.sync(null, username);
      lebels = [];
      for (var i = 0; i < data.length; i++) {
        lebels.push(data[i].x);

      }
      res.render('index', {
        fullname: fullname,
        cgpa: cgpa,
        drop: drop,
        completed: completed,
        precgpa: cgpa,
        photo: req.session.photo,
        lebels: lebels,
        data: data
      });


    });
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error_msg', 'You are not logged in');
    res.redirect('/users/login');
    //return next();
  }

}

router.get('/data', ensureAuthenticated, function(req, res) {
  var fullname = req.user.firstname + ' ' + req.user.lastname;
  var username = req.user.username;
  var query = {
    'username': username
  };

  Profile.findOne(query, function(err, user) {
    if (err) throw err;
    var profilename;
    var university;
    var registration;
    var dept;
    var dob;
    var father;
    var mother;
    var gender;
    var maritalstatus;
    var permanentaddress;
    var temporaryaddress;
    var primaryoccupation;
    var secondaryoccupation;
    var phonenumber;
    var email;
    var language;
    var workexperience;
    var overview;
    var photo;
    if (user) {
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
    } else if (!user) {
      profilename = fullname;
      university = null;
      registration = null;
      dept = null;
      dob = null;
      father = null;
      mother = null;
      gender = null;
      maritalstatus = null;
      permanentaddress = null;
      temporaryaddress = null;
      primaryoccupation = null;
      secondaryoccupation = null;
      phonenumber = null;
      email = null;
      language = null;
      workexperience = null;
      overview = null;
      photo = 'dist/img/avatar.jpg';
    }

    res.render('profiledata', {
      fullname: fullname,
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
      photo: req.session.photo
    });
  });

});

router.get('/editdata', ensureAuthenticated, function(req, res) {
  var fullname = req.user.firstname + ' ' + req.user.lastname;

  console.log('inside editdata');
  Profile.findOne({
    username: req.user.username
  }, function(err, user) {
    if (err) throw err;

    var profilename;
    var university;
    var registration;
    var dept;
    var dob;
    var father;
    var mother;
    var gender;
    var maritalstatus;
    var permanentaddress;
    var temporaryaddress;
    var primaryoccupation;
    var secondaryoccupation;
    var phonenumber;
    var email;
    var language;
    var workexperience;
    var overview;
    var photo;
    if (user) {
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
    if (!user) {
      profilename = fullname;
      university = null;
      registration = null;
      dept = null;
      dob = null;
      father = null;
      mother = null;
      gender = null;
      maritalstatus = null;
      permanentaddress = null;
      temporaryaddress = null;
      primaryoccupation = null;
      secondaryoccupation = null;
      phonenumber = null;
      email = null;
      language = null;
      workexperience = null;
      overview = null;
      photo = 'dist/img/avatar.jpg';
    }

    // console.log('---------> in data route--------------------------->>>>>');
    // console.log('  ---------profilename->>> ' + profilename + '  --regi- ' + registration + '----dept- ' + dept);
    // console.log('  ---------birth->>> ' + dob + ' -father-- ' + father + '--mother--- ' + mother);
    // console.log('  --------gender-->>> ' + gender + ' --marital status- ' + maritalstatus + '---permanentaddress-- ' + permanentaddress);
    // console.log('  -----temporaryaddress----->>> ' + temporaryaddress + '-primaryoccupation-- ' + primaryoccupation + '--secondaryoccupation--- ' + secondaryoccupation);
    // console.log('  --------phonenumber-->>> ' + phonenumber + ' -email-- ' + email + '---language-- ' + language);
    // console.log('  ---------workexperience->>> ' + workexperience + ' -overview-- ' + overview + '--university--- ' + university);



    res.render('dataedit', {
      fullname: fullname,
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
      photo: req.session.photo
    });

    console.log('ok output---------------->');

  });



});

router.post('/editdata', ensureAuthenticated, upload.single('UploadPhoto'), Upload.dataUpload);


module.exports = router;
